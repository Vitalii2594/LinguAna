/*
  # Initial Schema for LinguaSchool Platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password` (text)
      - `firstName` (text)
      - `lastName` (text)
      - `role` (enum: student, teacher, admin)
      - `avatar` (text, optional)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (jsonb - multilingual)
      - `description` (jsonb - multilingual)
      - `language` (text)
      - `level` (enum: A1, A2, B1, B2, C1, C2)
      - `price` (numeric)
      - `duration` (integer - weeks)
      - `lessonsCount` (integer)
      - `teacherId` (uuid, foreign key)
      - `image` (text)
      - `isPopular` (boolean)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `lessons`
      - `id` (uuid, primary key)
      - `courseId` (uuid, foreign key)
      - `title` (jsonb - multilingual)
      - `content` (jsonb - multilingual)
      - `videoUrl` (text, optional)
      - `order` (integer)
      - `duration` (integer - minutes)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `userId` (uuid, foreign key)
      - `courseId` (uuid, foreign key)
      - `progress` (integer, default 0)
      - `enrolledAt` (timestamp)
      - `completedAt` (timestamp, optional)
    
    - `lesson_completions`
      - `id` (uuid, primary key)
      - `userId` (uuid, foreign key)
      - `lessonId` (uuid, foreign key)
      - `completedAt` (timestamp)
    
    - `exercises`
      - `id` (uuid, primary key)
      - `lessonId` (uuid, foreign key)
      - `type` (enum: multiple-choice, fill-blank, matching, listening)
      - `question` (jsonb - multilingual)
      - `options` (jsonb - multilingual, optional)
      - `correctAnswer` (text)
      - `explanation` (jsonb - multilingual, optional)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `dictionary_entries`
      - `id` (uuid, primary key)
      - `word` (text)
      - `translation` (jsonb - multilingual)
      - `pronunciation` (text, optional)
      - `audioUrl` (text, optional)
      - `examples` (jsonb - multilingual)
      - `language` (text)
      - `userId` (uuid, foreign key)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `payments`
      - `id` (uuid, primary key)
      - `userId` (uuid, foreign key)
      - `courseId` (uuid, foreign key)
      - `amount` (numeric)
      - `status` (enum: pending, completed, failed)
      - `paymentMethod` (text)
      - `transactionId` (text, optional)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for role-based access
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE course_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');
CREATE TYPE exercise_type AS ENUM ('multiple-choice', 'fill-blank', 'matching', 'listening');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  firstName text NOT NULL,
  lastName text NOT NULL,
  role user_role DEFAULT 'student',
  avatar text,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title jsonb NOT NULL,
  description jsonb NOT NULL,
  language text NOT NULL,
  level course_level NOT NULL,
  price numeric NOT NULL,
  duration integer NOT NULL,
  lessonsCount integer NOT NULL,
  teacherId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image text NOT NULL,
  isPopular boolean DEFAULT false,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  courseId uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title jsonb NOT NULL,
  content jsonb NOT NULL,
  videoUrl text,
  "order" integer NOT NULL,
  duration integer NOT NULL,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  courseId uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  enrolledAt timestamptz DEFAULT now(),
  completedAt timestamptz,
  UNIQUE(userId, courseId)
);

-- Lesson completions table
CREATE TABLE IF NOT EXISTS lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lessonId uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completedAt timestamptz DEFAULT now(),
  UNIQUE(userId, lessonId)
);

-- Exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lessonId uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  type exercise_type NOT NULL,
  question jsonb NOT NULL,
  options jsonb,
  correctAnswer text NOT NULL,
  explanation jsonb,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Dictionary entries table
CREATE TABLE IF NOT EXISTS dictionary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  translation jsonb NOT NULL,
  pronunciation text,
  audioUrl text,
  examples jsonb DEFAULT '{}',
  language text NOT NULL,
  userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  courseId uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status payment_status DEFAULT 'pending',
  paymentMethod text NOT NULL,
  transactionId text,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE dictionary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = id::text);

-- RLS Policies for courses table
CREATE POLICY "Anyone can read courses" ON courses
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "Teachers can create courses" ON courses
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Teachers can update own courses" ON courses
  FOR UPDATE TO authenticated
  USING (
    teacherId::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can delete own courses" ON courses
  FOR DELETE TO authenticated
  USING (
    teacherId::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- RLS Policies for lessons table
CREATE POLICY "Enrolled users can read lessons" ON lessons
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE userId::text = auth.uid()::text 
      AND courseId = lessons.courseId
    ) OR
    EXISTS (
      SELECT 1 FROM courses 
      WHERE id = lessons.courseId 
      AND teacherId::text = auth.uid()::text
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can manage lessons" ON lessons
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE id = lessons.courseId 
      AND teacherId::text = auth.uid()::text
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- RLS Policies for enrollments table
CREATE POLICY "Users can read own enrollments" ON enrollments
  FOR SELECT TO authenticated
  USING (userId::text = auth.uid()::text);

CREATE POLICY "Users can create own enrollments" ON enrollments
  FOR INSERT TO authenticated
  WITH CHECK (userId::text = auth.uid()::text);

CREATE POLICY "Users can update own enrollments" ON enrollments
  FOR UPDATE TO authenticated
  USING (userId::text = auth.uid()::text);

-- RLS Policies for lesson_completions table
CREATE POLICY "Users can manage own completions" ON lesson_completions
  FOR ALL TO authenticated
  USING (userId::text = auth.uid()::text)
  WITH CHECK (userId::text = auth.uid()::text);

-- RLS Policies for exercises table
CREATE POLICY "Enrolled users can read exercises" ON exercises
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN enrollments e ON l.courseId = e.courseId
      WHERE l.id = exercises.lessonId 
      AND e.userId::text = auth.uid()::text
    ) OR
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN courses c ON l.courseId = c.id
      WHERE l.id = exercises.lessonId 
      AND c.teacherId::text = auth.uid()::text
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can manage exercises" ON exercises
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN courses c ON l.courseId = c.id
      WHERE l.id = exercises.lessonId 
      AND c.teacherId::text = auth.uid()::text
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- RLS Policies for dictionary_entries table
CREATE POLICY "Users can manage own dictionary entries" ON dictionary_entries
  FOR ALL TO authenticated
  USING (userId::text = auth.uid()::text)
  WITH CHECK (userId::text = auth.uid()::text);

-- RLS Policies for payments table
CREATE POLICY "Users can read own payments" ON payments
  FOR SELECT TO authenticated
  USING (userId::text = auth.uid()::text);

CREATE POLICY "Users can create own payments" ON payments
  FOR INSERT TO authenticated
  WITH CHECK (userId::text = auth.uid()::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_teacher ON courses(teacherId);
CREATE INDEX IF NOT EXISTS idx_courses_language ON courses(language);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_popular ON courses(isPopular);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(courseId);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons("order");
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(userId);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(courseId);
CREATE INDEX IF NOT EXISTS idx_dictionary_user ON dictionary_entries(userId);
CREATE INDEX IF NOT EXISTS idx_dictionary_language ON dictionary_entries(language);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(userId);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);