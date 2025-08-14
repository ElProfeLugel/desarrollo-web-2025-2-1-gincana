
  const audio = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("BotonPausa");
  const stopBtn = document.getElementById("BotonStop");
  const barraProgreso = document.getElementById("barraProgreso");
  let estasonando = false;

  playPauseBtn.addEventListener("click", () => {
    if (estasonando) {
      audio.pause();
      playPauseBtn.textContent = "Play";
    } else {
      audio.play();
      playPauseBtn.textContent = "Pause";
    }
    estasonando = !estasonando;
  });

  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = "Play";
    estasonando = false;
    updateProgressBar();
  });

  audio.addEventListener("timeupdate", () => {
    updateProgressBar();
  });

  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    barraProgreso.style.width = progress + "%";
  }
