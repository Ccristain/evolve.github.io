/*Render Gallery Images*/
const itemsWrapper = document.getElementById("items");

const dailyImages = [
  {
    id: 1,
    folderId: 1,
    dateUploaded: "#",
    imgUploaded: "../assets/evolv_logo.png",
  },
  {
    id: 2,
    folderId: 2,
    dateUploaded: "#",
    imgUploaded: "../assets/evolv_logo.png",
  },
];

let counter = dailyImages.length + 1;

function renderImages(replace) {
  if (replace) {
    itemsWrapper.innerHTML = "";
  }
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
    `;

    itemsWrapper.appendChild(figureTag);
  });
}

renderImages();

/*Create Folder*/

dailyImage.addEventListener("change", () => {});
function uploadDailyImage() {
  const dailyImage = document.getElementById("daily-image-input");
  const imageFile = dailyImage.files[0];
  dailyImages.push({
    id: counter,
    folderId: 1,
    dateUploaded: "#",
    imgUploaded: URL.createObjectURL(imageFile),
  });

  renderImages(1);

  const modalWrapper = document.getElementById("create-folder-modal-wrapper");
  modalWrapper.classList.remove("display-modal");
}
