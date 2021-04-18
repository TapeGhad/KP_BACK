const CrudService = require("../crud/crud.service");

class UsersService extends CrudService {
  constructor(
    usersRepository,
    pairsRepository,
    bcrypt,
    email,
    errors
  ) {
    super(usersRepository, errors);
    this.pairsRepository = pairsRepository;
    this.bcrypt = bcrypt;
    this.sendMessageOnEmail = email;
    this.errors = errors;
  }

  async changeEmailNotif(req) {
    return this.repository.updateOne({email: req.info.email}, {$set: {emailNotif: req.body.emailNotif}});
  }
}

module.exports = UsersService;
