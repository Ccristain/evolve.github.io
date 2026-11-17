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
    <img src="${folder.imgDisplay}" class="folder-img" alt="${folder.folderName}"/>
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

/*Collapse Aside */
const collapsible = document.getElementById("collapsible");
const toggleSidebar = document.getElementById("toggle-sidebar");
const asideBtns = document.querySelectorAll(".aside-button");

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
  const isExpanded = collapsible.getAttribute("aria-expanded") === "true";
  const shouldExpand = !isExpanded;

  collapsible.setAttribute("aria-expanded", String(shouldExpand));
  setButtonContent(shouldExpand);
});

function setButtonContent(isExpanded) {
  document.body.classList.toggle("sidebar-expanded", isExpanded);
  toggleSidebar.innerHTML = `
    <img
      src="../assets/icons/arrow-right-dark.svg"
      class="icon"
      alt=""
      aria-hidden="true"
    />
    <span>Collapse</span>
  `;

  asideBtns.forEach((btn, i) => {
    btn.setAttribute("aria-label", asideItems[i].text);
    btn.dataset.tooltip = asideItems[i].text;
    btn.innerHTML = `
      <img
        src="${asideItems[i].img}"
        class="icon"
        alt=""
        aria-hidden="true"
      />
      <span>${asideItems[i].text}</span>
    `;
  });
}

setButtonContent(false);
