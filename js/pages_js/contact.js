// Initialize EmailJS
emailjs.init({
  publicKey: "4AVBSKb6jQCR-hc5M",
});

const form = document.getElementById("contact-form");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("subject");
const submitBtn = document.getElementById("submit-btn");
const status = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  /*Checks if all input is valid then return bolean*/
  const isValid = checkValidity();
  /*Send Email*/
  if (isValid) {
    sendEmail();
  }
});

function checkValidity() {
  let isNameValid = contactName.checkValidity();
  let isEmailValid = contactEmail.checkValidity();
  let isMessageValid = contactMessage.checkValidity();
  if (!isNameValid) {
    contactName.setCustomValidity("Enter Proper Name (Ex: Jacob Pogi)");
  }
  if (!isEmailValid) {
    contactEmail.setCustomValidity(
      "Enter Proper Email (Ex: jacobpogi@gmail.com)",
    );
  }
  if (!isMessageValid) {
    contactMessage.setCustomValidity(
      "Enter Proper Message (Ex: Jacob ang pogi pogi mo)",
    );
  }
  if (isNameValid && isEmailValid && isMessageValid) {
    return true;
  } else {
    return false;
  }
}

async function sendEmail() {
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  try {
    await emailjs.sendForm("service_e5c27yn", "template_oor1l2k", form);
    status.textContent =
      "Your message has been sent successfully! Thank you for reaching out. We'll get back to you soon.";
    form.reset();
  } catch (error) {
    console.log(error);
    status.textContent = "Failed to send your message. Please try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
}
