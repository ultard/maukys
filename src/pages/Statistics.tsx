import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import useTechnologies from '@/hooks/useTechnologies';
import './Statistics.css';

function Statistics() {
  const { technologies } = useTechnologies();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const counts = useMemo(() => ({
    'Не начато': technologies.filter(t => t.status === 'not-started').length,
    'В процессе': technologies.filter(t => t.status === 'in-progress').length,
    'Завершено': technologies.filter(t => t.status === 'completed').length
  }), [technologies]);

  const total = technologies.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Не начато', 'В процессе', 'Завершено'],
        datasets: [{
          data: [counts['Не начато'], counts['В процессе'], counts['Завершено']],
          backgroundColor: ['#ff6b6b', '#f1c40f', '#51cf66'],
          borderColor: '#fff',
          borderWidth: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' as const },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed as number;
                const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${context.label}: ${value} (${percent}%)`;
              }
            }
          }
        }
      }
    });

    // Очистка при размонтировании
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [counts, technologies, total]);

  return (
    <div className="statistics-page">
      <Link to="/" className="back-link">← На главную</Link>

      <h1>Статистика прогресса</h1>

      <div className="chart-container">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="stats-summary">
        <h2>
          Всего технологий:
          {total}
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '8px 0' }}>
            <span style={{ color: '#ff6b6b' }}>●</span>
            {' '}
            Не начато:
            <strong>{counts['Не начато']}</strong>
          </li>
          <li style={{ margin: '8px 0' }}>
            <span style={{ color: '#f1c40f' }}>●</span>
            {' '}
            В процессе:
            <strong>{counts['В процессе']}</strong>
          </li>
          <li style={{ margin: '8px 0' }}>
            <span style={{ color: '#51cf66' }}>●</span>
            {' '}
            Завершено:
            <strong>{counts['Завершено']}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
