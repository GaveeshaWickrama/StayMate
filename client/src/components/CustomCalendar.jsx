import React, { useState, useEffect, useRef } from "react";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CustomCalendar = ({
  propertyId,
  sectionId,
  onDateRangeSelect,
  onClose,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const calendarRef = useRef(null);

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  useEffect(() => {
    fetchReservedDates();
  }, [currentDate, propertyId, sectionId]);

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

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const nextMonth = month + 1 === 12 ? 0 : month + 1;
    const nextMonthYear = month + 1 === 12 ? year + 1 : year;

    const nextMonthFirstDay = new Date(nextMonthYear, nextMonth, 1).getDay();
    const nextMonthLastDate = new Date(
      nextMonthYear,
      nextMonth + 1,
      0
    ).getDate();

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
      const start = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).toLocaleDateString("en-CA");
      const end = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 2,
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    const dateString = date.toLocaleDateString("en-CA");
    return bookedDates.includes(dateString) || date < today; // Block past dates
  };

  const handleDateSelect = (date) => {
    setErrorMessage(""); // Clear any previous error messages

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (date < today) {
      setErrorMessage("You cannot select a past date.");
      return;
    }

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
      setSelectedEndDate(null); // Reset the end date
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

      setSelectedEndDate(date);
    } else {
      // Reset dates if clicked after selecting both start and end
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

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isInRange = (date) => {
    return (
      selectedStartDate &&
      selectedEndDate &&
      date >= selectedStartDate &&
      date <= selectedEndDate
    );
  };

  const renderDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    const isSelectedStartDate =
      date &&
      selectedStartDate &&
      date.getTime() === selectedStartDate.getTime();
    const isSelectedEndDate =
      date && selectedEndDate && date.getTime() === selectedEndDate.getTime();

    const isDisabled = date && (isDateBooked(date) || date < today);

    return (
      <div
        key={date ? date.toLocaleDateString("en-CA") : "empty"}
        style={{
          ...styles.day,
          ...(isDisabled ? styles.unavailableDay : {}),
          ...(isSelectedStartDate || isSelectedEndDate || isInRange(date)
            ? styles.selectedDay
            : {}),
        }}
        onClick={() => date && !isDisabled && handleDateSelect(date)}
      >
        {date ? date.getDate() : ""}
      </div>
    );
  };

  return (
    <div ref={calendarRef} style={styles.calendarContainer}>
      <div style={styles.header}>
        <button onClick={handlePrevMonth} style={styles.headerButton}>
          {"<"}
        </button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth} style={styles.headerButton}>
          {">"}
        </button>
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
        <div style={styles.monthContainer}>
          <div style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <div key={index} style={styles.dayOfWeek}>
                {day}
              </div>
            ))}
          </div>
          <div style={styles.days}>{nextMonthDays.map(renderDay)}</div>
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
    display: "inline-block",
    padding: "16px",
    marginTop: "80px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  headerButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    padding: "4px",
    lineHeight: "20px",
    marginLeft: "8px",
  },
  calendarGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
  monthContainer: {
    width: "48%",
  },
  daysOfWeek: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  },
  dayOfWeek: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  },
  day: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  unavailableDay: {
    backgroundColor: "#f5f5f5", // Light grey background for clarity
    color: "#ccc", // Greyed-out text
    pointerEvents: "none", // Prevent clicks
    textDecoration: "line-through", // Black line through text
  },
  selectedDay: {
    backgroundColor: "#b3d4fc",
    color: "#000",
  },
  errorMessage: {
    color: "red",
    marginBottom: "8px",
  },
  confirmContainer: {
    marginTop: "16px",
    textAlign: "center",
  },
  confirmButton: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default CustomCalendar;
