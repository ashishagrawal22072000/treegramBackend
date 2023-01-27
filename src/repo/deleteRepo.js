import mongoose from "mongoose";

class DeleteRepo {
    constructor(model) {
        this.model = model;
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

export default DeleteRepo;
