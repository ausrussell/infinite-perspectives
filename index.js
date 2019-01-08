const express = require("express");
const app = express();

const fs = require("fs");
const request = require("request");
//
const picturesDir = "./static/images/user";

app.get("/readdir", (req, res) => {
  let filesArray = [];
  fs.readdir(picturesDir, (err, files) => {
    console.log("files", files);
    files.forEach(file => {
      filesArray.push(file);
    });
    res.send(filesArray);
  });
});

app.use(express.static("static"));

app.listen(5000);
