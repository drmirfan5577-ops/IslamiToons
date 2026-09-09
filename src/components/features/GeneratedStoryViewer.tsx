
import { useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, Download, Share2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { GeneratorFormData } from "@/types";
import { LESSONS_URDU } from "@/constants";
import AudioPlayer from "@/components/features/AudioPlayer";

interface GeneratedScene {
  id: number;
  emoji: string;
  text: string;
  textUrdu: string;
  bgClass: string;
}

interface GeneratedStory {
  title: string;
  titleUrdu: string;
  scenes: GeneratedScene[];
  lesson: string;
  lessonUrdu: string;
  characters: string[];
}

function generateStoryContent(data: GeneratorFormData): GeneratedStory {
  const char = data.characters[0] || "Ali";
  const setting = data.setting || "jungle";
  const theme = data.theme || "friendship";

  const sceneSets: Record<string, GeneratedScene[]> = {
    islamic: [
      { id: 1, emoji: "🌙", text: `One evening, ${char} was sitting by the masjid after Maghrib prayer.`, textUrdu: `ایک شام، ${char} مغرب کی نماز کے بعد مسجد کے پاس بیٹھا تھا۔`, bgClass: "from-indigo-100 to-violet-200" },
      { id: 2, emoji: "📖", text: `He opened his Quran and read about being kind to others.`, textUrdu: `اس نے قرآن کھولا اور دوسروں کے ساتھ مہربانی کے بارے میں پڑھا۔`, bgClass: "from-green-100 to-emerald-200" },
      { id: 3, emoji: "🤲", text: `${char} made du'a and asked Allah to help him be a better person.`, textUrdu: `${char} نے دعا مانگی اور اللہ سے مدد مانگی کہ وہ بہتر انسان بنے۔`, bgClass: "from-amber-100 to-yellow-200" },
      { id: 4, emoji: "😊", text: `The next day, he helped an elderly neighbor and felt his heart filled with joy!`, textUrdu: `اگلے دن، اس نے ایک بوڑھے پڑوسی کی مدد کی اور اس کا دل خوشی سے بھر گیا!`, bgClass: "from-sky-100 to-blue-200" },
      { id: 5, emoji: "⭐", text: `${char} learned that good deeds bring blessings in this world and the next.`, textUrdu: `${char} نے سیکھا کہ نیک اعمال اس دنیا اور آخرت میں برکت لاتے ہیں۔`, bgClass: "from-rose-100 to-pink-200" },
    ],
    jungle: [
      { id: 1, emoji: "🌿", text: `Deep in the magical jungle, ${char} discovered a hidden path between giant trees.`, textUrdu: `جادوئی جنگل کی گہرائی میں، ${char} نے بڑے درختوں کے درمیان ایک چھپا ہوا راستہ دریافت کیا۔`, bgClass: "from-green-100 to-lime-200" },
      { id: 2, emoji: "🦜", text: `A colorful parrot swooped down and said "Follow me, I know where the treasure is!"`, textUrdu: `ایک رنگین طوطا نیچے آیا اور بولا "میرے پیچھے آؤ، مجھے پتہ ہے خزانہ کہاں ہے!"`, bgClass: "from-yellow-100 to-amber-200" },
      { id: 3, emoji: "🦁", text: `They met Leo the Lion who warned them about the thorn patch ahead.`, textUrdu: `انہوں نے شیر لیو سے ملاقات کی جس نے آگے کانٹوں کے بارے میں خبردار کیا۔`, bgClass: "from-orange-100 to-red-200" },
      { id: 4, emoji: "🌺", text: `The treasure turned out to be a field of rare healing flowers that could help all animals!`, textUrdu: `خزانہ نکلا نایاب شفا بخش پھولوں کا کھیت جو تمام جانوروں کی مدد کر سکتا تھا!`, bgClass: "from-pink-100 to-rose-200" },
      { id: 5, emoji: "🤝", text: `${char} shared the flowers with everyone and realized teamwork makes dreams work!`, textUrdu: `${char} نے سب کے ساتھ پھول بانٹے اور سمجھا کہ ٹیم ورک خوابوں کو حقیقت بناتا ہے!`, bgClass: "from-violet-100 to-purple-200" },
    ],
    comedy: [
      { id: 1, emoji: "😂", text: `${char} woke up one morning to find his shoes were on the WRONG feet... all four of them!`, textUrdu: `${char} ایک صبح اٹھا تو پایا کہ اس کے جوتے غلط پاؤں میں ہیں... سب چاروں میں!`, bgClass: "from-yellow-100 to-orange-200" },
      { id: 2, emoji: "🐐", text: `His goat had sneaked in overnight and rearranged everything in the house!`, textUrdu: `اس کی بکری رات کو چپکے سے گھر میں گھس آئی اور گھر کی ہر چیز الٹ پلٹ کر دی!`, bgClass: "from-green-100 to-lime-200" },
      { id: 3, emoji: "🎩", text: `He tried to catch the goat but she ran out wearing his father's fancy hat!`, textUrdu: `اس نے بکری کو پکڑنے کی کوشش کی لیکن وہ باپ کی مہنگی ٹوپی پہن کر بھاگ گئی!`, bgClass: "from-purple-100 to-violet-200" },
      { id: 4, emoji: "🏃", text: `The whole neighborhood laughed as they chased the fashionable goat through the market!`, textUrdu: `سارا محلہ ہنستا رہا جب انہوں نے بازار میں فیشنیبل بکری کا پیچھا کیا!`, bgClass: "from-rose-100 to-pink-200" },
      { id: 5, emoji: "😄", text: `${char} learned - always lock the door! And that laughter is the best medicine!`, textUrdu: `${char} نے سیکھا - ہمیشہ دروازہ بند کرو! اور ہنسنا بہترین دوا ہے!`, bgClass: "from-amber-100 to-yellow-200" },
    ],
  };

  const catScenes = sceneSets[data.category] || sceneSets.islamic;

  const titles: Record<string, { en: string; ur: string }> = {
    honesty: { en: `${char}'s Honest Heart`, ur: `${char} کا سچا دل` },
    kindness: { en: `${char}'s Gift of Kindness`, ur: `${char} کی مہربانی کا تحفہ` },
    courage: { en: `${char} the Brave`, ur: `بہادر ${char}` },
    friendship: { en: `${char} Finds a Friend`, ur: `${char} کو دوست ملتا ہے` },
    patience: { en: `${char} Waits with Patience`, ur: `${char} کا صبر` },
    adventure: { en: `${char}'s Big Adventure`, ur: `${char} کی عظیم مہم جوئی` },
    curiosity: { en: `${char} the Curious Explorer`, ur: `متجسس مہم جو ${char}` },
    creativity: { en: `${char}'s Creative Idea`, ur: `${char} کا تخلیقی خیال` },
    default: { en: `${char}'s Special Day`, ur: `${char} کا خاص دن` },
  };

  const titleInfo = titles[theme] || titles.default;

  return {
    title: titleInfo.en,
    titleUrdu: titleInfo.ur,
    scenes: catScenes,
    lesson: `Remember: ${data.theme ? LESSONS_URDU[data.theme] : "Every day is a chance to be better"}`,
    lessonUrdu: LESSONS_URDU[data.theme] || "ہر دن بہتر بننے کا موقع ہے",
    characters: data.characters,
  };
}

interface Props {
  formData: GeneratorFormData;
  onReset: () => void;
}

export default function GeneratedStoryViewer({ formData, onReset }: Props) {
  const story = generateStoryContent(formData);
  const [currentScene, setCurrentScene] = useState(0);

  const goNext = () => {
    if (currentScene < story.scenes.length - 1) setCurrentScene((p) => p + 1);
  };

  const goPrev = () => {
    if (currentScene > 0) setCurrentScene((p) => p - 1);
  };

  const handleDownload = () => {
    const content = `
${story.title}
${story.titleUrdu}

${story.scenes.map((s, i) => `Scene ${i + 1}:\n${s.text}\n${s.textUrdu}`).join("\n\n")}

Lesson: ${story.lesson}
سبق: ${story.lessonUrdu}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title.replace(/ /g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Story downloaded successfully! کہانی کامیابی سے ڈاؤنلوڈ ہوئی!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: `Check out this story: ${story.title}\n${story.titleUrdu}`,
      });
    } else {
      navigator.clipboard.writeText(`${story.title} - IslamiToons`);
      toast.success("Story link copied! کہانی کا لنک کاپی ہوا!");
    }
  };

  const scene = story.scenes[currentScene];

  return (
    <div className="max-w-2xl mx-auto space-y-6 slide-in">
      {/* Story Header */}
      <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-border">
        <div className="text-4xl mb-3">📖</div>
        <h2 className="text-2xl font-extrabold text-gradient-primary">{story.title}</h2>
        <p className="text-lg text-amber-600 font-bold mt-1" dir="rtl">{story.titleUrdu}</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          {formData.characters.map((c) => (
            <span key={c} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Audio Player */}
      <AudioPlayer
        textUrdu={scene.textUrdu}
        textEnglish={scene.text}
        title={story.title}
        compact={false}
      />

      {/* Scene Viewer */}
      <div className={`bg-gradient-to-br ${scene.bgClass} rounded-3xl p-8 shadow-xl min-h-[280px] flex flex-col items-center justify-center text-center transition-all duration-500`}>
        <div className="text-7xl mb-6 floating">{scene.emoji}</div>
        <p className="text-lg font-bold text-gray-800 leading-relaxed mb-4">{scene.text}</p>
        <p className="text-base text-gray-700 font-semibold leading-loose" dir="rtl">{scene.textUrdu}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentScene === 0}
          className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-green-200 rounded-xl font-bold text-green-700 disabled:opacity-40 hover:border-green-400 transition-all btn-bounce"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {story.scenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentScene(i)}
              className={`rounded-full transition-all ${
                i === currentScene
                  ? "w-6 h-3 bg-green-600"
                  : "w-3 h-3 bg-green-200 hover:bg-green-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentScene === story.scenes.length - 1}
          className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-bold disabled:opacity-40 hover:bg-green-700 transition-all btn-bounce"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Lesson Box */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💡</span>
          <h3 className="font-extrabold text-amber-800 text-lg">Today's Lesson / آج کا سبق</h3>
        </div>
        <p className="text-amber-700 font-semibold">{story.lesson}</p>
        <p className="text-amber-600 mt-1 font-semibold text-right" dir="rtl">{story.lessonUrdu}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => toast.info("Use the Audio Player above to listen!")}
          className="flex items-center justify-center gap-2 py-3 bg-sky-50 border-2 border-sky-200 text-sky-700 rounded-xl font-bold text-sm hover:border-sky-400 transition-all btn-bounce"
        >
          <Volume2 size={16} />
          Audio ↑
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-3 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl font-bold text-sm hover:border-green-400 transition-all btn-bounce"
        >
          <Download size={16} />
          Download
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 bg-violet-50 border-2 border-violet-200 text-violet-700 rounded-xl font-bold text-sm hover:border-violet-400 transition-all btn-bounce"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-green-300 text-green-600 rounded-2xl font-bold hover:border-green-500 hover:bg-green-50 transition-all"
      >
        <RotateCcw size={18} />
        Create Another Story / نئی کہانی بنائیں
      </button>
    </div>
  );
}
