import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/database';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { language, level, popular } = req.query;
    
    let query = supabase
      .from('courses')
      .select(`
        *,
        teacher:users!courses_teacherId_fkey(firstName, lastName)
      `);

    if (language) {
      query = query.eq('language', language);
    }
    
    if (level) {
      query = query.eq('level', level);
    }
    
    if (popular === 'true') {
      query = query.eq('isPopular', true);
    }

    const { data: courses, error } = await query.order('createdAt', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }

    // Format the response to include teacher name
    const formattedCourses = courses.map(course => ({
      ...course,
      teacherName: `${course.teacher.firstName} ${course.teacher.lastName}`
    }));

    res.json({ courses: formattedCourses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        teacher:users!courses_teacherId_fkey(firstName, lastName),
        lessons(*)
      `)
      .eq('id', id)
      .single();

    if (error || !course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const formattedCourse = {
      ...course,
      teacherName: `${course.teacher.firstName} ${course.teacher.lastName}`,
      lessons: course.lessons.sort((a: any, b: any) => a.order - b.order)
    };

    res.json({ course: formattedCourse });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { title, description, language, level, price, duration, lessonsCount, image } = req.body;

    if (user.role !== 'teacher' && user.role !== 'admin') {
      return res.status(403).json({ error: 'Only teachers and admins can create courses' });
    }

    const courseId = uuidv4();
    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        id: courseId,
        title,
        description,
        language,
        level,
        price,
        duration,
        lessonsCount,
        teacherId: user.id,
        image: image || 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=800',
        isPopular: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      console.error('Create course error:', error);
      return res.status(500).json({ error: 'Failed to create course' });
    }

    res.status(201).json({
      message: 'Course created successfully',
      course: {
        ...course,
        teacherName: `${user.firstName} ${user.lastName}`
      }
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const updates = req.body;

    // Check if user owns the course or is admin
    const { data: course } = await supabase
      .from('courses')
      .select('teacherId')
      .eq('id', id)
      .single();

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.teacherId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this course' });
    }

    const { data: updatedCourse, error } = await supabase
      .from('courses')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update course' });
    }

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    // Check if user owns the course or is admin
    const { data: course } = await supabase
      .from('courses')
      .select('teacherId')
      .eq('id', id)
      .single();

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.teacherId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this course' });
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete course' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { courseId } = req.params;

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('userId', user.id)
      .eq('courseId', courseId)
      .single();

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollmentId = uuidv4();
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        id: enrollmentId,
        userId: user.id,
        courseId,
        progress: 0,
        enrolledAt: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to enroll in course' });
    }

    res.status(201).json({
      message: 'Successfully enrolled in course',
      enrollment
    });
  } catch (error) {
    console.error('Enroll in course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyEnrollments = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('userId', user.id)
      .order('enrolledAt', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch enrollments' });
    }

    res.json({ enrollments });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};