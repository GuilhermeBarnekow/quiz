export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  tokens: number;
  description: string;
  thumbnail: string;
}

export interface Student {
  id: string;
  name: string;
  tokens: number;
  completedQuizzes: string[];
  subjectProgress: Record<string, number>;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  tokenCost: number;
  image: string;
}

export interface QuizProgress {
  currentQuestion: number;
  score: number;
  answers: number[];
  completed: boolean;
}