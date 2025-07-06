import axios from '../../axios';
import { ArrowLeftCircle, KeyRound } from 'lucide-react';
import { Password } from 'primereact/password';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMess, setErrMess] = useState(null);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mismatch!",
        text: "Passwords Do Not Match"
      });
      return;
    }

    try {
      const response = await axios.put('/auth/change-password', { currentPassword, newPassword });
      if (response.status === 200) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrMess(null);
        Swal.fire({
          icon: "success",
          title: "Changed!",
          text: "Password has been changed"
        }).then(() => {
          navigate('/settings');
        });
      }
    } catch (error) {
      setErrMess(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white pl-56 pr-6 py-6">
      <div className="bg-gray-800 rounded-xl p-5 shadow-md w-full max-w-3xl mx-auto">
        <button
          className="mb-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircle size={18} />
          Back
        </button>

        <h2 className="text-xl font-semibold mb-6 border-b border-gray-600 pb-2 flex items-center gap-2">
          <KeyRound className="text-blue-400" size={20} />
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 justify-center items-center">
          <div className="bg-gray-900 p-4 rounded-lg ">
            <Password
              toggleMask
              feedback={false}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full"
              inputClassName="w-175"
            />
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <Password
              toggleMask
              feedback={false}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full"
              inputClassName="w-175"
            />
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <Password
              toggleMask
              feedback={false}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full"
              inputClassName="w-175"
            />
          </div>

          <button className="btn btn-success" type="submit">
            Change Password
          </button>

          <Link to="/forgotpass" className="text-blue-400 text-sm hover:underline mt-2">
            Forgot Password?
          </Link>

          {errMess && <p className="text-red-500 font-medium">{errMess}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
