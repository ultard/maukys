import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import type { Status } from '@/types';
import './TechnologyList.css';

const statusLabels: Record<Status, string> = {
  'not-started': 'Не начато',
  'in-progress': 'В процессе',
  'completed': 'Завершено'
};

const statusColors: Record<Status, string> = {
  'not-started': '#ef4444',
  'in-progress': '#f59e0b',
  'completed': '#10b981'
};

function TechnologyList() {
  const { technologies } = useTechnologies();

  const sortedTechnologies = [...technologies].sort((a, b) => {
    const order: Record<Status, number> = {
      'in-progress': 0,
      'not-started': 1,
      'completed': 2
    };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <Link to="/" className="back-link">← На главную</Link>
        <h1>Все технологии</h1>
        <Link to="/add" className="add-button">
          + Добавить
        </Link>
      </div>

      {technologies.length === 0
        ? (
            <div className="empty-state">
              <p>Технологий пока нет</p>
              <Link to="/add" className="primary-button">
                Добавить первую технологию
              </Link>
            </div>
          )
        : (
            <div className="technologies-grid">
              {sortedTechnologies.map(tech => (
                <Link
                  key={tech.id}
                  to={`/technologies/${tech.id}`}
                  className="technology-card-link"
                >
                  <article className="technology-card">
                    <div className="card-header">
                      <h3 className="tech-title">{tech.title}</h3>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: statusColors[tech.status] }}
                      >
                        {statusLabels[tech.status]}
                      </span>
                    </div>

                    <p className="tech-description">{tech.description}</p>

                    {tech.notes && (
                      <div className="tech-notes">
                        <strong>Заметки:</strong>
                        {' '}
                        {tech.notes}
                      </div>
                    )}

                    <div className="card-footer">
                      <span className="tech-id">
                        ID:
                        {tech.id}
                      </span>
                      {tech.category && (
                        <span className="tech-category">{tech.category}</span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
    </div>
  );
}

export default TechnologyList;
