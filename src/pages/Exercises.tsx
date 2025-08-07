import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Play, Award } from 'lucide-react';
import { mockExercises } from '../data/mockData';
import { useLanguage } from '../hooks/useLanguage';

export const Exercises: React.FC = () => {
  const { language } = useLanguage();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);

  const exercise = mockExercises[currentExercise];
  const isCorrect = selectedAnswer === exercise?.correctAnswer;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setShowResult(true);
    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = true;
    setCompletedExercises(newCompleted);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < mockExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setCompletedExercises([]);
  };

  const isLastExercise = currentExercise === mockExercises.length - 1;
  const allCompleted = completedExercises.length === mockExercises.length && 
                      completedExercises.every(Boolean);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brak dostępnych ćwiczeń</h1>
          <p className="text-gray-600">Sprawdź ponownie później lub skontaktuj się z nauczycielem.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ćwiczenia interaktywne</h1>
          <p className="text-gray-600">Sprawdź swoją wiedzę i naucz się nowych słów</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Ćwiczenie {currentExercise + 1} z {mockExercises.length}
            </h2>
            <div className="text-sm text-gray-600">
              Wynik: {score}/{completedExercises.length}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExercise + 1) / mockExercises.length) * 100}%` }}
            />
          </div>
        </div>

        {allCompleted ? (
          /* Results Summary */
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Gratulacje! Ukończyłeś wszystkie ćwiczenia
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Twój wynik: {score} z {mockExercises.length} ({Math.round((score / mockExercises.length) * 100)}%)
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-green-700">Poprawne odpowiedzi</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{mockExercises.length - score}</div>
                <div className="text-sm text-red-700">Błędne odpowiedzi</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((score / mockExercises.length) * 100)}%
                </div>
                <div className="text-sm text-blue-700">Wynik końcowy</div>
              </div>
            </div>
            
            <button
              onClick={handleRestart}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Rozpocznij ponownie</span>
            </button>
          </div>
        ) : (
          /* Exercise Card */
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {exercise.question[language]}
              </h2>
              
              {exercise.type === 'multiple-choice' && exercise.options && (
                <div className="space-y-3">
                  {exercise.options[language].map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                        selectedAnswer === option
                          ? showResult
                            ? isCorrect
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                            : 'border-blue-500 bg-blue-50'
                          : showResult && option === exercise.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-gray-300 hover:border-gray-400'
                      } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showResult && selectedAnswer === option && (
                          isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )
                        )}
                        {showResult && option === exercise.correctAnswer && selectedAnswer !== option && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Result and Explanation */}
            {showResult && (
              <div className={`p-6 rounded-lg mb-6 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-semibold mb-2 ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? 'Correct Answer!' : 'Niepoprawna odpowiedź'}
                    </h3>
                    {exercise.explanation && (
                      <p className={`text-sm ${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {exercise.explanation[language]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleRestart}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rozpocznij od nowa</span>
              </button>
              
              <div className="flex space-x-3">
                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <span>Sprawdź odpowiedź</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>{isLastExercise ? 'Zakończ' : 'Następne ćwiczenie'}</span>
                    {!isLastExercise && <Play className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};