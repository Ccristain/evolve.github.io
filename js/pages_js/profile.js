const collapsible = document.getElementById("collapsible");
const toggleSidebar = document.getElementById("toggle-sidebar");
const asideButtons = document.querySelectorAll(".aside-button");

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
  const shouldExpand = collapsible.getAttribute("aria-expanded") !== "true";
  collapsible.setAttribute("aria-expanded", String(shouldExpand));
  document.body.classList.toggle("sidebar-expanded", shouldExpand);
  setButtonContent(shouldExpand);
});

function setButtonContent(isExpanded) {
  toggleSidebar.innerHTML = `
    <img
      src="../assets/icons/arrow-right-dark.svg"
      class="icon"
      alt=""
      aria-hidden="true"
    />
    <span>Collapse</span>
  `;

  asideButtons.forEach((button, index) => {
    const item = asideItems[index];
    button.setAttribute("aria-label", item.text);
    button.dataset.tooltip = item.text;
    button.innerHTML = `
      <img
        src="${item.img}"
        class="icon"
        alt=""
        aria-hidden="true"
      />
      <span>${item.text}</span>
    `;
  });
}

setButtonContent(false);
