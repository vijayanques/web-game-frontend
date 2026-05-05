'use client';

import * as LucideIcons from 'lucide-react';
import { Tag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchCategories, Category } from '@/lib/api/categories';

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const categoryCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const colorPalette = [
  { gradient: 'from-pink-500 via-red-500 to-yellow-500',   neon: '#f43f5e' },
  { gradient: 'from-indigo-500 via-purple-500 to-pink-500', neon: '#a855f7' },
  { gradient: 'from-green-400 via-teal-500 to-blue-500',    neon: '#10b981' },
  { gradient: 'from-yellow-400 via-orange-500 to-red-500',  neon: '#f59e0b' },
  { gradient: 'from-cyan-400 via-sky-500 to-blue-600',      neon: '#0ea5e9' },
  { gradient: 'from-purple-500 via-pink-500 to-red-500',    neon: '#a855f7' },
  { gradient: 'from-blue-500 via-indigo-500 to-purple-500', neon: '#6366f1' },
  { gradient: 'from-teal-400 via-green-500 to-emerald-600', neon: '#14b8a6' },
];

const PARTICLE_POSITIONS = [
  { left: '12%', delay: '0ms',   size: 3 },
  { left: '28%', delay: '100ms', size: 4 },
  { left: '45%', delay: '50ms',  size: 3 },
  { left: '62%', delay: '160ms', size: 5 },
  { left: '78%', delay: '80ms',  size: 3 },
  { left: '20%', delay: '200ms', size: 4 },
  { left: '55%', delay: '130ms', size: 3 },
];

export default function Categories() {
  const [active, setActive]   = useState<string | number>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: apiCategories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Tag;
    const pascalCase = iconName
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');
    return (LucideIcons as any)[pascalCase] || Tag;
  };

  const categories = apiCategories
    .filter((cat: Category) => cat.isActive || cat.is_active)
    .map((cat: Category, index: number) => ({
      id: `category-${cat.id}-${index}`,
      dbId: cat.id,
      label: cat.name,
      slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, ''),
      icon: getIconComponent(cat.icon),
      ...colorPalette[index % colorPalette.length],
    }));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-7 pt-6 sm:pt-8 bg-[#E8E9ED]">
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="font-[poppins] text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight mb-4 sm:mb-6"
        >
          Explore Categories
        </motion.h2>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide py-2">
          {isLoading ? (
            <div className="flex gap-3 sm:gap-4 md:gap-5 pb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-24 w-40 sm:h-28 sm:w-48 shrink-0 rounded-2xl bg-gray-300 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-4 md:gap-5 pb-2 pt-1 px-1">
              {categories.map((cat, index) => {
                const Icon      = cat.icon;
                const isActive  = active === cat.id;
                const isHovered = hoveredId === cat.id;

                return (
                  <motion.div
                    key={cat.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={categoryCardVariants}
                    onMouseEnter={() => setHoveredId(cat.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => {
                      setActive(cat.id);
                      const section = document.querySelector(
                        `[data-category-id="${cat.dbId}"]`
                      );
                      if (section) {
                        const top = section.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    style={{
                      transform: isHovered
                        ? 'translateY(-7px) scale(1.05)'
                        : 'translateY(0px) scale(1)',
                      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                    className="relative h-24 w-40 sm:h-28 sm:w-48 shrink-0 rounded-2xl overflow-visible cursor-pointer"
                  >

                    <div className="absolute inset-0 rounded-2xl overflow-hidden">

                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />

                      <div
                        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
                        style={{ opacity: isHovered ? 0.08 : 0.4 }}
                      />

                      {PARTICLE_POSITIONS.map((p, i) => (
                        <span
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: p.size,
                            height: p.size,
                            left: p.left,
                            bottom: 0,
                            opacity: 0,
                            animation: isHovered
                              ? `neon-particle-float 0.9s ease-out ${p.delay} forwards`
                              : 'none',
                          }}
                        />
                      ))}

                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white gap-2">

                        <div
                          className="p-2 rounded-full border border-white/25 transition-all duration-300"
                          style={{
                            background: isHovered
                              ? 'rgba(255,255,255,0.28)'
                              : 'rgba(255,255,255,0.15)',
                            transform: isHovered ? 'scale(1.22)' : 'scale(1)',
                            boxShadow: 'none',
                            transition:
                              'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease',
                          }}
                        >
                          <Icon size={20} />
                        </div>

                        <span
                          className="text-xs sm:text-sm font-[poppins] font-semibold px-2 text-center drop-shadow"
                          style={{
                            letterSpacing: isHovered ? '1px' : '0.3px',
                            transition: 'letter-spacing 0.3s ease',
                          }}
                        >
                          {cat.label}
                        </span>
                      </div>

                    </div>

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
          @keyframes neon-particle-float {
            0%   { opacity: 0.9; transform: translateY(0)    scale(1);   }
            60%  { opacity: 0.6; transform: translateY(-45px) scale(0.7); }
            100% { opacity: 0;   transform: translateY(-80px) scale(0.2); }
          }
        `}</style>

      </div>
    </div>
  );
}