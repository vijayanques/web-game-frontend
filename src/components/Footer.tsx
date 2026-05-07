



// "use client";

// const TheplayfreeFooter = () => {
//   // ── SVG Icons ──────────────────────────────────────────────────────────────
//   const Icons = {
//     Gamepad2: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
//         <line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/>
//         <rect x="2" y="6" width="20" height="12" rx="2"/>
//       </svg>
//     ),
//     Trophy: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
//         <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
//         <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
//         <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
//       </svg>
//     ),
//     Users: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
//         <circle cx="9" cy="7" r="4"/>
//         <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//       </svg>
//     ),
//     Zap: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
//       </svg>
//     ),
//     Twitter: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//       </svg>
//     ),
//     YouTube: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//       </svg>
//     ),
//     Twitch: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
//       </svg>
//     ),
//     Discord: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
//       </svg>
//     ),
//     Instagram: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//       </svg>
//     ),
//     ChevronRight: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="m9 18 6-6-6-6"/>
//       </svg>
//     ),
//     Star: ({ size = 24, filled = false }: { size?: number; filled?: boolean }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//       </svg>
//     ),
//     Flame: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
//       </svg>
//     ),
//     Shield: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//       </svg>
//     ),
//     Headphones: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
//         <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
//       </svg>
//     ),
//     Globe: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
//         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
//       </svg>
//     ),
//     Mail: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
//       </svg>
//     ),
//     MapPin: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
//       </svg>
//     ),
//     ArrowUpRight: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
//       </svg>
//     ),
//     Joystick: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2z"/>
//         <path d="M6 15v-2"/><path d="M12 15V9"/><circle cx="12" cy="6" r="3"/>
//       </svg>
//     ),
//     Swords: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/>
//         <line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/>
//         <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/>
//         <line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/>
//       </svg>
//     ),
//   };

//   // ── Data ───────────────────────────────────────────────────────────────────
//   const quickLinks = [
//     { label: "All Games", href: "#", hot: true },
//     { label: "Tournaments", href: "#", hot: false },
//     { label: "Leaderboards", href: "#", hot: false },
//     { label: "Community Hub", href: "#", hot: false },
//     { label: "Live Streams", href: "#", hot: true },
//     { label: "Game Reviews", href: "#", hot: false },
//   ];

//   const categories = [
//     { label: "FPS Games", icon: <Icons.Zap size={14} /> },
//     { label: "Battle Royale", icon: <Icons.Flame size={14} /> },
//     { label: "Strategy", icon: <Icons.Shield size={14} /> },
//     { label: "Racing", icon: <Icons.Zap size={14} /> },
//     { label: "Horror", icon: <Icons.Star size={14} /> },
//     { label: "Arcade", icon: <Icons.Gamepad2 size={14} /> },
//   ];

//   const support = [
//     { label: "Help Center", href: "#" },
//     { label: "Report a Bug", href: "#" },
//     { label: "Privacy Policy", href: "#" },
//     { label: "Terms of Service", href: "#" },
//     { label: "Cookie Settings", href: "#" },
//     { label: "Refund Policy", href: "#" },
//   ];

//   const socials = [
//     { icon: <Icons.Twitter size={18} />, label: "Twitter", color: "hover:text-sky-400" },
//     { icon: <Icons.YouTube size={18} />, label: "YouTube", color: "hover:text-red-500" },
//     { icon: <Icons.Twitch size={18} />, label: "Twitch", color: "hover:text-purple-400" },
//     { icon: <Icons.Discord size={18} />, label: "Discord", color: "hover:text-indigo-400" },
//     { icon: <Icons.Instagram size={18} />, label: "Instagram", color: "hover:text-pink-400" },
//   ];

//   const stats = [
//     { value: "2.4M+", label: "Active Players", icon: <Icons.Users size={20} /> },
//     { value: "500+", label: "Games Listed", icon: <Icons.Gamepad2 size={20} /> },
//     { value: "12K+", label: "Tournaments", icon: <Icons.Trophy size={20} /> },
//     { value: "98%", label: "Uptime", icon: <Icons.Zap size={20} /> },
//   ];

//   const trendingGames = [
//     "Valorant Champions", "Fortnite Clash", "Minecraft", "FIFA 24",
//     "Rocket League", "Among Us", "GTA V", "Subway Surfers",
//     "Apex Legends", "Call of Duty Arena",
//   ];

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <footer className="relative bg-[#0f0f13] text-gray-300 overflow-hidden font-sans">
//       {/* Top gradient border */}
//       <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

//       {/* Background grid texture */}
//       <div
//         className="absolute inset-0 opacity-[0.03] pointer-events-none"
//         // style={{
//         //   backgroundImage: `
//         //     linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
//         //     linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
//         //   `,
//         //   backgroundSize: "40px 40px",
//         // }}
//       />

