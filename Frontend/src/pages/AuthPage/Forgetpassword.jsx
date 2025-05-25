import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [canResend, setCanResend] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    specialChar: false
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // OTP timer countdown
  useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Password validation
  useEffect(() => {
    if (step === 3) {
      setPasswordValid({
        length: newPassword.length >= 8,
        number: /\d/.test(newPassword),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
      });
    }
  }, [newPassword, step]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/user/forgot-password', { email });
      toast.success('Password reset OTP sent! Check your inbox.');
      setStep(2);
      setTimeLeft(300); // Reset timer
      setCanResend(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post('/api/v1/user/forgot-password', { email });
      toast.success('New OTP sent!');
      setTimeLeft(300);
      setCanResend(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/user/verify-otp', { email, otp });
      toast.success('OTP verified successfully!');
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!passwordValid.length || !passwordValid.number || !passwordValid.specialChar) {
      toast.error('Password does not meet requirements');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/v1/user/reset-password', { 
        email,  
        newPassword,
        otp // Include OTP in the final request for verification
      });
      toast.success('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Reset Your Password' : 
             step === 2 ? 'Verify OTP' : 
             'Create New Password'}
          </h2>
        </div>

        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleSendEmail}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                />
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    Sent to {email}
                  </p>
                  <p className={`text-sm font-medium ${timeLeft < 60 ? 'text-red-500' : 'text-gray-600'}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              
              {canResend && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter new password"
                />
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center text-xs ${passwordValid.length ? 'text-green-500' : 'text-gray-500'}`}>
                    <span className="mr-1">✓</span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center text-xs ${passwordValid.number ? 'text-green-500' : 'text-gray-500'}`}>
                    <span className="mr-1">✓</span>
                    <span>Contains a number</span>
                  </div>
                  <div className={`flex items-center text-xs ${passwordValid.specialChar ? 'text-green-500' : 'text-gray-500'}`}>
                    <span className="mr-1">✓</span>
                    <span>Contains a special character</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm new password"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !passwordValid.length || !passwordValid.number || !passwordValid.specialChar || newPassword !== confirmPassword}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate('/auth/login')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;