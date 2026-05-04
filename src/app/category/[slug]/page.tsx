// 'use client';

// import { useParams, redirect } from 'next/navigation';
// import { useEffect } from 'react';
// import { useCategory } from '@/contexts/CategoryContext';
// // import CategoriesHeader from '@/components/Home/CategoriesHeader';
// // import Allsection from '@/components/Home/All_games';
// import GameHubFooter from '@/components/Footer';
// import { useState } from "react";
// import { Users, Star, Play } from "lucide-react";
// import Link from "next/link";


// export default function CategoryPage() {
//     const params = useParams();
//     const slug = params.slug as string;
//     const { setSelectedCategory } = useCategory();

//     // Redirect /category/all to home page
//     if (slug === 'all') {
//         redirect('/');
//     }

//     useEffect(() => {
//         // Extract category ID from slug (assuming slug format is "category-name-id")
//         const parts = slug.split('-');
//         const categoryId = parts[parts.length - 1]; // Get the last part which is the ID

//         // Convert to number if it's a valid number
//         const numericId = !isNaN(Number(categoryId)) ? Number(categoryId) : categoryId;
//         setSelectedCategory(numericId);
//     }, [slug, setSelectedCategory]);

//     interface CardProps {
//         title: string;
//         image: string;
//         col: number;
//         row: number;
//         players: string;
//         rating: number;
//         category: string;
//         slug: string;
//     }

//     const Card = ({
//         title,
//         image,
//         col,
//         row,
//         players,
//         rating,
//         slug,
//     }: CardProps) => {
//         const [hover, setHover] = useState(false);
//         return (
//             <>
//                 {/* <Allsection /> */}

//                 <GameHubFooter />
//             </>
//         );
//     }
// }

// 'use client';

// import { useParams, redirect } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useCategory } from '@/contexts/CategoryContext';
// import GameHubFooter from '@/components/Footer';
// import { Users, Star, Play } from "lucide-react";
// import Link from "next/link";

// interface CardProps {
//   title: string;
//   image: string;
//   col: number;
//   row: number;
//   players: string;
//   rating: number;
//   category: string;
//   slug: string;
// }

// const Card = ({
//   title,
//   image,
//   col,
//   row,
//   players,
//   rating,
//   slug,
// }: CardProps) => {
//   const [hover, setHover] = useState(false);

//   return (
//     <Link
//       href={`/game/${slug}`}
//       style={{
//         gridColumn: `span ${col}`,
//         gridRow: `span ${row}`,
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       className="relative rounded-2xl overflow-hidden cursor-pointer group"
//     >
//       <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-orange-400/60 transition-all duration-200 pointer-events-none" />

//       <img
//         src={image}
//         alt={title}
//         className={`w-full h-full object-cover transition-transform duration-500 ${
//           hover ? "scale-110" : "scale-100"
//         }`}
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

//       <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
//         <Users size={10} className="text-orange-400" />
//         <span className="text-white text-[10px] font-semibold">
//           {players}
//         </span>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
//         <p className="text-white font-semibold text-xs mb-1 group-hover:text-orange-400">
//           {title}
//         </p>
//         <div className="flex items-center gap-1">
//           <Star size={11} className="text-yellow-400 fill-yellow-400" />
//           <span className="text-white text-[10px] font-semibold">
//             {rating}
//           </span>
//         </div>
//       </div>

//       <div
//         className={`absolute inset-0 flex items-center justify-center ${
//           hover ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         <div className="bg-orange-500 text-white text-xs px-4 py-2 rounded-full flex items-center gap-1">
//           <Play size={12} />
//           Play Now
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params.slug as string;
//   const { setSelectedCategory } = useCategory();

//   if (slug === 'all') {
//     redirect('/');
//   }

//   useEffect(() => {
//     const parts = slug.split('-');
//     const categoryId = parts[parts.length - 1];
//     const numericId = !isNaN(Number(categoryId)) ? Number(categoryId) : categoryId;
//     setSelectedCategory(numericId);
//   }, [slug, setSelectedCategory]);

//   return (
//     <>
//       <section className="px-4 pt-6 pb-8 bg-[#E8E9ED]">
//         <h2 className="text-2xl font-semibold mb-4">All Games</h2>

//         <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[140px]">

//           <Card title="911 Prey" slug="911-prey" image="/Images/911-prey_16x9-cover.jpg" players="12.5k" rating={4.5} category="Action" col={1} row={1} />

//           <Card title="Speed Racer" slug="speed-racer" image="/Images/911-prey_16x9-cover.jpg" players="8.2k" rating={4.2} category="Racing" col={1} row={1} />

//           <Card title="Battle Arena" slug="battle-arena" image="/Images/911-prey_16x9-cover.jpg" players="15.1k" rating={4.8} category="Action" col={1} row={1} />

//           <Card title="Puzzle Master" slug="puzzle-master" image="/Images/911-prey_16x9-cover.jpg" players="5.4k" rating={4.3} category="Puzzle" col={1} row={1} />

//         </div>
//       </section>

//       <GameHubFooter />
//     </>
//   );
// }


'use client';

import { useParams, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import GameHubFooter from '@/components/Footer';
import { Users, Star, Play } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, Game } from "@/lib/api/games";
import { fetchCategories, Category } from "@/lib/api/categories";

interface CardProps {
    title: string;
    image: string;
    col: number;
    row: number;
    players: string;
    rating: number;
    category: string;
    slug: string;
}

const Card = ({
    title,
    image,
    col,
    row,
    players,
    rating,
    slug,
}: CardProps) => {
    const [hover, setHover] = useState(false);

    return (
        <Link
            href={`/game/${slug}`}
            style={{
                gridColumn: `span ${col}`,
                gridRow: `span ${row}`,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
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
    );
};

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { setSelectedCategory } = useCategory();

    if (slug === 'all') {
        redirect('/');
    }

    // Fetch categories to find the category by slug
    const { data: categories = [], isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    // Find category by slug
    const currentCategory = categories.find((cat: Category) => {
        const categorySlug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '');
        return categorySlug === slug;
    });

    const categoryId = currentCategory?.id;
    const categoryName = currentCategory?.name || 'Games';

    useEffect(() => {
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    }, [categoryId, setSelectedCategory]);

    // Fetch games for this category
    const { data: apiGames = [], isLoading, error } = useQuery({
        queryKey: ['games', categoryId],
        queryFn: () => fetchGames(categoryId),
        enabled: !!categoryId, // Only fetch if we have a valid category ID
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
        <>
            <section className="px-4 sm:px-6 md:px-7 pt-6 sm:pt-8 pb-8 sm:pb-12 bg-[#E8E9ED]">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <div>
                            <h2 className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
                                {categoryName}
                            </h2>
                            <p className="text-xs sm:text-sm font-[poppins] text-gray-500 mt-1">
                                Explore our complete {categoryName.toLowerCase()} game collection
                            </p>
                        </div>
                    </div>

                    {/* Grid */}
                    {categoriesLoading || isLoading ? (
                        <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[150px]">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl bg-gray-200 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : !currentCategory ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 font-[poppins]">Category not found.</p>
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
                                <Card key={`${game.slug}-${index}`} {...game} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <GameHubFooter />
        </>
    );
}