//       {/* Glowing orbs */}
//       <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

//       {/* Stats Banner */}
//       <div className="relative border-b border-white/5">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {stats.map((stat, i) => (
//               <div key={i} className="flex items-center gap-4 group">
//                 <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-all duration-300 flex-shrink-0">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <div className="text-2xl font-black text-white tracking-tight leading-none">{stat.value}</div>
//                   <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Content */}
//       <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//           {/* Brand Column */}
//           <div className="lg:col-span-4 space-y-6">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
//                 <span className="text-white font-black text-lg">G</span>
//               </div>
//               <span className="text-2xl font-black text-white tracking-tight">
//                 Game<span className="text-orange-400">Hub</span>
//               </span>
//             </div>

//             <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
//               The ultimate destination for gamers worldwide. Discover, play, and compete in hundreds of games across all genres.
//             </p>

//             {/* Newsletter */}
//             <div className="space-y-3">
//               <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold flex items-center gap-2">
//                 <Icons.Flame size={12} />
//                 Stay in the game
//               </p>
//               <div className="flex gap-2">
//                 <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus-within:border-orange-500/50 transition-all">
//                   <span className="text-gray-500 flex-shrink-0"><Icons.Mail size={14} /></span>
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none w-full"
//                   />
//                 </div>
//                 <button className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-lg transition-colors duration-200 flex-shrink-0 shadow-lg shadow-orange-500/20">
//                   Join
//                 </button>
//               </div>
//             </div>

//             {/* Socials */}
//             <div className="flex items-center gap-3 pt-1">
//               {socials.map((s, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   aria-label={s.label}
//                   className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 ${s.color} hover:border-white/20 hover:bg-white/10 transition-all duration-200`}
//                 >
//                   {s.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Links Columns */}
//           <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

//             {/* Quick Links */}
//             <div>
//               <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
//                 <span className="text-orange-400"><Icons.Joystick size={14} /></span>
//                 Explore
//               </h4>
//               <ul className="space-y-3">
//                 {quickLinks.map((link, i) => (
//                   <li key={i}>
//                     <a href={link.href} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
//                       <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-1 group-hover:ml-0">
//                         <Icons.ChevronRight size={12} />
//                       </span>
//                       {link.label}
//                       {link.hot && (
//                         <span className="text-[9px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full border border-orange-500/30">
//                           HOT
//                         </span>
//                       )}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Categories */}
//             <div>
//               <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
//                 <span className="text-orange-400"><Icons.Swords size={14} /></span>
//                 Categories
//               </h4>
//               <ul className="space-y-3">
//                 {categories.map((cat, i) => (
//                   <li key={i}>
//                     <a href="#" className="group flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200">
//                       <span className="text-orange-500/40 group-hover:text-orange-400 transition-colors duration-200">
//                         {cat.icon}
//                       </span>
//                       {cat.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support */}
//             <div>
//               <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
//                 <span className="text-orange-400"><Icons.Headphones size={14} /></span>
//                 Support
//               </h4>
//               <ul className="space-y-3">
//                 {support.map((item, i) => (
//                   <li key={i}>
//                     <a href={item.href} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
//                       <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-1 group-hover:ml-0">
//                         <Icons.ChevronRight size={12} />
//                       </span>
//                       {item.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>

//               {/* Contact Info */}
//               <div className="mt-6 space-y-2.5">
//                 <div className="flex items-center gap-2.5 text-xs text-gray-500">
//                   <span className="text-orange-400/60"><Icons.Globe size={12} /></span>
//                   <span>Theplayfree.gg</span>
//                 </div>
//                 <div className="flex items-center gap-2.5 text-xs text-gray-500">
//                   <span className="text-orange-400/60"><Icons.Mail size={12} /></span>
//                   <span>support@Theplayfree.gg</span>
//                 </div>
//                 <div className="flex items-center gap-2.5 text-xs text-gray-500">
//                   <span className="text-orange-400/60"><Icons.MapPin size={12} /></span>
//                   <span>San Francisco, CA</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Trending Ticker */}
//         <div className="mt-12 mb-6 relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] py-3 px-4">
//           <div className="flex items-center gap-3">
//             <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded px-2 py-1 flex-shrink-0 flex items-center gap-1">
//               <Icons.Flame size={10} /> Trending
//             </span>
//             <div className="overflow-hidden flex-1">
//               <div className="flex gap-8 animate-[ticker_20s_linear_infinite] whitespace-nowrap">
//                 {[...trendingGames, ...trendingGames].map((game, i) => (
//                   <span key={i} className="text-xs text-gray-400 flex items-center gap-2">
//                     <span className="text-orange-400"><Icons.Star size={9} filled /></span>
//                     {game}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <a href="#" className="flex-shrink-0 flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold transition-colors">
//               View All <Icons.ArrowUpRight size={12} />
//             </a>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-xs text-gray-600">
//             © 2025 <span className="text-gray-500">Theplayfree Inc.</span> All rights reserved.
//           </p>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50" />
//             <span className="text-xs text-gray-500">All systems operational</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</a>
//             <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</a>
//             <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Cookies</a>
//           </div>
//         </div>
//       </div>

