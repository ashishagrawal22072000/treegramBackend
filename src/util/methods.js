import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class Methods {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  async generateToken(data) {
    return jwt.sign(data, process.env.SECRETKEY, { expiresIn: "24h" });
  }
  async verifyPassword(data, password) {
    return bcrypt.compare(data.password, password);
  }
  async comparePassword(data, password) {
    return bcrypt.compare(data, password);
  }
  async generateOtp() {
    return Math.random().toString().slice(2, 6);
  }
  async verifyToken(token) {
    return jwt.verify(token, process.env.SECRETKEY);
  }
}

export default new Methods();
