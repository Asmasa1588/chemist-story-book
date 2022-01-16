const jwt = require("jsonwebtoken");
const loginRegisterButtons = document.getElementById("login-register-buttons");
const loginScreenElement = document.getElementById("login-screen");
const greetingUserContainer = document.getElementById("greeting-user");
loginScreenElement.style.display = "none";
greetingUserContainer.style.display = "none";


function onLoginSubmit(event) {
  event.preventDefault();

  const username = event.target[0].value;

  const password = event.target[1].value;

  fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const token = response.token;
      localStorage.setItem("token", JSON.stringify(token));
      greetingUserContainer.style.display = "block";
      loginScreenElement.style.display = "none";
      const decoded = jwt.verify(token, "secret");
      console.log({ decoded });
      greetingUserContainer.innerText = `Greetings, ${decoded.username}!`;
      loginRegisterButtons.style.display = "none";
    });

  return false;
}
document.getElementById("login-form").addEventListener("submit", onLoginSubmit);

function openLoginScreen() {
  loginScreenElement.style.display = "block";
}
document
  .getElementById("login-button")
  .addEventListener("click", openLoginScreen);
