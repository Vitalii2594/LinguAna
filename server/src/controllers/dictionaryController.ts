import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/database';

export const getDictionaryEntries = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { language, search } = req.query;

    let query = supabase
      .from('dictionary_entries')
      .select('*')
      .eq('userId', user.id);

    if (language && language !== 'all') {
      query = query.eq('language', language);
    }

    if (search) {
      query = query.or(`word.ilike.%${search}%,translation->pl.ilike.%${search}%,translation->uk.ilike.%${search}%`);
    }

    const { data: entries, error } = await query.order('createdAt', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch dictionary entries' });
    }

    res.json({ entries });
  } catch (error) {
    console.error('Get dictionary entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDictionaryEntry = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { word, translation, pronunciation, examples, language, audioUrl } = req.body;

    const entryId = uuidv4();
    const { data: entry, error } = await supabase
      .from('dictionary_entries')
      .insert({
        id: entryId,
        word,
        translation,
        pronunciation,
        examples: examples || {},
        language,
        audioUrl,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      console.error('Create dictionary entry error:', error);
      return res.status(500).json({ error: 'Failed to create dictionary entry' });
    }

    res.status(201).json({
      message: 'Dictionary entry created successfully',
      entry
    });
  } catch (error) {
    console.error('Create dictionary entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateDictionaryEntry = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const updates = req.body;

    // Check if user owns the entry
    const { data: entry } = await supabase
      .from('dictionary_entries')
      .select('userId')
      .eq('id', id)
      .single();

    if (!entry) {
      return res.status(404).json({ error: 'Dictionary entry not found' });
    }

    if (entry.userId !== user.id) {
      return res.status(403).json({ error: 'Not authorized to update this entry' });
    }

    const { data: updatedEntry, error } = await supabase
      .from('dictionary_entries')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update dictionary entry' });
    }

    res.json({
      message: 'Dictionary entry updated successfully',
      entry: updatedEntry
    });
  } catch (error) {
    console.error('Update dictionary entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDictionaryEntry = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    // Check if user owns the entry
    const { data: entry } = await supabase
      .from('dictionary_entries')
      .select('userId')
      .eq('id', id)
      .single();

    if (!entry) {
      return res.status(404).json({ error: 'Dictionary entry not found' });
    }

    if (entry.userId !== user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this entry' });
    }

    const { error } = await supabase
      .from('dictionary_entries')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete dictionary entry' });
    }

    res.json({ message: 'Dictionary entry deleted successfully' });
  } catch (error) {
    console.error('Delete dictionary entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};