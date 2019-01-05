const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
// const fs = require("fs");
//
// const picturesDir = "images";

app.get("/image_files", (req, res) => {
  // fs.readdir(picturesDir).forEach(file => {
  //   console.log(file);
  // });
  res.send("testtt");
});
app.listen(PORT);
