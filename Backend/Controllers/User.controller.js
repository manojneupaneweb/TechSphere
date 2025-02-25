import User from "../models/User.model.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, phone, profilePicture } = req.body;
    console.log(fullName, email, password, phone, profilePicture);

    if (!fullName || !email || !password || !phone || !profilePicture) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      profilePicture: req.body.profilePicture,
    });
    

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export { registerUser };