//       {/* Ticker animation */}
//       <style>{`
//         @keyframes ticker {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default TheplayfreeFooter;




// "use client";

// const TheplayfreeFooter = () => {
//   // ── SVG Icons ──────────────────────────────────────────────────────────────
//   const Icons = {
//     Gamepad2: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" />
//         <line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" />
//         <rect x="2" y="6" width="20" height="12" rx="2" />
//       </svg>
//     ),
//     Trophy: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
//         <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
//         <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
//         <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
//       </svg>
//     ),
//     Users: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
//       </svg>
//     ),
//     Zap: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//       </svg>
//     ),
//     Twitter: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//       </svg>
//     ),
//     YouTube: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//       </svg>
//     ),
//     Twitch: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
//       </svg>
//     ),
//     Discord: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
//       </svg>
//     ),
//     Instagram: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//       </svg>
//     ),
//     ChevronRight: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="m9 18 6-6-6-6" />
//       </svg>
//     ),
//     Star: ({ size = 24, filled = false }: { size?: number; filled?: boolean }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//       </svg>
//     ),
//     Flame: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
//       </svg>
//     ),
//     Shield: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//       </svg>
//     ),
//     Headphones: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
//         <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
//       </svg>
//     ),
//     Globe: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
//         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
//       </svg>
//     ),
//     Mail: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//       </svg>
//     ),
//     MapPin: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
//       </svg>
//     ),
//     ArrowUpRight: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M7 7h10v10" /><path d="M7 17 17 7" />
//       </svg>
//     ),
//     Joystick: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2z" />
//         <path d="M6 15v-2" /><path d="M12 15V9" /><circle cx="12" cy="6" r="3" />
//       </svg>
//     ),
//     Swords: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" /><line x1="13" y1="19" x2="19" y2="13" />
//         <line x1="16" y1="16" x2="20" y2="20" /><line x1="19" y1="21" x2="21" y2="19" />
//         <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" /><line x1="5" y1="14" x2="9" y2="18" />
//         <line x1="7" y1="17" x2="4" y2="20" /><line x1="3" y1="19" x2="5" y2="21" />
//       </svg>
//     ),
//     Send: ({ size = 24 }: { size?: number }) => (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
//       </svg>
//     ),
//   };

//   // ── Data ──────────────────────────────────────────────────────────────
//   const quickLinks = [
//     { label: "All Games", href: "#", hot: true },
//     { label: "Tournaments", href: "#", hot: false },
//     { label: "Leaderboards", href: "#", hot: false },
//     { label: "Community Hub", href: "#", hot: false },
//     { label: "Live Streams", href: "#", hot: true },
//     { label: "Game Reviews", href: "#", hot: false },
//   ];

//   const categories = [
//     { label: "FPS Games", icon: <Icons.Zap size={14} /> },
//     { label: "Battle Royale", icon: <Icons.Flame size={14} /> },
//     { label: "Strategy", icon: <Icons.Shield size={14} /> },
//     { label: "Racing", icon: <Icons.Zap size={14} /> },
//     { label: "Horror", icon: <Icons.Star size={14} /> },
//     { label: "Arcade", icon: <Icons.Gamepad2 size={14} /> },
//   ];

//   const support = [
//     { label: "Help Center", href: "#" },
//     { label: "Report a Bug", href: "#" },
//     { label: "Privacy Policy", href: "#" },
//     { label: "Terms of Service", href: "#" },
//     { label: "Cookie Settings", href: "#" },
//     { label: "Refund Policy", href: "#" },
//   ];

//   const socials = [
//     { icon: <Icons.Twitter size={16} />, label: "Twitter", hoverBg: "hover:bg-sky-500" },
//     { icon: <Icons.YouTube size={16} />, label: "YouTube", hoverBg: "hover:bg-red-500" },
//     { icon: <Icons.Twitch size={16} />, label: "Twitch", hoverBg: "hover:bg-purple-500" },
//     { icon: <Icons.Discord size={16} />, label: "Discord", hoverBg: "hover:bg-indigo-500" },
//     { icon: <Icons.Instagram size={16} />, label: "Instagram", hoverBg: "hover:bg-pink-500" },
//   ];

