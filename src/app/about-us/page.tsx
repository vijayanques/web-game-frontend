'use client';

import { Gamepad2, Users, Target, Zap, Trophy, Heart, Globe, Lightbulb, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutUs() {
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

//   const stats = [
//     { value: "2.4M+", label: "Active Players", icon: Users },
//     { value: "500+", label: "Games", icon: Gamepad2 },
//     { value: "12K+", label: "Tournaments", icon: Trophy },
//     { value: "98%", label: "Uptime", icon: Zap },
//   ];

  const values = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Player First",
      description: "We design every feature with gamers in mind, ensuring the best experience for our community."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Community",
      description: "Connecting gamers worldwide, breaking barriers, and celebrating gaming culture across all borders."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge technology and creative solutions for gaming."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "We're gamers ourselves, driven by genuine love for gaming and our community."
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Gaming enthusiast with 15+ years in tech industry",
      image: "👨‍💼"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Full-stack developer passionate about gaming platforms",
      image: "👩‍💻"
    },
    {
      name: "Marcus Williams",
      role: "Head of Community",
      bio: "Community builder dedicated to player engagement",
      image: "👨‍🤝‍👨"
    },
    {
      name: "Emma Rodriguez",
      role: "Game Curator",
      bio: "Expert in game discovery and curation",
      image: "👩‍🎮"
    },
    {
      name: "James Park",
      role: "Lead Designer",
      bio: "UI/UX designer focused on player experience",
      image: "🎨"
    },
  ];

  const milestones = [
    { year: "2020", event: "Theplayfree Founded", description: "Started with a vision to revolutionize gaming discovery" },
    { year: "2021", event: "1M Players", description: "Reached 1 million active players milestone" },
    { year: "2022", event: "Tournament Launch", description: "Introduced competitive tournaments and leaderboards" },
    { year: "2023", event: "Global Expansion", description: "Expanded to 50+ countries worldwide" },
    { year: "2024", event: "2M+ Players", description: "Surpassed 2 million active players" },
    { year: "2026", event: "AI Integration", description: "Launched AI-powered game recommendations" },
  ];

  return (
    <div className="min-h-screen bg-[#E8E9ED] w-full overflow-x-hidden">
      {/* Hero Section */}
      <motion.div 
        className="relative w-full"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="relative w-full  px-4  py-14 text-center">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-2xl mb-6 border border-orange-200"
            variants={iconVariants}
          >
            <Gamepad2 className="w-10 h-10 text-orange-500" />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-gray-900 font-[poppins]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About Theplayfree
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-[poppins]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Connecting millions of gamers worldwide through discovery, competition, and community.
          </motion.p>

          <motion.div 
            className="flex items-center justify-center gap-6 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse font-[poppins]" />
              <span>Founded in 2020</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="w-full px-4 sm:px-6 md:px-7 pt-2 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
        {/* Mission Section */}
        <motion.div 
          className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[poppins]">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg font-[poppins]">
            At Theplayfree, our mission is to revolutionize how gamers discover, play, and compete. We believe gaming should be accessible, 
            inclusive, and rewarding for everyone. We're building the ultimate platform where players can find their next favorite game, 
            connect with fellow gamers, and showcase their skills on a global stage.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg font-[poppins]">
            We're not just a platform—we're a community. Every feature we build, every game we feature, and every tournament we host 
            is designed with one goal in mind: to make gaming better for everyone.
          </p>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div> */}

        {/* Values Section */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-[poppins]">Our Core Values</h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 shrink-0"
                    variants={iconVariants}
                  >
                    {value.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-[poppins]">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-[poppins]">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-[poppins]">Our Journey</h2>
          <motion.div className="grid md:grid-cols-2 gap-6" variants={containerVariants}>
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl shrink-0">
                    <span className="text-2xl font-black text-orange-500 font-[poppins]">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-[poppins]">{milestone.event}</h3>
                    <p className="text-gray-600 font-[poppins]">{milestone.description}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-[poppins]">Meet Our Team</h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={containerVariants}
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 h-48 flex items-center justify-center text-7xl">
                  {member.image}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 font-[poppins]">{member.name}</h3>
                  <p className="text-sm font-semibold text-orange-500 mb-2 font-[poppins]">{member.role}</p>
                  <p className="text-sm text-gray-600 flex-1 font-[poppins]">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 mb-8 border border-orange-200"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-[poppins]">Why Choose Theplayfree?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Largest Game Library", desc: "500+ games across all genres, constantly updated" },
              { title: "Fair Competition", desc: "Anti-cheat systems and verified tournaments" },
              { title: "Community Driven", desc: "Your feedback shapes our platform" },
              { title: "Rewards Program", desc: "Earn rewards and exclusive perks" },
              { title: "24/7 Support", desc: "Dedicated support team always ready to help" },
              { title: "Secure Platform", desc: "Industry-leading security and privacy" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 font-[poppins]">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-[poppins]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div 
          className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[poppins]">Our Vision for the Future</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg font-[poppins]">
            We envision a future where gaming is truly global, inclusive, and rewarding. We're investing in cutting-edge technology 
            like AI-powered recommendations, blockchain-based tournaments, and immersive gaming experiences.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg font-[poppins]">
            Our roadmap includes expanded esports support, mobile gaming integration, and partnerships with major game publishers. 
            We're committed to staying at the forefront of gaming innovation while keeping our community at the heart of everything we do.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 text-center"
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-3xl font-bold mb-4 font-[poppins]">Join Our Community</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-[poppins]">
            Be part of the gaming revolution. Discover new games, compete with players worldwide, and become part of the Theplayfree family.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-flex font-[poppins] items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/30"
            >
              Start Playing Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="bg-white rounded-2xl p-8 mt-8 shadow-sm border  border-gray-200"
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 font-[poppins]">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Website", text: "www.Theplayfree.gg", href: "https://Theplayfree.gg" },
              { icon: Users, title: "Community", text: "Join our Discord", href: "#" },
              { icon: Target, title: "Business", text: "partnerships@Theplayfree.gg", href: "mailto:partnerships@Theplayfree.gg" },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={idx}
                  href={contact.href}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 font-[poppins]">{contact.title}</p>
                    <p className="text-sm text-gray-600 group-hover:text-orange-500 transition-colors font-[poppins]">{contact.text}</p>
                  </div>
                </motion.a>
              );
            })}
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
