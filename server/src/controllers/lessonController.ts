import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/database';

export const getLessons = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('courseId', courseId)
      .order('order', { ascending: true });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch lessons' });
    }

    res.json({ lessons });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: lesson, error } = await supabase
      .from('lessons')
      .select(`
        *,
        course:courses(*),
        exercises(*)
      `)
      .eq('id', id)
      .single();

    if (error || !lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { courseId } = req.params;
    const { title, content, order, duration, videoUrl } = req.body;

    // Check if user owns the course or is admin
    const { data: course } = await supabase
      .from('courses')
      .select('teacherId')
      .eq('id', courseId)
      .single();

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.teacherId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to create lessons for this course' });
    }

    const lessonId = uuidv4();
    const { data: lesson, error } = await supabase
      .from('lessons')
      .insert({
        id: lessonId,
        courseId,
        title,
        content,
        order,
        duration,
        videoUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      console.error('Create lesson error:', error);
      return res.status(500).json({ error: 'Failed to create lesson' });
    }

    res.status(201).json({
      message: 'Lesson created successfully',
      lesson
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const updates = req.body;

    // Check if user owns the course or is admin
    const { data: lesson } = await supabase
      .from('lessons')
      .select(`
        *,
        course:courses(teacherId)
      `)
      .eq('id', id)
      .single();

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    if (lesson.course.teacherId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this lesson' });
    }

    const { data: updatedLesson, error } = await supabase
      .from('lessons')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update lesson' });
    }

    res.json({
      message: 'Lesson updated successfully',
      lesson: updatedLesson
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    // Check if user owns the course or is admin
    const { data: lesson } = await supabase
      .from('lessons')
      .select(`
        *,
        course:courses(teacherId)
      `)
      .eq('id', id)
      .single();

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    if (lesson.course.teacherId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this lesson' });
    }

    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete lesson' });
    }

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const markLessonComplete = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { lessonId } = req.params;

    // Check if user is enrolled in the course
    const { data: lesson } = await supabase
      .from('lessons')
      .select('courseId')
      .eq('id', lessonId)
      .single();

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('userId', user.id)
      .eq('courseId', lesson.courseId)
      .single();

    if (!enrollment) {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }

    // Create or update lesson completion
    const { data: completion, error } = await supabase
      .from('lesson_completions')
      .upsert({
        userId: user.id,
        lessonId,
        completedAt: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to mark lesson as complete' });
    }

    // Update enrollment progress
    const { data: totalLessons } = await supabase
      .from('lessons')
      .select('id')
      .eq('courseId', lesson.courseId);

    const { data: completedLessons } = await supabase
      .from('lesson_completions')
      .select('lessonId')
      .eq('userId', user.id)
      .in('lessonId', totalLessons?.map(l => l.id) || []);

    const progress = Math.round((completedLessons?.length || 0) / (totalLessons?.length || 1) * 100);

    await supabase
      .from('enrollments')
      .update({ progress })
      .eq('id', enrollment.id);

    res.json({
      message: 'Lesson marked as complete',
      completion,
      progress
    });
  } catch (error) {
    console.error('Mark lesson complete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};