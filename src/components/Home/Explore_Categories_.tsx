'use client';

import * as LucideIcons from 'lucide-react';
import { Tag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useInView } from 'framer-motion';
import { fetchCategories, Category } from '@/lib/api/categories';

// Animation variants for header
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Animation variants for category cards
const categoryCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 }
  })
};

// Color palette for categories
const colorPalette = [
  'from-pink-500 via-red-500 to-yellow-500',
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-green-400 via-teal-500 to-blue-500',
  'from-yellow-400 via-orange-500 to-red-500',
  'from-cyan-400 via-sky-500 to-blue-600',
  'from-purple-500 via-pink-500 to-red-500',
  'from-blue-500 via-indigo-500 to-purple-500',
  'from-teal-400 via-green-500 to-emerald-600',
];

export default function Categories() {
  const [active, setActive] = useState<string | number>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  const isHeadingInView = useInView(headingRef, { once: true, margin: "0px" });
  const isCardsInView = useInView(cardsContainerRef, { once: true, margin: "0px" });

  // Fetch categories from API
  const { data: apiCategories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Helper function to get icon component from string
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Tag;
    
    // Convert icon name to PascalCase if needed (e.g., "gamepad-2" -> "Gamepad2")
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Try to get the icon from lucide-react
    const IconComponent = (LucideIcons as any)[pascalCase];
    return IconComponent || Tag; // Fallback to Tag if icon not found
  };

  // Add "All Games" category and map API categories
  const categories = [
    ...apiCategories
      .filter((cat: Category) => cat.isActive || cat.is_active)
      .map((cat: Category, index: number) => ({
        id: `category-${cat.id}-${index}`,
        dbId: cat.id,
        label: cat.name,
        slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, ''),
        icon: getIconComponent(cat.icon),
        color: colorPalette[index % colorPalette.length],
      })),
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 30);
    };

    startAutoScroll();  

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-7 pt-6 sm:pt-8 bg-[#E8E9ED]">

      {/* Heading */} 
      <motion.h2 
        ref={headingRef}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight mb-4 sm:mb-6">
        Explore Categories
      </motion.h2>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
      >
        {isLoading ? (
          <div className="flex gap-3 sm:gap-4 md:gap-5 pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-24 w-40 sm:h-28 sm:w-48 flex-shrink-0 rounded-2xl bg-gray-300 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div ref={cardsContainerRef} className="flex gap-3 sm:gap-4 md:gap-5 pb-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = active === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={categoryCardVariants}
                  onClick={() => {
                    setActive(cat.id);
                    // Scroll to the specific category section with offset for header
                    const categorySection = document.querySelector(`[data-category-id="${cat.dbId}"]`);
                    if (categorySection) {
                      const offset = 120; // Adjust this value based on your header height
                      const elementPosition = categorySection.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="group relative h-24 w-40 sm:h-28 sm:w-48 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:rotate-1 hover:scale-105"
                >

                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.color} transition-all duration-500`}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 backdrop-blur-sm" />

                  {/* Glow */}
                  <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60 transition duration-500 bg-gradient-to-br ${cat.color}`} />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
                    <div className="mb-2 p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-125 transition duration-300">
                      <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <span className="text-xs sm:text-sm font-[poppins] font-semibold tracking-tight px-2 text-center">
                      {cat.label}
                    </span>
                  </div>

                  {/* Active Effect */}
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-white/90 rounded-2xl animate-pulse" />
                  )}
                </motion.div>
              );
            })}
          </div>
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
