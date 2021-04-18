class AuthenticationService {
  constructor(
    usersRepository,
    sendMessageOnEmail,
    hash,
    errors
  ) {
    this.usersRepository = usersRepository;
    this.sendMessageOnEmail = sendMessageOnEmail;
    this.hash = hash;
    this.errors = errors;
  }

  async login(data) {
    const user = await this.usersRepository.findOne({
      email: data.email,
    });

    if (!user || !this.hash.isValid(data.password, user.password)) {
      throw this.errors.wrongCredentials;
    }

    return user;
  }

  async register(data) {
    const potentialUser = await this.usersRepository.findOne({
      email: data.email,
    });

    if (potentialUser) {
      throw this.errors.notUniqueValue;
    }

    const passHash = this.hash.get(data.password);

    const user = await this.usersRepository.create({
      email: data.email,
      password: passHash,
      role: 'user',
    });

    return user;
  }
}

module.exports = AuthenticationService;
