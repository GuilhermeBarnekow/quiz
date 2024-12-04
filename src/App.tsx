import React, { useState } from 'react';
import { QuizCard } from './components/QuizCard';
import { StudentDashboard } from './components/StudentDashboard';
import { QuizScreen } from './components/QuizScreen';
import type { Student, Quiz } from './types';

const mockQuestions = [
  {
    id: '1',
    text: 'Qual é o resultado de 8 × 7?',
    options: ['54', '56', '58', '60'],
    correctAnswer: 1,
    subject: 'Matemática',
    difficulty: 'easy' as const,
    explanation: 'A multiplicação de 8 × 7 = 56'
  },
  {
    id: '2',
    text: 'Qual é a raiz quadrada de 144?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    subject: 'Matemática',
    difficulty: 'medium' as const,
  },
  {
    id: '3',
    text: 'Se 3x + 5 = 20, qual é o valor de x?',
    options: ['3', '5', '7', '15'],
    correctAnswer: 1,
    subject: 'Matemática',
    difficulty: 'medium' as const,
  }
];

const literatureQuestions = [
  {
    id: '1',
    text: 'Quem escreveu "Dom Casmurro"?',
    options: ['José de Alencar', 'Machado de Assis', 'Lima Barreto', 'Clarice Lispector'],
    correctAnswer: 1,
    subject: 'Português',
    difficulty: 'medium' as const,
  },
  {
    id: '2',
    text: 'Qual movimento literário caracteriza-se pela objetividade e análise da realidade social?',
    options: ['Romantismo', 'Realismo', 'Simbolismo', 'Modernismo'],
    correctAnswer: 1,
    subject: 'Português',
    difficulty: 'medium' as const,
  }
];

const mockStudent: Student = {
  id: '1',
  name: 'João Silva',
  tokens: 150,
  completedQuizzes: [],
  subjectProgress: {
    'Matemática': 75,
    'Português': 60,
    'História': 85,
    'Geografia': 45,
  }
};

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Preparatório Matemática - Álgebra',
    subject: 'Matemática',
    questions: mockQuestions,
    tokens: 50,
    description: 'Prepare-se para a prova de matemática com este quiz de álgebra!',
    thumbnail: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Revisão de Literatura',
    subject: 'Português',
    questions: literatureQuestions,
    tokens: 40,
    description: 'Teste seus conhecimentos em literatura brasileira!',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

function App() {
  const [student, setStudent] = useState<Student>(mockStudent);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  const handleStartQuiz = (quizId: string) => {
    const quiz = mockQuizzes.find(q => q.id === quizId);
    if (quiz && quiz.questions.length > 0) {
      setActiveQuiz(quiz);
    }
  };

  const handleQuizComplete = (score: number) => {
    setStudent(prev => ({
      ...prev,
      tokens: prev.tokens + activeQuiz!.tokens,
      completedQuizzes: [...prev.completedQuizzes, activeQuiz!.id],
      subjectProgress: {
        ...prev.subjectProgress,
        [activeQuiz!.subject]: Math.min(
          100,
          (prev.subjectProgress[activeQuiz!.subject] || 0) + (score / activeQuiz!.questions.length) * 20
        )
      }
    }));
  };

  if (activeQuiz) {
    return (
      <QuizScreen
        quiz={activeQuiz}
        onComplete={handleQuizComplete}
        onExit={() => setActiveQuiz(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">EduQuiz</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Quizes Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={handleStartQuiz}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <StudentDashboard student={student} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;