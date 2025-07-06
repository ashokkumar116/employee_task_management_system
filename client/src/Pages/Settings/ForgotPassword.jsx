import { ArrowLeftCircle, MailCheck } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get('/auth/forgotpass');
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'Check your email for the OTP',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/otp');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send OTP',
      });
    } finally {
      setLoading(false);
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
          <MailCheck className="text-blue-400" size={20} />
          Forgot Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 justify-center items-center"
        >
          <div className="bg-gray-900 p-4 rounded-lg w-full">
            <InputText
              className="w-full"
              readOnly
              value={user.email}
              placeholder="Email Address"
            />
          </div>

          {loading ? (
            <button className="btn btn-success" disabled>
              Sending OTP <span className="loading loading-dots loading-md ml-2"></span>
            </button>
          ) : (
            <button className="btn btn-success" type="submit">
              Send OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
