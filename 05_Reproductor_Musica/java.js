const audio = document.getElementById("myAudio");
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
});

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + "%";
});

// Opcional: Cambiar el botón Play/Pause visualmente
audio.addEventListener("play", () => {
  playPauseBtn.classList.add("playing");
});

audio.addEventListener("pause", () => {
  playPauseBtn.classList.remove("playing");
});
