import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStartEvent);

let selectedNewDates = null;

const messageError = {
  title: 'Error',
  message: 'Please choose a date in the future',
  titleColor: '#ffffff',
  messageColor: '#ffffff',
  color: '#ff0000',
  position: 'topRight',
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      iziToast.show(messageError);
    } else {
      selectedNewDates = selectedDates[0].getTime();

      refs.startButton.disabled = false;
      refs.input.disabled = false;
    }
  },
};

flatpickr('input#datetime-picker', options);

function onStartEvent() {
  refs.startButton.disabled = true;
  refs.input.disabled = true;

  setInterval(() => {
    const currentDate = new Date().getTime();
    const eventDate = selectedNewDates - currentDate;
    startPromoTimer(convertMs(eventDate));
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

function startPromoTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
