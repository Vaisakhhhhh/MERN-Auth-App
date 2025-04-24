import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const login = (req, res) => {
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

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ username: 1 });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
} 