import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function requireAuth(req, res, next) {

    const token = req.cookies.auth_token 
    if (!token) return res.sendStatus(401);
    
    try {

        req.user = jwt.verify(token, config.jwtSecret);
        next();
    } catch (err) {
        res.sendStatus(401);
    }
}