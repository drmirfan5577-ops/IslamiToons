import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Trash2, Mail } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-12 px-4 text-center">
        <Shield size={48} className="text-amber-300 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-amber-300 text-xl font-bold" dir="rtl">رازداری پالیسی</p>
        <p className="text-green-200 mt-2">Last updated: December 2024</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/about" className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-8 font-bold">
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: Lock, title: "No Personal Data Collection", desc: "We do not collect personal information from children under 13.", color: "text-green-600" },
            { icon: Eye, title: "No Tracking", desc: "No behavioral tracking or advertising cookies.", color: "text-blue-600" },
            { icon: Shield, title: "COPPA Compliant", desc: "Fully compliant with Children's Online Privacy Protection Act.", color: "text-violet-600" },
            { icon: Trash2, title: "Data Minimization", desc: "We only collect what's absolutely necessary.", color: "text-amber-600" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-md border border-border flex gap-3">
              <Icon size={24} className={`${color} flex-shrink-0 mt-0.5`} />
              <div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Policy */}
        <div className="prose prose-green max-w-none space-y-8">
          {[
            {
              title: "1. Introduction",
              titleUrdu: "تعارف",
              content: `IslamiToons ("we," "us," or "our") is committed to protecting the privacy of children and their families. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website islamitoons.onspace.app and use our Story Generator service.

We are dedicated to complying with the Children's Online Privacy Protection Act (COPPA) and other applicable privacy laws.`,
            },
            {
              title: "2. Information We Collect",
              titleUrdu: "ہم کیا معلومات اکٹھی کرتے ہیں",
              content: `We collect minimal information necessary to provide our services:

• Story Preferences: Story category, theme, characters chosen (stored locally in your browser only)
• Usage Data: General anonymous usage statistics to improve our service
• No personal identification: We do not collect names, email addresses, phone numbers, or any personally identifiable information from children under 13 without parental consent.
• Cookies: We use only essential functional cookies. No advertising or tracking cookies.`,
            },
            {
              title: "3. Children's Privacy (COPPA)",
              titleUrdu: "بچوں کی رازداری",
              content: `IslamiToons is designed for children ages 3-14. We take children's privacy very seriously:

• We do not knowingly collect personal information from children under 13 without verifiable parental consent.
• Parents or guardians may contact us at any time to review, delete, or refuse further collection of their child's information.
• Story generation data is processed locally and not stored on our servers.
• If we learn we have inadvertently collected personal information from a child under 13, we will delete it immediately.`,
            },
            {
              title: "4. How We Use Information",
              titleUrdu: "ہم معلومات کیسے استعمال کرتے ہیں",
              content: `We use collected information only to:
• Provide and improve our story generation service
• Understand how users interact with our content
• Ensure content remains safe and appropriate
• Comply with legal obligations

We never sell, rent, or share personal information with third parties for marketing purposes.`,
            },
            {
              title: "5. Data Security",
              titleUrdu: "ڈیٹا کی سیکیورٹی",
              content: `We implement appropriate technical and organizational measures to protect any information we collect:
• HTTPS encryption for all data in transit
• Regular security audits
• Limited staff access to any data systems
• Story generator data is processed client-side (in your browser) and not transmitted to our servers`,
            },
            {
              title: "6. Third-Party Services",
              titleUrdu: "تھرڈ پارٹی سروسز",
              content: `Our service may include links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We recommend reviewing the privacy policies of any third-party sites you visit.

We use Unsplash for placeholder images — please review Unsplash's privacy policy at unsplash.com/privacy.`,
            },
            {
              title: "7. Parental Rights",
              titleUrdu: "والدین کے حقوق",
              content: `As a parent or guardian, you have the right to:
• Review any personal information we may have collected from your child
• Request deletion of such information
• Refuse further collection or use of your child's information
• Opt-out of any communications

To exercise these rights, contact us at: privacy@islamitoons.com`,
            },
            {
              title: "8. Changes to This Policy",
              titleUrdu: "پالیسی میں تبدیلیاں",
              content: `We may update this Privacy Policy from time to time. We will notify users of significant changes by posting a notice on our website. Continued use of IslamiToons after changes constitutes acceptance of the updated policy.`,
            },
          ].map(({ title, titleUrdu, content }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-extrabold text-green-800 mb-1">{title}</h2>
              <p className="text-amber-600 font-bold text-sm mb-4" dir="rtl">{titleUrdu}</p>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          ))}

          {/* Contact */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-green-800 mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-green-700 font-bold">
                <Mail size={16} />
                privacy@islamitoons.com
              </p>
              <p className="text-muted-foreground">IslamiToons Privacy Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
