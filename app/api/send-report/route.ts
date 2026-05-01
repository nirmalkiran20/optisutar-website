import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, report } = await req.json();

    if (!email || !report) {
      return NextResponse.json({ error: "Email and report required" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://optisutar.com";

    // Send report to user
    await resend.emails.send({
      from: `Optisutar SEO Audit <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: `Your Free SEO Audit Report — ${report.url}`,
      html: generateUserEmail(report, siteUrl),
    });

    // Notify you of new lead
    await resend.emails.send({
      from: `Optisutar Audit Tool <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.RESEND_NOTIFY_EMAIL!,
      subject: `New Audit Lead: ${report.url} — Score ${report.overallScore}/100`,
      html: generateLeadEmail(email, report),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

function generateUserEmail(report: any, siteUrl: string) {
  const scoreColor = report.overallScore >= 80 ? "#16a34a" : report.overallScore >= 50 ? "#d97706" : "#dc2626";
  const scoreLabel = report.overallScore >= 80 ? "Good" : report.overallScore >= 50 ? "Needs Work" : "Poor";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your SEO Audit Report</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1f2d5a;border-radius:12px 12px 0 0;padding:24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="background:#6366f1;color:white;padding:6px 12px;border-radius:6px;font-weight:600;font-size:14px;">O</span>
                <span style="color:white;font-weight:600;font-size:16px;margin-left:10px;">Optisutar</span>
              </td>
              <td align="right">
                <span style="background:rgba(99,102,241,0.3);color:#a5b4fc;font-size:12px;padding:4px 12px;border-radius:20px;border:1px solid rgba(99,102,241,0.5);">SEO Audit Report</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Score hero -->
        <tr><td style="background:#1f2d5a;padding:32px;border-bottom:1px solid rgba(255,255,255,0.1);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0 0 4px;">Audit for</p>
                <p style="color:white;font-size:18px;font-weight:600;margin:0 0 4px;">${report.url}</p>
                <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0;">Generated ${new Date(report.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </td>
              <td align="right">
                <div style="text-align:center;">
                  <div style="width:72px;height:72px;border-radius:50%;border:3px solid ${scoreColor};display:inline-flex;align-items:center;justify-content:center;margin-bottom:4px;">
                    <span style="color:${scoreColor};font-size:22px;font-weight:700;">${report.overallScore}</span>
                  </div>
                  <p style="color:${scoreColor};font-size:13px;font-weight:600;margin:0;">${scoreLabel}</p>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Score grid -->
        <tr><td style="background:white;padding:24px 32px;">
          <p style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Score breakdown</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              ${[
                { label: "SEO", val: report.scores.seo },
                { label: "Desktop", val: report.scores.desktop },
                { label: "Mobile", val: report.scores.mobile },
                { label: "Accessibility", val: report.scores.accessibility },
              ].map(s => `
                <td width="25%" style="text-align:center;padding:12px 8px;background:#f9fafb;border-radius:8px;margin:0 4px;">
                  <p style="font-size:20px;font-weight:700;color:${!s.val ? "#9ca3af" : s.val >= 80 ? "#16a34a" : s.val >= 50 ? "#d97706" : "#dc2626"};margin:0;">${s.val ?? "N/A"}</p>
                  <p style="font-size:11px;color:#6b7280;margin:4px 0 0;">${s.label}</p>
                </td>
              `).join('<td width="8px"></td>')}
            </tr>
          </table>
        </td></tr>

        <!-- Issues summary -->
        <tr><td style="background:white;padding:0 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f3f4f6;border-radius:8px;overflow:hidden;">
            <tr style="background:#f9fafb;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Summary</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border-top:1px solid #f3f4f6;">
                <span style="display:inline-block;background:#fee2e2;color:#991b1b;font-size:12px;padding:2px 8px;border-radius:20px;font-weight:600;">${report.summary.totalIssues} Critical</span>
                <span style="display:inline-block;background:#fef9c3;color:#854d0e;font-size:12px;padding:2px 8px;border-radius:20px;font-weight:600;margin-left:8px;">${report.summary.totalWarnings} Warnings</span>
                <span style="display:inline-block;background:#dcfce7;color:#166534;font-size:12px;padding:2px 8px;border-radius:20px;font-weight:600;margin-left:8px;">${report.summary.totalPassing} Passing</span>
              </td>
            </tr>
            ${report.issues.slice(0, 3).map((issue: any) => `
            <tr>
              <td style="padding:12px 16px;border-top:1px solid #f3f4f6;">
                <p style="font-size:13px;font-weight:600;color:#111827;margin:0 0 4px;">${issue.title}</p>
                <p style="font-size:12px;color:#6b7280;margin:0;line-height:1.5;">${issue.description}</p>
              </td>
            </tr>
            `).join("")}
          </table>
        </td></tr>

        <!-- Hook section -->
        <tr><td style="background:white;padding:0 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2ff;border:2px solid #6366f1;border-radius:12px;padding:24px;">
            <tr><td style="padding:24px;">
              <p style="font-size:11px;font-weight:600;color:#4338ca;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">We found something more important</p>
              <p style="font-size:17px;font-weight:700;color:#3730a3;margin:0 0 12px;line-height:1.4;">We know these issues sound familiar — but that's not what's really holding you back.</p>
              <p style="font-size:13px;color:#4338ca;margin:0 0 16px;line-height:1.6;">We found 3 deeper issues most agencies never catch. These are silently costing you leads every day. We'd rather show you in 10 minutes than explain it in an email.</p>
              <table cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 0;font-size:13px;color:#3730a3;">&#8226; &nbsp;<span style="filter:blur(4px);user-select:none;">Your site has a critical indexing issue affecting 14 pages...</span></td></tr>
                <tr><td style="padding:4px 0;font-size:13px;color:#3730a3;">&#8226; &nbsp;<span style="filter:blur(4px);user-select:none;">A competitor outranks you for your 3 best keywords...</span></td></tr>
                <tr><td style="padding:4px 0;font-size:13px;color:#3730a3;">&#8226; &nbsp;<span style="filter:blur(4px);user-select:none;">Your GMB profile has an error hiding you from local search...</span></td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background:white;padding:0 32px 32px;text-align:center;">
          <p style="font-size:15px;font-weight:600;color:#111827;margin:0 0 8px;">Let's walk through these together — free, 10 minutes, no pressure.</p>
          <p style="font-size:13px;color:#6b7280;margin:0 0 20px;">Book a free strategy call and we'll reveal the full picture.</p>
          <a href="${siteUrl}/contact" style="display:inline-block;background:#6366f1;color:white;font-size:14px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">Book Your Free Call →</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;border-top:1px solid #f3f4f6;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">Optisutar — AI-First Digital Marketing Agency</p>
          <p style="font-size:12px;color:#9ca3af;margin:4px 0 0;"><a href="${siteUrl}" style="color:#6366f1;text-decoration:none;">optisutar.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;
}

function generateLeadEmail(userEmail: string, report: any) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;padding:20px;background:#f4f4f5;">
  <div style="max-width:500px;background:white;border-radius:12px;padding:24px;margin:0 auto;">
    <h2 style="color:#6366f1;margin:0 0 16px;">New Audit Lead!</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;font-size:13px;font-weight:600;">${userEmail}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Website</td><td style="padding:8px 0;font-size:13px;font-weight:600;">${report.url}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Score</td><td style="padding:8px 0;font-size:13px;font-weight:600;">${report.overallScore}/100</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Critical Issues</td><td style="padding:8px 0;font-size:13px;font-weight:600;color:#dc2626;">${report.summary.totalIssues}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Warnings</td><td style="padding:8px 0;font-size:13px;font-weight:600;color:#d97706;">${report.summary.totalWarnings}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Time</td><td style="padding:8px 0;font-size:13px;">${new Date().toLocaleString("en-IN")}</td></tr>
    </table>
    <a href="mailto:${userEmail}" style="display:inline-block;margin-top:16px;background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Reply to Lead →</a>
  </div>
</body>
</html>
  `;
}