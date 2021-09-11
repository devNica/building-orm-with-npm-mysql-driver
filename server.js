require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { api_routes } = require("./api/index");
const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const routes = api_routes();

for (let route of routes) {
  const { path = null, controller = null } = route;

  if (path && controller) {
    app.use(path, controller);
  }
}

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
