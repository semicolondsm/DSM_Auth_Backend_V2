import * as nodemailer from "nodemailer";
import * as path from "path";
import * as fs from "fs";

const HTMLTemplate: string = fs.readFileSync(
  path.join(__dirname, "..", "..", "..", "src", "shared", "mail", "./mail.template.html"),
  { encoding: "utf-8" },
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendMail = (userMail: string, authNum: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.GMAIL_USER,
        to: userMail,
        subject: `DSM_Auth 이메일 승인코드 to ${userMail}`,
        html: HTMLTemplate.replace("EmailAuthenticationCode", authNum),
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      },
    );
  });
};

export { sendMail };
