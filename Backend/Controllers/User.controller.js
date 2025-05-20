import User from "../models/User.model.js";
import { ApiError } from "../Utils/apiError.util.js";
import { ApiResponse } from "../Utils/apiResponse.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../Utils/cloudiny.util.js";
import { cookieOption } from "../Utils/cookieOption.util.js";
import bcrypt from "bcrypt";
import { sendOtpMail } from "../middleware/mailService.js";
import { otpStore } from "../Utils/otpStore.js";

const IsAdmin = async (userId) => {
  try {

    const user = await User.findByPk(userId);

    if (!user) {
      ApiError(404, "User not found");
      return false;
    }

    return user.role === "admin";
  } catch (error) {
    ApiError(500, "Internal server error");
    return false;
  }
};


const generateAccessRefreshToken = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await user.update({ refreshToken });

  return { accessToken, refreshToken };
};


const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 300000
  });

  await sendOtpMail(email, otp);

  return res.status(200).json(
    new ApiResponse(200, { message: "OTP sent successfully" })
  );
});

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const stored = otpStore.get(email);

  if (!stored) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (Number(otp) !== stored.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email);

  return res.status(200).json({ success: true, message: "OTP verified" });
};


const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const localFilePath = req.files?.profilePicture[0]?.path;
    if (!localFilePath) {
      throw new ApiError(400, "Profile picture is required");
    }

    const profilePictureUrl = await uploadOnCloudinary(localFilePath);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      profilePicture: profilePictureUrl,
    });

    if (!newUser) {
      await deleteFromCloudinary(localFilePath);
      throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(new ApiResponse(201, { message: "User created successfully!", user: newUser }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user.id);

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  const loggedInUser = await User.findByPk(user.id, {
    attributes: { exclude: ["password", "refreshToken"] }
  });

  res.status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, cookieOption)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logOutUser = asyncHandler(async (req, res, next) => {
  try {

    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refreshToken", cookieOption);
    return res.status(200).json(new ApiResponse(200, { message: "User logged out successfully" }));
  } catch (error) {
    next(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await user.destroy();
  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] } // ✅ Correct way to exclude fields in Sequelize
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, "User profile retrieved", user));
});

const changePassword = asyncHandler(async (req, res) => {
  const user = req.user;

  const { currentPassword, newPassword } = req.body;

  const userInDatabase = await User.findByPk(user.id);

  if (!userInDatabase) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await userInDatabase.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid current password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  userInDatabase.password = hashedPassword;
  await userInDatabase.save();

  res.status(200).json(new ApiResponse(200, "Password updated successfully"));
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (email) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== id) {
      throw new ApiError(400, "Email is already taken by another user");
    }
    user.email = email;
  }

  if (username) {
    user.username = username;
  }

  await user.save();
  res.status(200).json(new ApiResponse(200, "User profile updated successfully", user));
});

const getAllUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const isAdmin = await IsAdmin(userId);

  if (!isAdmin) {
    throw new ApiError(401, "Unauthorized");
  }

  const users = await User.findAll({
    attributes: { exclude: ["password"] } // Exclude password from results
  });

  if (!users || users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  res.status(200).json(new ApiResponse(200, "Users profiles retrieved", users));
});

const changeRole = asyncHandler(async (req, res) => {
  const { id, role } = req.body;

  try {
    console.log("id:", id);
    console.log("role:", role);

    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.role = role;
    await user.save(); 
    res.status(200).json(new ApiResponse(200, "Role updated successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
});




export { sendOtp, verifyOtp, registerUser, loginUser, logOutUser, deleteUser, getUserProfile, changePassword, updateUserProfile, getAllUserProfile, changeRole };
