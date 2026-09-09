import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Star, BookOpen, Wand2, Info, Brain, Video, BookMarked, Heart, Users } from "lucide-react";
import { APP_NAME } from "@/constants";

const navLinks = [
  { href: "/", label: "Home", labelUrdu: "ہوم", icon: Star },
  { href: "/stories", label: "Stories", labelUrdu: "کہانیاں", icon: BookOpen },
  { href: "/quran", label: "Quran", labelUrdu: "قرآن", icon: BookMarked },
  { href: "/generator", label: "Generator", labelUrdu: "جنریٹر", icon: Wand2 },
  { href: "/video-generator", label: "Videos", labelUrdu: "ویڈیوز", icon: Video },
  { href: "/quiz", label: "Quiz", labelUrdu: "کوئز", icon: Brain },
];

const moreLinks = [
  { href: "/favorites", label: "Favorites", labelUrdu: "پسندیدہ", icon: Heart },
  { href: "/parent-dashboard", label: "Parents", labelUrdu: "والدین", icon: Users },
  { href: "/about", label: "About", labelUrdu: "ہمارے بارے میں", icon: Info },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
              🕌
            </div>
            <div>
              <span className="text-xl font-extrabold text-gradient-primary block leading-none">
                {APP_NAME}
              </span>
              <span className="text-[10px] text-muted-foreground leading-none">
                اسلامی کارٹون دنیا
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all btn-bounce ${
                    isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "text-green-800 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </Link>
              );
            })}
            <div className="w-px h-5 bg-green-200 mx-1" />
            {moreLinks.map(({ href, label, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all btn-bounce ${
                    isActive
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/generator"
              className="px-4 py-2 rounded-2xl gradient-gold text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all btn-bounce pulse-ring"
            >
              ✨ کہانی بنائیں
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-green-50 text-green-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-green-100 px-4 py-4 space-y-1 shadow-xl max-h-[80vh] overflow-y-auto">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-2 mb-2">Main Menu</p>
          {navLinks.map(({ href, label, labelUrdu, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-green-800 hover:bg-green-50"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
                <span className="ml-auto text-xs opacity-70">{labelUrdu}</span>
              </Link>
            );
          })}
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-2 pt-2 pb-1">More</p>
          {moreLinks.map(({ href, label, labelUrdu, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-amber-700 hover:bg-amber-50"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
                <span className="ml-auto text-xs opacity-70">{labelUrdu}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/generator"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl gradient-gold text-white font-bold shadow-md"
            >
              ✨ کہانی بنائیں - Create Story
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
