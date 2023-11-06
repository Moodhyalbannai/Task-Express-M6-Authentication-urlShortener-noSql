const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config");
const morgan = require("morgan");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const app = express();

require("dotenv").config();

connectDb();

//BEFORE ROUTES MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

//ROUTES
app.use("/urls", urlRoutes);
app.use(userRoutes);

//AFTER ROUTES MIDDLEWARES
app.use(notFoundHandler);
app.use(errorHandler);

connectDb();
app.listen(config.PORT, () => {
  console.log("The application is running on localhost", config.PORT);
});
