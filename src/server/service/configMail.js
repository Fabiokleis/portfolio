const mailer = require('nodemailer');

require('dotenv').config({path: "/home/urameshi/ports_/portfolio/src/.env"});

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN

    }
});

function setMailOpt(data, email) {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Change Account password',
        html: data
    }
    return mailOptions;

}

module.exports = {transporter, setMailOpt};
