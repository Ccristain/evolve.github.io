const folders = document.querySelectorAll(".folder");

folders.forEach((folder) => {
  folder.addEventListener("click", () => {
    window.location.href = "./gallery.html";
  });
});
