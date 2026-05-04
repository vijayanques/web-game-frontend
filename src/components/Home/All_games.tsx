// "use client";

// import { useState } from "react";
// import { Users, Star } from "lucide-react";

// interface CardProps {
//   title: string;
//   image: string;
//   col: number;
//   row: number;
//   players: string;
//   rating: number;
//   category: string;
// }

// const Card = ({ title, image, col, row, players, rating, category }: CardProps) => {
//   const [hover, setHover] = useState(false);

//   return (
//     <div
//       style={{
//         gridColumn: `span ${col}`,
//         gridRow: `span ${row}`,
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       className="relative rounded-2xl overflow-hidden cursor-pointer group"
//     >
//       <img
//         src={image}
//         alt={title}
//         className={`w-full h-full object-cover transition-transform duration-500 ${
//           hover ? "scale-110" : "scale-100"
//         }`}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

//       {/* Category Badge */}
//       <div className="absolute top-2 left-2 z-10">
//         <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
//           {category}
//         </span>
//       </div>

//       {/* Players Count */}
//       <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
//         <Users size={10} className="text-orange-400" />
//         <span className="text-white text-[10px] font-semibold">{players}</span>
//       </div>

//       {/* Bottom Info */}
//       <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
//         <p className="text-white font-semibold text-xs tracking-tight drop-shadow-lg mb-1">
//           {title}
//         </p>
//         <div className="flex items-center gap-1">
//           <Star size={11} className="text-yellow-400 fill-yellow-400" />
//           <span className="text-white text-[10px] font-semibold">{rating}</span>
//         </div>
//       </div>

