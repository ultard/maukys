import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '@/hooks/useTechnologies';
import ProgressHeader from '@/components/ProgressHeader';
import QuickActions from '@/components/QuickActions';
import TechnologyCard from '@/components/TechnologyCard';
import SearchBox from '@/components/SearchBox';
import type { Technology, Status } from '@/types';

import './Home.css';

function Home() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    exportData
  } = useTechnologies();

  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState<Technology[]>([]);

  useEffect(() => {
    let list = [...technologies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        tech =>
          tech.title.toLowerCase().includes(q)
          || tech.description?.toLowerCase().includes(q)
      );
    }

    if (filter !== 'all') {
      list = list.filter(tech => tech.status === filter);
    }

    setFilteredList(list);
  }, [technologies, searchQuery, filter]);

  const handleStatusChange = (id: number) => {
    const tech = technologies.find(t => t.id === id);
    if (!tech) return;

    const nextStatus: Record<Status, Status> = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };

    updateStatus(id, nextStatus[tech.status]);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Трекер изучения технологий</h1>
        <Link to="/add" className="add-button">
          + Добавить технологию
        </Link>
      </header>

      <ProgressHeader technologies={technologies} />

      <SearchBox onSearch={setSearchQuery} count={filteredList.length} />

      {/* Кнопки фильтров */}
      <div className="filter-buttons">
        {(['all', 'not-started', 'in-progress', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? 'active' : ''}
          >
            {f === 'all' && 'Все'}
            {f === 'not-started' && 'Не начато'}
            {f === 'in-progress' && 'В процессе'}
            {f === 'completed' && 'Выполнено'}
          </button>
        ))}
      </div>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onExport={exportData}
      />

      <div className="technologies-list">
        {filteredList.length === 0
          ? (
              <p className="empty-message">
                {searchQuery || filter !== 'all'
                  ? 'Ничего не найдено по вашему запросу.'
                  : 'Технологий пока нет. Самое время добавить первую!'}
                {' '}
                <Link to="/add">Добавить технологию</Link>
              </p>
            )
          : (
              filteredList.map(tech => (
                <TechnologyCard
                  key={tech.id}
                  tech={tech}
                  onStatusChange={handleStatusChange}
                  onNotesChange={updateNotes}
                />
              ))
            )}
      </div>
    </div>
  );
}

export default Home;
