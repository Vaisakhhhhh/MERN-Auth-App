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

export const updateUsers = async (req, res, next) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username and email are required" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
}