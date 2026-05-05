// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';

// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   size: number;
//   color: string;
//   life: number;
// }

// export default function CustomCursor() {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);
//   const [particles, setParticles] = useState<Particle[]>([]);
//   const particleIdRef = useRef(0);

//   useEffect(() => {
//     const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
//     let particleInterval: NodeJS.Timeout;

//     const moveCursor = (e: MouseEvent) => {
//       setMousePos({ x: e.clientX, y: e.clientY });

//       // Create particles on move
//       if (Math.random() > 0.8) {
//         const newParticle: Particle = {
//           id: particleIdRef.current++,
//           x: e.clientX + (Math.random() - 0.5) * 30,
//           y: e.clientY + (Math.random() - 0.5) * 30,
//           size: Math.random() * 6 + 3,
//           color: colors[Math.floor(Math.random() * colors.length)],
//           life: 1,
//         };
//         setParticles((prev) => [...prev, newParticle]);
//       }
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
      
//       if (
//         target.tagName === 'A' ||
//         target.tagName === 'BUTTON' ||
//         target.closest('button') ||
//         target.closest('a') ||
//         target.style.cursor === 'pointer' ||
//         window.getComputedStyle(target).cursor === 'pointer'
//       ) {
//         setIsHovering(true);
//       } else {
//         setIsHovering(false);
//       }
//     };

//     // Particle cleanup
//     particleInterval = setInterval(() => {
//       setParticles((prev) =>
//         prev
//           .map((p) => ({ ...p, life: p.life - 0.03 }))
//           .filter((p) => p.life > 0)
//       );
//     }, 16);

//     window.addEventListener('mousemove', moveCursor);
//     window.addEventListener('mouseover', handleMouseOver);

//     return () => {
//       window.removeEventListener('mousemove', moveCursor);
//       window.removeEventListener('mouseover', handleMouseOver);
//       clearInterval(particleInterval);
//     };
//   }, []);

//   return (
//     <>
//       {/* Particles around cursor */}
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="fixed pointer-events-none z-[9997] rounded-full"
//           style={{
//             left: particle.x,
//             top: particle.y,
//             width: particle.size,
//             height: particle.size,
//             backgroundColor: particle.color,
//             boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
//           }}
//           initial={{ opacity: 1, scale: 1 }}
//           animate={{
//             opacity: particle.life * 0.6,
//             scale: 0.2,
//             y: -40,
//             x: (Math.random() - 0.5) * 20,
//           }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//         />
//       ))}

//       {/* Glow effect around cursor */}
//       <motion.div
//         className="fixed pointer-events-none z-[9996]"
//         style={{
//           left: mousePos.x,
//           top: mousePos.y,
//           translateX: '-50%',
//           translateY: '-50%',
//         }}
//         animate={{
//           scale: isHovering ? 1.5 : 1,
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl" />
//       </motion.div>

//       {/* Hover effect - expanding circles */}
//       {isHovering && (
//         <motion.div
//           className="fixed pointer-events-none z-[9995]"
//           style={{
//             left: mousePos.x,
//             top: mousePos.y,
//             translateX: '-50%',
//             translateY: '-50%',
//           }}
//         >
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full border-2 border-cyan-400/60"
//               initial={{ scale: 0, opacity: 0.8 }}
//               animate={{
//                 scale: [0, 2.5, 3.5],
//                 opacity: [0.8, 0.3, 0],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 delay: i * 0.5,
//                 ease: 'easeOut',
//               }}
//               style={{
//                 width: '50px',
//                 height: '50px',
//                 marginLeft: '-25px',
//                 marginTop: '-25px',
//               }}
//             />
//           ))}
//         </motion.div>
//       )}

//       {/* Rotating ring effect */}
//       <motion.div
//         className="fixed pointer-events-none z-[9994]"
//         style={{
//           left: mousePos.x,
//           top: mousePos.y,
//           translateX: '-50%',
//           translateY: '-50%',
//         }}
//         animate={{
//           rotate: 360,
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: 'linear',
//         }}
//       >
//         <div className="w-12 h-12 rounded-full border-2 border-dashed border-purple-400/30" />
//       </motion.div>
//     </>
//   );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
}

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
    let particleInterval: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create particles on move
      if (Math.random() > 0.8) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        };
        setParticles((prev) => [...prev, newParticle]);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Particle cleanup
    particleInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.03 }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <>
      {/* Particles around cursor */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: particle.life * 0.6,
            scale: 0.2,
            y: -40,
            x: (Math.random() - 0.5) * 20,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}

      {/* Glow effect around cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9996]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl" />
      </motion.div>

      {/* Rotating ring effect */}
      <motion.div
        className="fixed pointer-events-none z-[9994]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-purple-400/30" />
      </motion.div>
    </>
  );
}