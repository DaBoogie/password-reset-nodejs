const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = {
    async send(confirmation) {
        const emailTemplate = pug.compileFile(`${process.cwd()}/src/email-templates/reset-password.pug`);
        const userName = confirmation.name;
        const subject = `Password confirmation for user ${userName}`;

        try {
            const emailBody = emailTemplate({
                subject: subject,
                name: userName,
                link: confirmation.link,
            });

            await this.sendEmails(emailBody, subject, confirmation.email);

            // TODO remove after debug
            console.log('>>> Confirmation email was sent');
            console.log(emailBody);
            return emailBody;
        } catch (e) {
            // TODO remove after debug
            console.log('>>> Change history status to "failed"');
            console.log(e.message);
        }
    },

    async sendEmails(emailBody, subject, recipient) {
        if (process.env.NODE_ENV !== 'production') recipient = process.env.EMAILING_ACCOUNT_EMAIL;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAILING_ACCOUNT_EMAIL,
                pass: process.env.EMAILING_ACCOUNT_PASSWORD,
            }
        });

        const mailOptions = {
            from: 'chatcircle.notification@gmail.com', // sender address
            to: [recipient], // list of receivers
            subject: subject, // Subject line
            html: emailBody, // plain text body
        };

        return transporter.sendMail(mailOptions);
    },
};
