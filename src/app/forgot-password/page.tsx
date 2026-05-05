'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Gamepad2, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useForgotPassword } from '@/hooks/useAuth';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Refs for animations
  const successIconRef = useRef<HTMLDivElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  // useInView hooks
  const isSuccessIconInView = useInView(successIconRef, { once: true, margin: "0px" });
  const isSuccessCardInView = useInView(successCardRef, { once: true, margin: "0px" });
  const isLogoInView = useInView(logoRef, { once: true, margin: "0px" });
  const isFormCardInView = useInView(formCardRef, { once: true, margin: "0px" });
  const isHelpInView = useInView(helpRef, { once: true, margin: "0px" });

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const { mutate: forgotPassword, isPending, error } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    forgotPassword({ email }, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  if (submitted) {
    return (
      <>
        <div className="min-h-screen bg-[#E8E9ED] flex items-center justify-center px-4 ">
          <div className="w-full max-w-md">
          
          {/* Success State */}
          <motion.div
            ref={successCardRef}
            initial="hidden"
            animate={isSuccessCardInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <motion.div
              ref={successIconRef}
              initial="hidden"
              animate={isSuccessIconInView ? "visible" : "hidden"}
              variants={scaleUpVariants}
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <motion.h2
              initial="hidden"
              animate={isSuccessCardInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } }
              }}
              className="text-2xl font-bold text-gray-900 mb-3 font-[poppins]">
              Check Your Email
            </motion.h2>
            
            <motion.p
              initial="hidden"
              animate={isSuccessCardInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
              }}
              className="text-gray-600 mb-6 font-[poppins]">
              We've sent a password reset link to{' '}
              <span className="font-semibold text-gray-900">{email}</span>
            </motion.p>
            
            <motion.div
              initial="hidden"
              animate={isSuccessCardInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } }
              }}
              className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-800 font-[poppins]">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setSubmitted(false)}
                  className="font-semibold underline hover:text-orange-600"
                >
                  try again
                </button>
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isSuccessCardInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
              }}>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-semibold font-[poppins]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </motion.div>
          </motion.div>
        </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#E8E9ED] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
        
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

        {/* Reset Form */}
        <motion.div
          ref={formCardRef}
          initial="hidden"
          animate={isFormCardInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition font-[poppins]"
                  placeholder="you@example.com"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 font-[poppins]">
                Enter the email address associated with your account
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[poppins] shadow-lg shadow-orange-500/30"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-[poppins]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
      <Footer />
    </>
  );
}
