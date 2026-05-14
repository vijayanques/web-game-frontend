"use client";

import { useState } from "react";
import { Users, Star, Play } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchGames, Game } from "@/lib/api/games";
import { useCategory } from "@/contexts/CategoryContext";
import React from "react";
import ResponsiveAd from "@/components/common/ResponsiveAd";

// Animation variants for header
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const titleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
};

// Animation variants for game cards
const gameCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 }
  })
};

interface CardProps {
  title: string;
  image: string;
  videoUrl?: string;
  col: number;
  row: number;
  players: string;
  rating: number;
  category: string;
  slug: string;
  index?: number;
}

const Card = ({
  title,
  image,
  videoUrl,
  col,
  row,
  players,
  rating,
  slug,
  index = 0,
}: CardProps) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={gameCardVariants}
    >
      <Link
        href={`/game/${slug}`}
        style={{
          gridColumn: `span ${col}`,
          gridRow: `span ${row}`,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded-2xl overflow-hidden cursor-pointer group block h-full"
      >
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-orange-400/60 transition-all duration-200 pointer-events-none" />

        {/* Video or Image */}
        {hover && videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        ) : (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${hover ? "scale-110" : "scale-100"
              }`}
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Players */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <Users size={10} className="text-orange-400" />
          <span className="text-white text-[10px] font-[poppins] font-semibold">
            {players}
          </span>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
          <p className="font-[poppins] text-white font-semibold text-xs tracking-tight drop-shadow-lg mb-1 group-hover:text-orange-400 transition-colors">
            {title}
          </p>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-[10px] font-[poppins] font-semibold">
              {rating}
            </span>
          </div>
        </div>

        {/* Play Button */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 ${hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <div className="absolute w-16 h-16 bg-orange-500/20 blur-2xl rounded-full animate-pulse" />

          <div className="bg-orange-500/90 font-[poppins] text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
            <Play size={12} />
            Play Now
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-orange-500/20 to-transparent" />
        </div>
      </Link>
    </motion.div>
  );
};

export default function MosaicGrid() {
  const { selectedCategory } = useCategory();

  // Fetch games based on selected category
  const { data: apiGames = [], isLoading, error } = useQuery({
    queryKey: ['games', selectedCategory],
    queryFn: () => fetchGames(selectedCategory),
  });

  // Map API games to component format
  const games = apiGames.map((game: Game) => ({
    title: game.title,
    slug: game.slug,
    image: game.thumbnail || "/Images/911-prey_16x9-cover.jpg",
    videoUrl: game.videoUrl,
    players: game.plays ? `${(game.plays / 1000).toFixed(1)}k` : "0",
    rating: game.rating || 4.5,
    category: game.category?.name || game.genre || "Game",
    col: 1,
    row: 1,
  }));

  return (
    <section data-section="all-games" className="pt-6 sm:pt-8 pb-2 bg-[#E8E9ED] overflow-x-hidden">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
              All Games
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
              className="text-xs sm:text-sm font-[poppins] text-gray-500 mt-1">
              Explore our complete gaming collection
            </motion.p>
          </div>
        </motion.div>

        {/* Responsive Grid */}
        {isLoading ? (
          <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[150px]">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 font-[poppins]">Failed to load games. Please try again.</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-[poppins]">No games found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[150px]">
            {games.map((game, index) => {
              // Inject an ad card every 12th position
              const adIndex = Math.floor((index + 1) / 12);
              const isAdPosition = (index + 1) % 12 === 0;

              return (
                <React.Fragment key={`${game.slug}-${index}`}>
                  <Card {...game} index={index} />
                  {isAdPosition && (
                    <ResponsiveAd
                      slot={`in_grid_ad_${adIndex}`}
                      layout="card"
                      className="h-full"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
