import mongoose from "mongoose";

class UpdateRepo {
  constructor(model) {
    this.model = model;
  }
  async update(query, data) {
    return await this.model.update(query, data);
  }
  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data);
  }
}

export default UpdateRepo;
