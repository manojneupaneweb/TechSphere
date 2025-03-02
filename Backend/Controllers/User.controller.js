import User from "../models/User.model.js";
import { ApiError } from "../Utils/apiError.util.js";
import { ApiResponse } from "../Utils/apiResponse.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../Utils/cloudiny.util.js";
import { Option } from "../Utils/option.util.js";
import bcrypt from "bcrypt";


const generateAccessRefreshToken = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  await user.update({ refreshToken });

  return { accessToken, refreshToken };
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
    console.error("Error during user registration:", error);
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

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user.id);



  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  const loggedInUser = await User.findByPk(user.id, { attributes: { exclude: ["password", "refreshToken"] } });

  return res
    .status(200)
    .cookie("accessToken", accessToken, Option)
    .cookie("refreshToken", refreshToken, Option)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logOutUser = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("accessToken", Option);
    res.clearCookie("refreshToken", Option);
    return res.status(200).json(new ApiResponse(200, { message: "User logged out successfully" }));
  } catch (error) {
    console.error("Error during user logout:", error);
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
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, "User profile fetched successfully", user));
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Old password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json(new ApiResponse(200, "Password updated successfully"));
});


export { registerUser, loginUser, logOutUser ,deleteUser, getUserProfile, changePassword };
