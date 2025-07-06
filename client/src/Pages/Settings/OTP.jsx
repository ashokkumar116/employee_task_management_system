import { ArrowLeftCircle, ShieldCheck } from 'lucide-react';
import axios from '../../axios';
import { InputOtp } from 'primereact/inputotp';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/verifyotp', { otp });

      if (response.status === 200) {
        setOtp('');
        Swal.fire({
          icon: 'success',
          title: 'Verified!',
          text: 'OTP verified successfully',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/resetpass');
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'OTP verification failed',
      });
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
          <ShieldCheck className="text-blue-400" size={20} />
          OTP Verification
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center items-center"
        >
          <div className="bg-gray-900 p-4 rounded-lg w-full flex justify-center">
            <InputOtp
              length={6}
              integerOnly
              value={otp}
              onChange={(e) => setOtp(e.value)}
              className="w-full justify-center"
            />
          </div>

          <button className="btn btn-success w-fit px-6">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
