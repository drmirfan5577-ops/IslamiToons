
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Eye, Clock, BookOpen, Share2, Heart, ChevronLeft, ChevronRight, Brain } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getStoryById } from "@/data/stories";
import AudioPlayer from "@/components/features/AudioPlayer";
import QuizComponent from "@/components/features/QuizComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { getQuizForStory } from "@/data/quiz";

const BG_GRADIENTS = [
  "from-green-100 to-emerald-200",
  "from-amber-100 to-yellow-200",
  "from-sky-100 to-blue-200",
  "from-violet-100 to-purple-200",
  "from-rose-100 to-pink-200",
];

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const story = id ? getStoryById(id) : null;
  const [currentScene, setCurrentScene] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { isFavorite, toggleFavorite, addToHistory } = useFavorites();
  const liked = story ? isFavorite(story.id) : false;

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-muted-foreground mb-4">Story not found</h2>
          <Link
            to="/stories"
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
          >
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  const scenes = story.content.length > 0 ? story.content : [
    {
      id: 1,
      text: story.description,
      textUrdu: story.descriptionUrdu,
      illustration: "📖",
      bgColor: BG_GRADIENTS[0],
    },
  ];

  const scene = scenes[currentScene];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: story.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied! لنک کاپی ہوا!");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Stories / کہانیوں پر واپس
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={story.thumbnail}
              alt={story.title}
              className="w-full md:w-48 h-40 md:h-36 object-cover rounded-2xl shadow-xl flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                  {story.category}
                </span>
                <span className="bg-white/20 text-white/80 px-3 py-1 rounded-full text-xs font-bold">
                  Ages {story.ageGroup}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{story.title}</h1>
              <p className="text-amber-300 text-xl font-bold mb-3" dir="rtl">{story.titleUrdu}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-green-200">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  {story.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {story.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {story.duration} read
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {scenes.length} scenes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (story) {
                toggleFavorite(story.id);
                toast.success(liked ? "Removed from favorites" : "Added to favorites! پسندیدہ میں شامل!");
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all btn-bounce ${
              liked ? "bg-red-50 border-red-400 text-red-600" : "border-border text-muted-foreground hover:border-red-300"
            }`}
          >
            <Heart size={16} className={liked ? "fill-red-500 text-red-500" : ""} />
            {liked ? "Saved! ❤️" : "Save"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-border font-bold text-sm text-muted-foreground hover:border-green-300 transition-all btn-bounce"
          >
            <Share2 size={16} />
            Share
          </button>
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all btn-bounce ${
              showQuiz ? "bg-violet-50 border-violet-400 text-violet-700" : "border-border text-muted-foreground hover:border-violet-300"
            }`}
          >
            <Brain size={16} />
            Take Quiz
          </button>
        </div>

        {/* Audio Player */}
        <AudioPlayer
          textUrdu={scene.textUrdu}
          textEnglish={scene.text}
          title={story.title}
        />

        {/* Story Scene Viewer */}
        <div className={`bg-gradient-to-br ${scene.bgColor || BG_GRADIENTS[currentScene % BG_GRADIENTS.length]} rounded-3xl p-8 shadow-xl min-h-[300px] flex flex-col items-center justify-center text-center`}>
          <div className="text-7xl mb-6 floating">{scene.illustration}</div>
          <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed mb-4 max-w-lg">
            {scene.text}
          </p>
          <p className="text-base md:text-lg text-gray-700 font-semibold leading-loose max-w-lg" dir="rtl">
            {scene.textUrdu}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScene((p) => Math.max(0, p - 1))}
            disabled={currentScene === 0}
            className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-green-200 rounded-xl font-bold text-green-700 disabled:opacity-40 hover:border-green-400 transition-all"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentScene(i)}
                className={`rounded-full transition-all ${
                  i === currentScene ? "w-6 h-3 bg-green-600" : "w-3 h-3 bg-green-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentScene((p) => Math.min(scenes.length - 1, p + 1))}
            disabled={currentScene === scenes.length - 1}
            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-bold disabled:opacity-40 hover:bg-green-700 transition-all"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scene completed? Show Lesson + Quiz Button */}
        {currentScene === scenes.length - 1 && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 slide-in">
            <h3 className="text-xl font-extrabold text-amber-800 mb-3">
              🎉 Story Complete! / کہانی مکمل!
            </h3>
            <div className="space-y-2 mb-4">
              <div>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Today's Lesson</p>
                <p className="text-amber-800 font-semibold">{story.lesson}</p>
              </div>
              <div className="text-right" dir="rtl">
                <p className="text-xs font-bold text-amber-600">آج کا سبق</p>
                <p className="text-amber-700 font-semibold">{story.lessonUrdu}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowQuiz(true);
                addToHistory(story.id, true);
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl font-extrabold hover:bg-violet-700 transition-all btn-bounce"
            >
              <Brain size={16} />
              🧠 Take Story Quiz / کوئز دیں
            </button>
          </div>
        )}

        {/* Story Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="font-bold text-green-800 mb-3">Story Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-bold capitalize">{story.category.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age Group</span>
                <span className="font-bold">{story.ageGroup} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-bold">{story.duration} read</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-bold flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  {story.rating}/5.0
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="font-bold text-green-800 mb-3">Characters / کردار</h3>
            <div className="flex flex-wrap gap-2">
              {story.characters.map((c) => (
                <span key={c} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-green-800 mb-2 text-sm">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((t) => (
                  <span key={t} className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        {showQuiz && (
          <div className="slide-in">
            <QuizComponent
              questions={getQuizForStory(story.id)}
              title={`Quiz: ${story.title}`}
              titleUrdu={story.titleUrdu}
              onComplete={(score, total) => {
                toast.success(`Quiz done! ${score}/${total} 🎉`);
              }}
            />
          </div>
        )}

        {/* Back Button */}
        <Link
          to="/stories"
          className="flex items-center justify-center gap-2 w-full py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-50 transition-all"
        >
          <ArrowLeft size={18} />
          Back to All Stories / تمام کہانیوں پر واپس
        </Link>
      </div>
    </div>
  );
}
