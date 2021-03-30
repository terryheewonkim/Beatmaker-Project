class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    // Index to track the pads
    this.index = 0;
    // For tempo
    this.bpm = 150;
    // For play/stop functionality
    this.isPlaying = null;
    // For checking which sounds are selected to play
    this.selects = document.querySelectorAll("select");
    // To mute
    this.muteBtns = document.querySelectorAll(".mute");
    // For tempo control
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  // Toggle active class when pads are clicked
  activePad() {
    this.classList.toggle("active");
  }
  // Method to loop back to the beginning
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 300ms alternate ease-in-out 2`;
      // Check if pads are active (selected)
      if (bar.classList.contains("active")) {
        // Check each sound
        if (bar.classList.contains("kick-pad")) {
          // Set current play time back to 0
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  // Start the loop
  start() {
    // Calculate interval in milliseconds
    const interval = (60 / this.bpm) * 1000;
    // Check if it's already playing
    if (this.isPlaying) {
      // Clear the interval
      clearInterval(this.isPlaying);
      // Rest isPlaying to null
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  // Update the play button to stop and vice versa
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  // Change to the selected sounds
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  // Mute sounds
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      e.target.innerHTML = `<i class="fas fa-volume-up"></i>`;
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      e.target.innerHTML = `<i class="fas fa-volume-mute"></i>`;
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  // Update tempo TEXT
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-number");
    tempoText.innerText = e.target.value;
  }
  // Update ACTUAL tempo
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
// END DRUMKIT CLASS

const drumKit = new DrumKit();

/////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////

// Drum pad animations
drumKit.pads.forEach((pad) => {
  // Darken the color of pads on click
  pad.addEventListener("click", drumKit.activePad);
  // Reset the class after animation ends for each pad
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// Clicking the play button
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

// Selecting audio types
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

// Mute buttons
drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

// Use "input" as event listener to detect all changes
drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

// Use "change" as event listener so it only detects when the change is final
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
