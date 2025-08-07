import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { TeacherDashboard } from '../components/dashboard/TeacherDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};