import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

export default function MyDatePicker() {
  const [date, setDate] = useState(null); 
  const datePickerRef = useRef(null);
  const customInputRef = useRef(null);

  const TEMPLATE_TEXT = "民國yyy年-mm月-dd號";

  const formatDateToMinguo = (date) => {
    if (!date) return '';
    const taiwanYear = date.year() - 1911;
    const month = date.month() + 1;
    const day = date.date();
    return `民國${taiwanYear}年-${month}月-${day}號`;
  };

  useEffect(() => {
    if (datePickerRef.current) {
      const datePickerInput = datePickerRef.current.querySelector('input');
      const datePickerDiv = datePickerRef.current.firstChild.firstChild;
      if (datePickerInput) {
        const newInput = document.createElement("input");
        newInput.setAttribute("aria-invalid", "false");
        newInput.setAttribute("autocomplete", "off");
        newInput.setAttribute("placeholder", TEMPLATE_TEXT);
        newInput.setAttribute("class", "MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-nxo287-MuiInputBase-input-MuiOutlinedInput-input");

        customInputRef.current = newInput;

        datePickerInput.parentNode.insertBefore(newInput, datePickerInput);

        datePickerInput.style.display = "none";

        newInput.addEventListener('input', () => {
          const dateStr = newInput.value;
          const match = dateStr.match(/民國(\d{1,3})年-(\d{1,2})月-(\d{1,2})號/);
          if (match) {
            const year = parseInt(match[1]) + 1911;
            const month = parseInt(match[2]);
            const day = parseInt(match[3]);
            const newDate = dayjs(`${year}/${month}/${day}`);
            if (newDate.isValid()) {
              datePickerDiv.classList.remove("Mui-error");
              setDate(newDate);
            } else {
              datePickerDiv.classList.add("Mui-error");
            }
          } else if (dateStr !== '') {
            datePickerDiv.classList.add("Mui-error");
          }
        });

        datePickerInput.addEventListener('input', () => {
          newInput.value = formatDateToMinguo(dayjs(datePickerInput.value));
        });

        newInput.addEventListener('click', (event) => {
          const value = newInput.value;
          const yearIndex = value.indexOf('年');
          const monthIndex = value.indexOf('月');
          const dayIndex = value.indexOf('號');
          const cursorPosition = event.target.selectionStart;

          if (cursorPosition <= yearIndex) {
            newInput.setSelectionRange(2, yearIndex);
          } else if (cursorPosition <= monthIndex) {
            newInput.setSelectionRange(yearIndex + 2, monthIndex);
          } else if (cursorPosition <= dayIndex) {
            newInput.setSelectionRange(monthIndex + 2, dayIndex);
          }
        });

        newInput.addEventListener('focus', () => {
          datePickerDiv.classList.add("Mui-focused");
          if (!newInput.value) {
            newInput.value = TEMPLATE_TEXT;
          }
        });

        newInput.addEventListener('blur', () => {
          datePickerDiv.classList.remove("Mui-focused");
          if (newInput.value === TEMPLATE_TEXT) {
            newInput.value = '';
          }
        });
      }
    }
  }, []);

  return (
    <div id="d" ref={datePickerRef}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            if (customInputRef.current) {
              customInputRef.current.value = formatDateToMinguo(newValue);
            }
          }}
          renderInput={(params) => <TextField {...params} style={{ display: 'none' }} />}
        />
      </LocalizationProvider>
    </div>
  );
}
