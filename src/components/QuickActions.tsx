import { useState } from 'react';
import './QuickActions.css';

interface QuickActionsProps {
  onMarkAllCompleted: () => void;
  onResetAll: () => void;
  onExport: () => void;
}

function QuickActions({ onMarkAllCompleted, onResetAll, onExport }: QuickActionsProps) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    onExport();
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <button onClick={onMarkAllCompleted}>Отметить все как выполненные</button>
      <button onClick={onResetAll}>Сбросить все статусы</button>
      <button onClick={handleExport}>Экспорт данных</button>

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h4>Экспорт данных</h4>
            <p>Данные успешно экспортированы!</p>
            <p><small>Файл скачан в папку загрузок.</small></p>
            <button onClick={() => setShowExportModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;
