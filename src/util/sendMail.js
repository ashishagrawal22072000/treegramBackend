import Template from "./template.js";
import nodemailer from "nodemailer";
import Messages from "./Messages.js";
class SendMail {
  constructor() {
    // this.template = new Template();
  }
  mail = async (data, type, subject) => {
    switch (type) {
      case "welcome":
        return await this.sendEmail(data, Template.welcome(data), subject);
      case "forgetPassword":
        return await this.sendEmail(data, Template.forgetPassword(data), subject);
      default:
        return null;
    }
  };

  transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: Messages.WELCOME_EMAIL,
      pass: Messages.WELCOME_PASSWORD,
    },
  });

  sendEmail = async (data, template, subject) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL,
        to: data.user.email,
        subject: subject,
        html: template,
      };
      const sendMail = await this.transporter.sendMail(mailOptions);
      return sendMail;
    } catch (err) {
      return null;
    }
  };
}
export default new SendMail();
