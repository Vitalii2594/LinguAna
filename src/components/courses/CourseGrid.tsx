import React, { useState } from 'react';
import { useEffect } from 'react';
import { CourseCard } from './CourseCard';
import { useLanguage } from '../../hooks/useLanguage';
import { apiService } from '../../services/api';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Filter } from 'lucide-react';

interface CourseGridProps {
  courses?: any[];
  onEnroll?: (courseId: string) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses: propCourses, onEnroll }) => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<any[]>(propCourses || []);
  const [loading, setLoading] = useState(!propCourses);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    if (!propCourses) {
      fetchCourses();
    }
  }, [propCourses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCourses();
      setCourses(response.courses);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

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