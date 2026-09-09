import type { Story } from "@/types";

export interface QuizQuestion {
  id: number;
  question: string;
  questionUrdu: string;
  options: string[];
  optionsUrdu: string[];
  correctIndex: number;
  explanation: string;
  explanationUrdu: string;
}

export interface StoryQuiz {
  storyId: string;
  questions: QuizQuestion[];
}

const QUIZZES: Record<string, QuizQuestion[]> = {
  "notu-putlu-kite": [
    {
      id: 1,
      question: "What did Notu and Putlu fly?",
      questionUrdu: "نوتو اور پتلو نے کیا اڑایا؟",
      options: ["A balloon", "A kite", "A paper plane", "A flag"],
      optionsUrdu: ["ایک غبارہ", "ایک پتنگ", "ایک کاغذ کا جہاز", "ایک جھنڈا"],
      correctIndex: 1,
      explanation: "Notu and Putlu flew their colorful kite on a sunny Friday.",
      explanationUrdu: "نوتو اور پتلو نے ایک دھوپ والے جمعہ کو اپنی رنگین پتنگ اڑائی۔",
    },
    {
      id: 2,
      question: "What did they find sitting on their kite?",
      questionUrdu: "انہیں پتنگ پر کیا ملا؟",
      options: ["A butterfly", "A cat", "A little bird", "A squirrel"],
      optionsUrdu: ["ایک تتلی", "ایک بلی", "ایک چھوٹی چڑیا", "ایک گلہری"],
      correctIndex: 2,
      explanation: "They found a little bird sitting on the kite and singing happily.",
      explanationUrdu: "انہیں پتنگ پر خوشی سے گاتی ہوئی ایک چھوٹی چڑیا ملی۔",
    },
    {
      id: 3,
      question: "What is the lesson of this story?",
      questionUrdu: "اس کہانی کا سبق کیا ہے؟",
      options: [
        "Never fly kites",
        "True friends help each other",
        "Birds are dangerous",
        "Always stay indoors",
      ],
      optionsUrdu: [
        "کبھی پتنگ مت اڑاؤ",
        "سچے دوست ایک دوسرے کی مدد کرتے ہیں",
        "پرندے خطرناک ہیں",
        "ہمیشہ گھر میں رہو",
      ],
      correctIndex: 1,
      explanation: "True friends help each other in difficult times, just like Putlu helped Notu.",
      explanationUrdu: "سچے دوست مشکل وقت میں مدد کرتے ہیں، جیسے پتلو نے نوتو کی مدد کی۔",
    },
  ],
  "prophet-ibrahim": [
    {
      id: 1,
      question: "What did Ibrahim AS look at in the sky first?",
      questionUrdu: "حضرت ابراہیم ؑ نے پہلے آسمان میں کیا دیکھا؟",
      options: ["The moon", "A bright star", "The sun", "Clouds"],
      optionsUrdu: ["چاند", "ایک روشن ستارہ", "سورج", "بادل"],
      correctIndex: 1,
      explanation: "Ibrahim AS first saw a bright star and wondered if it was his Lord.",
      explanationUrdu: "ابراہیم ؑ نے پہلے ایک روشن ستارہ دیکھا اور سوچا کہ کیا یہ اس کا رب ہے۔",
    },
    {
      id: 2,
      question: "What conclusion did Ibrahim AS reach?",
      questionUrdu: "حضرت ابراہیم ؑ نے کیا نتیجہ نکالا؟",
      options: [
        "The star is the Lord",
        "The moon is the Lord",
        "Only Allah is the true Lord",
        "The sun is the Lord",
      ],
      optionsUrdu: [
        "ستارہ رب ہے",
        "چاند رب ہے",
        "صرف اللہ حقیقی رب ہے",
        "سورج رب ہے",
      ],
      correctIndex: 2,
      explanation: "Ibrahim AS realized that only Allah is the true Lord who never sets or disappears.",
      explanationUrdu: "ابراہیم ؑ نے جانا کہ صرف اللہ حقیقی رب ہے جو کبھی غروب یا غائب نہیں ہوتا۔",
    },
  ],
  "lion-jungle-justice": [
    {
      id: 1,
      question: "Who was the wise and fair king of the jungle?",
      questionUrdu: "جنگل کا عقلمند اور منصف بادشاہ کون تھا؟",
      options: ["Elephant", "Leo the Lion", "The Fox", "The Owl"],
      optionsUrdu: ["ہاتھی", "شیر لیو", "لومڑی", "الو"],
      correctIndex: 1,
      explanation: "Leo the Lion was known as the most fair and wise king of the jungle.",
      explanationUrdu: "شیر لیو جنگل کا سب سے منصف اور عقلمند بادشاہ جانا جاتا تھا۔",
    },
    {
      id: 2,
      question: "Who had actually seen what happened?",
      questionUrdu: "اصل میں کیا ہوا، کس نے دیکھا تھا؟",
      options: ["The rabbit", "The fox", "A wise old owl", "The elephant"],
      optionsUrdu: ["خرگوش", "لومڑی", "ایک عقلمند بوڑھا الو", "ہاتھی"],
      correctIndex: 2,
      explanation: "A wise old owl had witnessed everything and told the truth.",
      explanationUrdu: "ایک عقلمند بوڑھے الو نے سب کچھ دیکھا تھا اور سچ بتایا۔",
    },
  ],
};

