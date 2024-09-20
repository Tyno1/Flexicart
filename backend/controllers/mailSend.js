const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
require("dotenv/config");

module.exports.sendEmail = async (
  recipientEmail,
  recipientName,
  subject,
  html,
  text
) => {
  return new Promise(async (resolve, reject) => {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND,
    });

    const sentFrom = new Sender(process.env.FLEXI_CARD_EMAIL, "Flexi-Cart");
    const recipients = [new Recipient(recipientEmail, recipientName)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(html)
      .setText(text);

    try {
      await mailerSend.email.send(emailParams);
      resolve("Email sent successfully to:", recipientEmail);
    } catch (err) {
      reject("Error sending email:", err);
    }
  });
};
