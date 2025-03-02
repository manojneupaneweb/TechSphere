import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "") || req.cookies["Authorization"];

        if (!token) {
            return res.status(401).json({ msg: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(403).json({ msg: "Token is not valid" });
        }

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Token is not valid" });
    }
};

export default verifyJWT;
