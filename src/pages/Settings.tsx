// src/pages/Settings.tsx
import { Link } from 'react-router-dom';
import useTechnologies from '@/hooks/useTechnologies';
import './Settings.css';

function Settings() {
  const { resetAll, exportData } = useTechnologies();

  const handleExport = () => {
    exportData();
    alert('Данные успешно экспортированы в файл и скопированы в буфер обмена!');
  };

  const handleReset = () => {
    if (window.confirm('Вы уверены? Все технологии будут удалены навсегда!')) {
      resetAll();
      alert('Все технологии удалены.');
    }
  };

  return (
    <div className="settings-page">
      <Link to="/" className="back-link">
        ← На главную
      </Link>

      <h1>Настройки приложения</h1>

      <div className="settings-container">
        {/* Удаление всех данных */}
        <div className="settings-item">
          <h3>Очистить все данные</h3>
          <p>
            Это действие удалит все технологии, заметки и прогресс. Восстановить будет невозможно.
          </p>
          <button onClick={handleReset} className="danger-btn">
            Удалить все технологии
          </button>
        </div>

        {/* Экспорт данных */}
        <div className="settings-item">
          <h3>Экспорт данных</h3>
          <p>
            Скачайте резервную копию всех ваших технологий в формате JSON.
          </p>
          <button onClick={handleExport} className="export-btn">
            Экспорт в JSON
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
