const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();

const arr = [
  "../assets/evolv_logo.png",
  "../assets/logo_evolv_dark.png",
  "../assets/logo_evolv_light.png",
];

let count = 0;

img.addEventListener("load", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
});

setInterval(() => {
  img.src = arr[count];

  count++;

  if (count >= arr.length) {
    clearInterval();
  }
}, 100);
