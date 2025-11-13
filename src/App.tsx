import { useState, useEffect } from 'react';
import useTechnologies from './hooks/useTechnologies';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import TechnologyCard from './components/TechnologyCard';
import SearchBox from './components/SearchBox';
import type { Technology, Status } from './types';
import './App.css';

function App() {
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
    let list = technologies;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(tech =>
        tech.title.toLowerCase().includes(q)
        || tech.description.toLowerCase().includes(q)
      );
    }

    if (filter !== 'all') {
      list = list.filter(tech => tech.status === filter);
    }

    setFilteredList(list);
  }, [technologies, searchQuery, filter]);

  function handleStatusChange(id: number) {
    const tech = technologies.find(t => t.id === id);
    if (!tech) return;

    const nextStatus = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    } as const;

    updateStatus(id, nextStatus[tech.status]);
  }

  return (
    <div className="App">
      <h1>Трекер изучения технологий</h1>

      <ProgressHeader technologies={technologies} />

      <SearchBox
        onSearch={setSearchQuery}
        count={filteredList.length}
      />

      <div className="filter-buttons">
        {(['all', 'not-started', 'in-progress', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? 'active' : ''}
          >
            {f === 'all'
              ? 'Все'
              : f === 'not-started'
                ? 'Не начато'
                : f === 'in-progress' ? 'В процессе' : 'Выполнено'}
          </button>
        ))}
      </div>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onExport={exportData}
      />

      <div className="technologies-list">
        {filteredList.map(tech => (
          <TechnologyCard
            key={tech.id}
            tech={tech}
            onStatusChange={handleStatusChange}
            onNotesChange={updateNotes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
