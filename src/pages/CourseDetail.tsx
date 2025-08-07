import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Lock, CheckCircle, Book, User, Clock, ArrowLeft } from 'lucide-react';
import { mockCourses, mockLessons } from '../data/mockData';
import { useLanguage } from '../hooks/useLanguage';


export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  // Usunięto `user`, bo nie był używany
  // const { user } = useAuth();

  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const course = mockCourses.find(c => c.id === id);
  const lessons = mockLessons.filter(l => l.courseId === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kurs nie został znaleziony</h1>
          <Link to="/courses" className="text-blue-600 hover:underline">
            Wróć do listy kursów
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Wróć do panelu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title[language]}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {course.description[language]}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{course.teacherName}</span>
                </div>
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  <span>{course.lessonsCount} lekcji</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.duration} tygodni</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-xl p-6 sticky top-6">
                <img
                  src={course.image}
                  alt={course.title[language]}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {course.price} zł
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Poziom: {course.level}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Postęp: 45% ukończone
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Spis lekcji</h2>
              
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      activeLesson === lesson.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {index < 2 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : index === 2 ? (
                          <Play className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {lesson.title[language]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {lesson.duration} min
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              {activeLesson ? (
                <div className="p-6">
                  {(() => {
                    const lesson = lessons.find(l => l.id === activeLesson);
                    if (!lesson) return null;
                    
                    return (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {lesson.title[language]}
                        </h2>
                        
                        {/* Video Player Placeholder */}
                        <div className="bg-gray-900 rounded-lg mb-6 h-64 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Play className="h-16 w-16 mx-auto mb-4" />
                            <p className="text-lg">Odtwarzacz wideo</p>
                            <p className="text-sm opacity-75">Długość: {lesson.duration} minut</p>
                          </div>
                        </div>
                        
                        {/* Lesson Content */}
                        <div className="prose max-w-none">
                          <p className="text-lg leading-relaxed text-gray-700">
                            {lesson.content[language]}
                          </p>
                          
                          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-3">
                              Kluczowe słownictwo
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="font-medium">Hallo</span> - Cześć
                              </div>
                              <div>
                                <span className="font-medium">Guten Tag</span> - Dzień dobry
                              </div>
                              <div>
                                <span className="font-medium">Wie geht es Ihnen?</span> - Jak się Pan/Pani ma?
                              </div>
                              <div>
                                <span className="font-medium">Danke</span> - Dziękuję
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lesson Actions */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Poprzednia lekcja
                          </button>
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Zakończ i przejdź dalej
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Wybierz lekcję
                  </h2>
                  <p className="text-gray-600">
                    Kliknij na lekcję po lewej stronie, aby rozpocząć naukę
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
