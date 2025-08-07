import React, { useState } from 'react';
import { CourseCard } from './CourseCard';
import { Course } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { Filter } from 'lucide-react';

interface CourseGridProps {
  courses: Course[];
  onEnroll?: (courseId: string) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses, onEnroll }) => {
  const { t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const languages = ['all', 'german', 'spanish', 'french', 'italian', 'english'];
  const levels = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const filteredCourses = courses.filter(course => {
    const languageMatch = selectedLanguage === 'all' || course.language === selectedLanguage;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    return languageMatch && levelMatch;
  });

  const languageNames: Record<string, string> = {
    all: t('common.all'),
    german: 'Niemiecki',
    spanish: 'Hiszpański',
    french: 'Francuski',
    italian: 'Włoski',
    english: 'Angielski'
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">{t('common.filter')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Język
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {languageNames[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('courses.level')}
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? t('common.all') : level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600">
        Znaleziono {filteredCourses.length} kursów
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={onEnroll}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Brak kursów spełniających kryteria</div>
          <p className="text-gray-500">Spróbuj zmienić filtry wyszukiwania</p>
        </div>
      )}
    </div>
  );
};