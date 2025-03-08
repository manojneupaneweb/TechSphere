// Middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { ApiError } from "../Utils/apiError.util.js";
import User from "../models/User.model.js";

const verifyJwt = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Received Token:", token);

    if (!token) {
        console.error("❌ No Token Provided");
        throw new ApiError(401, "Unauthorized request");
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decodedToken", decodedToken);
    
    if (!decodedToken) {
        console.error("❌ JWT Verification Failed:", error.message);
        throw new ApiError(401, "Invalid Access Token");
    }

    const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

    if (!user) {
        console.error("❌ No User Found for This Token");
        throw new ApiError(401, "Invalid Access Token");
    }
    console.log("Decoded Token:", decodedToken);
    console.log("User Found:", user);

    req.user = user;
    next();
});

export default verifyJwt
