const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const constant = require("./constant")
const pug = require('pug');

module.exports = {
  sendMessage: async (dataCome) => {
    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const filePath = path.join(__dirname, './html/Notification.pug')
    const compiledFunction = pug.compileFile(filePath);

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: dataCome.to,
      subject: constant.NODEMAILER_EMAIL_SUBJECT,
      html: compiledFunction({
        userEmail: dataCome.userEmail,
        date: new Date(),
        currentYear: new Date().getFullYear(),
      })
    });

    return {
      messageId: info.messageId,
    };
  },
};
