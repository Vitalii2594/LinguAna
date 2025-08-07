import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Dziękujemy za wiadomość! Odpowiemy w ciągu 24 godzin.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      info: '+48 123 456 789',
      description: 'Poniedziałek - Piątek: 9:00 - 18:00'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@linguaschool.pl',
      description: 'Odpowiadamy w ciągu 24h'
    },
    {
      icon: MapPin,
      title: 'Adres',
      info: 'ul. Językowa 123, 00-001 Warszawa',
      description: 'Odwiedź nas osobiście'
    },
    {
      icon: Clock,
      title: 'Godziny otwarcia',
      info: 'Pon-Pt: 9:00-18:00',
      description: 'Sob: 10:00-14:00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('nav.contact')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Masz pytania? Skontaktuj się z nami! Jesteśmy tutaj, aby pomóc Ci rozpocząć przygodę z nauką języków.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Informacje kontaktowe</h2>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-900 font-medium">{item.info}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Często zadawane pytania</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Jak mogę rozpocząć naukę?</h4>
                  <p className="text-sm text-gray-600">Zarejestruj się na naszej platformie, wybierz kurs i dokonaj płatności. Natychmiast otrzymasz dostęp do materiałów.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Czy oferujecie lekcje indywidualne?</h4>
                  <p className="text-sm text-gray-600">Tak, oferujemy zarówno kursy grupowe jak i indywidualne lekcje dostosowane do Twoich potrzeb.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Czy mogę anulować subskrypcję?</h4>
                  <p className="text-sm text-gray-600">Tak, możesz anulować subskrypcję w dowolnym momencie. Zachowasz dostęp do końca opłaconego okresu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Wyślij nam wiadomość</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Wprowadź swoje imię i nazwisko"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adres email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="wprowadz@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Temat *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Wybierz temat</option>
                    <option value="general">Ogólne pytanie</option>
                    <option value="courses">Pytania o kursy</option>
                    <option value="technical">Problemy techniczne</option>
                    <option value="billing">Płatności i rozliczenia</option>
                    <option value="partnership">Współpraca</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Opisz szczegółowo swoje pytanie lub problem..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <Send className="h-5 w-5" />
                  <span>Wyślij wiadomość</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Nasza lokalizacja</h2>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p>Mapa Google zostanie tutaj wstawiona</p>
                <p className="text-sm">ul. Językowa 123, 00-001 Warszawa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};