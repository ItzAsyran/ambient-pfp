const fileInput = document.getElementById("fileInput");
const imageDisplay = document.getElementById("imageDisplay");
const imageDisplayBlur = document.getElementById("imageDisplayBlur");
const dragContainer = document.querySelector(".drag-container");
const dropArea = document.querySelector("#dropArea");

const colorThief = new ColorThief();

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  displayImage(file);
});

dragContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragContainer.classList.add("drag-over");
});

dragContainer.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dragContainer.classList.remove("drag-over");
});

dragContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  dragContainer.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  displayImage(file);
});

const displayImage = (file) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imageDisplay.src = reader.result;
    imageDisplayBlur.src = reader.result;

    const color = colorThief.getColor(imageDisplay);
    const pastelColor = getDarkPastelColor(color);
    document.body.style.backgroundColor = `rgb(${pastelColor[0]}, ${pastelColor[1]}, ${pastelColor[2]})`;
  });
  reader.readAsDataURL(file);
};

const getDarkPastelColor = (color) => {
  const R = Math.floor((color[0] + 255) / 2) * 0.8;
  const G = Math.floor((color[1] + 255) / 2) * 0.8;
  const B = Math.floor((color[2] + 255) / 2) * 0.8;
  return [R, G, B];
};