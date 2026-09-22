const toolBtn = document.getElementById("toolset");
const toolMenu = document.getElementById("tool-menu");

toolBtn.addEventListener("click", () => {
  toolMenu.classList.toggle("menu-active");
});

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

  const folderInput = document.querySelector(".modal");
  if (folderInput) {
    folderInput.value = "";
  }
}
