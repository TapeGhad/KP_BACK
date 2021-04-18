const CrudController = require("../crud/crud.controller");
const jwt = require("jsonwebtoken");

class AuthenticationController extends CrudController {
  constructor(authenticationService) {
    super(authenticationService);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);

    this.routes = {
      "/login": [
        {
          method: "post",
          cb: this.login,
        },
      ],
      "/register": [
        {
          method: "post",
          cb: this.register,
        },
      ],
      "/logout": [
        {
          method: "post",
          cb: this.logout,
        },
      ]
    };

    this.registerRoutes();
  }

  async login(req, res) {
    const user = await this.service.login(req.body);
    const token = await this.getToken(user);
    
    res.json({
      user,
      token,
    });
  }

  async register(req, res) {
    const user = await this.service.register(req.body);
    const token = await this.getToken(user);

    res.json({
      user,
      token,
    });
  }

  async logout(req, res) {
    res.json({
      success: true,
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

module.exports = (authenticationService) => {
  const controller = new AuthenticationController(
    authenticationService
  );

  return controller.router;
};
