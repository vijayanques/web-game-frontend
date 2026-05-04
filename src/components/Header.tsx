// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Menu, X, Search, Bell, Sun, Moon, LogOut, Settings, User } from 'lucide-react';

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeLink, setActiveLink] = useState('home');

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDark]);

//   const navLinks = [
//     { id: 'home', label: 'Home', href: '#' },
//     { id: 'explore', label: 'Explore', href: '#' },
//     { id: 'tournaments', label: 'Tournaments', href: '#' },
//     { id: 'leaderboard', label: 'Leaderboard', href: '#' },
//     { id: 'community', label: 'Community', href: '#' },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? isDark
//             ? 'bg-slate-900/70 backdrop-blur-md border-b border-slate-700/30'
//             : 'bg-white/70 backdrop-blur-md border-b border-slate-200/30'
//           : isDark
//           ? 'bg-slate-900/50 backdrop-blur-sm'
//           : 'bg-white/50 backdrop-blur-sm'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 sm:h-20">
//           {/* Logo & Brand */}
//           <Link
//             href="/"
//             className={`flex items-center gap-2 group transition-all duration-300 ${
//               isDark ? 'text-white' : 'text-slate-900'
//             }`}
//           >
//             <div className="relative w-8 h-8 sm:w-10 sm:h-10">
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-sm" />
//               <div className={`relative w-full h-full rounded-lg flex items-center justify-center font-bold text-white text-sm sm:text-base ${
//                 isDark ? 'bg-slate-800' : 'bg-white'
//               }`}>
//                 G
//               </div>
//             </div>
//             <span className="hidden sm:inline font-bold text-lg sm:text-xl bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
//               GameHub
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <button
//                 key={link.id}
//                 onClick={() => setActiveLink(link.id)}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${
//                   activeLink === link.id
//                     ? isDark
//                       ? 'text-cyan-400'
//                       : 'text-cyan-600'
//                     : isDark
//                     ? 'text-slate-300 hover:text-white'
//                     : 'text-slate-600 hover:text-slate-900'
//                 }`}
//               >
//                 {link.label}
//                 <span
//                   className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 ${
//                     activeLink === link.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
//                   }`}
//                 />
//               </button>
//             ))}
//           </nav>

//           {/* Right Section */}
//           <div className="flex items-center gap-2 sm:gap-4">
//             {/* Search Bar - Hidden on mobile */}
//             <div className="hidden lg:flex items-center">
//               <div
//                 className={`relative group transition-all duration-300 ${
//                   isDark
//                     ? 'bg-slate-800/50 hover:bg-slate-800/80'
//                     : 'bg-slate-100/50 hover:bg-slate-100/80'
//                 } rounded-lg px-3 py-2 backdrop-blur-sm border ${
//                   isDark ? 'border-slate-700/30' : 'border-slate-200/30'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Search
//                     size={18}
//                     className={`transition-colors ${
//                       isDark ? 'text-slate-400' : 'text-slate-500'
//                     }`}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className={`bg-transparent outline-none w-32 text-sm transition-colors ${
//                       isDark
//                         ? 'text-white placeholder-slate-500'
//                         : 'text-slate-900 placeholder-slate-400'
//                     }`}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Notification Bell */}
//             <button
//               className={`relative p-2 rounded-lg transition-all duration-300 group ${
//                 isDark
//                   ? 'hover:bg-slate-800/50'
//                   : 'hover:bg-slate-100/50'
//               }`}
//               aria-label="Notifications"
//             >
//               <Bell
//                 size={20}
//                 className={`transition-all duration-300 ${
//                   isDark
//                     ? 'text-slate-300 group-hover:text-cyan-400'
//                     : 'text-slate-600 group-hover:text-cyan-600'
//                 }`}
//               />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse" />
//             </button>

//             {/* Theme Toggle */}
//             <button
//               onClick={() => setIsDark(!isDark)}
//               className={`p-2 rounded-lg transition-all duration-300 group ${
//                 isDark
//                   ? 'hover:bg-slate-800/50'
//                   : 'hover:bg-slate-100/50'
//               }`}
//               aria-label="Toggle theme"
//             >
//               {isDark ? (
//                 <Sun
//                   size={20}
//                   className="text-yellow-400 transition-all duration-300 group-hover:scale-110"
//                 />
//               ) : (
//                 <Moon
//                   size={20}
//                   className={`transition-all duration-300 group-hover:scale-110 ${
//                     isDark ? 'text-slate-300' : 'text-slate-600'
//                   }`}
//                 />
//               )}
//             </button>

