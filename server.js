const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { employeeSignup } = require("./controller/User_Signup");
const { employeeLogin } = require("./controller/User_Login");
const { employeeAuth, checkRole } = require("./middleware/Auth");
const routes = require("./Routes")

mongoose.connect("mongodb://127.0.0.1:27017/Role-based", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


const app = express();

app.use(bodyParser.json());

app.use(routes);

app.listen(4000, () => {
      console.log("Server is running on port 3000");
    });
    // https://code.pieces.app/blog/role-based-access-systems-in-nodejs