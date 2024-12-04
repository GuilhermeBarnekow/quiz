import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, Trophy, AlertCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import type { Quiz, QuizProgress } from '../types';

interface QuizScreenProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export function QuizScreen({ quiz, onComplete, onExit }: QuizScreenProps) {
  // Validate quiz has questions
  if (!quiz.questions.length) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Quiz Indisponível</h2>
          <p className="text-gray-600 mb-6">
            Este quiz ainda não possui questões disponíveis. Por favor, tente outro quiz.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExit}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Voltar para Quizes
          </motion.button>
        </div>
      </div>
    );
  }

  const [progress, setProgress] = useState<QuizProgress>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    completed: false,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = quiz.questions[progress.currentQuestion];

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newProgress = {
      ...progress,
      score: isCorrect ? progress.score + 1 : progress.score,
      answers: [...progress.answers, selectedOption ?? -1],
    };

    if (progress.currentQuestion === quiz.questions.length - 1) {
      setProgress({ ...newProgress, completed: true });
      setShowConfetti(true);
      onComplete(newProgress.score);
    } else {
      setProgress({
        ...newProgress,
        currentQuestion: progress.currentQuestion + 1,
      });
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    setShowFeedback(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        {!progress.completed ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {quiz.title}
                </h2>
                <span className="text-gray-600">
                  Questão {progress.currentQuestion + 1} de {quiz.questions.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-indigo-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((progress.currentQuestion + 1) / quiz.questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-6">{currentQuestion.text}</h3>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedOption === index
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    } ${
                      showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-500'
                          : selectedOption === index
                          ? 'bg-red-50 border-red-500'
                          : ''
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && index === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="text-green-500" />
                      )}
                      {showFeedback && selectedOption === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="text-red-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-end gap-4">
              {!showFeedback ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkAnswer}
                  disabled={selectedOption === null}
                  className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                    selectedOption === null
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Verificar Resposta
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  {progress.currentQuestion === quiz.questions.length - 1 ? 'Finalizar' : 'Próxima'}
                  <ChevronRight size={20} />
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Quiz Completado!</h2>
            <p className="text-xl mb-6">
              Você acertou {progress.score} de {quiz.questions.length} questões!
            </p>
            <p className="text-lg text-indigo-600 mb-8">
              + {quiz.tokens} tokens ganhos!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Voltar para Quizes
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}