const toolBtn = document.getElementById("toolset");
const toolMenu = document.getElementById("tool-menu");

if (toolBtn) {
  toolBtn.addEventListener("click", () => {
    toolMenu.classList.toggle("menu-active");
  });
}

/*close create folder modal*/
const modalWrapper = document.getElementById("create-folder-modal-wrapper");
function closeModal(wrapper) {
  const wrapperId = document.getElementById(wrapper);
  event.preventDefault();
  wrapperId.classList.remove("display-modal");
}

function openModal(wrapper) {
  const wrapperId = document.getElementById(wrapper);
  wrapperId.classList.add("display-modal");
}
function clearImageInput() {
  const folderInput = document.querySelector(".modal");
  if (folderInput) {
    folderInput.value = "";
  }
}
/*Reusable Dialog Modal */
/*Upload Modal */
const uploadTool = document.getElementById("openUploadModal");
const closeUploadModalBtn = document.getElementById("closeUploadModal");
if (uploadTool && closeUploadModalBtn) {
  uploadTool.addEventListener("click", () => openDialogModal(modalWrapper));
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
