import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, User, Star, ShoppingCart } from 'lucide-react';
import { Course } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  const levelColors = {
    A1: 'bg-green-100 text-green-800',
    A2: 'bg-green-100 text-green-800',
    B1: 'bg-yellow-100 text-yellow-800',
    B2: 'bg-yellow-100 text-yellow-800',
    C1: 'bg-red-100 text-red-800',
    C2: 'bg-red-100 text-red-800',
  };

  const languageIcons = {
    german: '🇩🇪',
    spanish: '🇪🇸',
    french: '🇫🇷',
    italian: '🇮🇹',
    english: '🇬🇧',
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title[language]}
          className="w-full h-48 object-cover"
        />
        {course.isPopular && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {t('courses.popular')}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-2xl">
            {languageIcons[course.language as keyof typeof languageIcons]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Level Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[course.level]}`}>
            {t('courses.level')} {course.level}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title[language]}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description[language]}
        </p>

        {/* Teacher */}
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span>{t('courses.teacher')}: {course.teacherName}</span>
        </div>

        {/* Course Details */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration} {t('courses.duration')}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.lessonsCount} {t('courses.lessons')}</span>
            </div>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {t('courses.price')} {course.price} {t('courses.currency')}
          </div>
          
          {user ? (
            <button
              onClick={handleEnroll}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t('courses.buy')}</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-medium"
            >
              <span>{t('courses.enroll')}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};