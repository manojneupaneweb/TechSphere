import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail, // your Gmail
    pass: process.env.mail_password, // App password
  },
});

export const sendOtpMail = async (toEmail, otp) => {
  try {
    const info = await transporter.sendMail({
      from: '"OTP Service" <yourgmail@gmail.com>',
      to: toEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <b>${otp}</b></p>`,
    });

    console.log("OTP mail sent to: ", toEmail);
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


