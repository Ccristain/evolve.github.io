const otpForm = document.getElementById("otp-form");
const verifyBtn = document.getElementById("verify-btn");

otpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  window.location.href = "../pages/dashboard.html";
});
