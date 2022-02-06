const jwt = require("jsonwebtoken");
const chemistStoriesContainer = document.getElementById(
  "chemist-stories-container"
);
const loginRegisterButtons = document.getElementById("login-register-buttons");
const loginScreenElement = document.getElementById("login-screen");
const greetingUserContainer = document.getElementById("greeting-user");
const createStoryScreen = document.getElementById(
  "create-chemist-story-screen"
);
loginScreenElement.style.display = "none";
greetingUserContainer.style.display = "none";
chemistStoriesContainer.style.display = "none";
createStoryScreen.style.display = "none";

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
      const oldHTMLContent = greetingUserContainer.innerHTML;
      greetingUserContainer.innerHTML = `<div> Greetings, ${decoded.username}!${oldHTMLContent}</div>`;
      document
        .getElementById("create-story-icon")
        .addEventListener("click", openCreateStoryScreen);

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
          renderStories(chemistStories);
        });
    });

  return false;
}
document.getElementById("login-form").addEventListener("submit", onLoginSubmit);

function onStorySubmit(event) {
  event.preventDefault();

  const title = event.target[0].value;

  const content = event.target[1].value;
  console.log({ title, content });

  const token = JSON.parse(localStorage.getItem("token"));
  //this is the end point/create-story
  fetch("http://localhost:3001/create-story", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  })
    .then((response) => response.json())
    .then((chemistStories) => {
      renderStories(chemistStories);
    });
}
document
  .getElementById("create-story-form")
  .addEventListener("submit", onStorySubmit);

function openLoginScreen() {
  loginScreenElement.style.display = "block";
}
function openCreateStoryScreen() {
  console.log("create chemist story");
  createStoryScreen.style.display = "block";
}
document
  .getElementById("login-button")
  .addEventListener("click", openLoginScreen);

function renderStories(chemistStories) {
  console.log({ data: chemistStories });
  const chemistStoriesListElement = document.getElementById(
    "chemist-stories-list"
  );

  chemistStoriesListElement.innerHTML = chemistStories
    .map((chemistStory) => {
      return `<li class="chemist-story-title-element">${chemistStory.title}</li>`;
    })
    .join("");

  const storiesTitleElements = document.getElementsByClassName(
    "chemist-story-title-element"
  );

  for (const titleElement of storiesTitleElements) {
    titleElement.addEventListener("click", () => {
      console.log("click", titleElement.textContent);
      const foundClickedChemistStory = chemistStories.find((story) => {
        return story.title === titleElement.textContent;
      });
      console.log("the whole story", foundClickedChemistStory);
      const viewTitleElement = document.getElementsByClassName(
        "chemist-story-view-title"
      )[0];
      viewTitleElement.innerText = foundClickedChemistStory.title;

      const viewContentElement = document.getElementsByClassName(
        "chemist-story-view-content"
      )[0];
      viewContentElement.innerText = foundClickedChemistStory.content;
    });
  }
}
