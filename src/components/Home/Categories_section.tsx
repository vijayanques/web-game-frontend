


// 'use client';

// import { Star, Users, Play, ChevronLeft, ChevronRight } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRef } from 'react';

// interface Game {
//   id: number;
//   title: string;
//   publisher: string;
//   players: string;
//   rating: number;
//   image: string;
//   slug: string;
// }

// const games: Game[] = [
//   {
//     id: 1,
//     title: 'Valorant Champions',
//     publisher: 'Riot Games',
//     players: '1.2k',
//     rating: 4.8,
//     image: '/Images/unmatched-basketball_1x1-cover.jpg',
//     slug: 'valorant-champions',
//   },
//   {
//     id: 2,
//     title: 'BGMI Pro League',
//     publisher: 'Krafton',
//     players: '2.5k',
//     rating: 4.6,
//     image: '/Images/ramp-car-vs-chase-psm_2x3-cover.jpg',
//     slug: 'bgmi-pro-league',
//   },
//   {
//     id: 3,
//     title: 'Call of Duty Arena',
//     publisher: 'Activision',
//     players: '900',
//     rating: 4.7,
//     image: '/Images/hoop-world-3d_1x1-cover.jpg',
//     slug: 'call-of-duty-arena',
//   },
//   {
//     id: 4,
//     title: 'Fortnite Clash',
//     publisher: 'Epic Games',
//     players: '3.1k',
//     rating: 4.9,
//     image: '/Images/count-masters-stickman-games_1x1-cover.jpg',
//     slug: 'fortnite-clash',
//   },
//   {
//     id: 5,
//     title: 'Apex Legends',
//     publisher: 'EA Sports',
//     players: '1.8k',
//     rating: 4.7,
//     image: '/Images/furniture-master-idle-tycoon_2x3-cover.jpg',
//     slug: 'apex-legends',
//   },
//   {
//     id: 6,
//     title: 'Apex Legends',
//     publisher: 'EA Sports',
//     players: '1.8k',
//     rating: 4.7,
//     image: '/Images/jelly-merge-upgrade-sell_2x3-cover.jpg',
//     slug: 'apex-legends',
//   },
//   {
//     id: 7,
//     title: 'Apex Legends',
//     publisher: 'EA Sports',
//     players: '1.8k',
//     rating: 4.7,
//     image: '/Images/th.png',
//     slug: 'apex-legends',
//   },
// ];

// // 🎮 Card
// function GameCard({ games }: { games: Game }) {
//   return (
//     <Link href={`/categories/${games.slug}`} className="group relative rounded-2xl overflow-hidden cursor-pointer block">

//       <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-orange-400/60 transition-all duration-200 ease-out pointer-events-none" />

//       <Image
//         src={games.image}
//         alt={games.title}
//         width={500}
//         height={256}
//         unoptimized
//         className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

//       <div className="absolute bottom-0 w-full p-3 sm:p-4 text-white">

//         <h3 className="font-[poppins] text-base sm:text-lg font-semibold tracking-tight leading-tight group-hover:text-orange-400 transition-colors duration-200">
//           {games.title}
//         </h3>

//         <p className="text-[10px] sm:text-[11px] font-[poppins] text-gray-400 mt-1">
//           {games.publisher}
//         </p>

//         <div className="flex items-center justify-between text-xs mt-2 sm:mt-3 text-gray-300">
//           <div className="flex font-[poppins] items-center gap-1">
//             <Users size={13} className="sm:w-[14px] sm:h-[14px]" />
//             <span>{games.players}</span>
//           </div>

//           <div className="flex items-center gap-1 font-[poppins] text-yellow-400">
//             <Star size={13} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
//             <span>{games.rating}</span>
//           </div>
//         </div>
//       </div>

//       <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">

//         <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500/20 blur-2xl animate-pulse" />

//         <div className="relative font-[poppins] bg-orange-500/90 backdrop-blur px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-white text-xs sm:text-sm font-semibold shadow-xl hover:scale-105 transition-transform duration-200">
//           <Play size={14} className="sm:w-4 sm:h-4" />
//           Play Now
//         </div>

//       </div>

//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
//         <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-orange-500/20 to-transparent" />
//       </div>

//     </Link>
//   );
// }

// // 🔥 Main Component
// export default function Categories_section() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const scrollAmount = 300;
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <>
//       {/* 🔥 Heading */}
//       <div className="px-4 sm:px-6 md:px-7 pt-6 sm:pt-8 flex items-center justify-between bg-[#E8E9ED]">

//         <div>
//           <h2 className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
//             Categories Games
//           </h2>
//           <p className="text-xs sm:text-sm font-[poppins] text-gray-500 mt-1">
//             Discover trending and Categories game
//           </p>
//         </div>

//         <div className="flex items-center gap-2 sm:gap-3">
//           <button
//             onClick={() => scroll('left')}
//             className="cursor-pointer p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
//           >
//             <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
//           </button>

//           <button
//             onClick={() => scroll('right')}
//             className="cursor-pointer p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
//           >
//             <ChevronRight size={16} className="sm:w-5 sm:h-5" />
//           </button>
//         </div>

//       </div>

//       {/* 🎮 Horizontal Scroll */}
//       <div ref={scrollRef} className="px-4 sm:px-6 md:px-7 py-3 overflow-x-auto scrollbar-hide bg-[#E8E9ED]">
//           <div className="flex gap-4 sm:gap-5 md:gap-6 pb-2">
//             {games.map((game) => (
//             <div key={game.id} className="flex-shrink-0 w-52 sm:w-60 md:w-64">
//               <GameCard games={game} />
//               </div>
//             ))}
//           </div>
//       </div>

//       <style jsx global>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// }
