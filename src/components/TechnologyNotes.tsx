import './TechnologyNotes.css';

interface TechnologyNotesProps {
  notes: string;
  onNotesChange: (techId: number, value: string) => void;
  techId: number;
}

function TechnologyNotes({ notes, onNotesChange, techId }: TechnologyNotesProps) {
  return (
    <div className="technology-notes">
      <label>Мои заметки:</label>
      <textarea
        value={notes}
        onChange={e => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows={3}
      />
      <div className="notes-hint">
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
      </div>
    </div>
  );
}

export default TechnologyNotes;
