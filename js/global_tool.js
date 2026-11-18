const toolBtn = document.getElementById("toolset");
const toolMenu = document.getElementById("tool-menu");

document.querySelectorAll(".contact-button").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "../pages/contact.html";
  });
});

if (toolBtn) {
  toolBtn.addEventListener("click", () => {
    toolMenu.classList.toggle("menu-active");
  });
}

/*close create folder modal*/
const modalWrapper = document.getElementById("create-folder-modal-wrapper");

/*reset input text to empty*/
const folderInput = document.querySelectorAll(".input-design");

function clearImageInput(inputSelector) {
  if (inputSelector) {
    inputSelector.forEach((inputs) => {
      inputs.value = "";
    });
  }
}

/*Reusable Dialog Modal */
/*Upload Modal */
const uploadTool = document.getElementById("openUploadModal");

const closeUploadModalBtn = document.getElementById("closeUploadModal");
if (uploadTool) {
  uploadTool.addEventListener("click", () => {
    openDialogModal(modalWrapper);
    clearImageInput(folderInput); //clear input text when modal opens
  });
}

if (closeUploadModalBtn) {
  closeUploadModalBtn.addEventListener("click", () => {
    closeDialogModal(modalWrapper);
  });
}

const captureButton = document.getElementById("capture-btn");
if (captureButton) {
  captureButton.addEventListener("click", () => closeDialogModal(modalWrapper));
}
const uploadButton = document.getElementById("upload-btn");
if (uploadButton) {
  uploadButton.addEventListener("click", () => closeDialogModal(modalWrapper));
}

/*Export Modal */
const exportButton = document.getElementById("export-btn");
const exportModal = document.getElementById("export-modal");
const closeModalBtn = document.getElementById("closeExportModal");

if (exportButton && exportModal && closeModalBtn) {
  exportButton.addEventListener("click", () => openDialogModal(exportModal));
  closeModalBtn.addEventListener("click", () => closeDialogModal(exportModal));
}

/*Folder Modal in Dashboard */
const modalCreateButton = document.getElementById("create-btn");

if (modalCreateButton) {
  modalCreateButton.addEventListener("click", () => {
    closeDialogModal(modalWrapper);
  });
}

function openDialogModal(modalSelector) {
  if (modalSelector && !modalSelector.open) {
    modalSelector.showModal();
  }
}

function closeDialogModal(modalSelector) {
  if (modalSelector && modalSelector.open) {
    modalSelector.close();
  }
}

/*Hamburger Dropdown dashboard.html and gallery.html*/
const hamburgerButton = document.getElementById("profile-wrapper");
const dropMenu = document.getElementById(
  hamburgerButton.getAttribute("aria-controls"),
);

hamburgerButton.addEventListener("click", () => {
  const isHidden = hamburgerButton.getAttribute("aria-expanded") === "true";
  hamburgerButton.setAttribute("aria-expanded", String(!isHidden));
  dropMenu.hidden = isHidden;
  console.log(isHidden);
});
