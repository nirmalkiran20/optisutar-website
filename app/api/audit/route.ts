import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, competitorUrl } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    const normalizedCompetitor = competitorUrl
      ? (competitorUrl.startsWith("http") ? competitorUrl : `https://${competitorUrl}`)
      : null;

    // Run main site checks in parallel
    const [pageSpeedDesktop, pageSpeedMobile, crawlResults, competitorData] = await Promise.all([
      fetchPageSpeed(normalizedUrl, "desktop"),
      fetchPageSpeed(normalizedUrl, "mobile"),
      crawlSite(normalizedUrl),
      normalizedCompetitor ? fetchPageSpeed(normalizedCompetitor, "desktop") : Promise.resolve(null),
    ]);

    const report = buildReport(normalizedUrl, pageSpeedDesktop, pageSpeedMobile, crawlResults, competitorData, normalizedCompetitor);
    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json({ error: "Failed to audit site" }, { status: 500 });
  }
}

async function fetchPageSpeed(url: string, strategy: "desktop" | "mobile") {
  try {
    const apiKey = process.env.PAGESPEED_API_KEY;
    const categories = "performance,accessibility,best-practices,seo";
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=${categories}&key=${apiKey}`;
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function crawlSite(url: string) {
  const results: Record<string, any> = {};
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "OptiSutar-SEO-Audit-Bot/1.0" },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const finalUrl = res.url;

    results.ssl = finalUrl.startsWith("https://");
    results.statusCode = res.status;

    // Title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    results.title = titleMatch ? titleMatch[1].trim() : null;
    results.titleLength = results.title?.length || 0;

    // Meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    results.description = descMatch ? descMatch[1].trim() : null;
    results.descriptionLength = results.description?.length || 0;

    // H1/H2
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    results.h1Count = h1Matches.length;
    results.h1Text = h1Matches[0]?.replace(/<[^>]*>/g, "").trim() || null;
    const h2Matches = html.match(/<h2[^>]*>/gi) || [];
    results.h2Count = h2Matches.length;

    // Images
    const allImages = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = allImages.filter(img => !img.match(/alt=["'][^"']+["']/i));
    results.totalImages = allImages.length;
    results.imagesWithoutAlt = imagesWithoutAlt.length;

    // Technical checks
    try {
      const sitemapRes = await fetch(`${url}/sitemap.xml`, { signal: AbortSignal.timeout(5000) });
      results.hasSitemap = sitemapRes.ok;
    } catch { results.hasSitemap = false; }

    try {
      const robotsRes = await fetch(`${url}/robots.txt`, { signal: AbortSignal.timeout(5000) });
      results.hasRobots = robotsRes.ok;
    } catch { results.hasRobots = false; }

    results.hasCanonical = !!html.match(/<link[^>]*rel=["']canonical["']/i);
    results.hasOgTitle = !!html.match(/<meta[^>]*property=["']og:title["']/i);
    results.hasOgDesc = !!html.match(/<meta[^>]*property=["']og:description["']/i);
    results.hasOgImage = !!html.match(/<meta[^>]*property=["']og:image["']/i);
    results.hasViewport = !!html.match(/<meta[^>]*name=["']viewport["']/i);
    results.hasStructuredData = !!html.match(/<script[^>]*type=["']application\/ld\+json["']/i);
    results.hasGoogleAnalytics = !!(html.match(/gtag|google-analytics|UA-|G-[A-Z0-9]+/i));

    // Word count
    const textContent = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    results.wordCount = textContent.split(" ").filter(w => w.length > 2).length;

    // Broken links
    const linkMatches = html.match(/href=["'](\/[^"'#?][^"']{0,100})["']/gi) || [];
    const internalLinks = [...new Set(linkMatches.map(l => l.replace(/href=["']/i, "").replace(/["']$/, "")))]
      .filter(l => !l.match(/\.(css|js|png|jpg|svg|ico|woff)/i))
      .slice(0, 8);

    const brokenLinks: string[] = [];
    await Promise.all(internalLinks.map(async (link) => {
      try {
        const linkRes = await fetch(`${url}${link}`, { method: "HEAD", signal: AbortSignal.timeout(5000) });
        if (linkRes.status === 404) brokenLinks.push(link);
      } catch {}
    }));
    results.brokenLinks = brokenLinks;
    results.brokenLinksCount = brokenLinks.length;

  } catch (error) {
    results.crawlError = true;
  }
  return results;
}

function extractScores(data: any) {
  if (!data?.lighthouseResult) return { performance: null, accessibility: null, bestPractices: null, seo: null };
  const cats = data.lighthouseResult.categories;
  return {
    performance: cats?.performance?.score != null ? Math.round(cats.performance.score * 100) : null,
    accessibility: cats?.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : null,
    bestPractices: cats?.["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : null,
    seo: cats?.seo?.score != null ? Math.round(cats.seo.score * 100) : null,
  };
}

function extractVitals(data: any) {
  if (!data?.lighthouseResult?.audits) return {};
  const audits = data.lighthouseResult.audits;
  return {
    lcp: audits["largest-contentful-paint"]?.displayValue || null,
    lcpScore: audits["largest-contentful-paint"]?.score || null,
    tbt: audits["total-blocking-time"]?.displayValue || null,
    tbtScore: audits["total-blocking-time"]?.score || null,
    cls: audits["cumulative-layout-shift"]?.displayValue || null,
    clsScore: audits["cumulative-layout-shift"]?.score || null,
    fcp: audits["first-contentful-paint"]?.displayValue || null,
    si: audits["speed-index"]?.displayValue || null,
    tti: audits["interactive"]?.displayValue || null,
    serverResponseTime: audits["server-response-time"]?.displayValue || null,
    renderBlocking: audits["render-blocking-resources"]?.details?.items?.length || 0,
    unusedJS: audits["unused-javascript"]?.details?.items?.length || 0,
    unusedCSS: audits["unused-css-rules"]?.details?.items?.length || 0,
    imageSize: audits["uses-optimized-images"]?.displayValue || null,
  };
}

function buildReport(url: string, desktop: any, mobile: any, crawl: any, competitor: any, competitorUrl: string | null) {
  const issues: any[] = [];
  const warnings: any[] = [];
  const passing: any[] = [];

  const desktopScores = extractScores(desktop);
  const mobileScores = extractScores(mobile);
  const desktopVitals = extractVitals(desktop);
  const mobileVitals = extractVitals(mobile);
  const competitorScores = competitor ? extractScores(competitor) : null;

  // CRITICAL ISSUES
  if (!crawl.description) {
    issues.push({
      id: "meta-desc-missing",
      title: "Meta description missing",
      description: "No meta description found on your homepage. This directly reduces your CTR in Google — users can't tell what your page is about before clicking.",
      fix: "Add a compelling meta description of 150-160 characters that includes your main keyword and a clear value proposition.",
      priority: "Critical",
      impact: "High CTR impact",
    });
  }

  if (!crawl.ssl) {
    issues.push({
      id: "no-ssl",
      title: "SSL certificate missing — site not secure",
      description: "Your site is not on HTTPS. Google flags HTTP sites as 'Not Secure' and ranks them lower.",
      fix: "Install a free SSL certificate via your hosting provider (Vercel and Hostinger both offer free SSL).",
      priority: "Critical",
      impact: "Ranking & trust",
    });
  }

  if (crawl.h1Count === 0) {
    issues.push({
      id: "h1-missing",
      title: "H1 heading missing",
      description: "No H1 tag found. The H1 is one of the most important on-page SEO signals — Google uses it to understand your page topic.",
      fix: "Add exactly one H1 tag that includes your primary keyword and clearly describes the page content.",
      priority: "Critical",
      impact: "Ranking signal",
    });
  }

  if (crawl.brokenLinksCount > 0) {
    issues.push({
      id: "broken-links",
      title: `${crawl.brokenLinksCount} broken link${crawl.brokenLinksCount > 1 ? "s" : ""} found`,
      description: `Pages returning 404: ${crawl.brokenLinks.join(", ")}. Broken links hurt crawl budget and signal poor site maintenance to Google.`,
      fix: "Fix or 301-redirect these URLs. Use Google Search Console to find all broken links across your site.",
      priority: "Critical",
      impact: "Crawl budget",
    });
  }

  if (desktopScores.performance !== null && desktopScores.performance < 50) {
    issues.push({
      id: "poor-performance",
      title: `Poor page speed score (${desktopScores.performance}/100)`,
      description: `Your site scores ${desktopScores.performance} on desktop performance. Slow sites rank lower and lose visitors before the page even loads.`,
      fix: "Compress images to WebP, remove unused JavaScript, enable browser caching and use a CDN.",
      priority: "Critical",
      impact: "Ranking & UX",
    });
  }

  // WARNINGS
  if (crawl.title && crawl.titleLength > 60) {
    warnings.push({
      id: "title-long",
      title: `Title tag too long (${crawl.titleLength} chars)`,
      description: `Google truncates titles over 60 characters. Your title: "${crawl.title}"`,
      fix: "Shorten to under 60 characters. Put your most important keyword first.",
      priority: "Medium",
      impact: "CTR",
    });
  }

  if (crawl.description && (crawl.descriptionLength < 120 || crawl.descriptionLength > 160)) {
    warnings.push({
      id: "desc-length",
      title: `Meta description length not optimal (${crawl.descriptionLength} chars)`,
      description: "Ideal meta description length is 120-160 characters. Outside this range means truncation or missed opportunity.",
      fix: "Rewrite between 120-160 chars with your keyword and a clear call to action.",
      priority: "Medium",
      impact: "CTR",
    });
  }

  if (crawl.h1Count > 1) {
    warnings.push({
      id: "multiple-h1",
      title: `Multiple H1 tags (${crawl.h1Count} found)`,
      description: "Multiple H1 tags confuse search engines about which heading is most important.",
      fix: "Keep exactly one H1 per page. Convert extras to H2 or H3.",
      priority: "Medium",
      impact: "On-page SEO",
    });
  }

  if (crawl.imagesWithoutAlt > 0) {
    warnings.push({
      id: "images-no-alt",
      title: `${crawl.imagesWithoutAlt} image${crawl.imagesWithoutAlt > 1 ? "s" : ""} missing alt text`,
      description: `${crawl.imagesWithoutAlt} of ${crawl.totalImages} images have no alt text. This hurts both accessibility and image search rankings.`,
      fix: "Add descriptive alt text to every image. Include keywords naturally.",
      priority: "Medium",
      impact: "Accessibility & SEO",
    });
  }

  if (!crawl.hasOgTitle || !crawl.hasOgDesc || !crawl.hasOgImage) {
    warnings.push({
      id: "og-incomplete",
      title: "Open Graph tags incomplete",
      description: "Missing OG tags means poor appearance when shared on LinkedIn, Facebook, WhatsApp and other platforms.",
      fix: "Add og:title, og:description and og:image to all pages.",
      priority: "Medium",
      impact: "Social visibility",
    });
  }

  if (!crawl.hasCanonical) {
    warnings.push({
      id: "no-canonical",
      title: "Canonical tag missing",
      description: "Without canonicals, Google may index duplicate page versions and split your ranking signals.",
      fix: "Add a canonical tag to every page pointing to the preferred URL.",
      priority: "Medium",
      impact: "Duplicate content",
    });
  }

  if (!crawl.hasStructuredData) {
    warnings.push({
      id: "no-schema",
      title: "No structured data (Schema markup) found",
      description: "Schema markup helps Google display rich results (star ratings, FAQs, breadcrumbs) which dramatically improve CTR.",
      fix: "Add relevant schema types: Organization, LocalBusiness, FAQPage or Article.",
      priority: "Medium",
      impact: "Rich results",
    });
  }

  if (!crawl.hasGoogleAnalytics) {
    warnings.push({
      id: "no-analytics",
      title: "No analytics tracking detected",
      description: "No Google Analytics or tracking found. Without tracking you can't measure what's working.",
      fix: "Install Google Analytics 4 (GA4) or another analytics tool to track visitors, conversions and behavior.",
      priority: "Medium",
      impact: "Data & insights",
    });
  }

  if (crawl.wordCount < 300) {
    warnings.push({
      id: "thin-content",
      title: `Thin content detected (${crawl.wordCount} words)`,
      description: "Your homepage has fewer than 300 words. Google considers this thin content and may rank it lower.",
      fix: "Expand your homepage content to at least 500 words. Add value — explain your services, benefits and unique selling points.",
      priority: "Medium",
      impact: "Content quality",
    });
  }

  if (desktopVitals.renderBlocking > 0) {
    warnings.push({
      id: "render-blocking",
      title: `${desktopVitals.renderBlocking} render-blocking resource${desktopVitals.renderBlocking > 1 ? "s" : ""}`,
      description: "Render-blocking resources delay how quickly your page appears to visitors.",
      fix: "Defer non-critical JavaScript and inline critical CSS. Use async/defer attributes on script tags.",
      priority: "Medium",
      impact: "Page speed",
    });
  }

  // PASSING
  if (crawl.ssl) passing.push({ title: "SSL certificate valid", description: "Site secured with HTTPS — confirmed Google ranking signal." });
  if (crawl.hasSitemap) passing.push({ title: "Sitemap.xml found", description: "Sitemap accessible — helps Google discover all your pages." });
  if (crawl.hasRobots) passing.push({ title: "Robots.txt configured", description: "Search engines can crawl your site without restriction." });
  if (crawl.hasViewport) passing.push({ title: "Mobile viewport configured", description: "Essential meta tag for mobile-friendly rendering." });
  if (crawl.description) passing.push({ title: "Meta description present", description: `Found (${crawl.descriptionLength} characters).` });
  if (crawl.title) passing.push({ title: "Title tag present", description: `"${crawl.title}"` });
  if (crawl.h1Count === 1) passing.push({ title: "Single H1 tag — correct", description: `"${crawl.h1Text}"` });
  if (crawl.brokenLinksCount === 0) passing.push({ title: "No broken links detected", description: "All checked internal links return valid responses." });
  if (crawl.hasCanonical) passing.push({ title: "Canonical tags present", description: "Good for preventing duplicate content issues." });
  if (crawl.hasStructuredData) passing.push({ title: "Structured data found", description: "Schema markup detected — eligible for rich results." });
  if (crawl.hasGoogleAnalytics) passing.push({ title: "Analytics tracking active", description: "Google Analytics or tracking detected." });

  // OVERALL SCORE
  const psScore = desktopScores.seo ?? desktopScores.performance ?? 0;
  const technicalScore = Math.round(
    ((passing.length * 100) + (warnings.length * 50)) /
    Math.max(issues.length + warnings.length + passing.length, 1)
  );
  const overallScore = psScore > 0 ? Math.round((psScore + technicalScore) / 2) : technicalScore;

  return {
    url,
    generatedAt: new Date().toISOString(),
    overallScore,
    scores: {
      desktop: desktopScores,
      mobile: mobileScores,
    },
    vitals: {
      desktop: desktopVitals,
      mobile: mobileVitals,
    },
    competitor: competitorScores ? {
      url: competitorUrl,
      scores: competitorScores,
    } : null,
    crawl,
    issues,
    warnings,
    passing,
    summary: {
      totalIssues: issues.length,
      totalWarnings: warnings.length,
      totalPassing: passing.length,
    },
  };
}