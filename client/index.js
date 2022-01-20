const jwt = require("jsonwebtoken");
const chemistStoriesContainer = document.getElementById(
  "chemist-stories-container"
);
const loginRegisterButtons = document.getElementById("login-register-buttons");
const loginScreenElement = document.getElementById("login-screen");
const greetingUserContainer = document.getElementById("greeting-user");
loginScreenElement.style.display = "none";
greetingUserContainer.style.display = "none";
chemistStoriesContainer.style.display = "none";

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
      chemistStoriesContainer.style.display = "block";
      const chemistStoriesList = document.getElementById(
        "chemist-stories-list"
      );
      fetch("http://localhost:3001/chemist-story", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((chemistStories) => {
          console.log({ data: chemistStories });
          const chemistStoriesListElement = document.getElementById(
            "chemist-stories-list"
          );
          chemistStoriesListElement.innerHTML = chemistStories
            .map((chemistStory) => {
              return `<li class="chemist-story-title-element">${chemistStory.title}</li>`;
            })
            .join("");
        });
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

document.getElementsByClassName("chemist-story-title-element").addEventListener;
