// REGISTRATION FORM VALIDATION/SUBMISSION
const submitButton = document.getElementById("submitButton");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordRepeatInput = document.getElementById("passwordRepeat");
const termsCheckbox = document.getElementById("termsCheckbox");

const errorID = document.getElementById("errorDisplay");
const successDisplay = document.getElementById("successDisplay");

function validateUsername() {
  const username = usernameInput.value;
  const usernameRegex = /^(?!.*([^\s])\1)[a-zA-Z0-9]{4,}$/;

  if (username === "") {
    errorID.style.display = "block";
    errorID.innerText = "Username cannot be blank.";
  } else if (username.length < 4) {
    errorID.style.display = "block";
    errorID.innerText = "Username must be at least four characters long.";
  } else if (!usernameRegex.test(username)) {
    errorID.style.display = "block";
    errorID.innerText =
      "Username must contain at least two unique consecutive characters and cannot contain any special characters or whitespace.";
  } else {
    errorID.style.display = "none";
  }
}

function validateEmail() {
  const email = emailInput.value;

  if (!email.includes("@")) {
    errorID.style.display = "block";
    errorID.innerText = "Please include a valid email";
  } else if (email.includes("example.com")) {
    errorID.style.display = "block";
    errorID.innerText = "Email must not be from the domain 'example.com'.";
  } else {
    errorID.style.display = "none";
  }
}

function validatePassword() {
  const password = passwordInput.value;

  console.log(password);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]:;'"|\\<>?,./]).{12,}$/;

  if (password.length < 12) {
    errorID.style.display = "block";
    errorID.innerText = "Passwords must be at least 12 characters long.";
  } else if (password.toLowerCase().includes("password")) {
    errorID.style.display = "block";
    errorID.innerText = "Passwords cannot contain the word 'password'.";
  } else if (!passwordRegex.test(password)) {
    errorID.style.display = "block";
    errorID.innerText =
      "Passwords must have at least one uppercase and one lowercase letter and at least one number and one special character.";
  } else if (password.includes(usernameInput.value)) {
    errorID.style.display = "block";
    errorID.innerText = "Passwords cannot contain the username.";
  } else {
    errorID.style.display = "none";
  }
}

function validatePasswordMatch() {
  const passwordMatch = passwordRepeatInput.value;
  console.log(passwordMatch);

  if (passwordMatch !== passwordInput.value) {
    errorID.style.display = "block";
    errorID.innerText = "Both passwords must match.";
  } else if (passwordMatch.includes(usernameInput.value)) {
    errorID.style.display = "block";
    errorID.innerText = "Passwords cannot contain the username.";
  } else {
    errorID.style.display = "none";
  }
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!termsCheckbox.checked) {
    errorID.style.display = "block";
    errorID.innerText = "You must agree to the terms of use.";
  } else {
    errorID.style.display = "none";
  }

  const usersString = localStorage.getItem("users");
  let users = [];

  if (usersString) {
    users = JSON.parse(usersString);
  }

  const newUser = {
    username: username.value.toLowerCase(),
    email: email.value.toLowerCase(),
    password: password.value.toLowerCase(),
  };

  users.push(newUser);

  const updatedUsersString = JSON.stringify(users);

  localStorage.setItem("users", updatedUsersString);

  username.value = "";
  email.value = "";
  password.value = "";
  passwordRepeat.value = "";
  termsCheckbox.checked = false;

  successDisplay.style.display = "block";
  successDisplay.innerText = "You have successfully completed your submission!";
});

// LOGIN FORM VALIDATION/SUBMISSION
