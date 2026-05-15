'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Trophy, Play, Gamepad2, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';

interface Game {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  videoUrl?: string;
  category?: {
    name: string;
  };
  totalPlays: number;
  todayPlays: number;
  trendingScore: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function TrendingClient() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`${API_URL}/api/games/trending`);
        const result = await response.json();
        if (result.success) {
          setGames(result.data);
        }
      } catch (error) {
        console.error('Error fetching trending games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E8E9ED] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-gray-300 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#E8E9ED] py-8 sm:py-12 px-3 sm:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-3xl font-black text-gray-900 font-[poppins]">Trending Games</h1>
              </div>
              {/* <p className="text-gray-500 font-[poppins] max-w-xl">
                Discover the most popular games played by thousands of players in the last 24 hours. Rankings are updated in real-time.
              </p> */}
            </div>

            <div className="flex items-center gap-6 text-sm font-bold text-gray-600 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/50">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-orange-500" />
                <span>Updates every hour</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-orange-500" />
                <span>{games.length} Games</span>
              </div>
            </div>
          </div>

          {/* Dense Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            <AnimatePresence>
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(game.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Ranking Badge - Premium Style */}
                  <div className={`absolute -top-2 -left-2 z-20 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-lg transform group-hover:scale-110 transition-transform ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-slate-300 text-slate-800' :
                      index === 2 ? 'bg-orange-400 text-orange-950' :
                        'bg-white text-gray-400 border border-gray-100'
                    }`}>
                    #{index + 1}
                  </div>

                  <Link href={`/game/${game.slug}`} className="block">
                    <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 border border-white/50">

                      {/* Thumbnail Image */}
                      <img
                        src={game.thumbnail || '/Images/The Play free-01.png'}
                        alt={game.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${hoveredId === game.id && game.videoUrl ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                      />

                      {/* Hover Video Preview */}
                      {hoveredId === game.id && game.videoUrl && (
                        <video
                          src={game.videoUrl}
                          autoPlay
                          muted
                          loop
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Play Icon on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md">
                            {game.category?.name || 'Action'}
                          </span>
                          <h3 className="text-white font-bold text-xs sm:text-sm leading-tight line-clamp-1 font-[poppins] group-hover:text-orange-400 transition-colors">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-300">
                              <Trophy className="w-3 h-3 text-yellow-500" />
                              <span className="font-semibold">{game.todayPlays.toLocaleString()} plays</span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] font-bold text-orange-500">
                              <TrendingUp className="w-3 h-3" />
                              <span>+{Math.round(game.trendingScore)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
