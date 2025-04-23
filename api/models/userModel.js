import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png",
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;