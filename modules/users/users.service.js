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
    await this.repository.findByIdAndUpdate(req.body.id, {$push: {faivouritesStud: req.info.id}}, {new: true})
    return this.repository.findByIdAndUpdate(req.info.id, {$push: {faivourites: req.body.id}}, {new: true})
  }

  async removeFav(req) {
    await this.repository.findByIdAndUpdate(req.body.id, { $pull: {faivouritesStud: req.info.id } }, {new: true})
    return this.repository.findByIdAndUpdate(req.info.id, { $pull: {faivourites: req.body.id } }, {new: true});
  }

  async subjectsList(req) {
    return this.subjectsRepository.find({});
  }

  async getUserInfo(req) {
    return this.repository.findById(req.info.id);
  }

  async repInfo(req) {
    const rep = await this.repository.findById(req.body.id).lean();
    rep.faivouritesStud = await Promise.all(rep.faivouritesStud.map((id) => {
      return this.repository.findById(id);
    }));
    rep.currentStud = await Promise.all(rep.currentStud.map((id) => {
      return this.repository.findById(id);
    }));
    return rep;
  }

  async newMaterial(req) {
    return this.repository.findByIdAndUpdate(req.info.id, { $push: {materials: req.body.material } }, {new: true});
  }

  async deleteMaterial(req) {
    return this.repository.findByIdAndUpdate(req.info.id, { $pull: {materials: { title: req.body.title} } }, {new: true});
  }

  async acceptUser(req) {
    await this.repository.findByIdAndUpdate(req.info.id, {$push: {currentStud: req.body.id}}, {new: true});
    await this.repository.findByIdAndUpdate(req.info.id, {$pull: {faivouritesStud: req.body.id}}, {new: true});
    await this.repository.findByIdAndUpdate(req.body.id, {$pull: {faivourites: req.info.id}}, {new: true});
    return await this.repository.findByIdAndUpdate(req.body.id, {$push: {teachers: req.info.id}}, {new: true});
  }

  async rejectUser(req) {
    await this.repository.findByIdAndUpdate(req.info.id, {$pull: {faivouritesStud: req.body.id}}, {new: true});
    return await this.repository.findByIdAndUpdate(req.body.id, {$pull: {faivourites: req.info.id}}, {new: true});
  }

  async removeUser(req) {
    await this.repository.findByIdAndUpdate(req.info.id, {$pull: {currentStud: req.body.id}}, {new: true});
    return await this.repository.findByIdAndUpdate(req.body.id, {$pull: {teachers: req.info.id}}, {new: true});
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
    user.phone = req.body.phone;
    user.save();
    const subject = await this.subjectsRepository.findOne({name: req.body.subject});
    subject.averagePrice = parseFloat(((subject.averagePrice + req.body.price) / 2).toFixed(1));
    subject.repetitors = ++subject.repetitors;
    subject.save();
    return {succes: true};
  }
}

module.exports = UsersService;
