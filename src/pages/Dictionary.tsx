import React, { useState, useEffect } from 'react';
import { Search, Plus, Volume2, Edit, Trash2, BookOpen } from 'lucide-react';
import { apiService } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Dictionary: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({
    word: '',
    translation: { pl: '', uk: '' },
    language: 'german',
    pronunciation: '',
    examples: { pl: [''], uk: [''] }
  });

  useEffect(() => {
    fetchEntries();
  }, [selectedLanguage, searchTerm]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDictionaryEntries({
        language: selectedLanguage,
        search: searchTerm
      });
      setEntries(response.entries);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createDictionaryEntry(newEntry);
      setShowAddModal(false);
      setNewEntry({
        word: '',
        translation: { pl: '', uk: '' },
        language: 'german',
        pronunciation: '',
        examples: { pl: [''], uk: [''] }
      });
      fetchEntries();
    } catch (err: any) {
      alert(err.message || 'Błąd podczas dodawania słowa');
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć to słowo?')) {
      try {
        await apiService.deleteDictionaryEntry(id);
        fetchEntries();
      } catch (err: any) {
        alert(err.message || 'Błąd podczas usuwania słowa');
      }
    }
  };

  const languages = [
    { value: 'all', label: 'Wszystkie języki' },
    { value: 'german', label: 'Niemiecki' },
    { value: 'spanish', label: 'Hiszpański' },
    { value: 'french', label: 'Francuski' },
    { value: 'italian', label: 'Włoski' },
    { value: 'english', label: 'Angielski' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mój słownik</h1>
          <p className="text-gray-600">
            Twoje osobiste słownictwo z wszystkich kursów językowych
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Szukaj słów..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                />
              </div>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Dodaj słowo</span>
            </button>
          </div>
        </div>

        {/* Dictionary Grid */}
        {entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {entry.word}
                    </h3>
                    <p className="text-gray-600">
                      {entry.translation[language]}
                    </p>
                    {entry.pronunciation && (
                      <p className="text-sm text-gray-500 mt-1">
                        {entry.pronunciation}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Examples */}
                {entry.examples[language] && entry.examples[language].length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Przykłady:</h4>
                    <ul className="space-y-1">
                      {entry.examples[language].map((example, index) => (
                        <li key={index} className="text-sm text-gray-600 italic">
                          "{example}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Language Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {entry.language === 'german' ? 'Niemiecki' :
                     entry.language === 'spanish' ? 'Hiszpański' :
                     entry.language === 'french' ? 'Francuski' :
                     entry.language === 'italian' ? 'Włoski' :
                     'Angielski'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Brak słów w słowniku
            </h2>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 
                'Nie znaleziono słów pasujących do wyszukiwania.' :
                'Twój słownik jest pusty. Dodaj pierwsze słowa podczas nauki.'
              }
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Dodaj pierwsze słowo
            </button>
          </div>
        )}

        {/* Add Word Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dodaj nowe słowo</h3>
              
              <form onSubmit={handleAddEntry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Słowo w języku obcym
                  </label>
                  <input
                    type="text"
                    required
                    value={newEntry.word}
                    onChange={(e) => setNewEntry({...newEntry, word: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="np. Hallo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tłumaczenie
                  </label>
                  <input
                    type="text"
                    required
                    value={newEntry.translation.pl}
                    onChange={(e) => setNewEntry({
                      ...newEntry, 
                      translation: {...newEntry.translation, pl: e.target.value}
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="np. Cześć"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Język
                  </label>
                  <select 
                    value={newEntry.language}
                    onChange={(e) => setNewEntry({...newEntry, language: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="german">Niemiecki</option>
                    <option value="spanish">Hiszpański</option>
                    <option value="french">Francuski</option>
                    <option value="italian">Włoski</option>
                    <option value="english">Angielski</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wymowa (opcjonalne)
                  </label>
                  <input
                    type="text"
                    value={newEntry.pronunciation}
                    onChange={(e) => setNewEntry({...newEntry, pronunciation: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="np. /haˈlo/"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Przykład użycia (opcjonalne)
                  </label>
                  <input
                    type="text"
                    value={newEntry.examples.pl[0] || ''}
                    onChange={(e) => setNewEntry({
                      ...newEntry, 
                      examples: {
                        ...newEntry.examples, 
                        pl: [e.target.value]
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="np. Hallo, wie geht es dir?"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Dodaj słowo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Anuluj
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};