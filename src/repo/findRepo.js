import mongoose from "mongoose";

class FindRepo {
  constructor(model) {
    this.model = model;
  }

  async find(query, limit = 0, skip = 0) {
    return await this.model
      .find({
        $or: [{ username: query }, { email: query }, { phone: query }],
      })
      .limit(limit)
      .skip(skip);
  }

  async findById(id) {
    return await this.model.findById(id);
  }
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
  async findByPhone(phone) {
    return await this.model.findOne({ phone });
  }
  async findByUsername(username, select = "") {
    return await this.model.findOne({ username }).select(select);
  }
  async findByQuery(query, attribute = "", populate = {}) {
    return await this.model
      .findOne(query)
      .select(attribute)
      .populate(populate?.model, populate?.attribute);
  }

  async findAll(query, attribute = "", limit = 0, skip = 0, populate = {}) {
    return await this.model
      .find(query)
      .select(attribute)
      .limit(limit)
      .skip(skip)
      .populate(populate?.model, populate?.attribute);
  }
  async findByPhone(phone, attribute = []) {
    if (attribute.length) {
      return await this.model
        .findOne({ phone })
        .select(attribute.map((attribute) => attribute));
    }
    return await this.model.findOne({ phone });
  }

  // async findByEmail(data) {
  //   return await this.model.findOne({ email: data.email });
  // }
}

export default FindRepo;
