export function loadLottie({ 
  containerId,
   path, 
   loop = true,
    autoplay = true, 
    speed = 1.5 }) {
  lottie.loadAnimation({
    container: document.getElementById(containerId),
    renderer: "svg", loop, autoplay, path
  }).setSpeed(speed);
}