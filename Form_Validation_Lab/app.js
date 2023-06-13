const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");

const errorID = document.getElementById("errorDisplay");

function validateUsername() {
  const username = usernameInput.value;
  const usernameRegex = /^(?!.*([A-Za-z]).*\1)[A-Za-z]+$/;

  if (username === "") {
    errorID.style.display = "block";
    errorID.innerText = "Username cannot be blank.";
  }

  if (username.length < 4) {
    errorID.style.display = "block";
    errorID.innerText = "Username must be at least four characters long.";
  }

  if (!usernameRegex.test(username)) {
    errorID.style.display = "block";
    errorID.innerText =
      "Username must contain at least two unique characters and cannot contain any special characters or whitespace.";
  }
}

function validateEmail() {
  const email = emailInput.value;

  if (email.includes("example.com")) {
    errorID.style.display = "block";
    errorID.innerText = "Email must not be from the domain 'example.com'.";
  }
}
