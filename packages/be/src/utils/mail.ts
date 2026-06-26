import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

const sendMail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    await transporter.sendMail({ from: process.env.EMAIL ?? '', to, subject, html });
  } catch (error) {
    console.error('Mail error:', error);
  }
};

export const Mail = { sendMail };
