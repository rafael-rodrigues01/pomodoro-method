let minutesInput = document.querySelector(".minutes");
let secondsInput = document.querySelector(".seconds");

const btnPlay = document.querySelector(".btn-play");

let bellAudio = new Audio("./audio/audio_bell.mp3");

console.log(secondsInput.innerHTML);
const startPomodoroSection = () => {

    
  localStorage.setItem("minutesInput", String(minutesInput.value));

  let min = Number(localStorage.getItem("minutesInput"));

  min -= 1;
  seconds = 59;

  if (min < 10) {
    min = "0" + min;
  }

  minutesInput.value = min;
  secondsInput.value = seconds;

  const minTimer = () => {
    if (min >= 10) {
        min -= 1
      minutesInput.value = min;
    } else {
      min -= 1;
      minutesInput.value = "0" + min;
    }
  };

  const segTimer = () => {
    seconds -= 1;

    if (seconds >= 10) {
      secondsInput.value = seconds;
    } else {
        secondsInput.value = "0" + seconds;
    }

    if (seconds <= 0) {
      if (min <= 0) {
        clearInterval(min_interval);
        clearInterval(seg_interval);

        bellAudio.play();
      }
      seconds = 60;
    }
  };

  const min_interval = setInterval(minTimer, 60000);
  console.log(min_interval);
  const seg_interval = setInterval(segTimer, 1000);
};

btnPlay.addEventListener("click", startPomodoroSection);
