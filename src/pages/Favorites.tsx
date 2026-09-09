import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, BookOpen, Clock, ArrowLeft, Search } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import StoryCard from "@/components/features/StoryCard";
import { ALL_STORIES } from "@/data/stories";
import { toast } from "sonner";

export default function Favorites() {
  const { favorites, history, toggleFavorite, clearFavorites, clearHistory } = useFavorites();
  const [activeTab, setActiveTab] = useState<"favorites" | "history">("favorites");
  const [search, setSearch] = useState("");

  const favoriteStories = favorites
    .map((id) => ALL_STORIES.find((s) => s.id === id))
    .filter(Boolean) as typeof ALL_STORIES;

  const historyStories = history
    .map((h) => {
      const story = ALL_STORIES.find((s) => s.id === h.storyId);
      return story ? { ...story, readAt: h.readAt, completed: h.completed } : null;
    })
    .filter(Boolean) as (typeof ALL_STORIES[0] & { readAt: number; completed: boolean })[];

  const filteredFavorites = favoriteStories.filter(
    (s) =>
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.titleUrdu.includes(search)
  );

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString("ur-PK", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Stories
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-red-500/30 rounded-2xl flex items-center justify-center text-3xl">
              ❤️
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">My Collection</h1>
              <p className="text-amber-300 text-xl font-bold" dir="rtl">میری مجموعہ</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="text-white font-extrabold text-xl">{favorites.length}</p>
              <p className="text-green-200 text-xs">Favorites</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="text-white font-extrabold text-xl">{history.length}</p>
              <p className="text-green-200 text-xs">Read</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-3 bg-gray-100 p-1.5 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "favorites"
                ? "bg-red-500 text-white shadow-md"
                : "text-muted-foreground hover:text-red-500"
            }`}
          >
            <Heart size={14} className={activeTab === "favorites" ? "fill-white" : ""} />
            Favorites / پسندیدہ ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "history"
                ? "bg-green-600 text-white shadow-md"
                : "text-muted-foreground hover:text-green-600"
            }`}
          >
            <Clock size={14} />
            History / تاریخ ({history.length})
          </button>
        </div>

        {activeTab === "favorites" && (
          <>
            {favorites.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search favorites..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => {
                    clearFavorites();
                    toast.success("All favorites cleared!");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all"
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
              </div>
            )}

            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFavorites.map((story) => (
                  <div key={story.id} className="relative">
                    <StoryCard story={story} featured />
                    <button
                      onClick={() => {
                        toggleFavorite(story.id);
                        toast.success("Removed from favorites!");
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all z-10"
                    >
                      <Heart size={14} className="text-white fill-white" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-7xl mb-4">💔</div>
                <h3 className="text-xl font-bold text-muted-foreground mb-2">
                  {search ? "No stories match your search" : "No favorites yet!"}
                </h3>
                <p className="text-muted-foreground mb-4" dir="rtl">
                  {search ? "تلاش سے کوئی کہانی نہیں ملی" : "ابھی تک کوئی پسندیدہ نہیں!"}
                </p>
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  <BookOpen size={16} />
                  Browse Stories / کہانیاں دیکھیں
                </Link>
              </div>
            )}
          </>
        )}

        {activeTab === "history" && (
          <>
            {history.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    clearHistory();
                    toast.success("History cleared!");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                >
                  <Trash2 size={14} />
                  Clear History
                </button>
              </div>
            )}

            {historyStories.length > 0 ? (
              <div className="space-y-3">
                {historyStories.map((story) => (
                  <Link
                    key={story.id}
                    to={`/stories/${story.id}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-green-200 transition-all"
                  >
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{story.title}</h3>
                      <p className="text-sm text-amber-600 font-semibold" dir="rtl">{story.titleUrdu}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          story.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {story.completed ? "✅ Completed" : "📖 In Progress"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          <Clock size={10} className="inline mr-1" />
                          {formatDate(story.readAt)}
                        </span>
                      </div>
                    </div>
                    <Heart
                      size={16}
                      className={favorites.includes(story.id) ? "text-red-500 fill-red-500" : "text-gray-300"}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-7xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-muted-foreground mb-2">No reading history yet!</h3>
                <p className="text-muted-foreground mb-4" dir="rtl">ابھی تک کوئی پڑھنے کی تاریخ نہیں!</p>
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  <BookOpen size={16} />
                  Start Reading / پڑھنا شروع کریں
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
