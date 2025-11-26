import { useState, useEffect, useCallback } from 'react';
import type { Technology, Status } from '@/types';

interface ApiTechnology {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  notes?: string;
  category: 'frontend' | 'backend' | 'other';
}

export default function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://66f49e7e5b9aec9b755fea91.mockapi.io/api/v1/technologies';

  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) throw new Error(`Ошибка ${response.status}`);

      const data: ApiTechnology[] = await response.json();
      const adapted: Technology[] = data.map(item => ({
        id: Number(item.id),
        title: item.title,
        description: item.description || '',
        status: (item.status as Status) || 'not-started',
        notes: item.notes || '',
        category: item.category
      }));

      setTechnologies(adapted);
    }
    catch (err: any) {
      setError(err.message || 'Не удалось загрузить технологии');
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }, []);

  const addTechnology = async (tech: Omit<Technology, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tech)
      });

      if (!response.ok) throw new Error('Не удалось добавить');

      const newTech = await response.json();
      setTechnologies(prev => [...prev, { ...newTech, id: Number(newTech.id) }]);
      return newTech;
    }
    catch (err: any) {
      throw new Error(err.message || 'Ошибка добавления');
    }
  };

  const updateStatus = async (id: number, status: Status) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setTechnologies(prev =>
        prev.map(t => t.id === id ? { ...t, status } : t)
      );
    }
    catch {
      console.error('Ошибка обновления статуса');
    }
  };

  const updateNotes = async (id: number, notes: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      setTechnologies(prev =>
        prev.map(t => t.id === id ? { ...t, notes } : t)
      );
    }
    catch {
      console.error('Ошибка обновления заметок');
    }
  };

  const resetAll = async () => {
    if (!confirm('Сбросить весь прогресс?')) return;
    try {
      for (const tech of technologies) {
        await fetch(`${API_URL}/${tech.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'not-started', notes: '' })
        });
      }
      await fetchTechnologies();
    }
    catch {
      alert('Ошибка сброса');
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    updateStatus,
    updateNotes,
    resetAll
  };
}
