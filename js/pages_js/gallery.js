/*Render Gallery Images*/
const itemsWrapper = document.getElementById("items");

const dailyImages = [
  {
    id: 1,
    count: 1,
    dateUploaded: "#",
    imgUploaded: "../assets/evolv_logo.png",
  },
  {
    id: 2,
    count: 2,
    dateUploaded: "#",
    imgUploaded: "../assets/evolv_logo.png",
  },
];

let counter = 1;
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
