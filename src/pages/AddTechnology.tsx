import { useState } from 'react';
import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import useTechnologies from '@/hooks/useTechnologies';
import type { Status } from '@/types';
import './AddTechnology.css';

function AddTechnology() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started' as Status,
    category: 'frontend' as 'frontend' | 'backend' | 'other'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Введите название технологии');
      return;
    }

    setIsLoading(true);

    addTechnology({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      category: formData.category
    });

    setSuccess(true);
    setTimeout(() => navigate('/technologies'), 1200);
  };

  return (
    <div className="add-technology-page">
      <Link to="/technologies" className="back-link">← К списку</Link>

      <div className="form-container">
        <h1>{success ? 'Технология добавлена!' : 'Новая технология'}</h1>

        {success
          ? (
              <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#10b981' }}>
                Перенаправляем...
              </p>
            )
          : (
              <form onSubmit={handleSubmit} className="technology-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label>Название *</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Например: GraphQL"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Описание</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Краткое описание (необязательно)"
                  />
                </div>

                <div className="form-group">
                  <label>Категория</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Начальный статус</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="not-started">Не начато</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Завершено</option>
                  </select>
                </div>

                <div className="form-actions">
                  <Link to="/technologies" className="cancel-btn">Отмена</Link>
                  <button className="submit-btn" type="submit" disabled={isLoading || !formData.title.trim()}>
                    {isLoading ? 'Добавляем...' : 'Добавить технологию'}
                  </button>
                </div>
              </form>
            )}
      </div>
    </div>
  );
}

export default AddTechnology;
