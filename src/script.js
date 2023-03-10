let sessionDuration = document.querySelector(".minutes");
let intervalDuration = document.getElementById('interval-input')

let secondInput = document.querySelector(".seconds");

const sessionText = document.getElementById('session')
const intervalText = document.getElementById('interval')


const sessionLengthInput = document.getElementById('session-input')

const breakLengthInput = document.getElementById('interval-input')

const buttons = document.querySelectorAll('.btn')
console.log(buttons);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnId = button.id
    console.log(btnId);
    const btnOperatorBreakLength = button.textContent
    switch(btnId){
      case 'first-btn':
        breakLengthInput.value--
        break;
      case 'second-btn':
        breakLengthInput.value++
        break;
      case 'third-btn':
        sessionLengthInput.value--
        break;
      case 'four-btn':
        sessionLengthInput.value++
    }
  })
})

const btnPlay = document.querySelector(".btn-play");



const validateMinutes = (input, event) => {
  const value = parseInt(event.target.value)

  if (value !== 0) {
    btnPlay.disabled = false
  }else {
    btnPlay.disabled = true
  }

  if (value < 0) {
    input.value = 59
  }

  if (value > 59) {
    input.value = 00
  }
}

sessionDuration.addEventListener('input', (event) => {
  validateMinutes(sessionDuration, event)
})
intervalDuration.addEventListener('input', (event) => {
  validateMinutes(intervalDuration, event)
})





let bellAudio = new Audio("./audio/audio_bell.mp3");

let boolean = false

const intervalTimer = () => {
  sessionText.classList.add('off')
  intervalText.classList.remove('off')
  sessionDuration.classList.add('off')
  intervalDuration.classList.remove('off')
  boolean = false
  startPomodoroSection(intervalDuration.value, intervalDuration)
}

const startPomodoroSection = (minutes, inputElement) => {
  if (boolean) {
    return
  }
  boolean = true

  inputElement.setAttribute('readonly', true);

  
    // let min = document.querySelector('.minutes').value
  // localStorage.setItem("inputElement", String(inputElement.value));

  
  // let min = Number(localStorage.getItem("inputElement"));

  if (minutes === 0) {
    inputElement.value = '0' + 0
    return
  } else {
    minutes -= 1;
  }

  seconds = 59;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  inputElement.value = minutes;
  secondInput.value = seconds;

  const minTimer = () => {

    if (minutes >= 10) {
        minutes -= 1
      inputElement.value = minutes;
    } else {
      minutes -= 1;
      inputElement.value = "0" + minutes;
    }
  };

  const segTimer = () => {
    seconds -= 1;

    if (seconds >= 10) {
      secondInput.value = seconds;
    } else {
        secondInput.value = "0" + seconds;
    }

    if (seconds <= 0) {
      if (minutes <= 0) {
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

btnPlay.addEventListener("click", () => {
  startPomodoroSection(sessionDuration.value, sessionDuration)
});
