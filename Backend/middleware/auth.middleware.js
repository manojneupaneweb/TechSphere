// Middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { ApiError } from "../Utils/apiError.util.js";
import User from "../models/User.model.js"; // Ensure this is a Sequelize model

const verifyJwt = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        console.error("❌ No Token Provided");
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if (!decodedToken) {
        console.error("❌ JWT Verification Failed");
        throw new ApiError(401, "Invalid Access Token");
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

    req.user = user;
    next();
});

export default verifyJwt;
