import React, { useState, useEffect, useRef } from "react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // Start with Monday

const CustomCalendar = ({
  propertyId,
  sectionId,
  onDateRangeSelect,
  onClose,
  maxStayDuration = 7,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const calendarRef = useRef(null);

  useEffect(() => {
    generateCalendar();
    fetchReservedDates();
  }, [currentDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef, onClose]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const startDay = (firstDayOfMonth.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    for (let date = 1; date <= lastDateOfMonth; date++) {
      const currentDate = new Date(year, month, date);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 0; i < remainingSlots; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    setDaysInMonth(days);
  };

  const fetchReservedDates = async () => {
    try {
      const start = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).toLocaleDateString("en-CA");
      const end = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).toLocaleDateString("en-CA");

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/reservation/reserved-dates/${propertyId}/${sectionId}?startDate=${start}&endDate=${end}`
      );

      const data = await response.json();
      const booked = data.dates.filter((d) => d.booked).map((d) => d.date);
      setBookedDates(booked);
    } catch (error) {
      console.error("Error fetching reserved dates:", error);
    }
  };

  const isDateBooked = (date) => {
    const dateString = date.toLocaleDateString("en-CA");
    return bookedDates.includes(dateString);
  };

  const handleDateSelect = (date) => {
    setErrorMessage("");

    if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      return;
    }

    if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) {
      setSelectedEndDate(null);
      return;
    }

    if (!selectedStartDate) {
      if (isDateBooked(date)) {
        setErrorMessage("Selected date is unavailable.");
        return;
      }
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (!selectedEndDate) {
      if (date <= selectedStartDate) {
        setErrorMessage("Check-out date must be after the check-in date.");
        return;
      }

      const isRangeValid = validateDateRange(selectedStartDate, date);
      if (!isRangeValid) {
        setErrorMessage("Date range includes unavailable dates.");
        return;
      }

      const stayDuration =
        (date.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24);
      if (stayDuration > maxStayDuration) {
        setErrorMessage(
          `Maximum stay duration is ${maxStayDuration} days. Please select a shorter stay.`
        );
        return;
      }

      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const validateDateRange = (startDate, endDate) => {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (isDateBooked(currentDate)) {
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return true;
  };

  const handleConfirmSelection = () => {
    if (selectedStartDate && selectedEndDate) {
      onDateRangeSelect(selectedStartDate, selectedEndDate);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const renderDay = ({ date, isCurrentMonth }) => {
    if (!date) {
      return <div style={styles.emptySlot}></div>;
    }

    const isSelectedStartDate =
      date &&
      selectedStartDate &&
      date.getTime() === selectedStartDate.getTime();
    const isSelectedEndDate =
      date && selectedEndDate && date.getTime() === selectedEndDate.getTime();

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const today = new Date();

    const isDisabled =
      date < firstDayOfMonth || // Disable all dates before the current month
      !isCurrentMonth || // Disable dates not in the current month
      isDateBooked(date) || // Already booked dates
      date < today; // Disable previous days of the current month

    return (
      <div
        key={date.toLocaleDateString("en-CA")}
        style={{
          ...styles.day,
          ...(isDisabled ? styles.unavailableDay : {}),
          ...(isSelectedStartDate || isSelectedEndDate
            ? styles.selectedDay
            : {}),
        }}
        onClick={() => date && !isDisabled && handleDateSelect(date)}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div ref={calendarRef} style={styles.calendarContainer}>
      <div style={styles.header}>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <div>
          <button onClick={() => navigateMonth(1)} style={styles.navButton}>
            ▶
          </button>
          <button
            onClick={() => navigateMonth(-1)}
            style={styles.navButton}
            disabled={
              currentDate.getFullYear() === new Date().getFullYear() &&
              currentDate.getMonth() === new Date().getMonth()
            } // Prevent going back from future months
          >
            ◁
          </button>
        </div>
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
      </div>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      <div style={styles.calendarGrid}>
        <div style={styles.monthContainer}>
          <div style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <div key={index} style={styles.dayOfWeek}>
                {day}
              </div>
            ))}
          </div>
          <div style={styles.days}>{daysInMonth.map(renderDay)}</div>
        </div>
      </div>
      {selectedStartDate && selectedEndDate && (
        <div style={styles.confirmContainer}>
          <button onClick={handleConfirmSelection} style={styles.confirmButton}>
            Confirm Dates
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  calendarContainer: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "relative",
    width: "320px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  navButton: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    margin: "0 5px",
    color: "#4caf50",
  },
  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    color: "#4caf50",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  calendarGrid: {
    marginTop: "10px",
  },
  monthContainer: {
    display: "inline-block",
    width: "150px",
  },
  daysOfWeek: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridGap: "20px",
    marginBottom: "10px",
  },
  dayOfWeek: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#555",
  },
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridGap: "5px",
  },
  day: {
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  emptySlot: {
    padding: "10px",
    textAlign: "center",
  },
  unavailableDay: {
    color: "#ccc",
    pointerEvents: "none",
  },
  selectedDay: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  confirmContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
};

export default CustomCalendar;
