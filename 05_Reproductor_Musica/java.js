const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");
const progressBar = document.getElementById("progressBar");
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "Play";
  } else {
    audio.play();
    playPauseBtn.textContent = "Pause";
  }
  isPlaying = !isPlaying;
});

stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  playPauseBtn.textContent = "Play";
  isPlaying = false;
  updateProgressBar();
});

audio.addEventListener("timeupdate", () => {
  updateProgressBar();
});

function updateProgressBar() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + "%";
}