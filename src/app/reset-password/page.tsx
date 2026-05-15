'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Gamepad2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageSeoHead from '@/components/PageSeoHead';
import Footer from '@/components/Footer';
import { showToast } from '@/lib/toast';
import { resetPassword } from '@/lib/api/auth';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  // Refs for animations
  const logoRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // useInView hooks
  const isLogoInView = useInView(logoRef, { once: true, margin: "0px" });
  const isFormCardInView = useInView(formCardRef, { once: true, margin: "0px" });

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Set document metadata - removed, using PageSeoHead instead

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!token) {
        showToast.error('Invalid reset link');
        return;
      }

      setIsSubmitting(true);
      try {
        await resetPassword({
          token,
          newPassword: values.password,
        });
        setIsSuccess(true);
        showToast.success('Password reset successfully!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to reset password';
        showToast.error(errorMessage);
        
        // If token is invalid or expired, show error state
        if (errorMessage.includes('expired') || errorMessage.includes('invalid')) {
          setTokenError(true);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <PageSeoHead pageSlug="/reset-password" />
      
      <div className="bg-[#E8E9ED] px-4 py-12">
        <div className="w-full max-w-md mx-auto">

          {/* Logo Section */}
          <motion.div
            ref={logoRef}
            initial="hidden"
            animate={isLogoInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl shadow-lg mb-4">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-[poppins]">
              Reset Password
            </h1>
            <p className="text-gray-600 mt-2 font-[poppins]">
              Enter your new password below
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            ref={formCardRef}
            initial="hidden"
            animate={isFormCardInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            
            {tokenError ? (
              /* Token Error State */
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-[poppins]">
                  Invalid or Expired Link
                </h2>
                <p className="text-gray-600 mb-6 font-[poppins]">
                  This password reset link is invalid or has expired. Reset links are only valid for 30 minutes.
                </p>
                <Link 
                  href="/forgot-password"
                  className="inline-block w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors font-[poppins] shadow-lg shadow-orange-500/30"
                >
                  Request New Reset Link
                </Link>
                <Link 
                  href="/login"
                  className="inline-block mt-4 text-sm text-gray-600 hover:text-orange-500 transition font-[poppins]"
                >
                  Back to Login
                </Link>
              </div>
            ) : isSuccess ? (
              /* Success State */
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-[poppins]">
                  Password Reset Successful!
                </h2>
                <p className="text-gray-600 mb-6 font-[poppins]">
                  Your password has been reset successfully. You can now login with your new password.
                </p>
                <Link 
                  href="/login"
                  className="inline-block w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors font-[poppins] shadow-lg shadow-orange-500/30"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              /* Reset Password Form */
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-[poppins]">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...formik.getFieldProps('password')}
                      className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition font-[poppins] ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-xs text-red-600 font-[poppins]">{formik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 font-[poppins]">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...formik.getFieldProps('confirmPassword')}
                      className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition font-[poppins] ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600 font-[poppins]">{formik.errors.confirmPassword}</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-[poppins] mb-2">
                    <strong>Password requirements:</strong>
                  </p>
                  <ul className="text-xs text-gray-600 font-[poppins] space-y-1 list-disc list-inside">
                    <li>At least 6 characters long</li>
                    <li>Both passwords must match</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[poppins] shadow-lg shadow-orange-500/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Resetting Password...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>

                {/* Back to Login */}
                <Link 
                  href="/login"
                  className="block text-center text-sm text-gray-600 hover:text-orange-500 transition font-[poppins]"
                >
                  Back to Login
                </Link>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#E8E9ED] px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
