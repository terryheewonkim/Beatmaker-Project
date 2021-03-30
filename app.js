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
}
// END DRUMKIT CLASS

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  // Darken the color of pads on click
  pad.addEventListener("click", drumKit.activePad);
  // Reset the class after animation ends for each pad
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});
