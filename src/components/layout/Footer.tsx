import { Link } from "react-router-dom";
import { Heart, Mail, Shield, FileText } from "lucide-react";
import { APP_NAME, APP_URL } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      {/* Islamic Pattern Divider */}
      <div className="pattern-stars bg-green-800 py-3 px-6 text-center">
        <p className="text-amber-300 text-sm font-bold tracking-widest">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ✦ ✦ ✦
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-xl">
                🕌
              </div>
              <span className="text-2xl font-extrabold text-amber-300">{APP_NAME}</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-4">
              بچوں کے لیے اسلامی کارٹونز، تاریخی کہانیاں، جنگل کی مہم جوئی اور سبق آموز کہانیاں۔ ہمارا مقصد بچوں کی اسلامی اور اخلاقی تربیت کو تفریح کے ساتھ جوڑنا ہے۔
            </p>
            <p className="text-green-300 text-xs italic">
              "Seek knowledge from the cradle to the grave" — Prophet Muhammad ﷺ
            </p>
            <p className="text-green-400 text-xs mt-1">
              "علم حاصل کرو ماں کی گود سے قبر تک" — حضرت محمد ﷺ
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-300 font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home / ہوم" },
                { href: "/stories", label: "Stories / کہانیاں" },
                { href: "/quran", label: "Quran / قرآن" },
                { href: "/generator", label: "Generator / جنریٹر" },
                { href: "/video-generator", label: "Video Generator / ویڈیو" },
                { href: "/quiz", label: "Quiz / کوئز" },
                { href: "/favorites", label: "Favorites / پسندیدہ" },
                { href: "/parent-dashboard", label: "Parent Dashboard" },
                { href: "/about", label: "About Us / ہمارے بارے میں" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-green-300 hover:text-amber-300 text-sm transition-colors"
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h3 className="text-amber-300 font-bold mb-4 text-lg">Contact</h3>
            <div className="space-y-3 text-green-300 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-amber-400" />
                <span>info@islamitoons.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-amber-400" />
                <span>Safe for children 3+</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-amber-400" />
                <span>COPPA Compliant</span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-green-800 rounded-xl">
              <p className="text-amber-300 text-xs font-bold mb-1">⚠️ Parent Reminder</p>
              <p className="text-green-300 text-xs">
                We recommend parents review content with their children. This platform is designed for ages 3-14.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-green-400 text-sm">
            © 2024 {APP_NAME} • All rights reserved • {APP_URL}
          </p>
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-red-400 fill-red-400" />
            <span>for Muslim children worldwide</span>
          </div>
        </div>

        {/* Disclaimer Short */}
        <div className="mt-4 p-3 bg-green-800/50 rounded-xl border border-green-700">
          <p className="text-green-400 text-xs text-center">
            <strong className="text-amber-400">Disclaimer:</strong> All stories are fictional and educational. Content is reviewed by Islamic scholars for accuracy. Characters, names, and stories are created for educational purposes only. All generated content using AI tools is for illustrative purposes and does not represent real persons or events. For full disclaimer, visit our{" "}
            <Link to="/disclaimer" className="text-amber-300 underline">Disclaimer Page</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