//   const stats = [
//     { value: "2.4M+", label: "Active Players", icon: <Icons.Users size={22} /> },
//     { value: "500+", label: "Games Listed", icon: <Icons.Gamepad2 size={22} /> },





//     { value: "12K+", label: "Tournaments", icon: <Icons.Trophy size={22} /> },
//     { value: "98%", label: "Uptime", icon: <Icons.Zap size={22} /> },
//   ];

//   const trendingGames = [
//     "Valorant Champions", "Fortnite Clash", "Minecraft", "FIFA 24",
//     "Rocket League", "Among Us", "GTA V", "Subway Surfers",
//     "Apex Legends", "Call of Duty Arena",
//   ];

//   return (
//     <footer className="bg-[#f3f4f6] font-sans">

//       {/* ── Stats Bar ── */}
//       <div className="bg-[#E8E9ED]  border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {stats.map((stat, i) => (
//               <div key={i} className="flex items-center gap-3 group">
//                 <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <div className="text-xl font-black text-gray-800 leading-none tracking-tight">{stat.value}</div>
//                   <div className="text-[11px] text-gray-400 mt-0.5 font-medium">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Trending Ticker ── */}
//       <div className="bg-orange-500 overflow-hidden">
//         <div className="flex items-center">
//           <div className="flex-shrink-0 bg-orange-600 px-5 py-2.5 flex items-center gap-2">
//             <span className="text-white"><Icons.Flame size={13} /></span>
//             <span className="text-white text-[11px] font-black uppercase tracking-widest whitespace-nowrap">Trending</span>
//           </div>
//           <div className="overflow-hidden flex-1 py-2.5">
//             <div className="flex gap-10 animate-[ticker_25s_linear_infinite] whitespace-nowrap">
//               {[...trendingGames, ...trendingGames, ...trendingGames].map((game, i) => (
//                 <span key={i} className="text-[12px] text-orange-100 font-semibold flex items-center gap-2 flex-shrink-0">
//                   <span className="text-white opacity-60">
//                     <Icons.Star size={9} filled />
//                   </span>
//                   {game}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Main Footer Body ── */}
//       <div className=" px-6 pt-12 pb-8 bg-[#E8E9ED]">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//           {/* Brand Column */}
//           <div className="lg:col-span-4 space-y-5">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-200">
//                 <span className="text-white font-black text-lg">G</span>
//               </div>
//               <span className="text-2xl font-black text-gray-800 tracking-tight">
//                 Game<span className="text-orange-500">Hub</span>
//               </span>
//             </div>

//             <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
//               The ultimate destination for gamers worldwide. Discover, play, and compete in hundreds of games across all genres.
//             </p>

//             {/* Newsletter card */}
//             <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
//               <p className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
//                 <span className="text-orange-500"><Icons.Mail size={12} /></span>
//                 Stay in the game
//               </p>
//               <p className="text-[11px] text-gray-400 mb-3">Get weekly game drops & tournament alerts.</p>
//               <div className="flex gap-2">
//                 <input
//                   type="email"
//                   placeholder="your@email.com"
//                   className="flex-1 text-sm text-gray-700 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-orange-400 focus:bg-white transition-all"
//                 />
//                 <button className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 flex-shrink-0 shadow-sm shadow-orange-200">
//                   <Icons.Send size={15} />
//                 </button>
//               </div>
//             </div>

//             {/* Socials */}
//             <div>
//               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Follow Us</p>
//               <div className="flex items-center gap-2">
//                 {socials.map((s, i) => (
//                   <a
//                     key={i}
//                     href="#"
//                     aria-label={s.label}
//                     className={`w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 ${s.hoverBg} hover:text-white hover:border-transparent transition-all duration-200`}
//                   >
//                     {s.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Links Columns */}
//           <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

//             {/* Explore */}
//             <div>
//               <h4 className="text-gray-800 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
//                 <span className="text-orange-500 bg-orange-50 rounded-lg p-1.5 border border-orange-100">
//                   <Icons.Joystick size={12} />
//                 </span>
//                 Explore
//               </h4>
//               <ul className="space-y-2.5">
//                 {quickLinks.map((link, i) => (
//                   <li key={i}>
//                     <a href={link.href} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200 font-medium">
//                       <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors duration-200 flex-shrink-0" />
//                       {link.label}
//                       {link.hot && (
//                         <span className="text-[9px] font-black uppercase tracking-wider bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
//                           HOT
//                         </span>
//                       )}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Categories */}
//             <div>
//               <h4 className="text-gray-800 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
//                 <span className="text-orange-500 bg-orange-50 rounded-lg p-1.5 border border-orange-100">
//                   <Icons.Swords size={12} />
//                 </span>
//                 Categories
//               </h4>
//               <ul className="space-y-2.5">
//                 {categories.map((cat, i) => (
//                   <li key={i}>
//                     <a href="#" className="group flex items-center gap-2.5 text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200 font-medium">
//                       <span className="text-gray-300 group-hover:text-orange-400 transition-colors duration-200">
//                         {cat.icon}
//                       </span>
//                       {cat.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support */}
//             <div>
//               <h4 className="text-gray-800 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
//                 <span className="text-orange-500 bg-orange-50 rounded-lg p-1.5 border border-orange-100">
//                   <Icons.Headphones size={12} />
//                 </span>
//                 Support
//               </h4>
//               <ul className="space-y-2.5">
//                 {support.map((item, i) => (
//                   <li key={i}>
//                     <a href={item.href} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200 font-medium">
//                       <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors duration-200 flex-shrink-0" />
//                       {item.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>

