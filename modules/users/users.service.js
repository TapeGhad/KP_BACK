const CrudService = require("../crud/crud.service");

class UsersService extends CrudService {
  constructor(
    usersRepository,
    subjectsRepository,
    bcrypt,
    email,
    errors
  ) {
    super(usersRepository, errors);
    this.subjectsRepository = subjectsRepository;
    this.bcrypt = bcrypt;
    this.sendMessageOnEmail = email;
    this.errors = errors;
  }

  async changeEmailNotif(req) {
    return this.repository.updateOne({email: req.info.email}, {$set: {emailNotif: req.body.emailNotif}});
  }

  async addFav(req) {
    return this.repository.findByIdAndUpdate(req.info.id, {$push: {faivourites: req.body.id}}, {new: true})
  }

  async removeFav(req) {
    return this.repository.findByIdAndUpdate(req.info.id, { $pull: {faivourites: req.body.id } }, {new: true})
  }

  async subjectsList(req) {
    return this.subjectsRepository.find({});
  }

  async usersWithParams(req) {
    console.log(req.body);
    if (req.body.user === 'rep') {
      try{
        let data;
        data = await this.repository.find({role: 'rep'}).skip(req.body.params.itemsPerPage * (req.body.params.page - 1)).limit(req.body.params.itemsPerPage);
        return data;
      } catch (e) {
        console.log(e);
      }
    }
    return [];
  }

  async becomeRep(req) {
    const user = await this.repository.findOne({email: req.info.email});
    user.rating = 3;
    user.subject = req.body.subject;
    user.expa = req.body.expa;
    user.comeFrom = req.body.comeFrom;
    user.emailNotif = req.body.emailNotif;
    user.personalMsg = req.body.personalMsg;
    user.about = req.body.about;
    user.price = req.body.price;
    user.role = 'rep';
    user.save();
    const subject = await this.subjectsRepository.findOne({name: req.body.subject});
    subject.averagePrice = parseFloat(((subject.averagePrice + req.body.price) / 2).toFixed(1));
    subject.repetitors = ++subject.repetitors;
    subject.save();
    return {succes: true};
  }
}

module.exports = UsersService;
