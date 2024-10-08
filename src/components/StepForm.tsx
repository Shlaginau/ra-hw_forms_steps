import { useState, useEffect } from 'react';
interface StepFormProps {
  onAddStep: (date: string, distance: number) => void;
  editDate: string | null;
  editDistance: number | null;
}

const StepForm: React.FC<StepFormProps> = ({ onAddStep, editDate, editDistance }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    if (editDate) {
      const [yearPart, monthPart, dayPart] = editDate.split('-');
      setDay(dayPart);
      setMonth(monthPart);
      setYear(yearPart);
    }
    if (editDistance !== null) {
      setDistance(editDistance.toString());
    }
  }, [editDate, editDistance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const parsedDistance = parseFloat(distance);

    if (!day || !month || !year || isNaN(parsedDistance)) return;

    onAddStep(date, parsedDistance);

    setDay('');
    setMonth('');
    setYear('');
    setDistance('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label>Дата (ДД.ММ.ГГГГ)</label>
        <div className="date-inputs">
          <input
            type="number"
            className="input-date"
            placeholder="ДД"
            value={day}
            onChange={e => setDay(e.target.value)}
            min="1"
            max="31"
            required
          />
          <input
            type="number"
            className="input-date"
            placeholder="ММ"
            value={month}
            onChange={e => setMonth(e.target.value)}
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            className="input-date"
            placeholder="ГГГГ"
            value={year}
            onChange={e => setYear(e.target.value)}
            min="1900"
            max="2100"
            required
          />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="distance">Пройдено км</label>
        <input
          type="number"
          id="distance"
          className="input-distance"
          value={distance}
          placeholder="Пройдено км"
          onChange={e => setDistance(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">OK</button>
    </form>
  );
};

export default StepForm;
