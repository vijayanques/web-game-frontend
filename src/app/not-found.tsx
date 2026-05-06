'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Gamepad2, Joystick, Target, Dices, Ghost, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -180 },
        visible: {
            opacity: 0.2,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            }
        }
    };

    const numberVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 0.1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            }
        }
    };

    const centerIconVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -360 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: 0.3,
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
            }
        },
        tap: {
            scale: 0.95,
        }
    };

    const dotVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            }
        })
    };

    return (
        <div className="min-h-screen bg-[#E8E9ED] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Floating Game Icons Background */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {mounted && (
                    <>
                        <motion.div variants={iconVariants}>
                            <Gamepad2 className="absolute top-20 left-10 w-12 h-12 text-orange-500 opacity-20 hover:opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer animate-float" />
                        </motion.div>
                        <motion.div variants={iconVariants}>
                            <Joystick className="absolute top-40 right-20 w-10 h-10 text-orange-500 opacity-20 hover:opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer animate-float-delayed" />
                        </motion.div>
                        <motion.div variants={iconVariants}>
                            <Target className="absolute bottom-32 left-20 w-16 h-16 text-orange-500 opacity-20 hover:opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer animate-float" />
                        </motion.div>
                        <motion.div variants={iconVariants}>
                            <Dices className="absolute bottom-20 right-32 w-12 h-12 text-orange-500 opacity-20 hover:opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer animate-float-delayed" />
                        </motion.div>
                        <motion.div variants={iconVariants}>
                            <Ghost className="absolute top-1/2 left-1/4 w-10 h-10 text-orange-500 opacity-20 hover:opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer animate-float" />
                        </motion.div>
                        <motion.div variants={iconVariants}>
                            <Trophy className="absolute top-1/3 right-1/4 w-12 h-12 text-orange-500 opacity-20 hover:opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer animate-float-delayed" />
                        </motion.div>
                    </>
                )}
            </motion.div>

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* 404 Number with Game Controller Icon */}
                <div className="relative mb-8">
                    <motion.h1
                        className="text-[150px] md:text-[200px] font-bold text-gray-900 opacity-10 leading-none select-none"
                        variants={numberVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        404
                    </motion.h1>
                </div>

                {/* Error Message */}
                <motion.div
                    className="space-y-4 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-jakarta)]"
                        variants={textVariants}
                    >
                        Game Over!
                    </motion.h2>

                    <motion.p
                        className="text-xl md:text-2xl font-semibold text-orange-500 font-[family-name:var(--font-jakarta)]"
                        variants={textVariants}
                    >
                        Level Not Found
                    </motion.p>

                    <motion.p
                        className="text-base md:text-lg text-gray-600 max-w-md mx-auto font-[family-name:var(--font-poppins)]"
                        variants={textVariants}
                    >
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </motion.p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Link
                            href="/"
                            className="group px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg font-[family-name:var(--font-poppins)] flex items-center gap-2"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Play More Games
                        </Link>
                    </motion.div>

                    <motion.button
                        onClick={() => window.history.back()}
                        className="group px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg border-2 border-gray-200 font-[family-name:var(--font-poppins)] flex items-center gap-2"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </motion.button>
                </motion.div>

                {/* Decorative Loading Dots */}
                <motion.div
                    className="flex justify-center gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                        variants={dotVariants}
                        custom={0}
                    />
                    <motion.div
                        className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                        variants={dotVariants}
                        custom={1}
                    />
                    <motion.div
                        className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                        variants={dotVariants}
                        custom={2}
                    />
                </motion.div>

                {/* Fun Message */}
                <motion.p
                    className="mt-8 text-sm text-gray-500 opacity-70 font-[family-name:var(--font-poppins)]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    Error Code: 404 | Press any button to continue...
                </motion.p>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
