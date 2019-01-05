import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

// import Scene from "scene";
import Scene from "./scene";

// const express = require("express");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const fs = require("fs");
//
// const picturesDir = "images";

// app.get("/image_files", (req, res) => {
//   // fs.readdir(picturesDir).forEach(file => {
//   //   console.log(file);
//   // });
//   res.send("testtt");
// });
// app.listen(PORT);
ReactDOM.render(<Scene />, document.querySelector("#root"));
// export default Scene;
// const App = function() {
//   const buttext = "heyyyy";
//   return (
//     <div>
//       <label className="label" htmlFor="name">
//         Enter name:
//       </label>
//       <input id="name" type="text" />
//       <button style={{ backgroundColor: "blue", color: "white" }}>butt</button>
//     </div>
//   );
// };
//
// ReactDOM.render(<App />, document.getElementById("root"));
