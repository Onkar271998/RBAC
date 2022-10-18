const express = require("express");
const UserModel = require("./user.model");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  const user = new UserModel({
    username,
    age: 23,
    password,
    role, 
  });

  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    "SECRET123"
  );
  return res.send({ token });
});

app.delete("/blog/:blogid", (req, res) => {
  //const { id } = req.params;
  const token = req.headers["authorization"].split(" ")[1];
  const { role } = jwt.verify(token, "SECRET123");
  if (role !== "admin") {
    return res.status(403).send("You don't have access to delete a blog");
  }
  return res.status(200).send("blog deleted successfully");
});

mongoose.connect("mongodb://localhost:27017/Nem201").then(() => {
  app.listen(8080, () => {
    console.log("server started on port 8080");
  });
});
