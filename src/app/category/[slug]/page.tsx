'use client'

import { useEffect, useState } from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import TheplayfreeFooter from '@/components/Footer';
import { Users, Star, Play } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, Game } from "@/lib/api/games";
import { fetchCategories, Category } from "@/lib/api/categories";
import { useParams, redirect } from 'next/navigation';
import ResponsiveAd from '@/components/common/ResponsiveAd';

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
    const categoryName: string = currentCategory?.name || 'Games';

    // Fetch games for this category
    const { data: games = [], isLoading: gamesLoading } = useQuery({
        queryKey: ['games', categoryId],
        queryFn: () => fetchGames(categoryId),
        enabled: !!categoryId,
    });

    useEffect(() => {
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    }, [categoryId, setSelectedCategory]);

    if (categoriesLoading) {
        return <div className="text-white p-8">Loading...</div>;
    }

    if (!currentCategory) {
        return <div className="text-white p-8">Category not found</div>;
    }

    return (
        <>
            <div className='bg-[#E8E9ED] py-6'>
                <ResponsiveAd slot="homepage_banner" className="max-w-7xl mx-auto mb-8 px-4" />
                
                <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-4 justify-center px-4">
                    {/* Left Sidebar Ad */}
                    <div className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start">
                        <ResponsiveAd slot="left_sidebar_ad" layout="vertical" />
                    </div>

                    <section className="flex-1 max-w-7xl w-full">
                        <h2 className="font-[poppins] mt-4 text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">{categoryName} Games</h2>

                        {gamesLoading ? (
                            <div className="text-white">Loading games...</div>
                        ) : games.length === 0 ? (
                            <div className="text-white">No games found in this category</div>
                        ) : (
                            <div className="grid gap-3 grid-cols-2 pt-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[140px]">
                                {games.map((game: Game) => (
                                    <Card
                                        key={game.id}
                                        title={game.title}
                                        slug={game.slug || game.title.toLowerCase().replace(/\s+/g, '-')}
                                        image={game.thumbnail || ''}
                                        videoUrl={game.videoUrl}
                                        players={game.plays ? game.plays.toString() : '0'}
                                        rating={game.rating || 0}
                                        category={categoryName}
                                        col={1}
                                        row={1}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Right Sidebar Ad */}
                    <div className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start">
                        <ResponsiveAd slot="right_sidebar_ad" layout="vertical" />
                    </div>
                </div>

                <ResponsiveAd slot="homepage_mid_banner_1" className="max-w-7xl mx-auto mt-12 px-4" />
                <ResponsiveAd slot="homepage_mid_banner_2" className="max-w-7xl mx-auto mt-12 px-4" />
                <ResponsiveAd slot="footer_ad" className="max-w-7xl mx-auto mt-12 px-4" />
            </div>

            <TheplayfreeFooter />
        </>
    );
}
