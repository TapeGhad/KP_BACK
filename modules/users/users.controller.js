const CrudController = require("../crud/crud.controller");

class UsersController extends CrudController {
  constructor(usersService) {
    super(usersService);

    this.checkToken = this.checkToken.bind(this);
    this.changeEmailNotif = this.changeEmailNotif.bind(this);
    this.subjectsList = this.subjectsList.bind(this);
    this.becomeRep = this.becomeRep.bind(this);

    this.routes = {
      "/check": [
        {
          method: "get",
          cb: this.checkToken,
        },
      ],
      "/subjectsList": [
        {
          method: "get",
          cb: this.subjectsList,
        },
      ],
      "/becomeRep": [
        {
          method: "post",
          cb: this.becomeRep,
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

  async subjectsList(req, res) {
    const data =  await this.service.subjectsList(req);
    res.json(data);
  }

  async becomeRep(req, res) {
    const data =  await this.service.becomeRep(req);
    res.json(data);
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
