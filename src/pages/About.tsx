import { Link } from "react-router-dom";
import { Mail, Shield, Heart, Star, Users, BookOpen, Award, Globe } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import outdoorImage from "@/assets/outdoor-activities.jpg";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-green-900/85" />
        <div className="relative z-10 text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            About IslamiToons
          </h1>
          <p className="text-2xl text-amber-300 font-bold" dir="rtl">اسلامی ٹونز کے بارے میں</p>
          <p className="text-green-200 mt-4 max-w-2xl mx-auto text-lg">
            Inspiring Muslim children through stories, imagination, and Islamic values
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Mission */}
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
            <div>
              <h2 className="text-2xl font-extrabold text-green-800">Our Mission</h2>
              <p className="text-amber-600 font-bold" dir="rtl">ہمارا مقصد</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            IslamiToons was founded with a single, clear purpose: to provide Muslim children with engaging, educational, and Islamically-grounded entertainment. We believe that every child deserves stories that reflect their faith, culture, and values.
          </p>
          <p className="text-gray-600 leading-loose text-base text-right" dir="rtl">
            اسلامی ٹونز ایک واضح مقصد کے ساتھ قائم کیا گیا: مسلمان بچوں کو دلچسپ، تعلیمی اور اسلامی بنیادوں پر تفریح فراہم کرنا۔ ہمارا یقین ہے کہ ہر بچے کو ایسی کہانیاں ملنی چاہیں جو اس کے ایمان، ثقافت اور اقدار کی عکاسی کریں۔
          </p>
        </section>

        {/* What We Offer */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gradient-primary mb-2">What We Offer</h2>
            <p className="text-xl font-bold text-amber-600" dir="rtl">ہم کیا پیش کرتے ہیں</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🕌",
                title: "Islamic Stories",
                titleUrdu: "اسلامی کہانیاں",
                desc: "Stories of Prophets (AS), Companions, and Islamic moral lessons based on Quran and Sunnah.",
              },
              {
                icon: "📜",
                title: "Historical Tales",
                titleUrdu: "تاریخی داستانیں",
                desc: "Accurate, engaging stories from Islamic history including Saladin, Tariq bin Ziyad, and more.",
              },
              {
                icon: "🦁",
                title: "Jungle Adventures",
                titleUrdu: "جنگل کی مہم جوئی",
                desc: "Exciting animal stories set in lush jungles where friendship, curiosity and teamwork shine.",
              },
              {
                icon: "😄",
                title: "Notu & Putlu Comedy",
                titleUrdu: "نوتو پتلو مزاح",
                desc: "Clean, wholesome comedy in the tradition of beloved South Asian cartoon characters.",
              },
              {
                icon: "⚽",
                title: "Outdoor Activities",
                titleUrdu: "آؤٹ ڈور سرگرمیاں",
                desc: "Stories encouraging sports, nature exploration, healthy habits, and physical activity.",
              },
              {
                icon: "✨",
                title: "AI Story Generator",
                titleUrdu: "اے آئی کہانی جنریٹر",
                desc: "Create personalized stories with your child's name, favorite themes and characters.",
              },
            ].map(({ icon, title, titleUrdu, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-md border border-border card-hover flex gap-4">
                <div className="text-3xl flex-shrink-0 mt-1">{icon}</div>
                <div>
                  <h3 className="font-extrabold text-green-800">{title}</h3>
                  <p className="text-xs text-amber-600 font-bold mb-2" dir="rtl">{titleUrdu}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team / Values */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gradient-primary mb-2">Our Values</h2>
            <p className="text-xl font-bold text-amber-600" dir="rtl">ہماری اقدار</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: "Child Safety", labelUrdu: "بچوں کی حفاظت", color: "text-green-600" },
              { icon: BookOpen, label: "Education First", labelUrdu: "تعلیم سب سے پہلے", color: "text-blue-600" },
              { icon: Heart, label: "Islamic Values", labelUrdu: "اسلامی اقدار", color: "text-red-500" },
              { icon: Star, label: "Quality Content", labelUrdu: "معیاری مواد", color: "text-amber-500" },
              { icon: Users, label: "Family Friendly", labelUrdu: "خاندانی", color: "text-purple-600" },
              { icon: Award, label: "Scholar Reviewed", labelUrdu: "علماء کی نظر میں", color: "text-green-700" },
              { icon: Globe, label: "Bilingual", labelUrdu: "دو زبانوں میں", color: "text-sky-600" },
              { icon: Heart, label: "Made with Love", labelUrdu: "محبت سے بنایا", color: "text-pink-500" },
            ].map(({ icon: Icon, label, labelUrdu, color }) => (
              <div key={label} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-green-100">
                <Icon size={28} className={`${color} mx-auto mb-2`} />
                <p className="font-bold text-sm text-gray-800">{label}</p>
                <p className="text-xs text-muted-foreground" dir="rtl">{labelUrdu}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outdoor & Creative Section */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src={outdoorImage}
              alt="Outdoor Activities"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="p-8">
              <h2 className="text-2xl font-extrabold text-green-800 mb-3">
                🌿 Beyond the Screen
              </h2>
              <p className="text-amber-600 font-bold mb-4" dir="rtl">اسکرین سے پرے</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                IslamiToons is not just about watching — it's about inspiring real-world action! Our outdoor activity stories encourage children to explore nature, play sports, plant trees, help neighbors, and live the Islamic values they learn in our stories.
              </p>
              <p className="text-gray-600 leading-loose text-sm text-right" dir="rtl">
                اسلامی ٹونز صرف دیکھنے کے لیے نہیں — یہ حقیقی دنیا میں عمل کرنے کی ترغیب دیتا ہے! ہماری آؤٹ ڈور کہانیاں بچوں کو فطرت دریافت کرنے، کھیل کھیلنے، درخت لگانے اور پڑوسیوں کی مدد کرنے پر آمادہ کرتی ہیں۔
              </p>
              <Link
                to="/stories?category=outdoor"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all btn-bounce"
              >
                ⚽ Outdoor Stories
              </Link>
            </div>
          </div>
        </section>

        {/* Content Advisory */}
        <section className="bg-blue-50 border border-blue-200 rounded-3xl p-8">
          <h2 className="text-2xl font-extrabold text-blue-900 mb-4">
            📋 Content Advisory & Parent Guide
          </h2>
          <div className="space-y-3 text-blue-800">
            <p>✅ All content is reviewed by certified Islamic scholars before publication.</p>
            <p>✅ Stories are age-categorized (3-5, 6-9, 10-14) for appropriate content.</p>
            <p>✅ No violence, inappropriate language, or un-Islamic themes.</p>
            <p>✅ The Story Generator creates fictional content inspired by Islamic values.</p>
            <p>✅ We recommend parents co-watch and discuss stories with children.</p>
            <p className="text-right text-blue-700 pt-2 border-t border-blue-200" dir="rtl">
              تمام مواد اسلامی علماء کی نظر سے گزرا ہے۔ والدین سے گزارش ہے کہ بچوں کے ساتھ کہانیاں دیکھیں اور ان پر گفتگو کریں۔
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center bg-white rounded-3xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl font-extrabold text-green-800 mb-3">Get in Touch</h2>
          <p className="text-amber-600 font-bold mb-6" dir="rtl">رابطہ کریں</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@islamitoons.com"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all btn-bounce"
            >
              <Mail size={18} />
              info@islamitoons.com
            </a>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
                { href: "/terms", label: "Terms of Use" },
              ].map(({ href, label }) => (
                <Link key={href} to={href} className="text-green-600 hover:text-green-800 font-bold text-sm underline">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
