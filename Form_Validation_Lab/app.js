// REGISTRATION FORM VALIDATION/SUBMISSION
const registrationForm = document.getElementById("registration");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordRepeatInput = document.getElementById("passwordRepeat");
const termsCheckbox = document.getElementById("termsCheckbox");

const errorID = document.getElementById("errorDisplay");
const successDisplay = document.getElementById("successDisplay");

const storedUsernames = JSON.parse(localStorage.getItem("users")) || [];

function validateUsername() {
  const username = usernameInput.value;
  const usernameRegex = /^(?!.*([^\s])\1)[a-zA-Z0-9]{4,}$/;
  let errorMessage = "";

  if (username === "") {
    errorMessage = "Username cannot be blank.";
  } else if (username.length < 4) {
    errorMessage = "Username must be at least four characters long.";
  } else if (!usernameRegex.test(username)) {
    errorMessage =
      "Username must contain at least two unique consecutive characters and cannot contain any special characters or whitespace.";
  } else if (username) {
    for (let i = 0; i < storedUsernames.length; i++) {
      const currUser = storedUsernames[i];
      if (currUser.username === username) {
        errorMessage = "That username is already taken.";
        break;
      }
    }
  }

  if (errorMessage !== "") {
    errorID.style.display = "block";
    errorID.innerText = errorMessage;
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
  } else if (password.toLowerCase().includes(usernameInput.value)) {
    errorID.style.display = "block";
    errorID.innerText = "Passwords cannot contain the username.";
  } else {
    errorID.style.display = "none";
  }
}

function validatePasswordMatch() {
  const passwordMatch = passwordRepeatInput.value;

  if (passwordMatch !== passwordInput.value) {
    errorID.style.display = "block";
    errorID.innerText = "Both passwords must match.";
  } else if (passwordMatch.toLowerCase().includes(usernameInput.value)) {
    errorID.style.display = "block";
    errorID.innerText = "Passwords cannot contain the username.";
  } else {
    errorID.style.display = "none";
  }
}

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //CHECK IF TERMS HAVE BEEN ACCEPTED
  if (!termsCheckbox.checked) {
    errorID.style.display = "block";
    errorID.innerText = "You must agree to the terms of use.";
    return;
  } else {
    errorID.style.display = "none";
  }

  //SAVE NEW USER TO USERS ARRAY
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

  //RESET INPUT FIELDS
  username.value = "";
  email.value = "";
  password.value = "";
  passwordRepeat.value = "";
  termsCheckbox.checked = false;

  //DISPLAY USER ADDED SUCCESS MESSAGE
  successDisplay.style.display = "block";
  successDisplay.innerText = "You have successfully completed your submission!";

  setTimeout(() => {
    successDisplay.style.display = "none";
  }, 1000);
});

// LOGIN FORM VALIDATION/SUBMISSION
const loginForm = document.getElementById("login");
const loginFormUsernameInput = document.getElementById("loginFormUsername");
const loginFormPasswordInput = document.getElementById("loginFormPassword");
const persistCheckbox = document.getElementById("persistCheckbox");

// Username validation should run on submit.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginFormUsername = loginFormUsernameInput.value;
  const loginFormPassword = loginFormPasswordInput.value;

  //   The username and password cannot be blank.
  if (loginFormUsername === "" || loginFormPassword === "") {
    errorID.style.display = "block";
    errorID.innerText = "Username or password cannot be blank.";
  }

  // loop through to check if username exists and password matches
  if (loginFormUsername) {
    // keep track if username exists and correct password
    let usernameExists = false;
    let correctPassword = false;
    for (let i = 0; i < storedUsernames.length; i++) {
      const currUser = storedUsernames[i];
      if (loginFormUsername.toLowerCase() === currUser.username) {
        usernameExists = true;
      }
      if (
        loginFormPassword.toLowerCase() === currUser.password &&
        persistCheckbox.checked
      ) {
        correctPassword = true;
        successDisplay.style.display = "block";
        successDisplay.innerText =
          "You have successfully logged in! Welcome back! You will stay logged in even after closing the browser.";
        loginFormUsernameInput.value = "";
        loginFormPasswordInput.value = "";
        // return;
      } else if (
        loginFormPassword.toLowerCase() === currUser.password &&
        !persistCheckbox.checked
      ) {
        correctPassword = true;
        successDisplay.style.display = "block";
        successDisplay.innerText = "You have successfully logged in!";
        loginFormUsernameInput.value = "";
        loginFormPasswordInput.value = "";
        return;
      }
    }
    if (!usernameExists) {
      errorID.style.display = "block";
      errorID.innerText = "That username does not exist";
    } else if (loginFormUsername && !loginFormPassword) {
      errorID.style.display = "block";
      errorID.innerText = "Please enter a password";
    } else if (loginFormUsername && !correctPassword) {
      errorID.style.display = "block";
      errorID.innerText = "Incorrect password";
    }
  }
});
