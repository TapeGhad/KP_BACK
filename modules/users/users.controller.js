const CrudController = require("../crud/crud.controller");

class UsersController extends CrudController {
  constructor(usersService) {
    super(usersService);

    this.checkToken = this.checkToken.bind(this);
    this.changeEmailNotif = this.changeEmailNotif.bind(this);

    this.routes = {
      "/check": [
        {
          method: "get",
          cb: this.checkToken,
        },
      ],
      "/changeEmailNotif": [
        {
          method: "post",
          cb: this.changeEmailNotif,
        },
      ]
    };
    this.registerRoutes();
  }

  async checkToken(req, res) {
    res.json({
      success: true
    });
  }

  async changeEmailNotif(req, res) {
    await this.service.changeEmailNotif(req);
    res.json({
      success: true
    });
  }
}

module.exports = (usersService) => {
  const controller = new UsersController(usersService);

  return controller.router;
};
