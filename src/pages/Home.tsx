import React from 'react';
import { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { CourseGrid } from '../components/courses/CourseGrid'; // importujemy CourseGrid
import { apiService } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, BookOpen, Globe } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  
  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const fetchPopularCourses = async () => {
    try {
      const response = await apiService.getCourses({ popular: true });
      setPopularCourses(response.courses.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch popular courses:', error);
      // Set empty array on error to prevent UI issues
      setPopularCourses([]);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Profesjonalni nauczyciele',
      description: 'Nasi doświadczeni nauczyciele poprowadzą Cię przez całą naukę'
    },
    {
      icon: Users,
      title: 'Interaktywne lekcje',
      description: 'Uczesticz w żywych sesjach online z innymi uczniami'
    },
    {
      icon: Globe,
      title: '5 języków dostępnych',
      description: 'Niemiecki, hiszpański, francuski, włoski i angielski'
    },
    {
      icon: Star,
      title: 'Certyfikaty ukończenia',
      description: 'Otrzymaj oficjalny certyfikat po ukończeniu kursu'
    }
  ];

  const stats = [
    { number: '500+', label: 'Zadowolonych uczniów' },
    { number: '15+', label: 'Doświadczonych nauczycieli' },
    { number: '25+', label: 'Dostępnych kursów' },
    { number: '98%', label: 'Wskaźnik zadowolenia' }
  ];

  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dlaczego warto wybrać LinguaSchool?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferujemy nowoczesne metody nauki, doświadczonych nauczycieli i elastyczne godziny dostosowane do Twojego trybu życia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Najpopularniejsze kursy
            </h2>
            <p className="text-xl text-gray-600">
              Rozpocznij naukę z naszymi najchętniej wybieranymi kursami
            </p>
          </div>

          {/* Tutaj używamy CourseGrid i przekazujemy popularCourses */}
          <CourseGrid courses={popularCourses} />

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Gotowy na rozpoczęcie nauki?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Dołącz do tysięcy zadowolonych uczniów i zacznij swoją przygodę z nowymi językami już dziś
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Zarejestruj się za darmo
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-medium rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              Przeglądaj kursy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