//             {/* User Avatar & Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 flex items-center justify-center group ${
//                   isDark
//                     ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/40 hover:to-blue-600/40'
//                     : 'bg-gradient-to-br from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200'
//                 }`}
//                 aria-label="User menu"
//               >
//                 <span
//                   className={`text-sm font-bold transition-all duration-300 ${
//                     isDark ? 'text-cyan-400' : 'text-cyan-600'
//                   }`}
//                 >
//                   V
//                 </span>
//               </button>

//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div
//                   className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
//                     isDark
//                       ? 'bg-slate-800 border border-slate-700/50'
//                       : 'bg-white border border-slate-200/50'
//                   } backdrop-blur-md`}
//                 >
//                   <div className={`p-3 border-b ${isDark ? 'border-slate-700/30' : 'border-slate-200/30'}`}>
//                     <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
//                       Vijay Kumar
//                     </p>
//                     <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
//                       Pro Player
//                     </p>
//                   </div>

//                   <div className="p-2 space-y-1">
//                     <button
//                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
//                         isDark
//                           ? 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
//                           : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
//                       }`}
//                     >
//                       <User size={16} />
//                       <span className="text-sm">Profile</span>
//                     </button>
//                     <button
//                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
//                         isDark
//                           ? 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
//                           : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
//                       }`}
//                     >
//                       <Settings size={16} />
//                       <span className="text-sm">Settings</span>
//                     </button>
//                     <button
//                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
//                         isDark
//                           ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300'
//                           : 'hover:bg-red-50 text-red-600 hover:text-red-700'
//                       }`}
//                     >
//                       <LogOut size={16} />
//                       <span className="text-sm">Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
//                 isDark
//                   ? 'hover:bg-slate-800/50'
//                   : 'hover:bg-slate-100/50'
//               }`}
//               aria-label="Toggle menu"
//             >
//               {isOpen ? (
//                 <X
//                   size={24}
//                   className={isDark ? 'text-white' : 'text-slate-900'}
//                 />
//               ) : (
//                 <Menu
//                   size={24}
//                   className={isDark ? 'text-white' : 'text-slate-900'}
//                 />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <nav
//             className={`md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 ${
//               isDark ? 'bg-slate-800/50' : 'bg-slate-50/50'
//             } rounded-lg mt-2 p-3 backdrop-blur-sm border ${
//               isDark ? 'border-slate-700/30' : 'border-slate-200/30'
//             }`}
//           >
//             {navLinks.map((link) => (
//               <button
//                 key={link.id}
//                 onClick={() => {
//                   setActiveLink(link.id);
//                   setIsOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
//                   activeLink === link.id
//                     ? isDark
//                       ? 'bg-cyan-500/20 text-cyan-400'
//                       : 'bg-cyan-100 text-cyan-600'
//                     : isDark
//                     ? 'text-slate-300 hover:bg-slate-700/50'
//                     : 'text-slate-600 hover:bg-slate-100'
//                 }`}
//               >
//                 {link.label}
//               </button>
//             ))}

//             {/* Mobile Search */}
//             <div
//               className={`mt-3 p-3 rounded-lg ${
//                 isDark
//                   ? 'bg-slate-700/50 border border-slate-600/30'
//                   : 'bg-slate-100/50 border border-slate-200/30'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <Search
//                   size={16}
//                   className={isDark ? 'text-slate-400' : 'text-slate-500'}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className={`bg-transparent outline-none w-full text-sm ${
//                     isDark
//                       ? 'text-white placeholder-slate-500'
//                       : 'text-slate-900 placeholder-slate-400'
//                   }`}
//                 />
//               </div>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Menu, X, Search, Bell, LogOut, Settings, User } from 'lucide-react';

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState('home');

//   const navLinks = [
//     { id: 'home', label: 'Home' },
//     { id: 'explore', label: 'Explore' },
//     { id: 'tournaments', label: 'Tournaments' },
//     { id: 'leaderboard', label: 'Leaderboard' },
//     { id: 'community', label: 'Community' },
//   ];

//   return (
//     <header className="w-full bg-white border-b border-gray-200 font-sans">
//       <div className="max-w-5xl mx-auto px-7 h-16 flex items-center justify-between gap-6">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 flex-shrink-0">
//           <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-base">
//             G
//           </div>
//           <span className="text-[17px] font-bold text-gray-900 tracking-tight">
//             Game<span className="text-orange-500">Hub</span>
//           </span>
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center gap-1">
//           {navLinks.map((link) => (
//             <button
//               key={link.id}
//               onClick={() => setActiveLink(link.id)}
//               className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
//                 activeLink === link.id
//                   ? 'text-orange-500 bg-orange-50'
//                   : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//             >
//               {link.label}
//             </button>
//           ))}
//         </nav>

