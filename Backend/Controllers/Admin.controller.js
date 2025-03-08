import User from "../models/User.model.js";
import { ApiError } from "../Utils/apiError.util.js";
import { ApiResponse } from "../Utils/apiResponse.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";


const IsAdmin = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] }
    });
    if (user.role === "admin") {
        return true;
    }
    else {
        return false; // Optionally throw an error if no user is found
    }
}

const getAllUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const isAdmin = await IsAdmin(userId); // Await the result of IsAdmin

    if (!isAdmin) {
        throw new ApiError(401, "Unauthorized");
    }

    const users = await User.find({}, { password: 0 });

    if (!users || users.length === 0) {
        throw new ApiError(404, "No users found");
    }

    res.status(200).json(new ApiResponse(200, "Users profiles retrieved", users));
});

export { getAllUserProfile };
