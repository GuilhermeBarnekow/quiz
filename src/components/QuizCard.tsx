import React from 'react';
import { Trophy, Book, Timer, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quizId: string) => void;
}

export function QuizCard({ quiz, onStart }: QuizCardProps) {
  const isQuizAvailable = quiz.questions.length > 0;

  return (
    <motion.div
      whileHover={{ scale: isQuizAvailable ? 1.02 : 1 }}
      className={`bg-white rounded-lg shadow-md overflow-hidden ${!isQuizAvailable ? 'opacity-75' : ''}`}
    >
      <img
        src={quiz.thumbnail}
        alt={quiz.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
          <span className="flex items-center gap-1 text-yellow-600">
            <Trophy size={20} />
            {quiz.tokens} tokens
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Book size={16} />
          <span>{quiz.subject}</span>
          <Timer size={16} className="ml-4" />
          <span>{quiz.questions.length * 2} min</span>
        </div>

        {isQuizAvailable ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart(quiz.id)}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            Começar Quiz
            <ArrowRight size={20} />
          </motion.button>
        ) : (
          <div className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-md flex items-center justify-center gap-2">
            <AlertCircle size={20} />
            <span className="font-medium">Quiz em breve disponível</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}