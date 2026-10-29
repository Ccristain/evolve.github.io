/*Render Folder*/
const folderWrapper = document.getElementById("folders");

const folderItems = [
  {
    id: 1,
    folderName: "sample",
    date: "null",
    imgDisplay: "../assets/evolv_logo.png",
  },
];

let counter = folderItems.length + 1;

//display the folders
function renderFolder() {
  folderWrapper.innerHTML = "";

  folderItems.forEach((folder) => {
    const figureTag = document.createElement("figure");

    figureTag.classList.add("folder");
    figureTag.dataset.folderId = folder.id;

    figureTag.innerHTML = `
    <img
              src="${folder.imgDisplay}"
              class="folder-img"
              alt="${folder.folderName}"
            />
            <figcaption class="folder-cap">${folder.folderName}</figcaption>
  `;

    folderWrapper.appendChild(figureTag);
  });
  activateEventHandler(); //put addEventListener for Navigation
}

function activateEventHandler() {
  /*Redirect to Gallery */
  const folders = document.querySelectorAll(".folder");

  folders.forEach((folder) => {
    folder.addEventListener("click", () => {
      window.location.href = "./gallery.html";
    });
  });
}
/*First Render */
renderFolder();

/*Create Folder*/
const folderTitle = document.getElementById("create-title-input");
const createButton = document.getElementById("create-btn");
createButton.addEventListener("click", () => createFolder());

function createFolder() {
  folderItems.push({
    id: counter++,
    folderName: folderTitle.value,
    date: "null",
    imgDisplay: "../assets/evolv_logo.png",
  });

  renderFolder();
}
