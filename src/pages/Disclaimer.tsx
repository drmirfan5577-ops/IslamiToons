import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Info, BookOpen, Users } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-amber-600 py-12 px-4 text-center">
        <AlertTriangle size={48} className="text-white mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-white mb-2">Disclaimer</h1>
        <p className="text-amber-100 text-xl font-bold" dir="rtl">دستبرداری</p>
        <p className="text-amber-200 mt-2">Important Information / اہم معلومات</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/about" className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-8 font-bold">
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Warning Boxes */}
        <div className="space-y-4 mb-10">
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} className="text-amber-600" />
              <h3 className="font-extrabold text-amber-800">⚠️ Fictional Content Warning</h3>
            </div>
            <p className="text-amber-700">
              All stories on IslamiToons are fictional and created for educational and entertainment purposes only. Any resemblance to real persons, living or dead, or actual events is purely coincidental.
            </p>
            <p className="text-amber-600 mt-2 text-right text-sm" dir="rtl">
              اسلامی ٹونز کی تمام کہانیاں فرضی ہیں اور صرف تعلیمی اور تفریحی مقاصد کے لیے بنائی گئی ہیں۔
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Info size={20} className="text-blue-600" />
              <h3 className="font-extrabold text-blue-800">📖 Religious Content Note</h3>
            </div>
            <p className="text-blue-700">
              Islamic stories and historical content are based on widely accepted Islamic sources. However, they are simplified for children and should not be treated as academic religious authority. Parents and guardians are encouraged to verify religious information with qualified scholars.
            </p>
            <p className="text-blue-600 mt-2 text-right text-sm" dir="rtl">
              اسلامی کہانیاں بچوں کے لیے آسان کی گئی ہیں اور انہیں دینی علمی حوالہ نہیں سمجھنا چاہیے۔
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users size={20} className="text-green-600" />
              <h3 className="font-extrabold text-green-800">👨‍👩‍👧 Parent Supervision Recommended</h3>
            </div>
            <p className="text-green-700">
              We strongly recommend that parents and guardians supervise their children's use of IslamiToons, co-view content, and use stories as conversation starters for Islamic education at home.
            </p>
            <p className="text-green-600 mt-2 text-right text-sm" dir="rtl">
              ہم والدین سے سفارش کرتے ہیں کہ وہ بچوں کے ساتھ کہانیاں دیکھیں اور گھر میں اسلامی تعلیم کے موقع کے طور پر استعمال کریں۔
            </p>
          </div>
        </div>

        {/* Full Disclaimer */}
        <div className="space-y-6">
          {[
            {
              icon: BookOpen,
              title: "1. Educational Purpose Only",
              titleUrdu: "صرف تعلیمی مقصد",
              content: `IslamiToons is an educational entertainment platform designed for Muslim children. All content — including stories, characters, and generated narratives — is created solely for educational and entertainment purposes.

The platform does not constitute formal Islamic education, religious instruction, or scholarly religious opinion. Content should be understood as a creative, child-friendly introduction to Islamic themes, not as definitive religious guidance.`,
            },
            {
              icon: AlertTriangle,
              title: "2. AI-Generated Content Disclaimer",
              titleUrdu: "اے آئی سے تخلیق شدہ مواد",
              content: `Our Story Generator uses templates and algorithmic content creation to produce stories. Please note:

• Generated stories are fictional narratives created by software
• AI-generated content may contain errors or inaccuracies
• Generated content should not be used as a source of Islamic religious instruction
• Parents should review generated stories before sharing with young children
• IslamiToons takes no responsibility for misuse of generated content`,
            },
            {
              icon: Info,
              title: "3. Historical Accuracy",
              titleUrdu: "تاریخی درستگی",
              content: `Historical stories on IslamiToons are based on well-known Islamic historical accounts, simplified and dramatized for children. We strive for accuracy but:

• Stories are simplified for age-appropriate understanding
• Some creative elements may be added for storytelling purposes
• Dates, names, and events may be generalized
• For accurate Islamic history, consult qualified scholars and academic sources`,
            },
            {
              icon: Users,
              title: "4. Character and Imagery Disclaimer",
              titleUrdu: "کردار اور تصویر",
              content: `All cartoon characters on IslamiToons are original fictional creations. "Notu and Putlu" style characters are inspired by the genre of South Asian educational cartoons.

• No real persons are depicted without permission
• Historical figures like Islamic scholars or rulers are portrayed in a respectful, educational manner
• All character images are AI-generated or illustrated for educational purposes
• Image generation uses AI tools; results are for illustration only`,
            },
            {
              icon: AlertTriangle,
              title: "5. No Medical or Professional Advice",
              titleUrdu: "طبی یا پیشہ ورانہ مشورہ نہیں",
              content: `Content on IslamiToons, including outdoor activity suggestions, does not constitute medical, health, or professional advice. Parents should ensure all physical activities are appropriate for their child's health and abilities.`,
            },
            {
              icon: Info,
              title: "6. Third-Party Content",
              titleUrdu: "تھرڈ پارٹی مواد",
              content: `IslamiToons may contain links to external websites and use third-party image services. We are not responsible for the content, privacy policies, or practices of third-party websites. We encourage parents to review all external content.`,
            },
            {
              icon: BookOpen,
              title: "7. Copyright Notice",
              titleUrdu: "حق اشاعت نوٹس",
              content: `All original content on IslamiToons — including stories, character designs, and website design — is protected by copyright © 2024 IslamiToons. Stories generated using our Story Generator are provided for personal, non-commercial use only.

You may share stories for educational purposes with proper attribution.`,
            },
          ].map(({ icon: Icon, title, titleUrdu, content }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Icon size={20} className="text-amber-600" />
                <div>
                  <h2 className="text-xl font-extrabold text-gray-800">{title}</h2>
                  <p className="text-amber-600 text-sm font-bold" dir="rtl">{titleUrdu}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          ))}
        </div>

        {/* Final Note */}
        <div className="mt-8 bg-green-900 text-white rounded-2xl p-6 text-center">
          <p className="text-amber-300 font-bold text-lg mb-2">
            "And say: My Lord, increase me in knowledge" — Quran 20:114
          </p>
          <p className="text-green-300" dir="rtl">
            "اور کہو: اے میرے رب، مجھے علم میں اضافہ کر" — قرآن 20:114
          </p>
          <p className="text-green-400 text-sm mt-4">
            For questions about this disclaimer, contact us at: legal@islamitoons.com
          </p>
        </div>
      </div>
    </div>
  );
}
