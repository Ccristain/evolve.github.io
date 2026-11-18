const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("subject");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", (e) => {
  checkValidity();
});

function checkValidity() {
  if (!contactName.checkValidity()) {
    contactName.setCustomValidity("Enter Proper Name (Ex: Jacob Pogi)");
  }
  if (!contactEmail.checkValidity()) {
    contactName.setCustomValidity(
      "Enter Proper Email (Ex: jacobpogi@gmail.com)",
    );
  }
  if (!contactMessage.checkValidity()) {
    contactName.setCustomValidity(
      "Enter Proper Message (Ex: Jacob ang pogi pogi mo)",
    );
  }
}
