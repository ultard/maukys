// src/pages/TechnologyDetail.tsx
import { useParams, Link } from 'react-router-dom';
import useTechnologies from '@/hooks/useTechnologies';
import type { Status } from '@/types';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateStatus, updateNotes } = useTechnologies();

  const technology = technologies.find(t => t.id === Number(techId));

  const handleStatusChange = (newStatus: Status) => {
    updateStatus(Number(techId), newStatus);
  };

  if (!technology) {
    return (
      <div className="detail-page">
        <Link to="/technologies" className="back-link">← Назад к списку</Link>
        <h2>Технология не найдена</h2>
        <p>Возможно, она была удалена или ID указан неверно.</p>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/technologies" className="back-link">
        ← Назад к списку
      </Link>

      <h1>{technology.title}</h1>

      {/* Категория — красиво */}
      {technology.category && (
        <span className="category-badge">
          {technology.category === 'frontend'
            ? 'Frontend'
            : technology.category === 'backend' ? 'Backend' : 'Другое'}
        </span>
      )}

      {/* Описание */}
      {technology.description
        ? (
            <div className="tech-description">{technology.description}</div>
          )
        : (
            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
              Описание отсутствует
            </p>
          )}

      {/* Статус */}
      <div className="status-section">
        <h2>Статус изучения</h2>
        <div className="status-buttons">
          {(['not-started', 'in-progress', 'completed'] as const).map(st => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`status-btn ${st} ${technology.status === st ? 'active' : ''}`}
            >
              {st === 'not-started'
                ? 'Не начато'
                : st === 'in-progress' ? 'В процессе' : 'Завершено'}
            </button>
          ))}
        </div>
      </div>

      {/* Заметки */}
      <div className="notes-section">
        <h2>Мои заметки</h2>
        <textarea
          className="notes-textarea"
          placeholder="Добавьте свои мысли, ссылки, идеи..."
          value={technology.notes || ''}
          onChange={e => updateNotes(technology.id, e.target.value)}
        />
      </div>
    </div>
  );
}

export default TechnologyDetail;
