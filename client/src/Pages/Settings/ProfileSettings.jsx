import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
    const { user } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
      };
      

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            Swal.fire("Error", "New passwords do not match", "error");
            return;
        }

        try {
            const res = await axios.put("/auth/change-password", {
                userId: user._id,
                currentPassword,
                newPassword,
            });

            Swal.fire("Success", res.data.message, "success");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err) {
            Swal.fire(
                "Error",
                err.response?.data?.message || "Failed",
                "error"
            );
        }
    };



    const uploadProfileImage = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("profile_pic",profileImage)

        const response = await axios.put('/auth/updateprofile',formData)

        if(response.status === 200){
            
            setPreview("");
            setProfileImage(null)
            Swal.fire({
                icon:"success",
                title:"Updated!",
                text:"Your Profile Image is Updated"
            }).then(()=>{
                window.location.reload();
            })
            

        }

    }

    useEffect(()=>{
        setImageUrl(`https://employee-task-management-system-rye4.onrender.com${user.profile_pic}`)
    },[])

    return (
        <div>
            <Link to={'/passwordchange'}><button className="btn btn-info">Change Password</button></Link>
            <hr className="my-6 border-gray-700" />
            <h2 className="text-xl font-semibold mb-4">
                Change Profile Picture
            </h2>

            <div className="flex justify-center gap-4 flex-col">
                {preview || imageUrl ? (
                    <img
                        src={preview || imageUrl}
                        alt="Profile Preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-yellow-500"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                        <span>No Image</span>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm file-input file-input-primary"
                />
            </div>

            {profileImage && (
                <button
                    onClick={uploadProfileImage}
                    className="btn btn-success mt-5"
                >
                    Upload Image
                </button>
            )}
        </div>
    );
};

export default ProfileSettings;
