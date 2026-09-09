import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  size?: "sm" | "md" | "lg";
}

export default function CategoryCard({ category, size = "md" }: CategoryCardProps) {
  return (
    <Link
      to={`/stories?category=${category.id}`}
      className="block group"
    >
      <div className={`relative overflow-hidden rounded-2xl shadow-md card-hover bg-gradient-to-br ${category.gradient} text-white ${size === "lg" ? "p-6" : "p-4"}`}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full bg-white transform translate-x-6 -translate-y-6" />
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-10 rounded-full bg-white transform -translate-x-4 translate-y-4" />

        <div className="relative z-10">
          {/* Icon */}
          <div className={`${size === "lg" ? "text-5xl mb-3" : "text-3xl mb-2"}`}>
            {category.icon}
          </div>

          {/* Name */}
          <h3 className={`font-extrabold ${size === "lg" ? "text-xl" : "text-base"} leading-tight`}>
            {category.name}
          </h3>
          <p className={`text-white/80 text-right ${size === "lg" ? "text-sm" : "text-xs"}`} dir="rtl">
            {category.nameUrdu}
          </p>

          {/* Description - only for lg */}
          {size === "lg" && (
            <p className="text-white/80 text-sm mt-2 leading-relaxed">
              {category.description}
            </p>
          )}

          {/* Count and arrow */}
          <div className="flex items-center justify-between mt-3">
            <span className={`bg-white/20 px-2 py-0.5 rounded-full text-white/90 font-bold ${size === "lg" ? "text-sm" : "text-xs"}`}>
              {category.count} stories
            </span>
            <ArrowRight
              size={size === "lg" ? 20 : 16}
              className="opacity-70 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
