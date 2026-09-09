export type StoryCategory =
  | "islamic"
  | "historical"
  | "jungle"
  | "comedy"
  | "outdoor"
  | "moral"
  | "notu-putlu";

export type AgeGroup = "3-5" | "6-9" | "10-14" | "all";
export type Language = "urdu" | "english" | "arabic";

export interface Story {
  id: string;
  title: string;
  titleUrdu: string;
  category: StoryCategory;
  ageGroup: AgeGroup;
  duration: string; // "5 min read"
  thumbnail: string;
  description: string;
  descriptionUrdu: string;
  tags: string[];
  lesson: string;
  lessonUrdu: string;
  characters: string[];
  content: StoryScene[];
  rating: number;
  views: number;
  featured: boolean;
}

export interface StoryScene {
  id: number;
  text: string;
  textUrdu: string;
  illustration: string; // emoji or icon description
  bgColor: string;
}

export interface Character {
  id: string;
  name: string;
  nameUrdu: string;
  emoji: string;
  description: string;
  descriptionUrdu: string;
  color: string;
  category: StoryCategory;
}

export interface GeneratorFormData {
  category: StoryCategory;
  ageGroup: AgeGroup;
  characters: string[];
  theme: string;
  setting: string;
  language: Language;
  lesson: string;
}

export interface Category {
  id: StoryCategory;
  name: string;
  nameUrdu: string;
  description: string;
  descriptionUrdu: string;
  icon: string;
  gradient: string;
  bgClass: string;
  count: number;
}
