import React, { useState } from 'react';
import { CourseGrid } from '../components/courses/CourseGrid';
import { apiService } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { PaymentModal } from '../components/payments/PaymentModal';

export const Courses: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleEnroll = (courseId: string) => {
    if (!user) {
      // Redirect to login handled by CourseCard component
      return;
    }
    
    // For now, directly enroll the user
    enrollInCourse(courseId);
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      await apiService.enrollInCourse(courseId);
      alert('Pomyślnie zapisano na kurs! Sprawdź swój panel ucznia.');
    } catch (error: any) {
      alert(error.message || 'Błąd podczas zapisywania na kurs');
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedCourseId(null);
    // Show success message or redirect
    alert('Pomyślnie zapisano na kurs! Sprawdź swój panel ucznia.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Course Grid */}
        <CourseGrid onEnroll={handleEnroll} />

        {/* Payment Modal */}
        {showPaymentModal && selectedCourseId && (
          <PaymentModal
            courseId={selectedCourseId}
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
      </div>
    </div>
  );
};