//         {/* Right Side */}
//         <div className="flex items-center gap-2 flex-shrink-0">

//           {/* Search */}
//           <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-9 focus-within:border-orange-500 transition-colors">
//             <Search size={15} className="text-gray-400 flex-shrink-0" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 w-32"
//             />
//           </div>

//           {/* Bell */}
//           <button className="relative w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors">
//             <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
//             <Bell size={16} />
//           </button>

//           {/* Avatar */}
//           <div className="relative">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold hover:opacity-90 transition-opacity"
//             >
//               VK
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <p className="text-sm font-semibold text-gray-900">Vijay Kumar</p>
//                   <p className="text-xs text-orange-500 font-medium mt-0.5">Pro Player</p>
//                 </div>
//                 <div className="p-1.5 space-y-0.5">
//                   <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                     <User size={15} />
//                     Profile
//                   </button>
//                   <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                     <Settings size={15} />
//                     Settings
//                   </button>
//                   <div className="h-px bg-gray-100 my-1" />
//                   <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
//                     <LogOut size={15} />
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
//           >
//             {isOpen ? <X size={18} /> : <Menu size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <div className="md:hidden border-t border-gray-100 px-7 py-3 space-y-1 bg-white animate-in fade-in slide-in-from-top-1">
//           {navLinks.map((link) => (
//             <button
//               key={link.id}
//               onClick={() => { setActiveLink(link.id); setIsOpen(false); }}
//               className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 activeLink === link.id
//                   ? 'text-orange-500 bg-orange-50'
//                   : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//             >
//               {link.label}
//             </button>
//           ))}

//           {/* Mobile Search */}
//           <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-9 mt-2">
//             <Search size={15} className="text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
//             />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }



// 'use client';

// import { Bell, Search } from 'lucide-react';

// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50">

//       {/* Floating Glass Layer */}
//       <div className="w-full bg-[F8F4F1] font-sans">

//         <div className="w-full px-8 lg:px-12 h-16 flex items-center mt-2 justify-between relative">

//           {/* LEFT: Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-500 text-white font-bold shadow-lg">
//               G
//             </div>
//             <span className="text-lg font-semibold tracking-wide">
//               GameHub
//             </span>
//           </div>

//           {/* CENTER: Advanced Search */}
//           <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
//             <div className="group flex items-center 
//                             bg-white/60 backdrop-blur-md 
//                             border border-gray-200
//                             rounded-full px-5 py-2.5 

//                             focus-within:ring-2 focus-within:ring-orange-400
//                             transition-all duration-300">

//               <Search className="w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition" />

//               <input
//                 type="text"
//                 placeholder="Search games, tournaments..."
//                 className="bg-transparent outline-none text-sm ml-3 w-full placeholder-gray-500"
//               />

//               {/* subtle glow on focus */}
//               <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 bg-orange-100/40 blur-xl -z-10"></div>
//             </div>
//           </div>

//           {/* RIGHT: Actions */}
//           <div className="flex items-center gap-5">

//             {/* Notification */}
//             <div className="relative cursor-pointer group">
//               <div className="p-2 rounded-full hover:bg-gray-100 transition">
//                 <Bell className="w-5 h-5 text-gray-600 group-hover:text-black transition" />
//               </div>

//               <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
//             </div>

//             {/* Avatar */}
//             <div className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold cursor-pointer shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300">
//               VK
//             </div>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }


'use client';

import { Bell, Search, Gamepad2, Trophy, Zap, User, Settings, LogOut, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getStoredUser, useLogout, type User as UserType } from '@/hooks/useAuth';

// Animation variants for scroll-triggered elements
const logoVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.8 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const navLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 }
  })
};

const searchBarVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
};

const rightSectionVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.1 }
  })
};

