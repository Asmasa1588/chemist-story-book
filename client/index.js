console.log("Jupiter is bothering Gypsy");
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
    });

  return false;
}
