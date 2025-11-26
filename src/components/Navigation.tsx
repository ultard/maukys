import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <ul>
        <li><NavLink to="/" className={isActive('/') ? 'active' : ''}>Главная</NavLink></li>
        <li><NavLink to="/technologies" className={isActive('/technologies') ? 'active' : ''}>Все технологии</NavLink></li>
        <li><NavLink to="/add" className={isActive('/add') ? 'active' : ''}>Добавить технологию</NavLink></li>
        <li><NavLink to="/statistics" className={isActive('/statistics') ? 'active' : ''}>Статистика</NavLink></li>
        <li><NavLink to="/settings" className={isActive('/settings') ? 'active' : ''}>Настройки</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
