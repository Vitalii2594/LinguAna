export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  price: number;
  duration: number; // weeks
  lessonsCount: number;
  teacherId: string;
  teacherName: string;
  image: string;
  isPopular?: boolean;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
  completedAt?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: Record<string, string>;
  content: Record<string, string>;
  videoUrl?: string;
  order: number;
  duration: number; // minutes
  isCompleted?: boolean;
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'listening';
  question: Record<string, string>;
  options?: Record<string, string[]>;
  correctAnswer: string | string[];
  explanation?: Record<string, string>;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  translation: Record<string, string>;
  pronunciation?: string;
  audioUrl?: string;
  examples: Record<string, string[]>;
  language: string;
  userId: string;
}

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export type Language = 'pl' | 'uk';

export interface NavItem {
  key: string;
  href: string;
  icon?: string;
}