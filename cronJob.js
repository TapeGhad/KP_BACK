const mongoose = require("mongoose");
const db = require("./context")(mongoose);
const nodemailer = require("./helpers/nodemailer")

async function cronCheckCurrency() {

    console.log("-------------------------------------");
    console.log("Cron works");
    console.log(new Date());
    console.log("Emails sent: ", emailsSent);
    console.log("-------------------------------------\n");  
}

async function nodemailerSend(email, fsym, tsym, currency, type) {
    return nodemailer.sendMessage({
            to: email,
            fsym: fsym,
            tsym: tsym,
            currency: currency,
            type: type
        });
} 

module.exports = {
    cronCheckCurrency
};