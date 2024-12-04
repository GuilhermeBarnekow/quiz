import React from 'react';
import { Coins, Award } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import type { Student } from '../types';

interface StudentDashboardProps {
  student: Student;
}

export function StudentDashboard({ student }: StudentDashboardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Olá, {student.name}!
        </h2>
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
          <Coins className="text-yellow-600" />
          <span className="font-semibold text-yellow-600">{student.tokens} tokens</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Seu Progresso</h3>
        <div className="space-y-4">
          {Object.entries(student.subjectProgress).map(([subject, progress]) => (
            <ProgressBar key={subject} subject={subject} progress={progress} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Award className="text-indigo-600" />
          Conquistas Recentes
        </h3>
        {/* Lista de conquistas será implementada aqui */}
      </div>
    </div>
  );
}