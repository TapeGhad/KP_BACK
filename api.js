
module.exports = (
  usersService,
  authenticationService,
  express
) => {
  const router = express.Router();

  const usersController = require("./modules/users/users.controller")(
    usersService
  );

  const authController = require("./modules/authentication/authentication.controller")(
    authenticationService
  );

  router.use("/users", usersController);
  router.use("/auth", authController);

  return router;
};
