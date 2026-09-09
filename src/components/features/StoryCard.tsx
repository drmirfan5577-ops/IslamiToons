import { Link } from "react-router-dom";
import { Star, Eye, Clock, BookOpen } from "lucide-react";
import type { Story } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  islamic: "bg-green-100 text-green-700 border-green-300",
  historical: "bg-amber-100 text-amber-700 border-amber-300",
  jungle: "bg-lime-100 text-lime-700 border-lime-300",
  comedy: "bg-orange-100 text-orange-700 border-orange-300",
  outdoor: "bg-sky-100 text-sky-700 border-sky-300",
  moral: "bg-violet-100 text-violet-700 border-violet-300",
  "notu-putlu": "bg-rose-100 text-rose-700 border-rose-300",
};

const CATEGORY_ICONS: Record<string, string> = {
  islamic: "🕌",
  historical: "📜",
  jungle: "🦁",
  comedy: "😄",
  outdoor: "⚽",
  moral: "💡",
  "notu-putlu": "👦",
};

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

export default function StoryCard({ story, featured = false }: StoryCardProps) {
  const catColor = CATEGORY_COLORS[story.category] || "bg-gray-100 text-gray-700";
  const catIcon = CATEGORY_ICONS[story.category] || "📖";

  if (featured) {
    return (
      <Link to={`/stories/${story.id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden shadow-lg card-hover bg-white border border-border h-full">
          {/* Thumbnail */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={story.thumbnail}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Category Badge */}
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg border text-xs font-bold ${catColor} backdrop-blur-sm`}>
              {catIcon} {story.category.replace("-", " ")}
            </div>
            {/* Age Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-white/90 text-xs font-bold text-green-700">
              Age {story.ageGroup}
            </div>
            {/* Rating overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-white text-xs font-bold">{story.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-extrabold text-foreground text-base leading-tight mb-1 group-hover:text-green-700 transition-colors">
              {story.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-1 text-right" dir="rtl">
              {story.titleUrdu}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {story.description}
            </p>

            {/* Lesson */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
              <p className="text-xs text-amber-700 font-semibold">
                💡 {story.lesson}
              </p>
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{story.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={12} />
                <span>{story.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-bold">
                <BookOpen size={12} />
                <span>Read Story</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/stories/${story.id}`} className="block group">
      <div className="flex gap-3 p-4 rounded-xl bg-white border border-border shadow-sm card-hover">
        <img
          src={story.thumbnail}
          alt={story.title}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${catColor}`}>
              {catIcon} {story.category}
            </span>
            <span className="text-xs text-muted-foreground">Age {story.ageGroup}</span>
          </div>
          <h3 className="font-bold text-sm text-foreground group-hover:text-green-700 transition-colors truncate">
            {story.title}
          </h3>
          <p className="text-xs text-muted-foreground" dir="rtl">{story.titleUrdu}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star size={10} className="text-amber-400 fill-amber-400" />
              <span>{story.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={10} />
              <span>{story.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
