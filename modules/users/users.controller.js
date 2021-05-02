const CrudController = require("../crud/crud.controller");
const jwt = require("jsonwebtoken");
class UsersController extends CrudController {
  constructor(usersService) {
    super(usersService);

    this.checkToken = this.checkToken.bind(this);
    this.changeEmailNotif = this.changeEmailNotif.bind(this);
    this.subjectsList = this.subjectsList.bind(this);
    this.becomeRep = this.becomeRep.bind(this);
    this.usersWithParams = this.usersWithParams.bind(this);
    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
    this.repInfo = this.repInfo.bind(this);
    this.newMaterial = this.newMaterial.bind(this);

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
      ],
      "/params": [
        {
          method: "post",
          cb: this.usersWithParams,
        },
      ],
      "/addFav": [
        {
          method: "post",
          cb: this.addFav,
        },
      ],
      "/removeFav": [
        {
          method: "post",
          cb: this.removeFav,
        },
      ],
      "/repInfo": [
        {
          method: "post",
          cb: this.repInfo,
        },
      ],
      "/newMaterial": [
        {
          method: "post",
          cb: this.newMaterial,
        },
      ],
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

  async repInfo(req, res) {
    const data = await this.service.repInfo(req);
    res.json(data);
  }

  async becomeRep(req, res) {
    const data =  await this.service.becomeRep(req);
    res.json(data);
  }

  async newMaterial(req, res) {
    const data =  await this.service.newMaterial(req);
    console.log(data);
    res.json(data);
  }

  async changeEmailNotif(req, res) {
    await this.service.changeEmailNotif(req);
    res.json({
      success: true
    });
  }

  async usersWithParams(req, res) {
    const data =  await this.service.usersWithParams(req);
    res.json([...data]);
  }

  async addFav(req, res) {
    const user =  await this.service.addFav(req);
    const token = await this.getToken(user);

    res.json({
      user,
      token,
    });
  }

  async removeFav(req, res) {
    const user =  await this.service.removeFav(req);
    const token = await this.getToken(user);

    res.json({
      user,
      token,
    });
  }

  async getToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: 60 * 60 * 24 * 10,
      }
    );
  }
}

module.exports = (usersService) => {
  const controller = new UsersController(usersService);

  return controller.router;
};
