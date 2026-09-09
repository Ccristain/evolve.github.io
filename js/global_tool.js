const toolBtn = document.getElementById("toolset");
const toolMenu = document.getElementById("tool-menu");

toolBtn.addEventListener("click", () => {
  toolMenu.classList.toggle("menu-active");
});

/*close create folder modal*/
const modalWrapper = document.getElementById("create-folder-modal-wrapper");
function closeModal() {
  event.preventDefault();
  modalWrapper.classList.remove("display-modal");
}
function openModal() {
  modalWrapper.classList.add("display-modal");

  const folderInput = document.querySelector(".modal");
  folderInput.value = "";
}
