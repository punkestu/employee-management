const express = require("express");
const cors = require("cors");
const route = require("./route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(route);
if (process.env["NODE_ENV"] === "production") {
  app.use(express.static(__dirname + "/client/dist"));
}

app.listen(process.env["PORT"] || 3000, () => {
  console.log("Server is running on port 3000");
});
