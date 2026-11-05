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

    itemsWrapper.prepend(figureTag);
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

const closeFullscreenBtn = document.getElementById("fullscreen-close-btn");
closeFullscreenBtn.addEventListener("click", () => {
  fullScreenWrapper.classList.remove("display-modal");
  closeCamera();
});
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
        width: { ideal: 1920 },
        height: { ideal: 1080 },
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

/*Speed Adjustment */
const speedCountDisplay = document.getElementById("speed-number");
const speedRange = document.getElementById("timelapse-speed");

speedCountDisplay.innerText = speedRange.value;
speedRange.addEventListener("input", () => {
  speedCountDisplay.textContent = speedRange.value + "ms";
  stopTimelapse();
  renderTimelapse(speedRange.value);
});

/*Export Modal */
const openExportModalBtn = document.getElementById("export-btn");
openExportModalBtn.addEventListener("click", () => {
  stopTimelapse();
  imageCounter = 0;
  speedRange.value = 250;
  renderTimelapse(speedRange.value);
  speedCountDisplay.textContent = speedRange.value + "ms";
});

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

const emptyMessage = document.getElementById("empty-images");
const exportChildWrapper = document.getElementById(
  "export-modal-content-wrapper",
);

function renderTimelapse(speed) {
  try {
    if (
      dailyImages[imageCounter] === undefined ||
      dailyImages[imageCounter].imgUploaded === undefined
    ) {
      stopTimelapse();
      exportChildWrapper.hidden = true;
      emptyMessage.hidden = false;
      return;
    }
    if (!emptyMessage.hidden) {
      emptyMessage.hidden = true;
    }
    if (exportChildWrapper.hidden) {
      exportChildWrapper.hidden = false;
    }
    if (timelapseInterval) return;

    timelapseInterval = setInterval(() => {
      timelapseImage.src = dailyImages[imageCounter].imgUploaded;

      imageCounter++;

      if (imageCounter >= dailyImages.length) {
        imageCounter = 0;
      }
    }, speed);
  } catch (e) {
    console.error(e.message);
  }
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

/*Collapse Aside */
const collapsible = document.getElementById("collapsible");
const toggleSidebar = document.getElementById("toggle-sidebar");
const asideBtns = document.querySelectorAll(".aside-button");
const asideLogo = document.getElementById("dashboardLogo");

const asideItems = [
  {
    img: "../assets/icons/circle-question-mark-dark.svg",
    text: "How to Use",
  },
  {
    img: "../assets/icons/book-alert-dark.svg",
    text: "Update",
  },
  {
    img: "../assets/icons/contact-dark.svg",
    text: "Contact Us",
  },
];
toggleSidebar.addEventListener("click", () => {
  const aria = this.collapsible.getAttribute("aria-expanded") === "true";

  collapsible.setAttribute("aria-expanded", String(!aria));
  setButtonContent(aria);
});

function setButtonContent(param1) {
  if (param1) {
    toggleSidebar.innerText = "Collapse";
    asideLogo.style.width = "6rem";
    asideBtns.forEach((btn, i) => {
      btn.innerHTML = `
        <img
            src="${asideItems[i].img}"
            class="icon"
          />${asideItems[i].text}
      `;
    });
  } else {
    toggleSidebar.innerHTML = `
      <img
            src="../assets/icons/arrow-right-dark.svg"
            class="icon"
          />
    `;
    asideLogo.style.width = "3rem";
    asideBtns.forEach((btn, i) => {
      btn.innerHTML = `
        <img
            src="${asideItems[i].img}"
            class="icon"
          />
      `;
    });
  }
}

setButtonContent(false);

/*Return Btn */
const returnBtn = document.getElementById("returnBtn");
returnBtn.addEventListener("click", () => {
  window.location.href = "./dashboard.html";
});

const downloadTimelapseBtn = document.getElementById("download-timelapse");
const downloadStatus = document.getElementById("download-status");
let downloadInProgress = false;

downloadTimelapseBtn.addEventListener("click", downloadTimelapse);

async function downloadTimelapse() {
  if (downloadInProgress) return;

  if (dailyImages.length === 0) {
    downloadStatus.textContent = "Add images before downloading a video.";
    return;
  }

  if (
    typeof MediaRecorder === "undefined" ||
    typeof HTMLCanvasElement.prototype.captureStream !== "function"
  ) {
    downloadStatus.textContent = "Video recording is not supported by this browser.";
    console.error("Canvas video recording is not supported by this browser.");
    return;
  }

  downloadInProgress = true;
  downloadTimelapseBtn.disabled = true;
  downloadStatus.textContent = "Preparing video...";

  let stream;
  let recorder;
  try {
    const images = await Promise.all(
      dailyImages.map(
        ({ imgUploaded }) =>
          new Promise((resolve, reject) => {
            if (!imgUploaded) {
              reject(new Error("An uploaded image has no image source."));
              return;
            }

            const image = new Image();
            image.addEventListener("load", () => resolve(image), { once: true });
            image.addEventListener(
              "error",
              () => reject(new Error("An uploaded image could not be loaded.")),
              { once: true },
            );
            image.src = imgUploaded;
          }),
      ),
    );

    // Record on a separate canvas so the visible preview can keep looping.
    const recordingCanvas = document.createElement("canvas");
    let sourceWidth = 0;
    let sourceHeight = 0;
    for (const image of images) {
      if (image.naturalWidth === 0 || image.naturalHeight === 0) {
        throw new Error("An uploaded image has no usable dimensions.");
      }
      sourceWidth = Math.max(sourceWidth, image.naturalWidth);
      sourceHeight = Math.max(sourceHeight, image.naturalHeight);
    }

    // Upscale small sources to at least 1080 pixels on the long side; preserve ratio and cap at 4K.
    const resolutionScale = Math.min(
      Math.max(1, 1920 / Math.max(sourceWidth, sourceHeight)),
      3840 / sourceWidth,
      3840 / sourceHeight,
    );
    recordingCanvas.width = Math.max(
      2,
      Math.floor((sourceWidth * resolutionScale) / 2) * 2,
    );
    recordingCanvas.height = Math.max(
      2,
      Math.floor((sourceHeight * resolutionScale) / 2) * 2,
    );
    const recordingContext = recordingCanvas.getContext("2d", { alpha: false });
    if (!recordingContext) {
      throw new Error("Could not create a canvas context for the video.");
    }
    recordingContext.imageSmoothingEnabled = true;
    recordingContext.imageSmoothingQuality = "high";

    const speed = Number(speedRange.value);
    const drawFrame = (image) =>
      scaleCanvasImage(recordingContext, image, recordingCanvas);
    drawFrame(images[0]);
    stream = recordingCanvas.captureStream(30);

    const mimeTypes = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ];
    const mimeType =
      typeof MediaRecorder.isTypeSupported === "function"
        ? mimeTypes.find((type) => MediaRecorder.isTypeSupported(type))
        : undefined;
    // Use a high bitrate to reduce encoder artifacts; scale it with pixels and cap at 50 Mbps.
    const videoBitsPerSecond = Math.min(
      50_000_000,
      Math.round(
        (20_000_000 *
          recordingCanvas.width *
          recordingCanvas.height) /
          (1920 * 1080),
      ),
    );
    recorder = new MediaRecorder(
      stream,
      {
        ...(mimeType ? { mimeType } : {}),
        videoBitsPerSecond,
      },
    );
    const recordedChunks = [];
    let recorderError;
    const recordingStopped = new Promise((resolve) => {
      recorder.addEventListener("stop", resolve, { once: true });
    });

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    });
    recorder.addEventListener(
      "error",
      (event) => {
        recorderError = event.error || new Error("The video recording failed.");
      },
      { once: true },
    );

    downloadStatus.textContent = "Recording video...";
    recorder.start();
    // Keep each image for the selected duration and record exactly one pass.
    for (const image of images) {
      if (recorderError) throw recorderError;
      drawFrame(image);
      await new Promise((resolve) => window.setTimeout(resolve, speed));
      if (recorderError) throw recorderError;
    }

    recorder.stop();
    await recordingStopped;
    if (recorderError) throw recorderError;

    const videoBlob = new Blob(recordedChunks, {
      type: recorder.mimeType || "video/webm",
    });
    if (videoBlob.size === 0) {
      throw new Error("The video recording did not contain any data.");
    }

    const downloadUrl = URL.createObjectURL(videoBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "timelapse.webm";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    downloadStatus.textContent = "Video downloaded.";
  } catch (error) {
    console.error("Could not download the timelapse video.", error);
    downloadStatus.textContent = `Could not download video: ${
      error instanceof Error ? error.message : "An unexpected error occurred."
    }`;
  } finally {
    if (recorder && recorder.state !== "inactive") recorder.stop();
    if (stream) stream.getTracks().forEach((track) => track.stop());
    downloadInProgress = false;
    downloadTimelapseBtn.disabled = false;
  }
}
