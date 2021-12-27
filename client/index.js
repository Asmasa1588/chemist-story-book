console.log("Jupiter is bothering Gypsy");
function onSubmit(event) {
  console.log(event);
  const username = event.target[0].value;

  const password = event.target[1].value;

  console.log(username, password);

  return false;
}
