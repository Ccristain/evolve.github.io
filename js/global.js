/*Header Scroll*/
const primaryHeader = document.querySelector(".primary-header");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
if (primaryHeader) {
  primaryHeader.before(scrollWatcher);

  const navObserver = new IntersectionObserver((entries) => {
    primaryHeader.classList.toggle("sticking", !entries[0].isIntersecting);
  });

  navObserver.observe(scrollWatcher);
}

/*Navigation */
const galleryLogo = document.getElementById("galleryLogo");
const dashboardLogo = document.getElementById("dashboardLogo");
if (galleryLogo) {
  galleryLogo.addEventListener("click", () => {
    toHome();
    console.log("clicked");
  });
}
if (dashboardLogo) {
  dashboardLogo.addEventListener("click", () => toHome());
}

function toHome() {
  window.location.href = "../index.html";
}
