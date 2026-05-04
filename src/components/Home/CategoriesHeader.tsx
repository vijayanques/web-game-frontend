// 'use client';

// import { Gamepad2, Crosshair, Zap, Trophy, Users } from 'lucide-react';
// import { useState } from 'react';

// const categories = [
//   { id: 'all', label: 'All', icon: Gamepad2 },
//   { id: 'fps', label: 'FPS', icon: Crosshair },
//   { id: 'battle', label: 'Battle Royale', icon: Zap },
//   { id: 'tournamentsqqq', label: 'Tournaments', icon: Trophy },
//   { id: 'communsasityaaaaaaaaaaaaaaaaaaaa', alabel: 'Community', icon: Users },
//   { id: 'commuassanityaaaaaaaa', label: 'Community', icon: Users },
//   { id: 'commuassanitaaaaaaaaaaaay', label: 'Community', icon: Users },

//   { id: 'commuassanity', label: 'Community', icon: Users },

//   { id: 'commuassanity', label: 'Community', icon: Users },
//   { id: 'commuassansasaity', label: 'Community', icon: Users },
//   { id: 'commuassaggggggggggggggggganity', label: 'Community', icon: Users },
//   { id: 'commuasbnbbbsanity', label: 'Community', icon: Users },
//   { id: 'commuasnnnnnsanity', label: 'Community', icon: Users },
//   { id: 'commuasqqqqqsanity', label: 'Community', icon: Users },







// ];

// export default function CategoriesHeader() {
//   const [active, setActive] = useState('all');

//   return (
//     <div className="w-full bg-[#E8E9ED] border-b border-gray-300">
//       <div className="flex justify-center pt-1 pb-3 px-2 sm:px-4">

//         {/* Container wrapper */}
//         <div className="w-full max-w-5xl">
//           <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-full p-1.5 sm:p-2 shadow-sm overflow-x-auto scrollbar-hide">
//             <div className="inline-flex items-center justify-start sm:justify-center gap-2 sm:gap-3">
//               {categories.map((cat) => {
//                 const Icon = cat.icon;
//                 const isActive = active === cat.id;

//                 return (
//                   <button
//                     key={cat.id}
//                     onClick={() => setActive(cat.id)}
//                     className={`cursor-pointer font-[poppins] group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${isActive
//                         ? 'bg-orange-500 text-white shadow-md'
//                         : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                   >
//                     <Icon
//                       className={`cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'
//                         }`}
//                     />
//                     <span className="hidden xs:inline">{cat.label}</span>
//                     <span className="inline xs:hidden">
//                       {cat.id === 'battle' ? 'BR' : cat.id === 'tournaments' ? 'Tour' : cat.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <style jsx global>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//       </div>
//       );
// }


// 'use client';

// import {
//   Gamepad2,
//   Crosshair,
//   Zap,
//   Trophy,
//   Users,
//   Sword,
//   Car,
//   Brain,
//   Ghost,
//   Target,
// } from 'lucide-react';
// import { useState } from 'react';

// const categories = [
//   { id: 'all', label: 'All', icon: Gamepad2 },
//   { id: 'fps', label: 'FPS', icon: Crosshair },
//   { id: 'battle', label: 'Battle Royale', icon: Zap },
//   { id: 'tournaments', label: 'Tournaments', icon: Trophy },
//   { id: 'community', label: 'Community', icon: Users },
//   { id: 'action', label: 'Action', icon: Sword },
//   { id: 'racing', label: 'Racing', icon: Car },
//   { id: 'strategy', label: 'Strategy', icon: Brain },
//   { id: 'horror', label: 'Horror', icon: Ghost },
//   { id: 'arcade', label: 'Arcade', icon: Target },
//   { id: 'arcade', label: 'Arcade', icon: Target },

//   { id: 'arcade', label: 'Arcade', icon: Target },

//   { id: 'arcade', label: 'Arcade', icon: Target },


//   { id: 'arcade', label: 'Arcade', icon: Target },

// ];

// export default function CategoriesHeader() {
//   const [active, setActive] = useState('all');

//   return (
//     <div className="w-full bg-[#E8E9ED] border-b border-gray-300">
//       <div className="flex justify-center pt-1 pb-3 px-2 sm:px-4">

//         {/* Container */}
//         <div className="w-full max-w-[1450px]">
//           <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-full p-1.5 sm:p-2 shadow-sm overflow-x-auto scrollbar-hide">

//             <div className="inline-flex items-center gap-2 sm:gap-3">
//               {categories.map((cat) => {
//                 const Icon = cat.icon;
//                 const isActive = active === cat.id;

//                 return (
//                   <button
//                     key={cat.id}
//                     onClick={() => setActive(cat.id)}
//                     className={`cursor-pointer font-[poppins] group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${isActive
//                         ? 'bg-orange-500 text-white shadow-md'
//                         : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                   >
//                     <Icon
//                       className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'
//                         }`}
//                     />

//                     {/* Full label (desktop) */}
//                     <span className="hidden xs:inline">
//                       {cat.label}
//                     </span>

//                     {/* Short label (mobile) */}
//                     <span className="inline xs:hidden">
//                       {cat.id === 'battle'
//                         ? 'BR'
//                         : cat.id === 'tournaments'
//                           ? 'Tour'
//                           : cat.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Hide scrollbar */}
//         <style jsx global>{`
//           .scrollbar-hide {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }



