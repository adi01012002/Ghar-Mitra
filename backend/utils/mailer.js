import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (toEmail, username) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"PG Management" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Welcome to PG Management!',
    html: `<h2>Welcome, ${username}!</h2><p>Thank you for signing up with your Gmail account.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

export const sendOtpEmail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"PG Management" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP for PG Management',
    html: `<h2>Your OTP is: <b>${otp}</b></h2><p>This OTP is valid for 10 minutes.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};






// export const resetLink = async (toEmail, resetLink) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"PG Management" <${process.env.GMAIL_USER}>`,
//     to: toEmail,
//     subject: 'Your Reset Link for PG Management',
//     html: `<h2>Your Reset Link is: <b>${resetLink}</b></h2><p>This link is valid for 10 minutes.</p>`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error('Error sending reset link email:', error);
//     return false;
//   }
// };

