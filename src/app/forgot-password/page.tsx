'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Gamepad2, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageSeoHead from '@/components/PageSeoHead';
import Footer from '@/components/Footer';
import { showToast } from '@/lib/toast';
import { forgotPassword } from '@/lib/api/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
});

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await forgotPassword({ email: values.email });
        setIsSuccess(true);
        showToast.success('Password reset link sent! Check your email.');
      } catch (error) {
        showToast.error(error instanceof Error ? error.message : 'Failed to send reset link');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <PageSeoHead pageSlug="/forgot-password" />

      <div className="bg-[#E8E9ED] px-4 py-12 min-h-screen">
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
              Forgot Password?
            </h1>
            <p className="text-gray-600 mt-2 font-[poppins]">
              No worries, we'll send you reset instructions
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            ref={formCardRef}
            initial="hidden"
            animate={isFormCardInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

            {!isSuccess ? (
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-[poppins]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition font-[poppins] ${formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                        }`}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-[poppins]">{formik.errors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  className="cursor-pointer w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[poppins] shadow-lg shadow-orange-500/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition font-[poppins]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-[poppins]">
                  Check Your Email
                </h2>
                <p className="text-gray-600 mb-6 font-[poppins]">
                  If an account exists with <strong>{formik.values.email}</strong>, you will receive a password reset link shortly.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800 font-[poppins]">
                    <strong>Didn't receive the email?</strong> Check your spam folder or try again in a few minutes.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-semibold font-[poppins]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            )}
          </motion.div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 font-[poppins]">
              For security reasons, we don't disclose whether an email is registered.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
