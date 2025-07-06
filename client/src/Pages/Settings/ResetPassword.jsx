import { ArrowLeftCircle,Lock } from 'lucide-react';
import axios from '../../axios';
import { Password } from 'primereact/password';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (newPassword !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Mismatch!',
          text: 'Passwords do not match',
        });
        return;
      }

      const response = await axios.put('/auth/passreset', { newPassword });

      if (response.status === 200) {
        setConfirmPassword('');
        setNewPassword('');
        Swal.fire({
          icon: 'success',
          title: 'Changed!',
          text: 'Your password has been reset',
        }).then(() => {
          navigate('/settings');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong',
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
          <Lock className="text-blue-400" size={20} />
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 justify-center items-center">
          <div className="bg-gray-900 p-4 rounded-lg w-full">
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

          <div className="bg-gray-900 p-4 rounded-lg w-full">
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

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success px-6"
          >
            {loading ? (
              <>
                Resetting Password{' '}
                <span className="loading loading-dots loading-md ml-2" />
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
