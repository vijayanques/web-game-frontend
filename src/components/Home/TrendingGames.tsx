'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { TrendingUp, Trophy, Play } from 'lucide-react';
import { motion } from 'framer-motion';

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
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function TrendingGames() {
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
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-lg animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (games.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* <div className="p-2 bg-linear-to-br from-orange-400 to-red-500 rounded-xl shadow-lg shadow-orange-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div> */}
          <div>
            <h2 className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Trending Now</h2>
            <p className="text-[10px] sm:text-sm font-[poppins] text-gray-500 mt-0.5 sm:mt-1">Most played games in the last 24 hours</p>
          </div>
        </div>
        <Link
          href="/trending"
          className="text-orange-500 text-sm sm:text-base font-semibold hover:text-orange-600 transition-colors flex items-center gap-1 group whitespace-nowrap"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        {games.slice(0, 5).map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
            onMouseEnter={() => setHoveredId(game.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Ranking Badge */}
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 z-10 w-7 h-7 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-orange-500">
              <span className="text-sm sm:text-lg font-black text-orange-500 font-[poppins]">{index + 1}</span>
            </div>

            <Link href={`/game/${game.slug}`} className="block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">

                {/* Thumbnail Image */}
                <img
                  src={game.thumbnail || '/Images/The Play free-01.png'}
                  alt={game.title}
                  className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${hoveredId === game.id && game.videoUrl ? 'opacity-0' : 'opacity-100'}`}
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
                    <h3 className="text-white font-bold text-sm truncate mb-1 font-[poppins]">{game.title}</h3>
                    <div className="flex items-center justify-between text-[10px] text-gray-300">
                      <span className=" font-[poppins] bg-orange-500/80 text-white px-1 sm:px-1.5 py-0.5 rounded uppercase font-bold text-[8px] sm:text-[10px]">
                        {game.category?.name || 'Game'}
                      </span>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-yellow-400" />
                        <span className='font-[poppins]'>{game.todayPlays} plays</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
