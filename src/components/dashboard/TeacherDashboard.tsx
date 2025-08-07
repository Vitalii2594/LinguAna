import React, { useState } from 'react';
import { Book, Users, FileText, Plus, Calendar, BarChart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { mockCourses, mockUsers } from '../../data/mockData';

export const TeacherDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for teacher
  const teacherCourses = mockCourses;
  const totalStudents = 45;
  const totalLessons = 128;

  const tabs = [
    { id: 'overview', name: 'Przegląd', icon: BarChart },
    { id: 'courses', name: 'Moje kursy', icon: Book },
    { id: 'students', name: 'Uczniowie', icon: Users },
    { id: 'materials', name: 'Materiały', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.teacher.title')}
          </h1>
          <p className="text-gray-600">
            Zarządzaj swoimi kursami i materiałami
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktywne kursy</p>
                <p className="text-2xl font-bold text-gray-900">{teacherCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Uczniowie</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lekcje</p>
                <p className="text-2xl font-bold text-gray-900">{totalLessons}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jutrzejsze lekcje</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Przegląd aktywności</h2>
                
                {/* Recent Activity */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Nowy uczeń zapisał się na kurs</h3>
                        <p className="text-sm text-gray-600">Niemiecki dla początkujących - 2 godziny temu</p>
                      </div>
                      <div className="text-sm text-gray-500">2h</div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Ukończono ćwiczenie</h3>
                        <p className="text-sm text-gray-600">Anna Kowalska - Hiszpański średniozaawansowany</p>
                      </div>
                      <div className="text-sm text-gray-500">5h</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{t('dashboard.teacher.myCourses')}</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Dodaj kurs</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {teacherCourses.map(course => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {course.title.pl}
                          </h3>
                          <p className="text-sm text-gray-600">{course.level} • {course.lessonsCount} lekcji</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Aktywny
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>Zapisanych: 12 uczniów</span>
                        <span>Średni postęp: 67%</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Zarządzaj
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Statystyki
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">{t('dashboard.teacher.students')}</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uczeń
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kurs
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Postęp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ostatnia aktywność
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">AK</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Anna Kowalska</div>
                              <div className="text-sm text-gray-500">anna@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Niemiecki A1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">75%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2 godziny temu
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{t('dashboard.teacher.materials')}</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>{t('dashboard.teacher.addMaterial')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Podstawy gramatyki</h3>
                        <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Materiał wprowadzający do podstaw gramatyki niemieckiej
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 text-sm hover:underline">Edytuj</button>
                      <button className="text-red-600 text-sm hover:underline">Usuń</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Ćwiczenia słownikowe</h3>
                        <p className="text-sm text-gray-600">DOCX • 1.8 MB</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Zestaw ćwiczeń do nauki nowego słownictwa
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 text-sm hover:underline">Edytuj</button>
                      <button className="text-red-600 text-sm hover:underline">Usuń</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};