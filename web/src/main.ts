const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minEl = document.getElementById("minutes");
const secEl = document.getElementById("seconds");

const countdown = () => {
  const kresgeKickoff = new Date('2025-08-31T12:00:00-04:00');
  const currentDate = new Date();

  const totalSeconds = (kresgeKickoff.getTime() - currentDate.getTime()) / 1000;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const seconds = Math.floor(totalSeconds) % 60;

  if (dayEl) {
    dayEl.innerText = days.toString();
    dayEl.style = `--value:${days}`;
  }
  if (hourEl) {
    hourEl.innerText = hours.toString();
    hourEl.style = `--value:${hours}`;
  }
  if (minEl) {
    minEl.innerText = minutes.toString();
    minEl.style = `--value:${minutes}`;
  }
  if (secEl) {
    secEl.innerText = seconds.toString();
    secEl.style = `--value:${seconds}`;
  }
}

setInterval(countdown, 1000);