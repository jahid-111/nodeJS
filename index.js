const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  return res.send(`Hello  From Home page ${req.query.name}`);
});

app.get("/about", (req, res) => {
  return res.send("hello  From About Page");
});
const port = 8000;

myServer = http.createServer(app);

myServer.listen(port, () => console.log("On Server"));
