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
        });
    });

  return false;
}
document.getElementById("login-form").addEventListener("submit", onLoginSubmit);

function openLoginScreen() {
  loginScreenElement.style.display = "block";
}
function openCreateStoryScreen() {
  console.log("create chemist story");
}
document
  .getElementById("login-button")
  .addEventListener("click", openLoginScreen);
