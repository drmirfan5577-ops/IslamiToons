import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import StoryCard from "@/components/features/StoryCard";
import CategoryCard from "@/components/features/CategoryCard";
import { ALL_STORIES } from "@/data/stories";
import { CATEGORIES } from "@/constants";
import type { StoryCategory, AgeGroup } from "@/types";

export default function Stories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedAge, setSelectedAge] = useState<AgeGroup | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = (searchParams.get("category") || "all") as StoryCategory | "all";

  const setCategory = (cat: string) => {
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    return ALL_STORIES.filter((s) => {
      const matchCat = selectedCategory === "all" || s.category === selectedCategory;
      const matchAge = selectedAge === "all" || s.ageGroup === selectedAge;
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.titleUrdu.includes(search) ||
        s.tags.some((t) => t.includes(search.toLowerCase()));
      return matchCat && matchAge && matchSearch;
    });
  }, [selectedCategory, selectedAge, search]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero pattern-stars py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">📚 Story Library</h1>
          <p className="text-2xl font-bold text-amber-300" dir="rtl">کہانیوں کی لائبریری</p>
          <p className="text-green-200 mt-2">
            {ALL_STORIES.length}+ educational stories for Muslim children ages 3-14
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-border mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search stories... کہانی تلاش کریں"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Age Filter */}
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value as AgeGroup | "all")}
              className="px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-[160px]"
            >
              <option value="all">All Ages / تمام عمریں</option>
              <option value="3-5">Ages 3-5 (Little Ones)</option>
              <option value="6-9">Ages 6-9 (Kids)</option>
              <option value="10-14">Ages 10-14 (Teens)</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                showFilters ? "bg-green-600 text-white border-green-600" : "border-input text-muted-foreground hover:border-green-300"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Results count */}
          <div className="mt-3 text-sm text-muted-foreground">
            Showing <strong className="text-green-700">{filtered.length}</strong> stories
            {selectedCategory !== "all" && (
              <span> in <strong className="text-amber-600">{selectedCategory}</strong></span>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all btn-bounce ${
              selectedCategory === "all"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white border border-border text-muted-foreground hover:border-green-300"
            }`}
          >
            🌟 All / سب
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all btn-bounce ${
                selectedCategory === cat.id
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white border border-border text-muted-foreground hover:border-green-300"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} featured />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-muted-foreground mb-2">No stories found</h3>
            <p className="text-muted-foreground" dir="rtl">کوئی کہانی نہیں ملی</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedAge("all");
                setCategory("all");
              }}
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              Clear Filters / فلٹر ہٹائیں
            </button>
          </div>
        )}

        {/* Category Cards Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gradient-primary mb-6">
            Browse by Category / قسم کے مطابق دیکھیں
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} size="md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
