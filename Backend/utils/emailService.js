const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const sendVerificationEmail = (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Email Verification - Your OTP Code',
    text: `Your OTP code is: ${otp}. Please enter this code to verify your email.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail }; 