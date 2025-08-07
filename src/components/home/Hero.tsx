import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const languages = [
    { name: t('hero.languageNames.german'), flag: '🇩🇪', color: 'border-red-500' },
    { name: t('hero.languageNames.spanish'), flag: '🇪🇸', color: 'border-yellow-500' },
    { name: t('hero.languageNames.french'), flag: '🇫🇷', color: 'border-blue-500' },
    { name: t('hero.languageNames.italian'), flag: '🇮🇹', color: 'border-green-500' },
    { name: t('hero.languageNames.english'), flag: '🇬🇧', color: 'border-red-600' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('hero.cta')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-medium rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                {t('nav.about')}
              </Link>
            </div>

            {/* Language badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-center lg:justify-start">
                <Globe className="h-5 w-5 mr-2" />
                {t('hero.languages')}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:scale-105 transform border-2 ${lang.color}`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium text-gray-700">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t('hero.imageAlt')}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{t('hero.liveClasses')}</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">{t('hero.happyStudents')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
