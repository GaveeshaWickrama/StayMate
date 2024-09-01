import React, { useState, useEffect } from 'react';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CustomCalendar = ({ propertyId, sectionId, onDateSelect, startDate, endDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  useEffect(() => {
    fetchReservedDates();
  }, [currentDate, propertyId, sectionId]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const nextMonth = month + 1 === 12 ? 0 : month + 1;
    const nextMonthYear = month + 1 === 12 ? year + 1 : year;

    const nextMonthFirstDay = new Date(nextMonthYear, nextMonth, 1).getDay();
    const nextMonthLastDate = new Date(nextMonthYear, nextMonth + 1, 0).getDate();

    const currentMonthDays = [];
    const nextMonthDaysArr = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentMonthDays.push(null); // Empty slots for days of the previous month
    }
    for (let date = 1; date <= lastDateOfMonth; date++) {
      currentMonthDays.push(new Date(year, month, date));
    }

    for (let i = 0; i < nextMonthFirstDay; i++) {
      nextMonthDaysArr.push(null); // Empty slots for days of the previous month
    }
    for (let date = 1; date <= nextMonthLastDate; date++) {
      nextMonthDaysArr.push(new Date(nextMonthYear, nextMonth, date));
    }

    setDaysInMonth(currentMonthDays);
    setNextMonthDays(nextMonthDaysArr);
  };

  const fetchReservedDates = async () => {
    try {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0).toISOString().split('T')[0]; // Fetch dates for two months

      const response = await fetch(`${import.meta.env.VITE_API_URL}/reservation/reserved-dates/${propertyId}/${sectionId}?startDate=${start}&endDate=${end}`);

      const data = await response.json();

      const booked = data.dates.filter(d => d.booked).map(d => d.date);
      setBookedDates(booked);
    } catch (error) {
      console.error('Error fetching reserved dates:', error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0];
    if (!bookedDates.includes(dateString)) {
      onDateSelect(date);
    }
  };

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.header}>
        <button onClick={handlePrevMonth} style={styles.headerButton}>{"<"}</button>
        <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
        <button onClick={handleNextMonth} style={styles.headerButton}>{">"}</button>
      </div>
      <div style={styles.calendarGrid}>
        <div style={styles.monthContainer}>
          <div style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <div key={index} style={styles.dayOfWeek}>{day}</div>
            ))}
          </div>
          <div style={styles.days}>
            {daysInMonth.map((date, index) => {
              const dateString = date ? date.toISOString().split('T')[0] : null;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.day,
                    ...(date && bookedDates.includes(dateString) ? styles.unavailableDay : {}),
                  }}
                  onClick={() => date && handleDateSelect(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              );
            })}
          </div>
        </div>
        <div style={styles.monthContainer}>
          <div style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <div key={index} style={styles.dayOfWeek}>{day}</div>
            ))}
          </div>
          <div style={styles.days}>
            {nextMonthDays.map((date, index) => {
              const dateString = date ? date.toISOString().split('T')[0] : null;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.day,
                    ...(date && bookedDates.includes(dateString) ? styles.unavailableDay : {}),
                  }}
                  onClick={() => date && handleDateSelect(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  calendarContainer: {
    display: 'inline-block',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  headerButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
  },
  calendarGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  monthContainer: {
    width: '48%',
  },
  daysOfWeek: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  dayOfWeek: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  days: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  day: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  unavailableDay: {
    backgroundColor: '#f5f5f5',
    color: '#ccc',
    pointerEvents: 'none',
    textDecoration: 'line-through',
  },
};

export default CustomCalendar;

