/* Change View */
const tabs = document.querySelectorAll("button[role='tab']");
const panel = document.querySelectorAll("form[role='tabpanel']");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.setAttribute("aria-selected", "false");
    });

    panel.forEach((p) => {
      p.hidden = true;
    });

    tab.setAttribute("aria-selected", "true");

    document.getElementById(tab.getAttribute("aria-controls")).hidden = false;
  });
});

/* Navigation towards Dashboard */
const trueLoginBtn = document.getElementById("log-in-btn");
const trueSignUpBtn = document.getElementById("sign-up-btn");

const nameLogInput = document.getElementById("username");
const passLogInput = document.getElementById("password");
const rememberBox = document.getElementById("remember");
trueLoginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    nameLogInput.checkValidity() &&
    passLogInput.checkValidity() &&
    rememberBox.checked
  ) {
    window.location.href = "./dashboard.html";
  } else {
    passLogInput.reportValidity();
    nameLogInput.reportValidity();
    rememberBox.reportValidity();
  }
});

const nameSignInput = document.getElementById("username-apply");
const emailSignInput = document.getElementById("email");
const passSignInput = document.getElementById("pass-apply");
const confirmPassInput = document.getElementById("confirm-pass-apply");

trueSignUpBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    nameSignInput.checkValidity() &&
    emailSignInput.checkValidity() &&
    passSignInput.checkValidity() &&
    confirmPassInput.checkValidity()
  ) {
    window.location.href = "./dashboard.html";
  } else {
    confirmPassInput.reportValidity();
    passSignInput.reportValidity();
    emailSignInput.reportValidity();
    nameSignInput.reportValidity();
  }
});
