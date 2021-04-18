class CrudService {
  constructor(repository, errors) {
    this.repository = repository;
    this.errors = errors;
  }
  
  async read(id) {
    const item = await this.repository.findById(id);
    if (!item) {
      throw this.errors.notFound;
    }
    return item;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, data) {
    return await this.repository.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.repository.findByIdAndDelete(id);
  }
}

module.exports = CrudService;
