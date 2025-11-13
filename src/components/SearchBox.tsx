import { useState, type ChangeEvent } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  count: number;
}

function SearchBox({ onSearch, count }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Поиск технологий..."
        value={query}
        onChange={handleChange}
      />
      <span>
        Найдено:
        {count}
      </span>
    </div>
  );
}

export default SearchBox;