interface SearchGame {
  id: number;
  title: string;
  slug: string;
  thumbnail_url?: string;
  category_name?: string;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchGame[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "0px" });
  const isLogoInView = useInView(logoRef, { once: true, margin: "0px" });
  const isSearchBarInView = useInView(searchBarRef, { once: true, margin: "0px" });
  const isRightSectionInView = useInView(rightSectionRef, { once: true, margin: "0px" });

  const router = useRouter();
  const logout = useLogout();

  // Check for logged-in user on mount and when storage changes
  useEffect(() => {
    const checkUser = () => {
      const storedUser = getStoredUser();
      setUser(storedUser);
    };

    // Check on mount
    checkUser();

    // Listen for storage changes (when user logs in/out in same tab)
    const handleStorageChange = () => {
      checkUser();
    };

    // Listen for custom event when user logs in
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedIn', checkUser);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', checkUser);
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Search API call with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      console.log('🔍 Searching for:', query);
      console.log('📡 API URL:', `${apiUrl}/api/games/search?q=${encodeURIComponent(query)}`);

      const response = await fetch(`${apiUrl}/api/games/search?q=${encodeURIComponent(query)}`);

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Search results:', data);

      if (data.success) {
        setSearchResults(data.data || []);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      // Show empty state on error
      setSearchResults([]);
      setShowSearchResults(true);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleGameClick = (slug: string) => {
    router.push(`/game/${slug}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E9ED]" ref={headerRef}>

      <div className="w-full font-sans">

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-16 flex items-center justify-between relative">

          {/* LEFT */}
          <motion.div
            ref={logoRef}
            initial="hidden"
            animate={isLogoInView ? "visible" : "hidden"}
            variants={logoVariants}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-orange-500 text-white font-bold shadow-lg text-sm sm:text-base">
              T
            </div>
            <span className="text-base sm:text-lg font-semibold font-[poppins] tracking-wide">
              Theplayfree
            </span>
          </motion.div>

          {/* CENTER - Hidden on mobile, shown on md+ */}
          <motion.div
            ref={searchBarRef}
            initial="hidden"
            animate={isSearchBarInView ? "visible" : "hidden"}
            variants={searchBarVariants}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-full max-w-sm lg:max-w-xl px-2 md:px-4">
            <div ref={searchRef} className="relative">
              <div className="group flex items-center 
                bg-white/60 backdrop-blur-md 
                border border-gray-200
                rounded-full px-3 md:px-4 lg:px-5 py-2 md:py-2.5 
                focus-within:ring-2 focus-within:ring-orange-400
                transition-all duration-300">

                <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500 group-focus-within:text-orange-500 transition flex-shrink-0" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games, tournaments..."
                  className="bg-transparent font-[poppins] outline-none text-xs md:text-sm ml-2 md:ml-3 w-full placeholder-gray-500"
                />

                {searchQuery && (
                  <button onClick={clearSearch} className="ml-2 text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                )}

                <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 bg-orange-100/40 blur-xl -z-10"></div>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-[80]">
                  {searchLoading ? (
                    <div className="px-4 py-8 text-center">
                      <div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500 mt-2 font-[poppins]">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((game) => (
                        <div
                          key={game.id}
                          onClick={() => handleGameClick(game.slug)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          {game.thumbnail_url ? (
                            <img
                              src={game.thumbnail_url}
                              alt={game.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <Gamepad2 className="w-6 h-6 text-orange-500" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 font-[poppins] truncate">
                              {game.title}
                            </h4>
                            {game.category_name && (
                              <p className="text-xs text-gray-500 font-[poppins]">{game.category_name}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Gamepad2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 font-[poppins]">No games found</p>
                      <p className="text-xs text-gray-400 mt-1 font-[poppins]">Try a different search term</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            ref={rightSectionRef}
            initial="hidden"
            animate={isRightSectionInView ? "visible" : "hidden"}
            className="flex items-center gap-3 sm:gap-5 flex-shrink-0">

            {/* 🔔 Notification */}
            <motion.div
              custom={0}
              initial="hidden"
              animate={isRightSectionInView ? "visible" : "hidden"}
              variants={itemVariants}
              ref={ref}
              className="relative z-[60]">

              {/* Bell */}
              <div
                onClick={() => setOpen(!open)}
                className="relative cursor-pointer group"
              >
                <div className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-black transition" />
                </div>

                <span className="absolute top-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full"></span>
              </div>

              {/* Dropdown */}
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-[calc(100vw-3rem)] max-w-[280px] sm:w-72 md:w-80 lg:w-96
                  bg-white backdrop-blur-xl 
                  border border-gray-200 
                  rounded-2xl shadow-2xl 
                  overflow-hidden z-[70]">

                  {/* Header */}
                  <div className="px-3 sm:px-4 md:px-5 py-2.5 md:py-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-[poppins] text-xs sm:text-sm font-semibold text-gray-800">
                      Notifications
                    </h3>
                    <button className="cursor-pointer font-[poppins] text-[10px] sm:text-xs text-orange-500 hover:underline">
                      Mark all read
                    </button>
                  </div>

                  {/* List */}
                  <div className="max-h-64 md:max-h-80 overflow-y-auto">

                    {/* Item */}
                    <div className="flex gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2.5 md:py-3 hover:bg-orange-50 transition cursor-pointer">
                      <div className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                        <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-[poppins] text-gray-700">
                          New tournament available
                        </p>
                        <span className="text-[10px] md:text-xs font-[poppins] text-gray-400">
                          2 min ago
                        </span>
                      </div>
                    </div>

                    {/* Item */}
                    <div className="flex gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2.5 md:py-3 hover:bg-orange-50 transition cursor-pointer">
                      <div className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                        <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-[poppins] text-gray-700">
                          You won a match!
                        </p>
                        <span className="text-[10px] md:text-xs font-[poppins] text-gray-400">
                          1 hour ago
                        </span>
                      </div>
                    </div>

                    {/* Item */}
                    <div className="flex gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2.5 md:py-3 hover:bg-orange-50 transition cursor-pointer">
                      <div className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <Zap className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm text-gray-700 font-[poppins]">
                          New game added
                        </p>
                        <span className="text-[10px] md:text-xs text-gray-400 font-[poppins]">
                          Yesterday
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="text-center py-2.5 md:py-3 border-t border-gray-200">
                    <button className="cursor-pointer text-xs md:text-sm font-[poppins] text-orange-500 hover:underline">
                      View all notifications
                    </button>
                  </div>

                </motion.div>
              )}

            </motion.div>

            {/* Avatar or Login Button */}
            {user ? (
              <motion.div
                custom={1}
                initial="hidden"
                animate={isRightSectionInView ? "visible" : "hidden"}
                variants={itemVariants}
                ref={profileRef}
                className="relative z-[60]">
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold cursor-pointer shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
                >
                  {user.username.substring(0, 2).toUpperCase()}
                </div>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-[calc(100vw-3rem)] max-w-[220px] sm:w-56 md:w-64 
                    bg-white backdrop-blur-xl 
                    border border-gray-200 
                    rounded-2xl shadow-2xl 
                    overflow-hidden z-[70]">

                    {/* Header */}
                    <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 border-b border-gray-200">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 font-[poppins]">{user.username}</p>
                      <p className="text-[10px] sm:text-xs text-orange-500 font-medium mt-0.5 font-[poppins]">Level {user.level}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1.5 md:p-2">
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="cursor-pointer font-[poppins] w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors">
                        <User className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                        <span>Profile</span>
                      </Link>
                      <button className="cursor-pointer font-[poppins] w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors">
                        <Settings className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                        <span>Settings</span>
                      </button>
                      <div className="font-[poppins] h-px bg-gray-200 my-1.5 md:my-2" />
                      <button onClick={logout} className="cursor-pointer w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                custom={1}
                initial="hidden"
                animate={isRightSectionInView ? "visible" : "hidden"}
                variants={itemVariants}
              >
                <Link
                  href="/login"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-orange-600 transition-colors shadow-md font-[poppins]"
                >
                  Login
                </Link>
              </motion.div>
            )}

          </motion.div>

        </div>

        {/* Mobile Search Bar - Shown only on mobile */}
        <div className="md:hidden px-3 sm:px-4 pb-2.5 sm:pb-3 relative">
          <div className="relative">
            <div className="group flex items-center 
              bg-white/60 backdrop-blur-md 
              border border-gray-200
              rounded-full px-3 sm:px-4 py-1.5 sm:py-2 
              focus-within:ring-2 focus-within:ring-orange-400
              transition-all duration-300">

              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-focus-within:text-orange-500 transition flex-shrink-0" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, tournaments..."
                className="bg-transparent font-[poppins] outline-none text-xs sm:text-sm ml-2 sm:ml-3 w-full placeholder-gray-500"
              />

              {searchQuery && (
                <button onClick={clearSearch} className="ml-2 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}

              <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 bg-orange-100/40 blur-xl -z-10"></div>
            </div>

            {/* Mobile Search Results Dropdown */}
            {showSearchResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-[80]">
                {searchLoading ? (
                  <div className="px-4 py-8 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 mt-2 font-[poppins]">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((game) => (
                      <div
                        key={game.id}
                        onClick={() => handleGameClick(game.slug)}
                        className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {game.thumbnail_url ? (
                          <img
                            src={game.thumbnail_url}
                            alt={game.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 font-[poppins] truncate">
                            {game.title}
                          </h4>
                          {game.category_name && (
                            <p className="text-[10px] sm:text-xs text-gray-500 font-[poppins]">{game.category_name}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Gamepad2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-gray-500 font-[poppins]">No games found</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1 font-[poppins]">Try a different search term</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}