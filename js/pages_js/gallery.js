/*Render Gallery Images*/
const itemsWrapper = document.getElementById("items");
const fullScreenWrapper = document.getElementById("fullscreen-wrapper");
const cameraVideoTag = document.getElementById("camera");
const captureCanvas = document.getElementById("capture-canvas");
const captureContext = captureCanvas.getContext("2d");

let cameraStream;

const dailyImages = [
  /*{
    counter: 1,
    folderId: 1,
    dateUploaded: new Date().toLocaleDateString(),
    imgUploaded: "../assets/icons/bolt.svg  ",
  },
  {
    counter: 2,
    folderId: 2,
    dateUploaded: new Date().toLocaleDateString(),
    imgUploaded: "../assets/evolv_logo.png",
  }, */
];

let counter = dailyImages.length + 1;
let id = 3;
function renderImages() {
  itemsWrapper.innerHTML = "";
  counter = 1;
  dailyImages.forEach((item) => {
    const figureTag = document.createElement("figure");

    figureTag.classList.add("item");
    figureTag.dataset.itemId = item.id;

    figureTag.innerHTML = ` 
        <img
              src="${item.imgUploaded}"
              class="item-img"
              alt="${item.count} + Count Uploaded"
            />
            <figcaption class="item-cap">Day: ${counter++}</figcaption>
            <p>Date: ${item.dateUploaded}</p>
    `;

    itemsWrapper.appendChild(figureTag);
  });
  activateFullScreen();
}

/*Full Screen On Click of each Uploaded Images */
function activateFullScreen() {
  document.querySelectorAll(".item").forEach((item) => {
    item.onclick = () => {
      fullScreenWrapper.classList.add("display-modal");

      document.getElementById("fullscreen-img").src =
        item.querySelector("img").src;
    };
  });
}

renderImages();

/*Create Folder*/
const selectedImage = document.getElementById("selectedImageFromFile");
const dailyImage = document.getElementById("daily-image-input");
dailyImage.addEventListener("change", () => {
  selectedImage.src = URL.createObjectURL(dailyImage.files[0]);
});
const uploadBtn = document.getElementById("upload-btn");
uploadBtn.addEventListener("click", () => uploadDailyImage());

function uploadDailyImage() {
  const imageFile = dailyImage.files[0];

  dailyImages.push({
    counter: counter,
    folderId: id++,
    dateUploaded: new Date().toLocaleDateString(),
    imgUploaded: URL.createObjectURL(imageFile),
  });

  renderImages(1);

  const modalWrapper = document.getElementById("create-folder-modal-wrapper");
  modalWrapper.classList.remove("display-modal");

  closeCamera();
}

/*Live Camera for Daily Capture */
const openCameraWithModal = document.getElementById("openUploadModal");
openCameraWithModal.addEventListener("click", () => showCamera());
const closeCameraWithModal = document.getElementById("closeUploadModal");
closeCameraWithModal.addEventListener("click", () => closeCamera());
const captureBtn = document.getElementById("capture-btn");
captureBtn.addEventListener("click", () => capture());

async function showCamera() {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
    });

    cameraVideoTag.srcObject = cameraStream;

    await cameraVideoTag.play();
  } catch (error) {
    console.error("There is an error accessing the camera", error);
  }
}

/*Close Camera with the Modal */
function capture() {
  captureCanvas.width = cameraVideoTag.videoWidth;
  captureCanvas.height = cameraVideoTag.videoHeight;

  captureContext.drawImage(
    cameraVideoTag,
    0,
    0,
    captureCanvas.width,
    captureCanvas.height,
  );

  /*Live image */
  const capturedImage = captureCanvas.toDataURL("image/png");

  dailyImages.push({
    id: counter,
    folderId: 1,
    dateUploaded: new Date().toLocaleDateString(),
    imgUploaded: capturedImage,
  });

  renderImages();

  const modalWrapper = document.getElementById("create-folder-modal-wrapper");
  modalWrapper.classList.remove("display-modal");

  closeCamera();
}

function closeCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
}

/*Export Modal */
let timelapseSpeed = [50, 250, 750];

const openExportModalBtn = document.getElementById("export-btn");
openExportModalBtn.addEventListener("click", () =>
  renderTimelapse(timelapseSpeed[1]),
);
const closeExportModal = document.getElementById("closeExportModal");
closeExportModal.addEventListener("click", () => stopTimelapse());

let imageCounter = 0;

const exportCanvasTag = document.getElementById("export-canvas");
const exportCtx = exportCanvasTag.getContext("2d");
const timelapseImage = new Image();
let timelapseInterval;

timelapseImage.addEventListener("load", () => {
  exportCtx.clearRect(0, 0, exportCanvasTag.width, exportCanvasTag.height);
  scaleCanvasImage(exportCtx, timelapseImage, exportCanvasTag); //render image while adjusting size
});

function renderTimelapse(speed) {
  if (timelapseInterval) return;

  timelapseInterval = setInterval(() => {
    timelapseImage.src = dailyImages[imageCounter].imgUploaded;

    imageCounter++;

    if (imageCounter >= dailyImages.length) {
      imageCounter = 0;
    }
  }, speed);
}

function stopTimelapse() {
  clearInterval(timelapseInterval);
  timelapseInterval = null;
}

function scaleCanvasImage(ctx, img, canvas) {
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);

  const width = img.width * scale;
  const height = img.height * scale;

  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, width, height);
}

/*Timelapse Speed Adjustment*/
const slow = document.getElementById("slow");
const medium = document.getElementById("medium");
const fast = document.getElementById("fast");

slow.addEventListener("click", () => {
  stopTimelapse();
  renderTimelapse(timelapseSpeed[2]);
});
medium.addEventListener("click", () => {
  stopTimelapse();
  renderTimelapse(timelapseSpeed[1]);
});
fast.addEventListener("click", () => {
  stopTimelapse();
  renderTimelapse(timelapseSpeed[0]);
});