// Default questions for stories without specific quizzes
const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the most important thing we should do every day?",
    questionUrdu: "ہمیں ہر روز سب سے اہم کام کیا کرنا چاہیے؟",
    options: ["Play games", "Pray to Allah", "Watch TV", "Sleep all day"],
    optionsUrdu: ["کھیلنا", "اللہ کی عبادت کرنا", "ٹی وی دیکھنا", "سارا دن سونا"],
    correctIndex: 1,
    explanation: "Praying to Allah (Salah) is the most important daily act for Muslims.",
    explanationUrdu: "اللہ کی عبادت (نماز) مسلمانوں کا سب سے اہم روزانہ کا عمل ہے۔",
  },
  {
    id: 2,
    question: "How should we treat our friends?",
    questionUrdu: "ہمیں اپنے دوستوں کے ساتھ کیسا برتاؤ کرنا چاہیے؟",
    options: ["Ignore them", "Be mean", "With kindness and respect", "Take their things"],
    optionsUrdu: ["انہیں نظرانداز کریں", "برا سلوک کریں", "مہربانی اور احترام سے", "ان کی چیزیں لیں"],
    correctIndex: 2,
    explanation: "Islam teaches us to treat everyone with kindness, especially our friends.",
    explanationUrdu: "اسلام ہمیں سکھاتا ہے کہ سب کے ساتھ مہربانی سے پیش آئیں، خاص طور پر دوستوں کے ساتھ۔",
  },
  {
    id: 3,
    question: "What does Bismillah mean?",
    questionUrdu: "بسم اللہ کا مطلب کیا ہے؟",
    options: [
      "Goodbye",
      "In the name of Allah",
      "Thank you",
      "Hello",
    ],
    optionsUrdu: [
      "خدا حافظ",
      "اللہ کے نام سے",
      "شکریہ",
      "ہیلو",
    ],
    correctIndex: 1,
    explanation: "Bismillah means 'In the name of Allah' - we say it before starting any good deed.",
    explanationUrdu: "بسم اللہ کا مطلب ہے 'اللہ کے نام سے' - ہم کوئی بھی نیک کام شروع کرنے سے پہلے یہ کہتے ہیں۔",
  },
];

export function getQuizForStory(storyId: string): QuizQuestion[] {
  return QUIZZES[storyId] || DEFAULT_QUESTIONS;
}

export const GENERAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...DEFAULT_QUESTIONS,
  {
    id: 4,
    question: "How many times do Muslims pray each day?",
    questionUrdu: "مسلمان روزانہ کتنی بار نماز پڑھتے ہیں؟",
    options: ["3 times", "5 times", "7 times", "2 times"],
    optionsUrdu: ["3 بار", "5 بار", "7 بار", "2 بار"],
    correctIndex: 1,
    explanation: "Muslims pray 5 times a day: Fajr, Dhuhr, Asr, Maghrib, and Isha.",
    explanationUrdu: "مسلمان دن میں 5 بار نماز پڑھتے ہیں: فجر، ظہر، عصر، مغرب اور عشاء۔",
  },
  {
    id: 5,
    question: "What is the holy book of Islam?",
    questionUrdu: "اسلام کی مقدس کتاب کونسی ہے؟",
    options: ["Bible", "Torah", "Quran", "Zabur"],
    optionsUrdu: ["بائبل", "تورات", "قرآن", "زبور"],
    correctIndex: 2,
    explanation: "The Quran is the holy book of Islam, revealed to Prophet Muhammad ﷺ.",
    explanationUrdu: "قرآن اسلام کی مقدس کتاب ہے جو نبی محمد ﷺ پر نازل ہوئی۔",
  },
  {
    id: 6,
    question: "What do we say when we sneeze?",
    questionUrdu: "جب ہمیں چھینک آئے تو ہم کیا کہتے ہیں؟",
    options: ["Subhanallah", "Alhamdulillah", "Bismillah", "Allahu Akbar"],
    optionsUrdu: ["سبحان اللہ", "الحمد للہ", "بسم اللہ", "اللہ اکبر"],
    correctIndex: 1,
    explanation: "When we sneeze, we say 'Alhamdulillah' (Praise be to Allah).",
    explanationUrdu: "جب ہمیں چھینک آئے تو ہم 'الحمد للہ' کہتے ہیں (اللہ کا شکر ہے)۔",
  },
  {
    id: 7,
    question: "How many pillars of Islam are there?",
    questionUrdu: "اسلام کے کتنے ارکان ہیں؟",
    options: ["3", "4", "5", "6"],
    optionsUrdu: ["3", "4", "5", "6"],
    correctIndex: 2,
    explanation: "There are 5 pillars of Islam: Shahadah, Prayer, Zakat, Fasting, and Hajj.",
    explanationUrdu: "اسلام کے 5 ارکان ہیں: شہادت، نماز، زکوٰۃ، روزہ اور حج۔",
  },
];
