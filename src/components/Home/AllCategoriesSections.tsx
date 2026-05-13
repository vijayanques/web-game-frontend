'use client';

import { Star, Users, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useInView } from 'framer-motion';
import { fetchCategories, Category } from '@/lib/api/categories';
import { fetchGames, Game } from '@/lib/api/games';
import ResponsiveAd from '../common/ResponsiveAd';

// Animation variants for game cards
const gameCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 }
  })
};

// Animation variants for section heading
const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const sectionTitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
};

const sectionSubtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
};

// 🎮 Game Card Component
function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={gameCardVariants}
    >
      <Link 
        href={`/game/${game.slug}`} 
        className="group relative rounded-2xl overflow-hidden cursor-pointer block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-orange-400/60 transition-all duration-200 ease-out pointer-events-none" />

      {/* Video or Image */}
      {hover && game.videoUrl ? (
        <video
          src={game.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
          style={{ display: 'block' }}
        />
      ) : (
        <img
          src={game.thumbnail || '/Images/911-prey_16x9-cover.jpg'}
          alt={game.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 w-full p-3 sm:p-4 text-white">
        <h3 className="font-[poppins] text-base sm:text-lg font-semibold tracking-tight leading-tight group-hover:text-orange-400 transition-colors duration-200">
          {game.title}
        </h3>

        <p className="text-[10px] sm:text-[11px] font-[poppins] text-gray-400 mt-1">
          {game.category?.name || game.genre || 'Game'}
        </p>

        <div className="flex items-center justify-between text-xs mt-2 sm:mt-3 text-gray-300">
          <div className="flex font-[poppins] items-center gap-1">
            <Users size={13} className="sm:w-[14px] sm:h-[14px]" />
            <span>{game.plays ? `${(game.plays / 1000).toFixed(1)}k` : '0'}</span>
          </div>

          <div className="flex items-center gap-1 font-[poppins] text-yellow-400">
            <Star size={13} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
            <span>{game.rating || 4.5}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500/20 blur-2xl animate-pulse" />

        <div className="relative font-[poppins] bg-orange-500/90 backdrop-blur px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-white text-xs sm:text-sm font-semibold shadow-xl hover:scale-105 transition-transform duration-200">
          <Play size={14} className="sm:w-4 sm:h-4" />
          Play Now
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-orange-500/20 to-transparent" />
      </div>
      </Link>
    </motion.div>
  );
}

// 🔥 Category Section Component
function CategorySection({ category }: { category: Category }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "0px" });

  // Fetch games for this category
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['category-games', category.id],
    queryFn: () => fetchGames(category.id),
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Don't render if no games
  if (!isLoading && games.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto" data-category-id={category.id}>
      {/* 🔥 Heading */}
      <motion.div 
        ref={headingRef}
        initial="hidden"
        animate={isHeadingInView ? "visible" : "hidden"}
        variants={sectionHeadingVariants}
        className=" pt-6 sm:pt-1 flex items-center justify-between bg-[#E8E9ED]">
        <div>
          <motion.h2 
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
            variants={sectionTitleVariants}
            className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
            {category.name}
          </motion.h2>
          <motion.p 
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
            variants={sectionSubtitleVariants}
            className="text-xs sm:text-sm font-[poppins] text-gray-500 mt-1">
            {category.description || `Discover amazing ${category.name.toLowerCase()} games`}
          </motion.p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => scroll('left')}
            className="cursor-pointer p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="cursor-pointer p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </motion.div>

      {/* 🎮 Horizontal Scroll */}
      <div ref={scrollRef} className=" py-3 overflow-x-auto scrollbar-hide bg-[#E8E9ED]">
        {isLoading ? (
          <div className="flex gap-4 sm:gap-5 md:gap-6 pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-52 sm:w-60 md:w-64 h-48 sm:h-56 md:h-64 rounded-2xl bg-gray-300 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 sm:gap-5 md:gap-6 pb-2">
            {games.map((game, index) => (
              <div key={game.id} className="flex-shrink-0 w-52 sm:w-60 md:w-64">
                <GameCard game={game} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🔥 Main Component - All Categories
export default function AllCategoriesSections() {
  // Fetch all categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const activeCategories = categories.filter((cat: Category) => cat.isActive || cat.is_active);

  return (
    <div className="bg-[#E8E9ED]">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="px-4 sm:px-6 md:px-7 py-8">
            <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mb-4" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          activeCategories.map((category: Category) => (
            <CategorySection key={category.id} category={category} />
          ))
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
