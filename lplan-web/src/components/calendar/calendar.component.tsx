import { useState } from 'react';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedDate = value as Date;
    setSelectedDate(selectedDate);
    
  };
  /*const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  */
  


  return (
    <div>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      {selectedTime && (
      <div>
        <h3>Seleccionar horas: {selectedTime}</h3>
          <input type="hours" value={"[00:00, 22:22]"}/>
          <button>Confirm hours </button>
      </div>
    )}
    </div>

  );
};

export default MyCalendar;
