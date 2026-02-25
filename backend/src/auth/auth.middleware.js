import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

export function requireAuth(req, res, next) {

    const token = req.cookies.auth_token 
    if (!token) return res.sendStatus(401);
    
    try {

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.sendStatus(401);
    }
}