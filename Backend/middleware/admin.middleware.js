import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { ApiError } from "../Utils/apiError.util.js";
import User from "../models/User.model.js"; // Ensure this is a Sequelize model

const verifyAdmin = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        console.error("❌ No Token Provided");
        throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        console.error(`❌ JWT Error: ${err.message}`);
        throw new ApiError(401, "Invalid or expired access token");
    }

    // Fetch user from SQL database using Sequelize
    const user = await User.findOne({
        where: { id: decodedToken?.id }, 
        attributes: { exclude: ["password", "refreshToken"] } // Exclude sensitive fields
    });

    if (!user) {
        console.error("❌ No User Found for This Token");
        throw new ApiError(401, "Invalid Access Token");
    }
    if (user.role !== "admin") {
        console.error(`❌ User ID: ${user.id} is not an Admin`);
        throw new ApiError(403, "Forbidden: Admin access required");
    }

    req.user = user;
    next();
});

export default verifyAdmin;