'use client';

import {
  Gamepad2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Zap,
  Trophy,
  Users,
  Sword,
  Car,
  Brain,
  Ghost,
  Target,
  Puzzle,
  Dices,
  Flame,
  Shield,
  Rocket,
  Crown,
  Star,
  Heart,
  Music,
  Palette,
  Book,
  Sparkles,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchCategories, Category } from '@/lib/api/categories';
import { useCategory } from '@/contexts/CategoryContext';
import { useRouter, usePathname } from 'next/navigation';

// Animation variants for category items
const categoryItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 }
  })
};

// Icon mapping - maps icon names to Lucide components
const iconMap: Record<string, any> = {
  Gamepad2,
  Tag,
  Crosshair,
  Zap,
  Trophy,
  Users,
  Sword,
  Car,
  Brain,
  Ghost,
  Target,
  Puzzle,
  Dices,
  Flame,
  Shield,
  Rocket,
  Crown,
  Star,
  Heart,
  Music,
  Palette,
  Book,
  Sparkles,
};

// Helper function to get icon component
const getIconComponent = (iconName?: string) => {
  console.log('Getting icon for:', iconName); // Debug log
  if (!iconName) {
    console.log('No icon name provided, using Tag'); // Debug log
    return Tag;
  }
  const icon = iconMap[iconName];
  if (!icon) {
    console.log(`Icon "${iconName}" not found in iconMap, using Tag`); // Debug log
    console.log('Available icons:', Object.keys(iconMap)); // Show available icons
  }
  return icon || Tag;
};

export default function CategoriesHeader() {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch categories from API
  const { data: apiCategories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Add "All" category and map API categories
  const categories = [
    { id: 'all', dbId: 0, label: 'All', icon: Gamepad2, slug: 'all', image: undefined },
    ...apiCategories
      .filter((cat: Category) => cat.isActive || cat.is_active)
      .map((cat: Category, index: number) => {
        console.log('Category from API:', cat.name, 'Icon:', cat.icon); // Debug log
        return {
          id: `cat-${cat.id}-${index}`,
          dbId: cat.id,
          label: cat.name,
          slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, ''),
          icon: getIconComponent(cat.icon), // Use the icon from database
          image: cat.image, // Store image URL if available
        };
      }),
  ];

  // Sync selectedCategory with current URL
  useEffect(() => {
    if (pathname === '/') {
      setSelectedCategory('all');
    } else if (pathname.startsWith('/category/')) {
      const slug = pathname.split('/category/')[1];
      // Find category by slug
      const category = apiCategories.find((cat: Category) => {
        const categorySlug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '');
        return categorySlug === slug;
      });
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [pathname, apiCategories, setSelectedCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 200;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (catId: string, categoryDbId?: number, label?: string, categorySlug?: string) => {
    if (catId === 'all') {
      setSelectedCategory('all');
      router.push('/');
    } else {
      setSelectedCategory(categoryDbId || catId);
      // Use the slug from database, or fallback to label without hyphens
      const slug = categorySlug || (label ? label.toLowerCase().replace(/\s+/g, '') : catId);
      router.push(`/category/${slug}`);
    }
  };

  return (
    <div className="w-full bg-[#E8E9ED] border-b border-gray-300">
      <div className="flex justify-center pt-1 pb-3 px-2 sm:px-4">

        {/* Container */}
        <div className="w-full max-w-[1575px]">

          <div className="flex items-center gap-2">

            {/* LEFT BUTTON */}
            <button
              onClick={() => scroll('left')}
              className="cursor-pointer p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>

            {/* SCROLLABLE CATEGORY BAR */}
            <div
              ref={scrollRef}
              className="flex-1 bg-white/60 backdrop-blur-md border border-gray-200 rounded-full p-1.5 sm:p-2 shadow-sm overflow-x-auto scrollbar-hide"
            >
              {isLoading ? (
                <div className="inline-flex items-center gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 sm:gap-3">
                  {categories.map((cat, index) => {
                    const Icon = cat.icon;
                    const categoryDbId = 'dbId' in cat ? cat.dbId : undefined;
                    
                    // Fix active state check
                    let isActive = false;
                    if (cat.id === 'all') {
                      isActive = selectedCategory === 'all';
                    } else {
                      // Check if selectedCategory matches the database ID
                      isActive = selectedCategory === categoryDbId || selectedCategory === String(categoryDbId);
                    }

                    return (
                      <motion.button
                        key={cat.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={categoryItemVariants}
                        onClick={() => handleCategoryClick(cat.id, categoryDbId, cat.label, cat.slug)}
                        className={`cursor-pointer font-[poppins] group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                            isActive ? '' : 'group-hover:scale-110'
                          }`}
                        />

                        {/* Desktop label */}
                        <span className="hidden xs:inline">{cat.label}</span>

                        {/* Mobile label - truncate long names */}
                        <span className="inline xs:hidden">
                          {cat.label.length > 8
                            ? cat.label.substring(0, 6) + '...'
                            : cat.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT BUTTON */}
            <button
              onClick={() => scroll('right')}
              className="cursor-pointer p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        </div>

        {/* Hide scrollbar */}
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
    </div>
  );
}