const nodemailer = require("nodemailer")

class SendMail {
    static send() {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "fikristorage2021@gmail.com",
                pass: "fikrialfajri987"
            }
        })

        let mailDetails = {
            from: "fikristorage2021@gmail.com",
            to: "aviantoruli@gmail.com",
            subject: "NODEMAILER",
            text: "Just try"
        }

        // mail sent code
        return mailTransporter.sendMail(mailDetails, function (err, data) {
            let error = err ? "Error Occurs" : "Email sent successfully"
            console.log(error);
        })
    }
}

module.exports = SendMail