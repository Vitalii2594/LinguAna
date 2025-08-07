import React from 'react';
import { BookOpen, Users, Award, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const team = [
    {
      name: 'Anna Kowalska',
      role: 'Dyrektor Akademicki',
      image: 'https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Doświadczona językoznawczyni z 15-letnim stażem w nauczaniu języków obcych.'
    },
    {
      name: 'Marek Nowak',
      role: 'Nauczyciel Niemieckiego',
      image: 'https://images.pexels.com/photos/3777568/pexels-photo-3777568.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Certyfikowany nauczyciel języka niemieckiego, autor materiałów dydaktycznych.'
    },
    {
      name: 'Maria Garcia',
      role: 'Nauczycielka Hiszpańskiego',
      image: 'https://images.pexels.com/photos/3765035/pexels-photo-3765035.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Rodzima użytkowniczka języka hiszpańskiego z Hiszpanii, specjalistka od konwersacji.'
    },
    {
      name: 'Pierre Dubois',
      role: 'Nauczyciel Francuskiego',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Francuski lektor z doświadczeniem w nauczaniu biznesowego francuskiego.'
    }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Jakość nauczania',
      description: 'Stosujemy najnowsze metody dydaktyczne i stale doskonalimy nasze programy nauczania.'
    },
    {
      icon: Users,
      title: 'Indywidualne podejście',
      description: 'Każdy uczeń jest dla nas ważny. Dostosowujemy tempo i metody do indywidualnych potrzeb.'
    },
    {
      icon: Award,
      title: 'Doświadczenie',
      description: 'Ponad 10 lat doświadczenia w nauczaniu języków obcych i setki zadowolonych absolwentów.'
    },
    {
      icon: Globe,
      title: 'Różnorodność kulturowa',
      description: 'Nasi nauczyciele pochodzą z różnych krajów, co gwarantuje autentyczność nauczania.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('nav.about')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Poznaj naszą historię, misję i zespół ekspertów, którzy pomogą Ci opanować nowe języki
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nasza misja</h2>
              <p className="text-lg text-gray-600 mb-6">
                LinguaSchool powstała z pasji do języków i przekonania, że każdy może nauczyć się nowego języka, 
                niezależnie od wieku czy wcześniejszego doświadczenia. Naszą misją jest tworzenie przyjaznego 
                i efektywnego środowiska nauki, które inspiruje i motywuje do osiągania celów językowych.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Wierzymy, że znajomość języków obcych otwiera nowe możliwości osobiste i zawodowe, 
                dlatego nasi doświadczeni nauczyciele wykorzystują najnowsze metody dydaktyczne 
                i nowoczesne technologie, aby nauka była skuteczna i przyjemna.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Absolwentów</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600">Nauczycieli</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team meeting"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasze wartości</h2>
            <p className="text-xl text-gray-600">
              Kierujemy się zasadami, które określają nasze podejście do nauczania
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasz zespół</h2>
            <p className="text-xl text-gray-600">
              Poznaj naszych doświadczonych nauczycieli i ekspertów językowych
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Dołącz do naszej społeczności
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rozpocznij swoją przygodę z nauką języków już dziś
          </p>
          <a
            href="/courses"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-xl hover:bg-gray-100 transition-colors"
          >
            Zobacz nasze kursy
          </a>
        </div>
      </section>
    </div>
  );
};