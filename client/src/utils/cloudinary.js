
export const uploadImageToCloudinary = async (file) => {

    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error("File must be less than 5MB.");
    }

    const formDate = new FormData();
    formDate.append("file", file);
    formDate.append("upload_preset", "mern-auth_profile_upload");

    const res = await fetch("https://api.cloudinary.com/v1_1/dnt3b6etw/image/upload", {
        method: "POST", 
        body: formDate,
    });

    if (!res.ok) {
        throw new Error("Cloudinary upload failed.");
    }

    const data = await res.json();
    return data.secure_url;
    
}