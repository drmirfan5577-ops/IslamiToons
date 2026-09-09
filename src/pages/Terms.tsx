import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="gradient-hero py-12 px-4 text-center">
        <FileText size={48} className="text-amber-300 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-white mb-2">Terms of Use</h1>
        <p className="text-amber-300 text-xl font-bold" dir="rtl">استعمال کی شرائط</p>
        <p className="text-green-200 mt-2">Last updated: December 2024</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/about" className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-8 font-bold">
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="space-y-6">
          {[
            {
              title: "1. Acceptance of Terms",
              titleUrdu: "شرائط کی قبولیت",
              content: `By accessing and using IslamiToons (islamitoons.onspace.app), you agree to be bound by these Terms of Use. If you do not agree, please do not use our service.

These terms apply to all visitors, users, and others who access or use the service.`,
            },
            {
              title: "2. Use of Service",
              titleUrdu: "سروس کا استعمال",
              content: `IslamiToons is provided free of charge for personal, educational, non-commercial use. You agree to:

• Use the service for lawful purposes only
• Not attempt to misuse, hack, or disrupt the service
• Not reproduce or distribute content for commercial purposes without written permission
• Respect the Islamic values and educational mission of this platform`,
            },
            {
              title: "3. Story Generator Terms",
              titleUrdu: "کہانی جنریٹر کی شرائط",
              content: `When using our Story Generator:
• Generated stories are for personal, educational use only
• You may share generated stories with family and friends with attribution to IslamiToons
• Commercial use of generated stories is not permitted without written consent
• IslamiToons is not responsible for how generated content is interpreted or used`,
            },
            {
              title: "4. Intellectual Property",
              titleUrdu: "دانشورانہ ملکیت",
              content: `All content on IslamiToons including text, graphics, logos, character designs, and software are the property of IslamiToons and are protected by applicable intellectual property laws.

You may not reproduce, distribute, or create derivative works without our written permission.`,
            },
            {
              title: "5. Age Restrictions",
              titleUrdu: "عمر کی پابندیاں",
              content: `IslamiToons is designed for children ages 3-14. Users under 13 should use this service with parental supervision. Parents are responsible for monitoring their children's use of our platform.`,
            },
            {
              title: "6. Limitation of Liability",
              titleUrdu: "ذمہ داری کی حد",
              content: `IslamiToons is provided "as is" without warranties of any kind. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use the service.`,
            },
            {
              title: "7. Governing Law",
              titleUrdu: "حکمران قانون",
              content: `These Terms are governed by applicable laws. Any disputes shall be resolved through good-faith negotiation. We are committed to fair resolution of any issues that arise.`,
            },
            {
              title: "8. Contact",
              titleUrdu: "رابطہ",
              content: `For questions about these Terms, contact us at: legal@islamitoons.com`,
            },
          ].map(({ title, titleUrdu, content }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-extrabold text-green-800 mb-1">{title}</h2>
              <p className="text-amber-600 font-bold text-sm mb-4" dir="rtl">{titleUrdu}</p>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
