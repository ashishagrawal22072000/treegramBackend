import mongoose from "mongoose";

class CreateRepo {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    return await this.model.create(data);
  }
}

export default CreateRepo;
