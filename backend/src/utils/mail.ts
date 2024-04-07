import nodemailer from 'nodemailer';

interface MailData {
    from: string;
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    secure: true,
});

const mailData: MailData = {
    from: process.env.EMAIL || '',
    to: 'placeholderTo',
    subject: 'placeholderSubject',
    html: '<b>Placeholder Text!</b>',
};

const setMailData = (to: string, subject: string, html: string): void => {
    mailData.to = to;
    mailData.subject = subject;
    mailData.html = html;
};

const sendMail = async (to: string, subject: string, html: string): Promise<void> => {
    setMailData(to, subject, html);

    try {
        await transporter.sendMail(mailData);
    } catch (error) {
        console.error(error);
    }
};

export const Mail = { sendMail };
