import FindRepo from "../repo/findRepo.js";

class CommonService {
  constructor(model) {
    this.model = model;
  }
  async findService(query = {}) {
    return await new FindRepo(this.model).find(query);
  }
  async getUserById(id) {
    return await new FindRepo(this.model).findById(id);
  }
}

export default CommonService;
