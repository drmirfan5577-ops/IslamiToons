import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Users, Star, Play, Brain, Video, BookMarked, Heart } from "lucide-react";
import heroImage from "@/assets/hero-banner.jpg";
import characterImage from "@/assets/character-notu.jpg";
import CategoryCard from "@/components/features/CategoryCard";
import StoryCard from "@/components/features/StoryCard";
import { CATEGORIES, CHARACTERS } from "@/constants";
import { FEATURED_STORIES } from "@/data/stories";

export default function Index() {
  const featuredStories = FEATURED_STORIES.slice(0, 4);
  const featuredCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/75 to-transparent" />

        {/* Floating decorations */}
        <div className="absolute top-10 right-20 text-5xl star-spin opacity-50 hidden md:block">⭐</div>
        <div className="absolute bottom-16 right-32 text-4xl floating opacity-40 hidden md:block">🌙</div>
        <div className="absolute top-32 right-1/3 text-3xl floating opacity-30 hidden md:block" style={{ animationDelay: "1s" }}>✨</div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <Sparkles size={16} />
              اسلامی کارٹون جنریٹر • Islamic Cartoon Generator
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              IslamiToons
              <span className="block text-amber-300 text-3xl md:text-4xl mt-2">
                بچوں کی کارٹون دنیا
              </span>
            </h1>

            <p className="text-green-100 text-lg leading-relaxed mb-3">
              Islamic stories, jungle adventures, historical tales and funny cartoons — all designed to educate and entertain Muslim children ages 3-14.
            </p>
            <p className="text-green-200 text-base mb-8" dir="rtl">
              اسلامی کہانیاں، جنگل کی مہم جوئی، تاریخی داستانیں اور مزاحیہ کارٹونز — 3-14 سال کے بچوں کی تعلیم و تفریح کے لیے
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/generator"
                className="flex items-center gap-2 px-8 py-4 gradient-gold text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all btn-bounce text-lg pulse-ring"
              >
                <Sparkles size={20} />
                ✨ کہانی بنائیں
              </Link>
              <Link
                to="/stories"
                className="flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/25 transition-all btn-bounce text-lg"
              >
                <Play size={20} />
                Stories دیکھیں
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: BookOpen, value: "127+", label: "Stories / کہانیاں" },
                { icon: Users, value: "50K+", label: "Children / بچے" },
                { icon: Star, value: "4.9", label: "Rating / درجہ" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-amber-300" />
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-lg leading-none">{value}</div>
                    <div className="text-green-300 text-xs">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SCROLLING TICKER ============ */}
      <div className="bg-amber-400 py-3 overflow-hidden">
        <div className="flex animate-pulse items-center justify-center gap-8 flex-wrap px-4 text-green-900 font-bold text-sm">
          <span>🕌 Islamic Stories</span>
          <span>•</span>
          <span>🦁 Jungle Adventures</span>
          <span>•</span>
          <span>📜 Historical Tales</span>
          <span>•</span>
          <span>😄 Notu & Putlu Comedy</span>
          <span>•</span>
          <span>⚽ Outdoor Activities</span>
          <span>•</span>
          <span>💡 Moral Stories</span>
          <span>•</span>
          <span>🌟 AI Story Generator</span>
          <span>•</span>
          <span>📖 Quran Recitation</span>
          <span>•</span>
          <span>🎥 AI Video Generator</span>
          <span>•</span>
          <span>🧠 Islamic Quiz</span>
        </div>
      </div>

      {/* ============ QUICK ACCESS ICONS ============ */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { href: "/stories", icon: BookOpen, label: "Stories", labelUrdu: "کہانیاں", color: "bg-green-100 text-green-700 border-green-300" },
            { href: "/quran", icon: BookMarked, label: "Quran", labelUrdu: "قرآن", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
            { href: "/video-generator", icon: Video, label: "Videos", labelUrdu: "ویڈیوز", color: "bg-violet-100 text-violet-700 border-violet-300" },
            { href: "/quiz", icon: Brain, label: "Quiz", labelUrdu: "کوئز", color: "bg-amber-100 text-amber-700 border-amber-300" },
            { href: "/favorites", icon: Heart, label: "Saved", labelUrdu: "محفوظ", color: "bg-red-100 text-red-700 border-red-300" },
            { href: "/parent-dashboard", icon: Users, label: "Parents", labelUrdu: "والدین", color: "bg-sky-100 text-sky-700 border-sky-300" },
          ].map(({ href, icon: Icon, label, labelUrdu, color }) => (
            <Link
              key={href}
              to={href}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${color} card-hover btn-bounce`}
            >
              <Icon size={22} />
              <span className="font-extrabold text-sm">{label}</span>
              <span className="text-xs opacity-70" dir="rtl">{labelUrdu}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ CATEGORIES SECTION ============ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient-primary mb-2">
            Story Categories
          </h2>
          <p className="text-xl font-bold text-amber-600" dir="rtl">کہانیوں کی اقسام</p>
          <p className="text-muted-foreground mt-2">
            Explore our collection of 7 unique story categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} size="md" />
          ))}
          {/* All Stories CTA */}
          <Link
            to="/stories"
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green-300 text-green-600 font-bold p-4 hover:border-green-500 hover:bg-green-50 transition-all card-hover"
          >
            <ArrowRight size={20} />
            <span>All Stories<br /><span className="text-sm font-normal">تمام کہانیاں</span></span>
          </Link>
        </div>
      </section>

      {/* ============ FEATURED STORIES ============ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pattern-stars">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient-primary mb-2">
            ⭐ Featured Stories
          </h2>
          <p className="text-xl font-bold text-amber-600" dir="rtl">منتخب کہانیاں</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} featured />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all btn-bounce shadow-lg"
          >
            <BookOpen size={20} />
            View All Stories / تمام کہانیاں دیکھیں
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ============ NOTU & PUTLU SECTION ============ */}
      <section className="py-16 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                👦 Fan Favorite • پسندیدہ کردار
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
                Meet <span className="text-orange-500">Notu</span> &{" "}
                <span className="text-pink-500">Putlu</span>!
              </h2>
              <p className="text-2xl font-bold text-gray-700 mb-4" dir="rtl">
                نوتو اور پتلو سے ملیں!
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Pakistan's most beloved cartoon duo! Notu and Putlu go on exciting adventures, learn important Islamic values, make everyone laugh, and show kids that friendship and faith can overcome any challenge!
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-right" dir="rtl">
                پاکستان کی سب سے محبوب کارٹون جوڑی! نوتو اور پتلو پرجوش مہم جوئی پر جاتے ہیں، اسلامی اقدار سیکھتے ہیں، سب کو ہنساتے ہیں۔
              </p>
              <Link
                to="/stories?category=notu-putlu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all btn-bounce shadow-lg"
              >
                😄 Watch Their Stories
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <img
                src={characterImage}
                alt="Notu and Putlu Characters"
                className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl"
              />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-amber-400 text-white font-extrabold text-xs px-3 py-2 rounded-xl shadow-lg floating">
                🌟 Most Popular!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-600 text-white font-extrabold text-xs px-3 py-2 rounded-xl shadow-lg" style={{ animationDelay: "1s" }}>
                🏆 16 Episodes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CHARACTERS SECTION ============ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gradient-primary mb-2">Meet the Characters</h2>
          <p className="text-xl font-bold text-amber-600" dir="rtl">کرداروں سے ملیں</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              className={`${char.color} border-2 rounded-2xl p-4 text-center card-hover cursor-pointer`}
            >
              <div className="text-5xl mb-3">{char.emoji}</div>
              <h3 className="font-extrabold text-gray-800">{char.name}</h3>
              <p className="text-sm font-semibold text-gray-600" dir="rtl">{char.nameUrdu}</p>
              <p className="text-xs text-gray-500 mt-1">{char.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GENERATOR CTA ============ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-hero rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 text-8xl opacity-10 star-spin">⭐</div>
            <div className="absolute bottom-0 left-0 text-6xl opacity-10 floating">🌙</div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">✨</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Create Your Own Story!
              </h2>
              <p className="text-2xl text-amber-300 font-bold mb-3" dir="rtl">
                اپنی کہانی بنائیں!
              </p>
              <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto">
                Use our AI-powered story generator to create unique, personalized Islamic stories for your children with their own names and favorite themes!
              </p>
              <Link
                to="/generator"
                className="inline-flex items-center gap-3 px-10 py-5 gradient-gold text-white font-extrabold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all btn-bounce pulse-ring"
              >
                <Sparkles size={24} />
                Start Creating Now!
                <ArrowRight size={24} />
              </Link>
              <p className="text-green-300 text-sm mt-4">
                🆓 Completely Free • مکمل مفت • Safe for Children
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY ISLAMITOONS ============ */}
      <section className="py-16 bg-green-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gradient-primary mb-2">Why IslamiToons?</h2>
            <p className="text-xl font-bold text-amber-600" dir="rtl">اسلامی ٹونز کیوں؟</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛡️",
                title: "100% Safe Content",
                titleUrdu: "مکمل محفوظ مواد",
                desc: "All content reviewed by Islamic scholars. No violence, no inappropriate themes.",
                descUrdu: "تمام مواد اسلامی علماء کی نظر سے گزرا ہوا",
              },
              {
                icon: "📚",
                title: "Educational & Fun",
                titleUrdu: "تعلیمی اور تفریحی",
                desc: "Every story teaches Islamic values, Quran lessons, and positive character traits.",
                descUrdu: "ہر کہانی اسلامی اقدار اور مثبت کردار سکھاتی ہے",
              },
              {
                icon: "🌍",
                title: "Urdu & English",
                titleUrdu: "اردو اور انگریزی",
                desc: "Stories available in both Urdu and English for Pakistani diaspora worldwide.",
                descUrdu: "کہانیاں اردو اور انگریزی دونوں میں دستیاب",
              },
              {
                icon: "🎨",
                title: "Creative & Curious",
                titleUrdu: "تخلیقی اور متجسس",
                desc: "Designed to spark curiosity, creativity and love of learning in children.",
                descUrdu: "بچوں میں تجسس اور سیکھنے کی محبت جگانے کے لیے",
              },
              {
                icon: "👨‍👩‍👧",
                title: "Parent Approved",
                titleUrdu: "والدین کی منظوری",
                desc: "Trusted by thousands of Muslim parents across Pakistan and worldwide.",
                descUrdu: "پاکستان سمیت دنیا بھر کے ہزاروں مسلم والدین کا اعتماد",
              },
              {
                icon: "✨",
                title: "AI Story Generator",
                titleUrdu: "اے آئی کہانی جنریٹر",
                desc: "Create personalized stories with your child's name and favorite characters!",
                descUrdu: "اپنے بچے کے نام اور پسندیدہ کرداروں سے کہانی بنائیں!",
              },
            ].map(({ icon, title, titleUrdu, desc, descUrdu }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-md border border-green-100 card-hover">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-extrabold text-lg text-green-800 mb-1">{title}</h3>
                <p className="text-sm font-bold text-amber-600 mb-3" dir="rtl">{titleUrdu}</p>
                <p className="text-sm text-muted-foreground mb-2">{desc}</p>
                <p className="text-xs text-gray-500 text-right" dir="rtl">{descUrdu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