//               {/* Contact */}
//               <div className="mt-5 space-y-2 pt-5 border-t border-gray-200">
//                 <div className="flex items-center gap-2 text-xs text-gray-400">
//                   <span className="text-orange-400"><Icons.Globe size={12} /></span>
//                   Theplayfree.gg
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-gray-400">
//                   <span className="text-orange-400"><Icons.Mail size={12} /></span>
//                   support@Theplayfree.gg
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-gray-400">
//                   <span className="text-orange-400"><Icons.MapPin size={12} /></span>
//                   San Francisco, CA
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Bottom Bar ── */}
//         <div className="mt-10 pt-5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-xs text-gray-400">
//             © 2025 <span className="text-gray-600 font-semibold">Theplayfree Inc.</span> All rights reserved.
//           </p>

//           <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
//             <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
//             <span className="text-[11px] text-gray-500 font-medium">All systems operational</span>
//           </div>

//           <div className="flex items-center gap-4">
//             {["Privacy", "Terms", "Cookies"].map((item) => (
//               <a key={item} href="#" className="text-xs text-gray-400 hover:text-orange-500 transition-colors font-medium">
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes ticker {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-33.333%); }
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default TheplayfreeFooter;



"use client";

import { useState, useRef } from "react";
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, Category } from '@/lib/api/categories';
import * as LucideIcons from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';

