import type { Technology } from '../types';
import './ProgressHeader.css';

interface ProgressHeaderProps {
  technologies: Technology[];
}

function ProgressHeader({ technologies }: ProgressHeaderProps) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;

  return (
    <div className="progress-header">
      <h2>Прогресс изучения</h2>
      <p>
        Всего технологий:
        <strong>{total}</strong>
      </p>
      <p>
        Изучено:
        <strong>{completed}</strong>
      </p>
      <p>
        Не начато:
        <strong>{notStarted}</strong>
      </p>
      <p>
        В процессе:
        <strong>{inProgress}</strong>
      </p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p>
        <strong>
          {percentage}
          %
        </strong>
        {' '}
        завершено
      </p>
    </div>
  );
}

export default ProgressHeader;
