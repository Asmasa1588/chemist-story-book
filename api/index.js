const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = 3001;
const chemistStories = [
  {
    title: "Elephant toothpaste",
    content: "I blew up the lab",
  },
  {
    title: "nano technology fluid ",
    content: "this fluid is water resistent",
  },
];
const users = [
  {
    username: "jupiter",
    password: "123",
  },
  {
    username: "gypsy",
    password: "456",
  },
];
app.post("/login", function (req, res) {
  console.log(req.body);
  const foundUser = users.find(
    (currentUser) =>
      currentUser.username === req.body.username &&
      currentUser.password === req.body.password
  );
  if (foundUser) {
    const token = jwt.sign({ username: foundUser.username }, "secret");
    res.next(token);
  } else {
    res.status(401);
    res.send({ error: "either the username or password is incorrect" });
  }
});

const authenticate = (req, res, next) => {
  const authorizationProperty = req.headers.authorization;
  console.log("This is a middleware", authorizationProperty);
  if (!authorizationProperty) {
    res.status(401);
    res.send({ error: "Please, provide a json web token!" });
  }
  const token = authorizationProperty.split(" ");

  try {
    var decoded = jwt.verify(token, "secret");
    next();
  } catch (err) {
    // err
    res.status(401);
    res.send({ error: "Please, provide a valid json web token!" });
  }
};

// app.get : end point.(backend). we must have a call back function as a second parameter(ex.
//"/chemist-story", ), 2nd parameter starts with a coma and followed by an arrow.
//"/chemist-story": is the 1st parameter. we use coma to separate two parameters
app.get("/chemist-story", [authenticate], (req, res) => {
  console.log("This is the actual /chemist-story end point");
  res.send(chemistStories);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
