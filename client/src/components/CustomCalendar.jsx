import React, { useState, useEffect, useRef } from "react";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]; // Start with Monday

const CustomCalendar = ({
  propertyId,
  sectionId,
  onDateRangeSelect,
  onClose,
  maxStayDuration = 7, // Maximum short stay duration
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Convert Sunday (0) to last (6)

    const days = [];

    // Add empty slots for alignment based on the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null); // Empty slots for padding
    }

    // Add days of the current month from today onwards
    for (let date = 1; date <= lastDateOfMonth; date++) {
      const currentDate = new Date(year, month, date);
      if (currentDate >= today) {
        days.push(currentDate);
      }
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
    setErrorMessage(""); // Clear any previous error messages

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

  const renderDay = (date) => {
    if (!date) {
      // Empty slot for alignment
      return <div style={styles.emptySlot}></div>;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    const isSelectedStartDate =
      date &&
      selectedStartDate &&
      date.getTime() === selectedStartDate.getTime();
    const isSelectedEndDate =
      date && selectedEndDate && date.getTime() === selectedEndDate.getTime();

    const isDisabled = date && isDateBooked(date);

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
    justifyContent: "center",
  },
  monthContainer: {
    width: "100%",
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
    fontWeight: "bold",
    fontSize: "14px",
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
    height: "36px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  unavailableDay: {
    backgroundColor: "#ddd",
    color: "#999",
    cursor: "not-allowed",
  },
  selectedDay: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  emptySlot: {
    height: "36px",
    visibility: "hidden", // Hide empty slots
  },
  confirmContainer: {
    marginTop: "8px",
    textAlign: "center",
  },
  confirmButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    marginBottom: "8px",
    textAlign: "center",
  },
};

export default CustomCalendar;
