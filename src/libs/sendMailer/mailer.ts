import nodemailer, { Transporter } from 'nodemailer';
import { T } from '../types/common';
import { Email } from '../types/mailer';

const sendMailer:T = {};

sendMailer.sendMail = async (input: Email): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT), 
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: input.email,
        subject: input.subject,
        text: input.text
    };

    const info = await transporter.sendMail(message);
}

export default sendMailer;