const TheplayfreeFooter = () => {
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const router = useRouter();

  // Refs for scroll-triggered animations
  const statsRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // useInView hooks for scroll detection
  const isStatsInView = useInView(statsRef, { once: true, margin: "0px" });
  const isBrandInView = useInView(brandRef, { once: true, margin: "0px" });
  const isLinksInView = useInView(linksRef, { once: true, margin: "0px" });
  const isBottomBarInView = useInView(bottomBarRef, { once: true, margin: "0px" });

  // Fetch categories from API
  const { data: apiCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['footer-categories'],
    queryFn: fetchCategories,
  });

  // Fetch total games count
  const { data: gamesData } = useQuery({
    queryKey: ['total-games-count'],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/games`);
      const data = await response.json();
      return data;
    },
  });

  // Helper function to get icon component from string
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Icons.Gamepad2({ size: 13 });

    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    const IconComponent = (LucideIcons as any)[pascalCase];
    return IconComponent ? <IconComponent size={13} /> : <Icons.Gamepad2 size={13} />;
  };

  const handleSubscribe = () => {
    if (emailValue) { setSubscribed(true); setTimeout(() => setSubscribed(false), 3000); setEmailValue(""); }
  };

  // ── SVG Icons ──────────────────────────────────────────────────────────────
  const Icons = {
    Gamepad2: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
    Trophy: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    Users: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    Zap: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    Twitter: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    YouTube: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    Twitch: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
      </svg>
    ),
    Discord: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    Instagram: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    Star: ({ size = 24, filled = false }: { size?: number; filled?: boolean }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    Flame: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    Shield: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    Headphones: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    Globe: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    Mail: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    MapPin: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    Joystick: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2z" />
        <path d="M6 15v-2" /><path d="M12 15V9" /><circle cx="12" cy="6" r="3" />
      </svg>
    ),
    Swords: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" /><line x1="13" y1="19" x2="19" y2="13" />
        <line x1="16" y1="16" x2="20" y2="20" /><line x1="19" y1="21" x2="21" y2="19" />
        <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" /><line x1="5" y1="14" x2="9" y2="18" />
        <line x1="7" y1="17" x2="4" y2="20" /><line x1="3" y1="19" x2="5" y2="21" />
      </svg>
    ),
    Send: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
      </svg>
    ),
    Check: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    ArrowRight: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    ),
    Target: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    Radio: ({ size = 24 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
        <circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
      </svg>
    ),
  };

  const quickLinks = [
    {
      label: "All Games",
      href: "/",
      badge: gamesData?.data?.length ? `${gamesData.data.length}+` : "500+",
      badgeType: "count"
    },
    // { label: "Tournaments", href: "#", badge: "Live", badgeType: "live" },
    // { label: "Leaderboards", href: "#", badge: null, badgeType: null },
    // { label: "Community Hub", href: "#", badge: null, badgeType: null },
    // { label: "Live Streams", href: "#", badge: null, badgeType: null },
    // { label: "Game Reviews", href: "#", badge: null, badgeType: null },
  ];

  const categories = [
    { label: "FPS Games", icon: <Icons.Zap size={13} />, count: "48" },
    { label: "Battle Royale", icon: <Icons.Flame size={13} />, count: "22" },
    { label: "Strategy", icon: <Icons.Shield size={13} />, count: "67" },
    { label: "Racing", icon: <Icons.Target size={13} />, count: "31" },
    { label: "Horror", icon: <Icons.Star size={13} />, count: "19" },
    { label: "Arcade", icon: <Icons.Gamepad2 size={13} />, count: "84" },
  ];

  // Map API categories to footer format
  const footerCategories = apiCategories
    .filter((cat: Category) => cat.isActive || cat.is_active)
    .slice(0, 6) // Limit to 6 categories for footer
    .map((cat: Category) => ({
      label: cat.name,
      icon: getIconComponent(cat.icon),
      count: "", // You can add game count from API if available
      slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
      dbId: cat.id, // Add database ID for scrolling to category sections
    }));

  const support = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "About us", href: "/about-us" },
  ];

  const socials = [
    {
      icon: <Icons.Twitter size={15} />, label: "Twitter", bg: "hover:bg-sky-500"
    },
    { icon: <Icons.YouTube size={15} />, label: "YouTube", bg: "hover:bg-red-500" },
    { icon: <Icons.Twitch size={15} />, label: "Twitch", bg: " hover:bg-purple-500" },
    { icon: <Icons.Discord size={15} />, label: "Discord", bg: "  hover:bg-indigo-500" },
    { icon: <Icons.Instagram size={15} />, label: "Instagram", bg: "hover:bg-pink-500" },
  ];

  const stats = [
    { value: "2.4M+", label: "Active Players", icon: <Icons.Users size={20} />, color: "text-blue-500", bg: "bg-blue-50 border-blue-100 group-hover:bg-blue-500" },
    {
      value: gamesData?.data?.length ? `${gamesData.data.length}+` : "500+",
      label: "Games Listed",
      icon: <Icons.Gamepad2 size={20} />,
      color: "text-orange-500",
      bg: "bg-orange-50 border-orange-100 group-hover:bg-orange-500"
    },
    { value: "12K+", label: "Tournaments", icon: <Icons.Trophy size={20} />, color: "text-yellow-500", bg: "bg-yellow-50 border-yellow-100 group-hover:bg-yellow-500" },
    { value: "98%", label: "Uptime", icon: <Icons.Zap size={20} />, color: "text-green-500", bg: "bg-green-50 border-green-100 group-hover:bg-green-500" },
  ];

  const trendingGames = [
    "Valorant Champions", "Fortnite Clash", "Minecraft", "FIFA 24",
    "Rocket League", "Among Us", "GTA V", "Subway Surfers",
    "Apex Legends", "Call of Duty Arena",
  ];

  // Animation variants
  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0 }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const brandColumnVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linksColumnVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 }
    })
  };

  const bottomBarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 }
    }
  };

  const featuredGames = [
    { name: "Valorant", rating: "4.8", players: "1.2k" },
    { name: "Fortnite", rating: "4.9", players: "2.5k" },
    { name: "Minecraft", rating: "4.9", players: "3.5k" },
  ];

  return (
    <footer className="bg-[#e8e9ed] font-sans">


      {/* 
      <div className="bg-orange-500 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-orange-600 px-5 py-2.5 flex items-center gap-2">
            <span className="text-white"><Icons.Flame size={13} /></span>
            <span className="text-white text-[11px] font-black uppercase tracking-widest whitespace-nowrap">Trending</span>
          </div>
          <div className="overflow-hidden flex-1 py-2.5">
            <div className="flex gap-10 animate-[ticker_25s_linear_infinite] whitespace-nowrap">
              {[...trendingGames, ...trendingGames, ...trendingGames].map((game, i) => (
                <span key={i} className="text-[12px] text-orange-100 font-semibold flex items-center gap-2 flex-shrink-0">
                  <span className="text-white opacity-60">
                    <Icons.Star size={9} filled />
                  </span>
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* ── Stats Bar ── */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4 group cursor-default">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${stat.bg} ${stat.color} group-hover:text-white group-hover:shadow-md`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-[22px] font-black text-gray-800 leading-none tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* <div className="bg-[#E8E9ED]  border-t border-gray-200">
        <div className=" px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-black text-gray-800 leading-none tracking-tight">{stat.value}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="bg-[#E8E9ED] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-7">
          <div className="py-6">
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={statsContainerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={statItemVariants}
                className="flex items-center justify-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-orange-50  flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <div className=" font-[poppins] text-xl font-black text-gray-800 leading-none tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-[poppins] text-gray-500 mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-orange-500 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-orange-600 px-5 py-2.5 flex items-center gap-2">
            <span className="text-white"><Icons.Flame size={13} /></span>
            <span className="text-white text-[11px] font-black font-[poppins] uppercase tracking-widest ">Trending</span>
          </div>
          <div className="overflow-hidden flex-1 py-2.5">
            <div className="flex gap-10 animate-[ticker_25s_linear_infinite] whitespace-nowrap">
              {[...trendingGames, ...trendingGames, ...trendingGames].map((game, i) => (
                <span key={i} className="text-[12px] text-orange-100 font-[poppins] font-semibold flex items-center gap-2 flex-shrink-0">
                  <span className="text-white opacity-60">
                    <Icons.Star size={9} filled />
                  </span>
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="px-4 sm:px-6 md:px-7 pt-12 pb-8">

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Brand Column ── */}
          <motion.div
            ref={brandRef}
            initial="hidden"
            animate={isBrandInView ? "visible" : "hidden"}
            variants={brandColumnVariants}
            className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 ">
              <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-semibold font-[poppins] tracking-wide">The<span className="text-orange-500">playfree</span></span>
                {/* <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className="text-orange-400"><Icons.Star size={9} filled /></span>
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1 font-medium">4.9 · 120k reviews</span>
                </div> */}
              </div>
            </Link>

            <p className="text-sm text-gray-500 font-[poppins] leading-relaxed">
              The ultimate destination for gamers worldwide. Discover, play, and compete in hundreds of games across every genre imaginable.
            </p>

            {/* Featured Mini Games */}
            <div className="bg-white/60 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-4 pt-3 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-black font-[poppins] text-gray-600 uppercase tracking-widest">Top Games</span>
                <a href="#" className="text-[11px] font-[poppins] text-orange-500 font-bold hover:text-orange-600">View all</a>
              </div>
              {featuredGames.map((game, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center justify-between hover:bg-orange-50 transition-colors group cursor-pointer border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-[10px] font-[poppins] font-black">
                      {i + 1}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-500 font-[poppins] transition-colors">{game.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-gray-500 font-[poppins]">{game.players} playing</span>
                    <div className="flex items-center gap-0.5">
                      <span className="text-orange-400"><Icons.Star size={9} filled /></span>
                      <span className="text-[10px] font-bold font-[poppins] text-gray-600">{game.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            {/* <div className="bg-white/60  rounded-2xl p-4 border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="" />
              <div className="absolute top-2 right-2 text-orange-400">
                <Icons.Mail size={28} />
              </div>
              <div className="relative">
                <p className="text-xs font-black text-gray-600 mb-0.5 font-[poppins]">Stay in the Game</p>
                <p className="text-[12px] text-gray-500 mb-3 leading-relaxed font-[poppins]">Weekly drops, tournament alerts & exclusive rewards.</p>
                {subscribed ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                    <span className="text-green-500"><Icons.Check size={15} /></span>
                    <span className="text-sm font-bold text-green-600">You're in! Welcome aboard 🎉</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      placeholder="your@email.com"
                      className="flex-1 text-sm text-gray-700 placeholder:text-gray-500 font-[poppins] bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-orange-400 focus:bg-white transition-all"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="px-3.5 py-2.5 bg-orange-500 cursor-pointer  hover:bg-orange-600 active:scale-95 text-white rounded-xl transition-all duration-150 flex-shrink-0 shadow-sm shadow-orange-200"
                    >
                      <Icons.Send size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div> */}

            {/* Socials */}
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 font-[poppins]">Join Our Community</p>
              <div className="flex items-center gap-2">
                {socials.map((s, i) => (
                  <a key={i} href="#" aria-label={s.label}
                    className={`w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 ${s.bg} hover:text-white hover:border-transparent hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Links Area ── */}
          <motion.div
            ref={linksRef}
            initial="hidden"
            animate={isLinksInView ? "visible" : "hidden"}
            variants={linksColumnVariants}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pl-6 lg:border-l border-gray-200">

            {/* Explore */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-200">
                  <Icons.Joystick size={15} />
                </div>
                <h4 className="text-gray-700 font-black text-xs uppercase tracking-widest font-[poppins]">Explore</h4>
              </div>
              <ul className="space-y-1">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => {
                        if (link.label === "All Games") {
                          // Scroll to all games section with offset to show heading
                          const allGamesSection = document.querySelector('[data-section="all-games"]');
                          if (allGamesSection) {
                            const yOffset = -100; // Offset to show heading (adjust as needed)
                            const y = allGamesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        } else if (link.href === '/') {
                          router.push('/');
                        } else if (link.href !== '#') {
                          router.push(link.href);
                        }
                      }}
                      className="w-full group flex items-center justify-between text-sm text-gray-500 font-[poppins] hover:text-orange-500 transition-colors duration-200 font-medium py-1.5 px-2.5 rounded-lg hover:bg-orange-50"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${link.badgeType === "live"
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-500"
                          }`}>
                          {link.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-200">
                  <Icons.Swords size={15} />
                </div>
                <h4 className="text-gray-700 font-black text-xs uppercase tracking-widest font-[poppins]">Categories</h4>
              </div>
              {categoriesLoading ? (
                <ul className="space-y-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="py-1.5 px-2.5">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  {footerCategories.map((cat, i) => (
                    <li key={i}>
                      <button
                        onClick={() => {
                          // Navigate to category page using slug
                          router.push(`/category/${cat.slug}`);
                        }}
                        className="w-full group flex items-center justify-between text-sm font-[poppins] text-gray-500 hover:text-orange-500 transition-colors duration-200 font-medium py-1.5 px-2.5 rounded-lg hover:bg-orange-50"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-gray-500 group-hover:text-orange-400 transition-colors">{cat.icon}</span>
                          {cat.label}
                        </span>
                        {cat.count && (
                          <span className="text-[10px] bg-gray-100 text-gray-500 font-[poppins] px-2 py-0.5 rounded-full group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors font-bold">
                            {cat.count}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Support + Contact */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-200">
                  <Icons.Headphones size={15} />
                </div>
                <h4 className="text-gray-700 font-black text-xs uppercase tracking-widest font-[poppins]">Support</h4>
              </div>
              <ul className="space-y-1 mb-6">
                {support.map((item, i) => (
                  <li key={i}>
                    <a href={item.href}
                      className="group flex items-center text-sm font-[poppins] text-gray-500 hover:text-orange-500 transition-colors duration-200 font-medium py-1.5 px-2.5 rounded-lg hover:bg-orange-50"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact card */}
              <div className="bg-white/60 rounded-2xl p-4 border border-gray-200 shadow-sm space-y-2.5">
                <p className="text-[10px] font-black text-gray-500 font-[poppins] uppercase tracking-widest mb-3">Contact</p>
                <a href="#" className="flex items-center gap-2.5 text-xs text-gray-500 font-[poppins] hover:text-orange-500 transition-colors group">
                  <div className="w-6 h-6 rounded-lg text-gray-500 border border-orange-100 flex items-center justify-center  group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icons.Globe size={15} />
                  </div>
                  Theplayfree.com
                </a>
                <a href="#" className="flex font-[poppins] items-center gap-2.5 text-xs text-gray-500 hover:text-orange-500 transition-colors group">
                  <div className="w-6 h-6 rounded-lg text-gray-500 border border-orange-100 flex items-center justify-center  group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icons.Mail size={15} />
                  </div>
                  Theplayfree.com
                </a>
                <div className=" cursor-pointer flex font-[poppins]  items-center gap-2.5 text-xs text-gray-500 hover:text-orange-500 transition-colors group">
                  <div className="w-6 h-6 rounded-lg text-gray-500 border border-orange-100 flex items-center justify-center  group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icons.MapPin size={15} />
                  </div>
                  San Francisco, CA
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
        <motion.div
          ref={bottomBarRef}
          initial="hidden"
          animate={isBottomBarInView ? "visible" : "hidden"}
          variants={bottomBarVariants}
          className="bg-[#E8E9ED] border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2026 <span className="text-gray-600 font-bold">Theplayfree</span> · Made with for gamers
            </p>

            <div className="flex items-center gap-2 bg-white/60  border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-300" />
              <span className="text-[11px] text-gray-500 font-semibold font-[poppins]">All systems operational</span>
            </div>

            <div className="flex items-center gap-1">
              {[
                { label: "Privacy", href: "/privacy-policy" },
                { label: "Terms", href: "/terms-of-service" }
              ].map((item, i, arr) => (
                <span key={item.label} className="flex items-center">
                  <a href={item.href} className="text-xs text-gray-500 hover:text-orange-500 transition-colors font-medium px-2 font-[poppins]">{item.label}</a>
                  {i < arr.length - 1 && <span className="text-gray-200">·</span>}
                </span>
              ))}
            </div>
          </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </footer>
  );
};

export default TheplayfreeFooter;