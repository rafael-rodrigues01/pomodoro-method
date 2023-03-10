let minutesInput = document.querySelector(".minutes");

let secondsInput = document.querySelector(".seconds");

const sessionText = document.getElementById('session')

const intervalText = document.getElementById('interval')

const formTimer = document.getElementById('timer')
const formIntervalTimer = document.getElementById('interval-timer')

minutesInput.addEventListener('input', () => {
  const value = parseInt(minutesInput.value)

  if (value !== 0) {
    btnPlay.disabled = false
  }else {
    btnPlay.disabled = true
  }

  if (value < 0) {
    value = 59
  }

  if (value > 59) {
    value = 00
  }
})




const btnPlay = document.querySelector(".btn-play");
console.log(btnPlay);

let bellAudio = new Audio("./audio/audio_bell.mp3");

let boolean = false

const intervalTimer = () => {
  sessionText.classList.add('off')
  intervalText.classList.remove('off')
  formTimer.classList.add('off')
  formIntervalTimer.classList.remove('off')
  boolean = false
  minutesInput.value = document.querySelector('.minutes').value
  startPomodoroSection()
}

const startPomodoroSection = () => {
  if (boolean) {
    return
  }
  boolean = true

  minutesInput.setAttribute('readonly', true);

    let min = document.querySelector('.minutes').value
  // localStorage.setItem("minutesInput", String(minutesInput.value));

  
  // let min = Number(localStorage.getItem("minutesInput"));

  if (min === 0) {
    minutesInput.value = '0' + 0
    return
  } else {
    min -= 1;
  }

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

        intervalTimer()
      }
      seconds = 60;
    }
  };

  const min_interval = setInterval(minTimer, 60000);
  console.log(min_interval);
  const seg_interval = setInterval(segTimer, 1000);
};

btnPlay.addEventListener("click", startPomodoroSection);
