const jwt = require("jsonwebtoken");
// import * as jwt from "jsonwebtoken";
console.log("This is Jupiter");
const loginScreenElement = document.getElementById("login-screen");
const greetingUserContainer = document.getElementById("greeting-user");
loginScreenElement.style.display = "none";
greetingUserContainer.style.display = "none";

function onSubmit(event) {
  console.log(event);
  const username = event.target[0].value;

  const password = event.target[1].value;

  console.log(username, password);
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
    });

  return false;
}
function openLoginScreen() {
  loginScreenElement.style.display = "block";
}
