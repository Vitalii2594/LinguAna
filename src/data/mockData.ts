import { Course, Lesson, Exercise, DictionaryEntry, User, Enrollment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    firstName: 'Anna',
    lastName: 'Kowalska',
    role: 'student',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'teacher@example.com',
    firstName: 'Marek',
    lastName: 'Nowak',
    role: 'teacher',
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '3',
    email: 'admin@example.com',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    role: 'admin',
    createdAt: '2024-01-01T12:00:00Z'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: { 
      pl: 'Niemiecki dla początkujących', 
      uk: 'Німецька для початківців' 
    },
    description: { 
      pl: 'Kompleksowy kurs niemieckiego od podstaw. Naucz się podstawowych zwrotów, gramatyki i słownictwa.',
      uk: 'Комплексний курс німецької з нуля. Вивчіть основні фрази, граматику та словник.'
    },
    language: 'german',
    level: 'A1',
    price: 299,
    duration: 12,
    lessonsCount: 24,
    teacherId: '2',
    teacherName: 'Marek Nowak',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPopular: true,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: { 
      pl: 'Hiszpański średniozaawansowany', 
      uk: 'Іспанська середній рівень' 
    },
    description: { 
      pl: 'Kurs dla osób znających podstawy hiszpańskiego. Rozwijaj umiejętności konwersacyjne.',
      uk: 'Курс для тих, хто знає основи іспанської. Розвивайте розмовні навички.'
    },
    language: 'spanish',
    level: 'B1',
    price: 399,
    duration: 16,
    lessonsCount: 32,
    teacherId: '2',
    teacherName: 'Marek Nowak',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    title: { 
      pl: 'Francuski dla biznesu', 
      uk: 'Французька для бізнесу' 
    },
    description: { 
      pl: 'Kurs francuskiego ukierunkowany na środowisko biznesowe i zawodowe.',
      uk: 'Курс французької, орієнтований на ділове та професійне середовище.'
    },
    language: 'french',
    level: 'B2',
    price: 499,
    duration: 20,
    lessonsCount: 40,
    teacherId: '2',
    teacherName: 'Marek Nowak',
    image: 'https://images.pexels.com/photos/4350189/pexels-photo-4350189.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '4',
    title: { 
      pl: 'Włoski dla podróżników', 
      uk: 'Італійська для мандрівників' 
    },
    description: { 
      pl: 'Praktyczny kurs włoskiego przygotowujący do podróży po Włoszech.',
      uk: 'Практичний курс італійської для підготовки до подорожей Італією.'
    },
    language: 'italian',
    level: 'A2',
    price: 349,
    duration: 14,
    lessonsCount: 28,
    teacherId: '2',
    teacherName: 'Marek Nowak',
    image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
    isPopular: true,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '5',
    title: { 
      pl: 'Angielski zaawansowany', 
      uk: 'Англійська просунутий рівень' 
    },
    description: { 
      pl: 'Kurs dla zaawansowanych użytkowników języka angielskiego.',
      uk: 'Курс для просунутих користувачів англійської мови.'
    },
    language: 'english',
    level: 'C1',
    price: 599,
    duration: 24,
    lessonsCount: 48,
    teacherId: '2',
    teacherName: 'Marek Nowak',
    image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-15T10:30:00Z'
  }
];

export const mockLessons: Lesson[] = [
  {
    id: '1',
    courseId: '1',
    title: { 
      pl: 'Podstawowe powitania', 
      uk: 'Основні привітання' 
    },
    content: { 
      pl: 'W tej lekcji nauczysz się podstawowych zwrotów powitania w języku niemieckim.',
      uk: 'У цьому уроці ви вивчите основні привітання німецькою мовою.'
    },
    videoUrl: 'https://example.com/video1.mp4',
    order: 1,
    duration: 30
  },
  {
    id: '2',
    courseId: '1',
    title: { 
      pl: 'Przedstawianie się', 
      uk: 'Знайомство' 
    },
    content: { 
      pl: 'Jak się przedstawić po niemiecku? Poznaj najważniejsze zwroty.',
      uk: 'Як познайомитися німецькою? Вивчіть найважливіші фрази.'
    },
    order: 2,
    duration: 35
  }
];

export const mockExercises: Exercise[] = [
  {
    id: '1',
    lessonId: '1',
    type: 'multiple-choice',
    question: { 
      pl: 'Jak powiedzieć "dzień dobry" po niemiecku?',
      uk: 'Як сказати "добрий день" німецькою?'
    },
    options: { 
      pl: ['Guten Tag', 'Auf Wiedersehen', 'Danke', 'Bitte'],
      uk: ['Guten Tag', 'Auf Wiedersehen', 'Danke', 'Bitte']
    },
    correctAnswer: 'Guten Tag',
    explanation: { 
      pl: 'Guten Tag oznacza "dzień dobry" w języku niemieckim.',
      uk: 'Guten Tag означає "добрий день" німецькою мовою.'
    }
  }
];

export const mockDictionary: DictionaryEntry[] = [
  {
    id: '1',
    word: 'Hallo',
    translation: { 
      pl: 'Cześć',
      uk: 'Привіт'
    },
    pronunciation: '/haˈlo/',
    audioUrl: 'https://example.com/audio/hallo.mp3',
    examples: { 
      pl: ['Hallo, wie geht es dir?'],
      uk: ['Hallo, wie geht es dir?']
    },
    language: 'german',
    userId: '1'
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    progress: 45,
    enrolledAt: '2024-01-20T10:00:00Z'
  }
];