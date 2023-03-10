const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const deadline = Date.parse(new Date()) + seconds * 1000;

    const timer = setInterval(changeTimerStep, 1000);
    changeTimerStep();
    buttonEl.disabled = true;

    function getZero(num) {
      if (num < 10) return  '0' + num;
      return num;
    }

    function changeTimerStep() {
      if (new Date() > deadline) {
        clearInterval(timer);
        buttonEl.disabled = false;
        return;
      }
      const timeLeft = deadline - new Date();
      const hours = getZero(Math.floor(timeLeft / (1000 * 60 * 60) % 24));
      const minutes = getZero(Math.floor(timeLeft / (1000 * 60) % 60));
      const seconds = getZero(Math.floor(timeLeft / 1000 % 60));

      timerEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
