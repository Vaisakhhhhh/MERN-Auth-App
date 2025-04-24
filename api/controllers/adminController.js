import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const login = (req, res, next) => {
    const { email, password } = req.body;

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return next(errorHandler(401, 'wrong credentials'));
    }

    const token = jwt.sign({ id: email }, process.env.JWT_SECRET);
    const  expiryDate = new Date(Date.now() + 3600000);

    res.cookie('admin_token', token, { httpOnly: true, expires: expiryDate })
       .status(200)
       .json({ email });
}

export const logout = (req, res) => {
    res.cleareCookie('admin_token')
       .status(200)
       .json({ message: "Logged out successfully"});
}