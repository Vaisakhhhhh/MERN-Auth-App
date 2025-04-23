import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

export const updateUser = async (req, res) => {
    const { username, email, password, profilePicture } = req.body;

    try {
        const updatedFields = {
            username,
            email,
            profilePicture,
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update profile."});
    }
}