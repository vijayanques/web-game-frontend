'use client';

import { Shield, Lock, Eye, UserCheck, Database, Bell, Mail, Globe, FileText, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, username)",
        "Gaming preferences, gameplay statistics, and tournament participation data",
        "Device information, IP address, and browser type for security purposes",
        "Cookies and similar tracking technologies to enhance your experience",
        "Communication data when you contact our support team"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our gaming platform services",
        "To personalize your gaming experience and recommend relevant content",
        "To process tournament registrations and manage leaderboards",
        "To send important updates, notifications, and promotional content",
        "To improve our services through analytics and user feedback",
        "To detect and prevent fraud, abuse, and security threats"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your personal data",
        "Secure servers with regular security audits and monitoring",
        "Limited access to personal information by authorized personnel only",
        "Regular backups to prevent data loss",
        "Compliance with international data protection regulations"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Data may be shared with service providers who help operate our platform",
        "Public profile information (username, avatar, stats) visible to other users",
        "Legal compliance: We may disclose information when required by law",
        "Business transfers: Data may be transferred in case of merger or acquisition"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access and download your personal data at any time",
        "Request correction of inaccurate or incomplete information",
        "Delete your account and associated data (subject to legal requirements)",
        "Opt-out of marketing communications and promotional emails",
        "Control cookie preferences through your browser settings",
        "Lodge a complaint with relevant data protection authorities"
      ]
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality and security",
        "Analytics cookies to understand user behavior and improve services",
        "Preference cookies to remember your settings and choices",
        "Marketing cookies for personalized advertising (with your consent)",
        "You can manage cookie preferences in your browser settings"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Third-Party Services",
      content: [
        "We integrate with payment processors for secure transactions",
        "Social media platforms for account creation and sharing features",
        "Analytics providers to understand platform usage",
        "Cloud service providers for data storage and hosting",
        "Each third-party service has its own privacy policy"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Children's Privacy",
      content: [
        "Our platform is not intended for users under 13 years of age",
        "We do not knowingly collect data from children under 13",
        "Parents can contact us to request deletion of their child's data",
        "Age verification may be required for certain features",
        "Parental consent required for users between 13-18 in some regions"
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#E8E9ED] w-full overflow-x-hidden">
      {/* Hero Section */}
      <motion.div 
        className="relative w-full"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-2xl mb-6 border border-orange-200"
            variants={iconVariants}
          >
            <Shield className="w-10 h-10 text-orange-500" />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Privacy Policy
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </motion.p>

          <motion.div 
            className="flex items-center justify-center gap-6 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Last Updated: May 4, 2026</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="w-full pt-2 px-4 sm:px-6 md:px-7 py-13"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <motion.div 
          className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to GameHub</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At GameHub, we are committed to protecting your privacy and ensuring the security of your personal information.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our gaming platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By using GameHub, you agree to the collection and use of information in accordance with this policy.
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <motion.div className="space-y-6" variants={containerVariants}>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500"
                  variants={iconVariants}
                >
                  {section.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                </div>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start gap-3 text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="shrink-0 w-1.5 h-1.5 bg-orange-500 rounded-full mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        {/* bg-gradient-to-br */}
        {/* Data Retention */}
        <motion.div 
          className="bg-white rounded-2xl p-8 mt-8 border border-orange-200"
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Database className="w-6 h-6 text-orange-500" />
            Data Retention
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
            unless a longer retention period is required or permitted by law.
          </p>
          <ul className="space-y-2 text-gray-700">
            {[
              "Account data: Retained while your account is active",
              "Transaction records: Retained for 7 years for legal compliance",
              "Analytics data: Anonymized and retained for service improvement"
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-orange-500 font-bold shrink-0">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Policy Updates */}
        <motion.div 
          className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-gray-200"
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may update our Privacy Policy from time to time to reflect changes in our practices or for legal,
            operational, or regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="space-y-2 text-gray-600 mb-4">
            {[
              { icon: Bell, text: "Posting a prominent notice on our platform" },
              { icon: Mail, text: "Sending you an email notification" }
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Your continued use of GameHub after any changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mt-8"
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-2xl font-bold mb-4">Questions or Concerns?</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Mail, title: "Email Us", text: "privacy@gamehub.gg", href: "mailto:privacy@gamehub.gg" },
              { icon: Globe, title: "Visit Our Website", text: "www.gamehub.gg", href: "https://gamehub.gg" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">{item.title}</p>
                  <a href={item.href} className="text-orange-400 hover:text-orange-300 transition-colors">
                    {item.text}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Data Protection Officer: dpo@gamehub.gg | Response time: Within 30 days
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/30"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
