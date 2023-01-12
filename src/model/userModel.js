import mongoose from "mongoose";
import methods from "../util/methods.js";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    oldPassword: {
      type: Array,
      required: false,
      default: [],
    },
    phone: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    // resetPasswordToken: {
    //   type: String,
    //   required: false
    // },

    // resetPasswordExpires: {
    //   type: Date,
    //   required: false
    // },
    status: {
      type: Boolean,
      default: true,
      required: false,
      max: 255,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // authOtp: {
    //   type: Number,
    // },
    created_At: {
      type: Date,
      default: new Date(),
    },
    updated_At: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "UserModel",
    versionKey: false,
  }
);

// UserSchema.pre('save', function (next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// UserSchema.methods.generateJWT = function () {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   let payload = {
//     id: this._id,
//     email: this.email,
//     firstName: this.firstName,
//     lastName: this.lastName,
//   };

//   return jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
//   });
// };

// UserSchema.methods.generatePasswordReset = function () {
//   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
// };

// mongoose.set('useFindAndModify', false);

export default mongoose.model("User", userSchema);
