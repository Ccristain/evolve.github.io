/* Change View */
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

signupBtn.addEventListener("click", () => {
  signupForm.classList.add("open-form");
  loginForm.classList.add("close-form");
  loginBtn.classList.add("add-border");
  signupBtn.classList.add("remove-border");
});

loginBtn.addEventListener("click", () => {
  signupForm.classList.remove("open-form");
  loginForm.classList.remove("close-form");
  loginBtn.classList.remove("add-border");
  signupBtn.classList.remove("remove-border");
});

/* Navigation towards Dashboard */
const trueLoginBtn = document.getElementById("log-in-btn");
const trueSignUpBtn = document.getElementById("sign-up-btn");

trueLoginBtn.addEventListener("click", () => {
  event.preventDefault();

  window.location.href = "./dashboard.html";
});

trueSignUpBtn.addEventListener("click", () => {
  event.preventDefault();

  window.location.href = "./dashboard.html";
});
