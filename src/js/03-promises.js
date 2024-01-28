import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
  submitButton: document.querySelector('button'),
  amount: document.querySelector('[name="amount"]'),
  step: document.querySelector('[name="step"]'),
  delay: document.querySelector('[name="delay"]'),
};

refs.submitButton.addEventListener('click', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  iziToast.success({
    message: `✅ Fulfilled promise ${position} in ${delay}ms`,
    position: 'topRight',
  });
}

function onError({ position, delay }) {
  iziToast.error({
    message: `❌ Rejected promise ${position} in ${delay}ms`,
    position: 'topRight',
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  let promiseDelay = +refs.delay.value;
  let amount = +refs.amount.value;
  let step = +refs.step.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, promiseDelay).then(onSuccess).catch(onError);
    promiseDelay += step;
  }
  refs.form.reset();
}
