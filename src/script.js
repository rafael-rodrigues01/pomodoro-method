let sessionDuration = document.querySelector(".minutes");

let intervalDuration = document.getElementById("interval-input");

let secondInput = document.querySelector(".seconds");

const sessionText = document.getElementById("session");
const intervalText = document.getElementById("interval");

const sessionLengthInput = document.getElementById("session-input");

const breakLengthInput = document.getElementById("interval-input");

const btnPlay = document.querySelector(".btn-play");
const btnReset = document.querySelector(".btn-reset");
const buttons = document.querySelectorAll(".btn");

let paragraphSessionLength = document.getElementById("session-length");
const paragraphBreakLength = document.getElementById("break-length");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnId = button.id;

    switch (btnId) {
      case "first-btn":
        breakLengthInput.value--;
        break;
      case "second-btn":
        breakLengthInput.value++;
        break;
      case "third-btn":
        sessionLengthInput.value--;
        break;
      case "four-btn":
        sessionLengthInput.value++;
    }

    paragraphSessionLength.innerHTML = sessionLengthInput.value;
    paragraphBreakLength.innerHTML = breakLengthInput.value;

    if (paragraphSessionLength.innerHTML < 0) {
      sessionLengthInput.value = 59;
      paragraphSessionLength.innerHTML = 59;
    }
    if (paragraphSessionLength.innerHTML > 59) {
      sessionLengthInput.value = 00;
      paragraphSessionLength.innerHTML = 00;
    }

    if (paragraphBreakLength.innerHTML < 0) {
      breakLengthInput.value = 59;
      paragraphBreakLength.innerHTML = 59;
    }
    if (paragraphBreakLength.innerHTML > 59) {
      breakLengthInput.value = 00;
      paragraphBreakLength.innerHTML = 00;
    }
  });
});

const validateMinutes = (input, event) => {
  const value = parseInt(event.target.value);

  if (value !== 0) {
    btnPlay.disabled = false;
  } else {
    btnPlay.disabled = true;
  }

  if (value < 0) {
    input.value = 59;
    paragraphSessionLength.innerHTML = 59;
    return;
  }

  if (value > 59) {
    input.value = 00;
    paragraphSessionLength.innerHTML = 00;
    return;
  }

  if (isNaN(value)) {
    return;
  }

  paragraphSessionLength.innerHTML = value;
};

sessionDuration.addEventListener("input", (event) => {
  validateMinutes(sessionDuration, event);
});
intervalDuration.addEventListener("input", (event) => {
  validateMinutes(intervalDuration, event);
});

let bellAudio = new Audio("./audio/audio_bell.mp3");

let boolean = false;

const sessionTimer = (durationOfMinutes) => {
  sessionText.classList.toggle("off");
  intervalText.classList.toggle("off");
  sessionDuration.classList.toggle("off");
  intervalDuration.classList.toggle("off");
  boolean = false;
  startTimer(durationOfMinutes, intervalDuration);
};

const intervalTimer = (durationOfMinutes) => {
  sessionText.classList.toggle("off");
  intervalText.classList.toggle("off");
  sessionDuration.classList.toggle("off");
  intervalDuration.classList.toggle("off");
  boolean = false;
  startTimer(durationOfMinutes, intervalDuration);
};

let sessionCount = 0;

let resetTimer = (inputElement) => {
  secondInput.value = 0;
  breakLengthInput.value = 5;
  sessionLengthInput.value = 25;
  paragraphBreakLength.innerHTML = breakLengthInput.value;
  paragraphSessionLength.innerHTML = sessionLengthInput.value;
  intervalText.classList.add("off");
  sessionText.classList.remove("off");
  intervalDuration.classList.add("off");
  sessionDuration.classList.remove("off");
  sessionCount = 0;

  inputElement.removeAttribute("readonly");
  btnPlay.disabled = false;
  boolean = false;
  buttons.forEach((button) => {
    button.disabled = false;
  });
  reset = true;
};

btnReset.addEventListener("click", () => {
  resetTimer(sessionLengthInput);
});

let reset = false;

let hasMinutes = false;

const startTimer = (minutes, inputElement) => {
  if (!hasMinutes) {
    var sessionLength = sessionDuration.value;
    var breakLength = intervalDuration.value;
    hasMinutes = true;
  }

  reset = false;
  if (boolean) {
    return;
  }
  boolean = true;

  if (minutes == 0) {
    inputElement.value = "0" + 0;
    return;
  } else {
    minutes -= 1;
  }

  inputElement.setAttribute("readonly", true);
  buttons.forEach((button) => {
    button.disabled = true;
  });

  seconds = 59;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  inputElement.value = minutes;
  secondInput.value = seconds;

  const minTimer = () => {
    if (minutes >= 10) {
      minutes -= 1;
      inputElement.value = minutes;
    } else {
      minutes -= 1;
      inputElement.value = "0" + minutes;
    }
  };

  const segTimer = () => {
    seconds -= 1;

    if (reset) {
      clearInterval(min_interval);
      clearInterval(seg_interval);
      return;
    }

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

        sessionCount++;

        if (sessionCount === 2) {
          bellAudio.play();
          sessionText.classList.toggle("off");
          intervalText.classList.toggle("off");
          sessionDuration.classList.toggle("off");
          intervalDuration.classList.toggle("off");
          sessionDuration.removeAttribute("readonly");
          buttons.forEach((button) => {
            button.disabled = false;
          });
          return;
        }

        if (sessionCount % 2 !== 0) {
          intervalTimer(breakLength);
        } else {
          sessionTimer(sessionLength);
        }
      }
      seconds = 59;
    }
  };

  const min_interval = setInterval(minTimer, 60000);
  const seg_interval = setInterval(segTimer, 1000);
};

btnPlay.addEventListener("click", () => {
  startTimer(sessionDuration.value, sessionDuration);
});
