import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail,
    pass: process.env.mail_password, 
  },
});

export const sendOtpMail = async (toEmail, otp) => {
  console.log("gmail: ", process.env.mail);
  console.log("password: ", process.env.mail_password);
  console.log("toEmail: ", toEmail);
  
  try {
    const info = await transporter.sendMail({
      from: `"TechSphere Support" <no-reply@techsphere.com>`,
      to: toEmail,
      subject: "🔐 OTP Verification Code",
      text: `Hello,

Your One-Time Password (OTP) for verification is: ${otp}

This OTP is valid for the next 5 minutes. Please do not share this code with anyone.

Thank you,
TechSphere Team`,
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>🔐 OTP Verification</h2>
      <p>Hello,</p>
      <p>Your <strong>One-Time Password (OTP)</strong> is:</p>
      <p style="font-size: 20px; font-weight: bold; color: #2c3e50;">${otp}</p>
      <p>This code will expire in 5 minutes. Please do not share it with anyone.</p>
      <br/>
      <p>Thank you,<br/>TechSphere Team</p>
    </div>
  `
    });


    console.log("OTP mail sent to: ", toEmail);
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


