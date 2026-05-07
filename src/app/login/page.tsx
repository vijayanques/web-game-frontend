'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Gamepad2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '@/hooks/useAuth';
import Footer from '@/components/Footer';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Refs for animations
  const logoRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const signupLinkRef = useRef<HTMLDivElement>(null);

  // useInView hooks
  const isLogoInView = useInView(logoRef, { once: true, margin: "0px" });
  const isFormCardInView = useInView(formCardRef, { once: true, margin: "0px" });
  const isSocialInView = useInView(socialRef, { once: true, margin: "0px" });
  const isSignupLinkInView = useInView(signupLinkRef, { once: true, margin: "0px" });

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const { mutate: login, isPending, error } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      login({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <>
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
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2 font-[poppins]">
              Sign in to continue your gaming journey
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            ref={formCardRef}
            initial="hidden"
            animate={isFormCardInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error.message}
                </div>
              )}

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
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-[poppins]">{formik.errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-[poppins]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition font-[poppins] ${formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : 'border-gray-300'
                      }`}
                    placeholder="••••••••"
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

           

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending || !formik.isValid}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[poppins] shadow-lg shadow-orange-500/30"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-[poppins]">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <motion.div
              ref={socialRef}
              initial="hidden"
              animate={isSocialInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              className="flex justify-center">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-[poppins]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>

            </motion.div>
            {/* <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-[poppins]">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button> */}
            {/* Sign Up Link */}
            <motion.p
              ref={signupLinkRef}
              initial="hidden"
              animate={isSignupLinkInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              className="text-center mt-6 text-sm text-gray-600 font-[poppins]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign up
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
