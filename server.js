const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const jwt = require("jsonwebtoken");
const YAML = require("yamljs");
const bcrypt = require("bcryptjs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Helpers
const hash = require("./helpers/hash");
const errors = require("./helpers/errors");
const wrap = require("./helpers/wrap");
const sendMessageOnEmail = require("./helpers/nodemailer");


const UsersService = require("./modules/users/users.service");
const AuthenticationService = require("./modules/authentication/authentication.service");

module.exports = (db) => {
  const app = express();

  // Services
  const usersService = new UsersService(
    db.users,
    db.subject,
    bcrypt,
    sendMessageOnEmail,
    errors
  );

  const authenticationService = new AuthenticationService(
    db.users,
    sendMessageOnEmail,
    hash,
    errors
  );

  // Controllers
  const logger = require("./global-controllers/logger");
  const authenticator = require("./global-controllers/authenticator")(
    jwt,
    wrap,
    errors
  );

  const error = require("./global-controllers/error");

  const apiController = require("./api")(
    usersService,
    authenticationService,
    express
  );

  // Mounting
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(bodyParser.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/api", logger);
  app.use("/api", authenticator);
  app.use("/api", apiController);
  app.use("/api", error);

  return app;
};
