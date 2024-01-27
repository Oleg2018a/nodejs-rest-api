import nodemailer from "nodemailer";
import dotevn from "dotenv";


dotevn.config()


const { UKR_NET_FROM, UKR_NET_PASSWORD } = process.env

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = data => {
    const email = { ...data, from: UKR_NET_FROM }
    return transport.sendMail(email)
}
export default sendEmail