//       {/* Hover Play Button */}
//       <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
//         hover ? "opacity-100" : "opacity-0"
//       }`}>
//         <div className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg">
//           Play Now
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function MosaicGrid() {
//   return (
//     <section className="px-7 pt-8 pb-12 bg-[#F8F4F1]">
//       <div className="">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="font-[poppins] text-2xl font-semibold text-gray-900 tracking-tight">
//               All Games
//             </h2>
//             <p className="text-sm font-[poppins] text-gray-400 mt-1">
//               Explore our complete gaming collection
//             </p>
//           </div>
//           <button className="text-orange-500 text-sm font-semibold hover:text-orange-600 transition-colors">
//             View All →
//           </button>
//         </div>

//         <div
//           className="grid gap-3"
//           style={{
//             gridTemplateColumns: "repeat(6, 1fr)",
//             gridAutoRows: "150px",
//           }}
//         >
//         <Card col={1} row={1} title="Valorant Champions" image="https://images.unsplash.com/photo-1542751371-adc38448a05e" />
//         <Card col={1} row={1} title="BGMI Pro League" image="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1" />
//         <Card col={1} row={1} title="Fortnite Clash" image="https://images.unsplash.com/photo-1598550880863-4e8aa3d0f8e8" />
//         <Card col={1} row={1} title="Apex Legends" image="https://images.unsplash.com/photo-1511512578047-dfb367046420" />
//         <Card col={1} row={1} title="Cyberpunk 2077" image="https://images.unsplash.com/photo-1535223289827-42f1e9919769" />
//         <Card col={1} row={1} title="Clash Royale" image="https://images.unsplash.com/photo-1550745165-9bc0b252726f" />

//         <Card col={1} row={1} title="Call of Duty Arena" image="https://images.unsplash.com/photo-1600861194942-f883de0dfe96" />
//         <Card col={1} row={1} title="Truck Offroad Racing" image="https://images.unsplash.com/photo-1502877338535-766e1452684a" />
//         <Card col={1} row={1} title="FIFA 24" image="https://images.unsplash.com/photo-1517649763962-0c623066013b" />
//         <Card col={1} row={1} title="Chess Masters" image="https://images.unsplash.com/photo-1529692236671-f1dc1f1cfc6c" />
//         <Card col={1} row={1} title="Street Fighter" image="https://images.unsplash.com/photo-1549921296-3a6b9a0f5f63" />
//         <Card col={1} row={1} title="Bubble Shooter" image="https://images.unsplash.com/photo-1611996575749-79a3a250f948" />

//         <Card col={1} row={1} title="Hill Climb Racing" image="https://images.unsplash.com/photo-1503376780353-7e6692767b70" />
//         <Card col={1} row={1} title="Rocket League" image="https://images.unsplash.com/photo-1520975916090-3105956dac38" />
//         <Card col={1} row={1} title="Subway Surfers" image="https://images.unsplash.com/photo-1552820728-8b83bb6b773f" />
//         <Card col={1} row={1} title="Minecraft" image="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce" />
//         <Card col={1} row={1} title="GTA V" image="https://images.unsplash.com/photo-1538481199705-c710c4e965fc" />
//         <Card col={1} row={1} title="Among Us" image="https://images.unsplash.com/photo-1614294148960-9aa740632a87" />
//       </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useState } from "react";
// import { Users, Star, Play } from "lucide-react";

// interface CardProps {
//   title: string;
//   image: string;
//   col: number;
//   row: number;
//   players: string;
//   rating: number;
//   category: string;
// }

// const Card = ({
//   title,
//   image,
//   col,
//   row,
//   players,
//   rating,
//   category,
// }: CardProps) => {
//   const [hover, setHover] = useState(false);

//   return (
//     <div
//       style={{
//         gridColumn: `span ${col}`,
//         gridRow: `span ${row}`,
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       className="relative rounded-2xl overflow-hidden cursor-pointer group"
//     >
//       {/* Border Glow */}
//       <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-orange-400/60 transition-all duration-200 pointer-events-none" />

//       {/* Image */}
//       <img
//         src={image}
//         alt={title}
//         className={`w-full h-full object-cover transition-transform duration-500 ${
//           hover ? "scale-110" : "scale-100"
//         }`}
//       />

//       {/* Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />


//       {/* Players */}
//       <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
//         <Users size={10} className="text-orange-400" />
//         <span className="text-white text-[10px] font-semibold">
//           {players}
//         </span>
//       </div>

//       {/* Bottom Info */}
//       <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
//         <p className="text-white font-semibold text-xs tracking-tight drop-shadow-lg mb-1 group-hover:text-orange-400 transition-colors">
//           {title}
//         </p>
//         <div className="flex items-center gap-1">
//           <Star size={11} className="text-yellow-400 fill-yellow-400" />
//           <span className="text-white text-[10px] font-semibold">
//             {rating}
//           </span>
//         </div>
//       </div>

//       {/* Play Button */}
//       <div
//         className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 ${
//           hover ? "opacity-100 scale-100" : "opacity-0 scale-95"
//         }`}
//       >
//         <div className="absolute w-16 h-16 bg-orange-500/20 blur-2xl rounded-full animate-pulse" />

//         <div className=" bg-orange-500/90 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
//           <Play size={12} />
//           Play Now
//         </div>
//       </div>

//       {/* Bottom Glow */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-orange-500/20 to-transparent" />
//       </div>
//     </div>
//   );
// };

// export default function MosaicGrid() {
//   return (
//     <section className="px-7 pt-8 pb-12 bg-[#F8F4F1]">
//       <div>
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="font-[poppins] text-2xl font-semibold text-gray-900 tracking-tight">
//               All Games
//             </h2>
//             <p className="text-sm font-[poppins] text-gray-400 mt-1">
//               Explore our complete gaming collection
//             </p>
//           </div>


//         </div>

//         {/* Grid */}
//         <div
//           className="grid gap-3"
//           style={{
//             gridTemplateColumns: "repeat(6, 1fr)",
//             gridAutoRows: "150px",
//           }}
//         >
//           <Card col={1} row={1} title="Valorant Champions" image="https://images.unsplash.com/photo-1542751371-adc38448a05e" players="1.2k" rating={4.8} category="FPS" />
//           <Card col={1} row={1} title="BGMI Pro League" image="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1" players="2.5k" rating={4.6} category="Battle" />
//           <Card col={1} row={1} title="Fortnite Clash" image="https://images.unsplash.com/photo-1598550880863-4e8aa3d0f8e8" players="3.1k" rating={4.9} category="Action" />
//           <Card col={1} row={1} title="Apex Legends" image="https://images.unsplash.com/photo-1511512578047-dfb367046420" players="1.8k" rating={4.7} category="Shooter" />
//           <Card col={1} row={1} title="Cyberpunk 2077" image="https://images.unsplash.com/photo-1535223289827-42f1e9919769" players="900" rating={4.5} category="RPG" />
//           <Card col={1} row={1} title="Clash Royale" image="https://images.unsplash.com/photo-1550745165-9bc0b252726f" players="2.2k" rating={4.4} category="Strategy" />
//           <Card col={1} row={1} title="Call of Duty Arena" image="https://images.unsplash.com/photo-1600861194942-f883de0dfe96" players="1.1k" rating={4.7} category="FPS" />
//           <Card col={1} row={1} title="Truck Racing" image="https://images.unsplash.com/photo-1502877338535-766e1452684a" players="800" rating={4.2} category="Racing" />
//           <Card col={1} row={1} title="FIFA 24" image="https://images.unsplash.com/photo-1517649763962-0c623066013b" players="2.9k" rating={4.8} category="Sports" />
//           <Card col={1} row={1} title="Chess Masters" image="https://images.unsplash.com/photo-1529692236671-f1dc1f1cfc6c" players="500" rating={4.3} category="Board" />
//           <Card col={1} row={1} title="Street Fighter" image="https://images.unsplash.com/photo-1549921296-3a6b9a0f5f63" players="1.4k" rating={4.6} category="Fighting" />
//           <Card col={1} row={1} title="Bubble Shooter" image="https://images.unsplash.com/photo-1611996575749-79a3a250f948" players="700" rating={4.1} category="Arcade" />
//           <Card col={1} row={1} title="Hill Climb" image="https://images.unsplash.com/photo-1503376780353-7e6692767b70" players="1.1k" rating={4.3} category="Driving" />
//           <Card col={1} row={1} title="Rocket League" image="https://images.unsplash.com/photo-1520975916090-3105956dac38" players="2.0k" rating={4.7} category="Sports" />
//           <Card col={1} row={1} title="Subway Surfers" image="https://images.unsplash.com/photo-1552820728-8b83bb6b773f" players="3.0k" rating={4.6} category="Runner" />
//           <Card col={1} row={1} title="Minecraft" image="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce" players="3.5k" rating={4.9} category="Sandbox" />
//           <Card col={1} row={1} title="GTA V" image="https://images.unsplash.com/photo-1538481199705-c710c4e965fc" players="4.2k" rating={4.8} category="Open World" />
//           <Card col={1} row={1} title="Among Us" image="https://images.unsplash.com/photo-1614294148960-9aa740632a87" players="2.7k" rating={4.5} category="Party" />
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState } from "react";
import { Users, Star, Play } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchGames, Game } from "@/lib/api/games";
import { useCategory } from "@/contexts/CategoryContext";

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
  col,
  row,
  players,
  rating,
  category,
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

      {/* Image */}
      <img
        src={image}
        alt={title}
        className={`w-full h-full object-cover transition-transform duration-500 ${hover ? "scale-110" : "scale-100"
          }`}
      />

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
    players: game.plays ? `${(game.plays / 1000).toFixed(1)}k` : "0",
    rating: game.rating || 4.5,
    category: game.category?.name || game.genre || "Game",
    col: 1,
    row: 1,
  }));

  return (
    <section data-section="all-games" className="px-4 sm:px-6 md:px-7 pt-6 sm:pt-8 pb-2 bg-[#E8E9ED]">
      <div>
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
            {games.map((game, index) => (
              <Card key={`${game.slug}-${index}`} {...game} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}