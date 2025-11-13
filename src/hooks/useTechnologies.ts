import { useState } from 'react';
import type { Technology, Status } from '../types';

const initialTechnologies: Technology[] = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'Node.js Basics', description: 'Основы серверного JavaScript', status: 'not-started', notes: '', category: 'backend' },
  { id: 3, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '', category: 'frontend' },
  { id: 4, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 5, title: 'REST API', description: 'Работа с RESTful сервисами', status: 'not-started', notes: '', category: 'backend' }
];

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
    catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage<Technology[]>('techTrackerData', initialTechnologies);

  function updateStatus(techId: number, newStatus: Status) {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  }

  function updateNotes(techId: number, newNotes: string) {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  }

  function markAllCompleted() {
    setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'completed' as const })));
  }

  function resetAll() {
    setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'not-started' as const })));
  }

  function exportData() {
    const data = { exportedAt: new Date().toISOString(), technologies };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    exportData
  };
}
