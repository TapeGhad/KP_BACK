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
        fsym: dataCome.fsym,
        tsym: dataCome.tsym,
        currency: dataCome.currency,
        date: new Date(),
        currentYear: new Date().getFullYear(),
        type: dataCome.type === "min" ? constant.NODEMAILER_MINIMAL_TEXT : constant.NODEMAILER_MAXIMAL_TEXT
      })
    });

    return {
      messageId: info.messageId,
    };
  },
};
