/*
  # Seed Data for LinguaSchool Platform

  1. Sample Users
    - Admin user
    - Teacher users
    - Student users

  2. Sample Courses
    - German courses
    - Spanish courses
    - French courses
    - Italian courses
    - English courses

  3. Sample Lessons
    - Basic lessons for each course

  4. Sample Dictionary Entries
    - Common words and phrases
*/

-- Insert sample users
INSERT INTO users (id, email, password, firstName, lastName, role, createdAt, updatedAt) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@linguaschool.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJBzwESWy', 'Admin', 'User', 'admin', now(), now()),
  ('550e8400-e29b-41d4-a716-446655440002', 'teacher@linguaschool.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJBzwESWy', 'Marek', 'Nowak', 'teacher', now(), now()),
  ('550e8400-e29b-41d4-a716-446655440003', 'maria.garcia@linguaschool.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJBzwESWy', 'Maria', 'Garcia', 'teacher', now(), now()),
  ('550e8400-e29b-41d4-a716-446655440004', 'pierre.dubois@linguaschool.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJBzwESWy', 'Pierre', 'Dubois', 'teacher', now(), now()),
  ('550e8400-e29b-41d4-a716-446655440005', 'student@linguaschool.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJBzwESWy', 'Anna', 'Kowalska', 'student', now(), now());

-- Insert sample courses
INSERT INTO courses (id, title, description, language, level, price, duration, lessonsCount, teacherId, image, isPopular, createdAt, updatedAt) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 
   '{"pl": "Niemiecki dla początkujących", "uk": "Німецька для початківців"}',
   '{"pl": "Kompleksowy kurs niemieckiego od podstaw. Naucz się podstawowych zwrotów, gramatyki i słownictwa.", "uk": "Комплексний курс німецької з нуля. Вивчіть основні фрази, граматику та словник."}',
   'german', 'A1', 299, 12, 24, '550e8400-e29b-41d4-a716-446655440002',
   'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=800',
   true, now(), now()),
  
  ('650e8400-e29b-41d4-a716-446655440002',
   '{"pl": "Hiszpański średniozaawansowany", "uk": "Іспанська середній рівень"}',
   '{"pl": "Kurs dla osób znających podstawy hiszpańskiego. Rozwijaj umiejętności konwersacyjne.", "uk": "Курс для тих, хто знає основи іспанської. Розвивайте розмовні навички."}',
   'spanish', 'B1', 399, 16, 32, '550e8400-e29b-41d4-a716-446655440003',
   'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
   false, now(), now()),
  
  ('650e8400-e29b-41d4-a716-446655440003',
   '{"pl": "Francuski dla biznesu", "uk": "Французька для бізнесу"}',
   '{"pl": "Kurs francuskiego ukierunkowany na środowisko biznesowe i zawodowe.", "uk": "Курс французької, орієнтований на ділове та професійне середовище."}',
   'french', 'B2', 499, 20, 40, '550e8400-e29b-41d4-a716-446655440004',
   'https://images.pexels.com/photos/4350189/pexels-photo-4350189.jpeg?auto=compress&cs=tinysrgb&w=800',
   false, now(), now()),
  
  ('650e8400-e29b-41d4-a716-446655440004',
   '{"pl": "Włoski dla podróżników", "uk": "Італійська для мандрівників"}',
   '{"pl": "Praktyczny kurs włoskiego przygotowujący do podróży po Włoszech.", "uk": "Практичний курс італійської для підготовки до подорожей Італією."}',
   'italian', 'A2', 349, 14, 28, '550e8400-e29b-41d4-a716-446655440002',
   'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
   true, now(), now()),
  
  ('650e8400-e29b-41d4-a716-446655440005',
   '{"pl": "Angielski zaawansowany", "uk": "Англійська просунутий рівень"}',
   '{"pl": "Kurs dla zaawansowanych użytkowników języka angielskiego.", "uk": "Курс для просунутих користувачів англійської мови."}',
   'english', 'C1', 599, 24, 48, '550e8400-e29b-41d4-a716-446655440003',
   'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800',
   false, now(), now());

-- Insert sample lessons
INSERT INTO lessons (id, courseId, title, content, "order", duration, createdAt, updatedAt) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001',
   '{"pl": "Podstawowe powitania", "uk": "Основні привітання"}',
   '{"pl": "W tej lekcji nauczysz się podstawowych zwrotów powitania w języku niemieckim.", "uk": "У цьому уроці ви вивчите основні привітання німецькою мовою."}',
   1, 30, now(), now()),
  
  ('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001',
   '{"pl": "Przedstawianie się", "uk": "Знайомство"}',
   '{"pl": "Jak się przedstawić po niemiecku? Poznaj najważniejsze zwroty.", "uk": "Як познайомитися німецькою? Вивчіть найважливіші фрази."}',
   2, 35, now(), now()),
  
  ('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002',
   '{"pl": "Rozmowa w restauracji", "uk": "Розмова в ресторані"}',
   '{"pl": "Naucz się zamawiać jedzenie i prowadzić rozmowy w restauracji po hiszpańsku.", "uk": "Навчіться замовляти їжу та вести розмови в ресторані іспанською."}',
   1, 40, now(), now());

-- Insert sample exercises
INSERT INTO exercises (id, lessonId, type, question, options, correctAnswer, explanation, createdAt, updatedAt) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001',
   'multiple-choice',
   '{"pl": "Jak powiedzieć \"dzień dobry\" po niemiecku?", "uk": "Як сказати \"добрий день\" німецькою?"}',
   '{"pl": ["Guten Tag", "Auf Wiedersehen", "Danke", "Bitte"], "uk": ["Guten Tag", "Auf Wiedersehen", "Danke", "Bitte"]}',
   'Guten Tag',
   '{"pl": "Guten Tag oznacza \"dzień dobry\" w języku niemieckim.", "uk": "Guten Tag означає \"добрий день\" німецькою мовою."}',
   now(), now());

-- Insert sample enrollments
INSERT INTO enrollments (id, userId, courseId, progress, enrolledAt) VALUES
  ('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440001', 45, now());

-- Insert sample dictionary entries
INSERT INTO dictionary_entries (id, word, translation, pronunciation, examples, language, userId, createdAt, updatedAt) VALUES
  ('a50e8400-e29b-41d4-a716-446655440001', 'Hallo',
   '{"pl": "Cześć", "uk": "Привіт"}',
   '/haˈlo/',
   '{"pl": ["Hallo, wie geht es dir?"], "uk": ["Hallo, wie geht es dir?"]}',
   'german', '550e8400-e29b-41d4-a716-446655440005', now(), now()),
  
  ('a50e8400-e29b-41d4-a716-446655440002', 'Danke',
   '{"pl": "Dziękuję", "uk": "Дякую"}',
   '/ˈdaŋkə/',
   '{"pl": ["Danke schön!", "Vielen Dank!"], "uk": ["Danke schön!", "Vielen Dank!"]}',
   'german', '550e8400-e29b-41d4-a716-446655440005', now(), now());