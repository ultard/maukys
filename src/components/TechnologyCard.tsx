import type { Technology } from '../types';
import TechnologyNotes from './TechnologyNotes';
import './TechnologyCard.css';

interface TechnologyCardProps {
  tech: Technology;
  onStatusChange: (id: number) => void;
  onNotesChange: (id: number, notes: string) => void;
}

function TechnologyCard({ tech, onStatusChange, onNotesChange }: TechnologyCardProps) {
  return (
    <div
      className={`technology-card status-${tech.status}`}
      onClick={() => onStatusChange(tech.id)}
    >
      <h3>{tech.title}</h3>
      <p>{tech.description}</p>
      <span>
        Статус:
        {' '}
        {
          tech.status === 'not-started'
            ? 'Не начато'
            : tech.status === 'in-progress' ? 'В процессе' : 'Завершено'
        }
      </span>
      <TechnologyNotes
        notes={tech.notes}
        onNotesChange={onNotesChange}
        techId={tech.id}
      />
    </div>
  );
}

export default TechnologyCard;
