'use client';

import { FileText, AlertCircle, CheckCircle, XCircle, Scale, Zap, Shield, Users, Gamepad2, Mail, Globe } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageSeoHead from '@/components/PageSeoHead';

function TermsOfService() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using Theplayfree, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "We reserve the right to modify these terms at any time without notice.",
        "Your continued use of Theplayfree following the posting of revised Terms means that you accept and agree to the changes."
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "2. User Accounts & Registration",
      content: [
        "You must be at least 13 years old to create an account on Theplayfree.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are solely responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "3. User Conduct & Prohibited Activities",
      content: [
        "You agree not to engage in any conduct that restricts or inhibits anyone's use or enjoyment of Theplayfree.",
        "Prohibited behaviors include: harassment, hate speech, discrimination, and threats.",
        "You may not post, transmit, or distribute any unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable material.",
        "Cheating, hacking, exploiting bugs, or using unauthorized third-party tools is strictly forbidden.",
        "You agree not to spam, flood, or engage in any form of disruptive behavior.",
        "Impersonation of any person or entity is prohibited.",
        "You may not attempt to gain unauthorized access to Theplayfree systems or networks."
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "4. Intellectual Property Rights",
      content: [
        "All content on Theplayfree, including text, graphics, logos, images, and software, is the property of Theplayfree or its content suppliers.",
        "You may not reproduce, distribute, transmit, or display any content without our prior written permission.",
        "User-generated content remains your property, but you grant Theplayfree a worldwide, royalty-free license to use it.",
        "We respect intellectual property rights and will respond to valid DMCA notices.",
        "Unauthorized use of Theplayfree's intellectual property may result in legal action."
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "5. Limitation of Liability",
      content: [
        "Theplayfree is provided on an 'AS IS' and 'AS AVAILABLE' basis without warranties of any kind.",
        "We do not warrant that the service will be uninterrupted, error-free, or secure.",
        "Theplayfree shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Our total liability shall not exceed the amount you paid for the service in the past 12 months.",
        "Some jurisdictions do not allow limitation of liability, so this may not apply to you."
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "6. Disclaimer of Warranties",
      content: [
        "Theplayfree makes no representations or warranties regarding the accuracy of content.",
        "We do not guarantee that the service will meet your requirements.",
        "We are not responsible for third-party content or services linked from our platform.",
        "Your use of Theplayfree is at your own risk.",
        "We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose."
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "7. Indemnification",
      content: [
        "You agree to indemnify and hold harmless Theplayfree from any claims, damages, or costs arising from your use of the service.",
        "This includes claims resulting from your violation of these terms or infringement of third-party rights.",
        "You agree to defend Theplayfree against any third-party claims related to your conduct.",
        "We reserve the right to assume the exclusive defense of any claim for which you are required to indemnify us."
      ]
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "8. Termination of Service",
      content: [
        "Theplayfree reserves the right to terminate or suspend your account at any time, with or without cause.",
        "Termination may occur for violation of these terms, illegal activity, or at our sole discretion.",
        "Upon termination, your right to use Theplayfree immediately ceases.",
        "We may retain your data for legal, operational, or security purposes.",
        "Termination does not relieve you of any obligations or liabilities incurred prior to termination."
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "9. Dispute Resolution",
      content: [
        "Any disputes arising from these terms shall be governed by applicable law.",
        "You agree to attempt to resolve disputes through informal negotiation first.",
        "If negotiation fails, disputes shall be resolved through binding arbitration.",
        "You waive the right to a jury trial and class action participation.",
        "Arbitration shall take place in the jurisdiction where Theplayfree is located."
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "10. Modifications to Service",
      content: [
        "Theplayfree reserves the right to modify, suspend, or discontinue the service at any time.",
        "We may add, remove, or modify features without prior notice.",
        "We are not liable for any modification, suspension, or discontinuation of the service.",
        "We will make reasonable efforts to notify users of significant changes.",
        "Your continued use constitutes acceptance of any modifications."
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
    <>
      <PageSeoHead
        pageSlug="/terms-of-service"
      />
      
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
            <Scale className="w-10 h-10 text-orange-500" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Terms of Service
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Please read these terms carefully before using Theplayfree. By accessing our platform, you agree to be bound by these terms.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Theplayfree</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of Theplayfree and all related services, features, and content.
              Theplayfree is a gaming platform that connects players, hosts tournaments, and provides gaming-related services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Please read these Terms carefully. If you do not agree with any part of these Terms, you may not use Theplayfree.
              We reserve the right to update these Terms at any time, and your continued use of the service constitutes acceptance of any changes.
            </p>
          </motion.div>

          {/* Quick Reference Box */}
          <motion.div
            className=" bg-white rounded-2xl p-8 shadow-sm border mb-8  border-gray-200 hover:shadow-md transition-shadow duration-300"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Key Points at a Glance
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "You must be 13+ to use Theplayfree",
                "You are responsible for your account security",
                "No cheating, hacking, or exploits allowed",
                "Respect intellectual property rights",
                "We can modify or terminate service anytime",
                "Disputes resolved through arbitration"
              ].map((point, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Terms Sections */}
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
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
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

          {/* Additional Provisions */}
          <motion.div
            className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-gray-200"
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              Important Notices
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-semibold text-red-900 mb-1">Age Restriction</p>
                <p className="text-sm text-red-800">
                  Theplayfree is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900 mb-1">Account Responsibility</p>
                <p className="text-sm text-yellow-800">
                  You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-1">Service Availability</p>
                <p className="text-sm text-blue-800">
                  Theplayfree is provided on an "AS IS" basis. We do not guarantee uninterrupted service or error-free operation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Prohibited Content */}
          <motion.div
            className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-gray-200"
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              Prohibited Content & Conduct
            </h3>
            <p className="text-gray-600 mb-4">
              The following content and conduct are strictly prohibited on Theplayfree:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Hate speech or discrimination",
                "Harassment or bullying",
                "Threats or violence",
                "Spam or flooding",
                "Cheating or exploiting",
                "Hacking or unauthorized access",
                "Impersonation",
                "Copyright infringement",
                "Malware or viruses",
                "Phishing or scams",
                "Adult or explicit content",
                "Illegal activities"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Support */}
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mt-8"
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              If you have any questions or concerns about these Terms of Service, please contact our legal team.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Mail, title: "Email Us", text: "legal@Theplayfree.gg", href: "mailto:legal@Theplayfree.gg" },
                { icon: Globe, title: "Visit Our Website", text: "www.Theplayfree.gg", href: "https://Theplayfree.gg" }
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
                Legal Department | Response time: Within 5 business days
              </p>
            </div>
          </motion.div>

          {/* Related Links */}


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
    </>
  );
}

export default TermsOfService;
