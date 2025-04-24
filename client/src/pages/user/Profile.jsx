import { useSelector, useDispatch } from "react-redux"
import { useRef, useState } from "react";
import { signOutUser, updateUserSuccess } from "../../redux/user/userSlice";
import { uploadImageToCloudinary } from "../../utils/cloudinary";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(currentUser.profilePicture || "");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    setUploading(true);

    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setImageUrl(uploadedUrl);
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      profilePicture: imageUrl,
    };

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(updateUserSuccess(data));
        toast.success("Profile updated!");
      } else {
        toast.error("Update failed")
      }

    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/sighout', {
        method: "POST",
      });

      dispatch(signOutUser());
      navigate('/sign-in');
    } catch (err) {
      console.log('Signout failed :', err);
    }
  }

  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input type="file" ref={fileRef} accept="image/*" onChange={handleFileChange} hidden />
        <img src={imageUrl} alt="profile" onClick={() => fileRef.current.click()} className="h-24 w-24 self-center cursor-pointer rounded-full object-cover m-2" />

        {uploading && <p className="text-center text-blue-500">Uploading image...</p>}

        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">update</button>
      </form>

      <div className="flex justify-end mt-5">
        <span className="text-red-700 cursor-pointer font-semibold" onClick={handleLogout}>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
