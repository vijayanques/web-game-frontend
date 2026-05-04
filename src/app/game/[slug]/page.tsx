'use client'

import { useState, useEffect, use, useRef } from 'react'
import { notFound } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import Footer from '@/components/Footer'
import StarRating from '@/components/StarRating'
import {
  IconPlay, IconHeart, IconShare, IconThumbUp, IconThumbDown,
  IconMaximize, IconGamepad, IconMonitor, IconSmartphone,
  IconTag, IconCheck, IconChevronRight, IconUsers,
  IconTrophy, IconClock, IconDownload, IconStar,
} from '@/components/Icons'

/* ─── TYPES ──────────────────────────────────────────── */
interface GameData {
  id: number
  title: string
  slug: string
  developer?: string
  rating: number
  votes?: string
  released?: string
  technology?: string
  platforms?: string[]
  wiki?: string
  description: string
  thumbnail: string
  gameUrl?: string
  game_url?: string
  category?: string | { id: number; name: string }
  categoryId?: number
  category_id?: number
  iframeUrl?: string
  iframe_url?: string
  howToPlay?: Array<{ title: string; body: string }>
  gameModes?: Array<{ name: string; desc: string }>
  tips?: string[]
  features?: string[]
  tags?: Array<{ label: string; count: number }>
  controls?: Array<{ key: string; action: string }>
}

interface SimilarGame {
  id: number
  name?: string
  title?: string
  slug: string
  tag?: string
  category?: string
  rating: number
  players?: string
  thumbnail: string
}

const TABS = ['All', 'Overview', 'Gameplay']

/* ─── COMPONENT ──────────────────────────────────────── */
export default function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [game, setGame] = useState<GameData | null>(null)
  const [similarGames, setSimilarGames] = useState<SimilarGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const [activeTab, setActiveTab] = useState('All')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [disliked, setDisliked] = useState(false)
  const [dislikeCount, setDislikeCount] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showSidebarShareMenu, setShowSidebarShareMenu] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const shareMenuRef = useRef<HTMLDivElement>(null)
  const sidebarShareMenuRef = useRef<HTMLDivElement>(null)

  // Animation refs
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const titleMetaRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const gameplayRef = useRef<HTMLDivElement>(null)
  const sidebarStatsRef = useRef<HTMLDivElement>(null)
  const similarGamesRef = useRef<HTMLDivElement>(null)
  const platformsRef = useRef<HTMLDivElement>(null)

  // useInView hooks
  const isBreadcrumbInView = useInView(breadcrumbRef, { once: true, margin: "0px" })
  const isPlayerInView = useInView(playerRef, { once: true, margin: "0px" })
  const isTitleMetaInView = useInView(titleMetaRef, { once: true, margin: "0px" })
  const isTagsInView = useInView(tagsRef, { once: true, margin: "0px" })
  const isOverviewInView = useInView(overviewRef, { once: true, margin: "0px" })
  const isGameplayInView = useInView(gameplayRef, { once: true, margin: "0px" })
  const isSidebarStatsInView = useInView(sidebarStatsRef, { once: true, margin: "0px" })
  const isSimilarGamesInView = useInView(similarGamesRef, { once: true, margin: "0px" })
  const isPlatformsInView = useInView(platformsRef, { once: true, margin: "0px" })

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  // Handle fullscreen toggle
  const handleFullscreen = () => {
    if (!gameContainerRef.current) return

    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
    }

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showShareMenu])

  // Close sidebar share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarShareMenuRef.current && !sidebarShareMenuRef.current.contains(event.target as Node)) {
        setShowSidebarShareMenu(false)
      }
    }

    if (showSidebarShareMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSidebarShareMenu])

  // Fetch game data
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

        // Fetch game details
        const gameResponse = await fetch(`${apiUrl}/api/games/${slug}`)
        if (!gameResponse.ok) {
          if (gameResponse.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch game data')
        }

        const gameData = await gameResponse.json()

        // Normalize the API response to match our interface
        const normalizedGame = {
          ...gameData.data,
          developer: gameData.data.developer || 'Unknown Developer',
          votes: gameData.data.votes || '0',
          released: gameData.data.released || gameData.data.releaseDate || new Date(gameData.data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          technology: gameData.data.technology || 'HTML5',
          platforms: gameData.data.platforms || ['Browser (desktop, mobile, tablet)'],
          game_url: gameData.data.gameUrl || gameData.data.game_url,
          iframe_url: gameData.data.iframeUrl || gameData.data.iframe_url,
          category: typeof gameData.data.category === 'object' ? gameData.data.category.name : (gameData.data.category || 'Games'),
          category_id: gameData.data.categoryId || gameData.data.category_id || (typeof gameData.data.category === 'object' ? gameData.data.category.id : 1),
          // Add default content if not provided by API
          howToPlay: gameData.data.howToPlay || [
            { title: 'Start Playing', body: `Begin your adventure in ${gameData.data.title}.` },
            { title: 'Master the Controls', body: 'Practice the controls to improve your skills.' },
            { title: 'Complete Objectives', body: 'Work through objectives to unlock achievements.' }
          ],
          gameModes: gameData.data.gameModes || [
            { name: 'Classic Mode', desc: 'Experience the traditional gameplay.' },
            { name: 'Challenge Mode', desc: 'Test your skills with increased difficulty.' }
          ],
          tips: gameData.data.tips || [
            'Take your time to learn the game mechanics',
            'Practice regularly to improve your skills',
            'Explore all available features'
          ],
          features: gameData.data.features || [
            'Engaging gameplay mechanics',
            'Multiple game modes',
            'Free to play in your browser',
            'No downloads required'
          ],
          tags: gameData.data.tags || [
            { label: typeof gameData.data.category === 'object' ? gameData.data.category.name : (gameData.data.category || 'Games'), count: 121 },
            { label: 'Browser', count: 1983 },
            { label: 'Free', count: 500 }
          ],
          controls: gameData.data.controls || [
            { key: 'WASD / Arrow Keys', action: 'Move character' },
            { key: 'Mouse', action: 'Look around / Aim' },
            { key: 'Space', action: 'Jump' },
            { key: 'Shift', action: 'Sprint' }
          ]
        }

        setGame(normalizedGame)

        // Fetch similar games based on category
        const categoryId = gameData.data.categoryId || gameData.data.category_id || (typeof gameData.data.category === 'object' ? gameData.data.category.id : null)
        if (categoryId) {
          const similarResponse = await fetch(
            `${apiUrl}/api/games?category=${categoryId}&limit=6&exclude=${gameData.data.id}`
          )
          if (similarResponse.ok) {
            const similarData = await similarResponse.json()
            setSimilarGames(similarData.data || [])
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchGameData()
    }
  }, [slug])

  // Handle tab click with smooth scroll
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)

    if (tab !== 'All') {
      setTimeout(() => {
        const sectionId = `section-${tab.toLowerCase()}`
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 160
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  // Track game play
  const handlePlayGame = async () => {
    if (!game) return

    // Scroll to game player
    if (gameContainerRef.current) {
      gameContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const userId = 1 // TODO: Get from auth context

      await fetch(`${apiUrl}/api/user-activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          gameId: game.id,
          categoryId: game.category_id || game.categoryId || 1
        })
      })
    } catch (err) {
      console.error('Failed to track activity:', err)
    }
  }

  // Handle like button
  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikeCount(Math.max(0, likeCount - 1))
    } else {
      setLiked(true)
      setLikeCount(likeCount + 1)
      // If disliked, remove dislike
      if (disliked) {
        setDisliked(false)
        setDislikeCount(Math.max(0, dislikeCount - 1))
      }
    }
  }

  // Handle dislike button
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false)
      setDislikeCount(Math.max(0, dislikeCount - 1))
    } else {
      setDisliked(true)
      setDislikeCount(dislikeCount + 1)
      // If liked, remove like
      if (liked) {
        setLiked(false)
        setLikeCount(Math.max(0, likeCount - 1))
      }
    }
  }

  // Handle wishlist button
  const handleWishlist = () => {
    if (wishlisted) {
      setWishlisted(false)
      setWishlistCount(Math.max(0, wishlistCount - 1))
    } else {
      setWishlisted(true)
      setWishlistCount(wishlistCount + 1)
    }
  }

  // Initialize like count from game votes
  useEffect(() => {
    if (game && game.votes) {
      const voteCount = parseInt(game.votes.replace(/,/g, '')) || 0
      setLikeCount(voteCount)
    }
  }, [game])

  // Handle share functionality
  const handleShare = (platform: string) => {
    if (!game || !mounted) return

    const url = window.location.href
    const text = `Check out ${game.title} - ${game.description.substring(0, 100)}...`

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(game.title)}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      setShowShareMenu(false)
    }
  }

  // Copy link to clipboard
  const handleCopyLink = async () => {
    if (!mounted || typeof window === 'undefined') return

    const url = window.location.href

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
        setCopySuccess(true)
        setTimeout(() => {
          setCopySuccess(false)
          setShowShareMenu(false)
        }, 2000)
      } else {
        // Fallback method for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = url
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
          document.execCommand('copy')
          textArea.remove()
          setCopySuccess(true)
          setTimeout(() => {
            setCopySuccess(false)
            setShowShareMenu(false)
          }, 2000)
        } catch (err) {
          console.error('Fallback: Failed to copy', err)
          textArea.remove()
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Prevent hydration mismatch - don't render until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading game...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Game Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The game you're looking for doesn't exist."}</p>
          <a href="/" className="text-orange-500 font-bold hover:text-orange-600">← Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100" suppressHydrationWarning>
      <main className="px-3 sm:px-4 py-4 sm:py-5 bg-[#E8E9ED]" suppressHydrationWarning>
        {/* Breadcrumb */}
        <motion.nav
          ref={breadcrumbRef}
          initial="initial"
          animate="animate"
          variants={fadeUpVariants}
          className="flex items-center gap-1 sm:gap-1.5 text-xs font-[poppins] text-gray-500 mb-3 sm:mb-4 flex-wrap">
          {['Games', typeof game.category === 'object' ? game.category.name : (game.category || 'All Games'), game.title].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1 sm:gap-1.5">
              <a href={i === 0 ? '/' : '#'} className={`hover:text-orange-500 transition-colors truncate ${i === arr.length - 1 ? 'text-orange-500 font-semibold' : ''}`}>
                {crumb}
              </a>
              {i < arr.length - 1 && <IconChevronRight size={10} className="text-gray-400 shrink-0" />}
            </span>
          ))}
        </motion.nav>

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 items-start">
          {/* ═══ LEFT: MAIN COLUMN ═══ */}
          <div className="w-full lg:flex-1 flex flex-col gap-3 sm:gap-4">

            {/* ── GAME PLAYER ── */}
            <motion.div
              ref={playerRef}
              initial="initial"
              animate="animate"
              variants={scaleUpVariants}
              className="bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 fullscreen-game-container"
              style={{
                position: isFullscreen ? 'fixed' : 'relative',
                top: isFullscreen ? 0 : 'auto',
                left: isFullscreen ? 0 : 'auto',
                width: isFullscreen ? '100vw' : 'auto',
                height: isFullscreen ? '100vh' : 'auto',
                zIndex: isFullscreen ? 9999 : 'auto',
                borderRadius: isFullscreen ? 0 : 'auto',
              }}>
              <div ref={gameContainerRef} className="relative bg-gray-950" style={{
                paddingBottom: isFullscreen ? '0' : '56.25%',
                height: isFullscreen ? '100%' : 'auto',
              }}>
                {(() => {
                  // Extract iframe src from gameUrl if it contains iframe HTML
                  const gameUrl = game.gameUrl || game.game_url || '';
                  const iframeUrl = game.iframe_url || game.iframeUrl || '';

                  // Try to extract src from iframe HTML
                  let src = '';
                  if (gameUrl.includes('<iframe')) {
                    const srcMatch = gameUrl.match(/src=["']([^"']+)["']/);
                    if (srcMatch) {
                      src = srcMatch[1];
                    }
                  } else if (gameUrl.startsWith('http')) {
                    src = gameUrl;
                  } else if (iframeUrl) {
                    src = iframeUrl;
                  }

                  return src ? (
                    <iframe
                      src={src}
                      className={`${isFullscreen ? 'w-full h-full' : 'absolute inset-0 w-full h-full'} border-0`}
                      allowFullScreen
                      title={game.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      onLoad={handlePlayGame}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 gap-3 sm:gap-4 px-4">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
                        <IconGamepad size={28} className="sm:w-9 sm:h-9 text-orange-500" />
                      </div>
                      <p className="text-white font-bold text-sm sm:text-base text-center">{game.title}</p>
                      <div className="w-48 sm:w-64">
                        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-orange-500 h-1.5 rounded-full w-2/3 animate-pulse" />
                        </div>
                        <p className="text-gray-500 text-xs text-center mt-2">Loading assets...</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Controls bar */}
              <div className={`px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between bg-gray-900 gap-2 overflow-x-auto ${isFullscreen ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}>
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                    <IconGamepad size={12} className="sm:w-3.5 sm:h-3.5 text-orange-500" />
                  </div>
                  <span className="text-white font-bold text-xs sm:text-sm font-[poppins] truncate">{game.title}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <button
                    onClick={handleLike}
                    className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                  >
                    <IconThumbUp size={14} className={liked ? 'text-orange-400' : 'text-gray-400 group-hover:text-white'} />
                    <span className={`text-xs font-semibold ${liked ? 'text-orange-400' : 'text-gray-300'}`}>
                      {likeCount}
                    </span>
                  </button>
                  <button
                    onClick={handleDislike}
                    className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors hidden sm:flex group"
                    title="Dislike"
                  >
                    <IconThumbDown size={12} className={`sm:w-3.5 sm:h-3.5 ${disliked ? 'text-red-400' : 'text-gray-400 group-hover:text-white'}`} />
                    {dislikeCount > 0 && (
                      <span className={`text-xs font-semibold ml-1 ${disliked ? 'text-red-400' : 'text-gray-300'}`}>
                        {dislikeCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleWishlist}
                    className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors group"
                    title="Add to Wishlist"
                  >
                    <IconHeart size={12} className={`sm:w-3.5 sm:h-3.5 ${wishlisted ? 'text-red-400 fill-red-400' : 'text-gray-400 group-hover:text-white'}`} filled={wishlisted} />
                    {wishlistCount > 0 && (
                      <span className={`text-xs font-semibold ml-1 ${wishlisted ? 'text-red-400' : 'text-gray-300'}`}>
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <IconMaximize size={12} className="sm:w-3.5 sm:h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── GAME TITLE + META ── */}
            <motion.div
              ref={titleMetaRef}
              initial="initial"
              animate="animate"
              variants={fadeUpVariants}
              className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-5">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-full">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-1 font-[poppins] break-words">{game.title}</h1>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <div className="relative" ref={shareMenuRef}>
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="cursor-pointer flex font-[poppins] items-center gap-1 sm:gap-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full transition-colors"
                      >
                        <IconShare size={11} className="sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Share</span>
                      </button>

                      {/* Share Menu Dropdown */}
                      {showShareMenu && (
                        <div className="absolute top-full left-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                          <div className="p-2">
                            <p className="text-xs font-bold text-gray-500 px-3 py-2 font-[poppins]">Share this game</p>

                            {/* Social Media Options */}
                            <button
                              onClick={() => handleShare('facebook')}
                              className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                            >
                              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 font-[poppins]">Facebook</span>
                            </button>

                            <button
                              onClick={() => handleShare('twitter')}
                              className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
                            >
                              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-sky-500 flex items-center justify-center shrink-0">
                                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-sky-600 font-[poppins]">Twitter</span>
                            </button>

                            <button
                              onClick={() => handleShare('whatsapp')}
                              className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-green-50 transition-colors group"
                            >
                              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-green-600 font-[poppins]">WhatsApp</span>
                            </button>

                            <button
                              onClick={() => handleShare('telegram')}
                              className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                            >
                              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 font-[poppins]">Telegram</span>
                            </button>

                            <button
                              onClick={() => handleShare('reddit')}
                              className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-orange-50 transition-colors group"
                            >
                              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-orange-600 font-[poppins]">Reddit</span>
                            </button>

                            {/* Divider */}
                            <div className="h-px bg-gray-200 my-2" />

                            {/* Copy Link */}
                            <button
                              onClick={handleCopyLink}
                              className=" cursor-pointer w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                                {copySuccess ? (
                                  <IconCheck size={14} className="sm:w-4 sm:h-4 text-green-600" />
                                ) : (
                                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-xs sm:text-sm font-semibold font-[poppins] ${copySuccess ? 'text-green-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                {copySuccess ? 'Link Copied!' : 'Copy Link'}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-gray-100">
                {[
                  ['Developer', <span key="dev" className="text-orange-500 font-semibold">{game.developer || 'Unknown'}</span>],
                  ['Rating', (
                    <span key="rat" className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 font-[poppins]">{game.rating}</span>
                      <StarRating value={Math.round(game.rating / 2)} size={10} />
                      <span className="text-gray-400 text-xs font-[poppins]">({game.votes || '0'} votes)</span>
                    </span>
                  )],
                  ['Released', <span key="rel" className="font-semibold text-sm">{game.released || 'N/A'}</span>],
                  ['Technology', <span key="tech" className="font-semibold text-sm">{game.technology || 'HTML5'}</span>],
                  ['Platforms', <span key="plat" className="text-xs leading-relaxed">{(game.platforms || ['Browser']).join(', ')}</span>],
                  ...(game.wiki ? [['Wiki pages', <span key="wiki" className="text-orange-500 font-semibold">{game.wiki}</span>]] : []),
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex items-start gap-2 sm:gap-3 py-2 sm:py-3 px-0 sm:odd:pr-3 sm:even:pl-3 sm:odd:border-r sm:odd:border-gray-100">
                    <span className="text-xs text-gray-600 w-20 sm:w-24 shrink-0 pt-0.5 font-[poppins]">{label}:</span>
                    <span className="text-xs sm:text-sm text-gray-700 flex-1 font-[poppins]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── TAGS ── */}
            {game.tags && game.tags.length > 0 && (
              <motion.div
                ref={tagsRef}
                initial="initial"
                animate="animate"
                variants={fadeUpVariants}
                className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <IconTag size={14} className="sm:w-4 sm:h-4 text-orange-500" />
                  <h2 className="font-bold text-sm sm:text-base text-gray-900 font-[poppins]">Categories & Tags</h2>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {game.tags.map(({ label, count }) => (
                    <button
                      key={label}
                      className="font-[poppins] inline-flex items-center gap-1 bg-gray-100 cursor-pointer hover:bg-orange-50 hover:text-orange-600 text-gray-700 text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-colors border border-transparent hover:border-orange-200"
                    >
                      {label}
                      <span className="font-[poppins] text-xs text-gray-500 font-normal">{count}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── TABS ── */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden sticky top-[60px] sm:top-[72px] z-40">
              <div className="flex border-b border-gray-100 px-1 sm:px-2 pt-1 sm:pt-2 gap-0.5 sm:gap-1 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg sm:rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${activeTab === tab
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 sm:space-y-6">
              {/* OVERVIEW */}
              <motion.div
                ref={overviewRef}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                id="section-overview"
                className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-5 scroll-mt-32">
                <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 sm:h-6 bg-orange-500 rounded-full font-[poppins]"></span>
                  Overview
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {/* Description */}
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-[poppins]">{game.description}</p>
                  </div>

                  {/* How to Play */}
                  {game.howToPlay && game.howToPlay.length > 0 && (
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-gray-900 mb-3 sm:mb-4 font-[poppins]">How to Play {game.title}</h2>
                      <div className="space-y-3 sm:space-y-4">
                        {game.howToPlay.map(({ title, body }, i) => (
                          <div key={i} className="flex gap-2 sm:gap-4">
                            <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-orange-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-gray-800 mb-1 font-[poppins]">{title}</p>
                              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-[poppins]">{body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Game Modes */}
                  {game.gameModes && game.gameModes.length > 0 && (
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 font-[poppins]">Game Modes</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {game.gameModes.map(({ name, desc }) => (
                          <div key={name} className="flex gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-gray-100 hover:border-orange-200 cursor-pointer hover:bg-orange-50/40 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5 sm:mt-2" />
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-gray-900 font-[poppins]">{name}</span>
                              <span className="text-xs sm:text-sm text-gray-500 font-[poppins]">: {desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {game.tips && game.tips.length > 0 && (
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 font-[poppins]">Tips</h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        {game.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm font-[poppins]">
                            <IconCheck size={12} className="sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="text-gray-600">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {game.features && game.features.length > 0 && (
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 font-[poppins]">Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {game.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl border border-gray-100 font-[poppins]">
                            <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                              <IconCheck size={8} className="sm:w-2.5 sm:h-2.5 text-orange-600" />
                            </div>
                            <span className="text-gray-600">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* GAMEPLAY */}
              {game.controls && game.controls.length > 0 && (
                <motion.div
                  ref={gameplayRef}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  id="section-gameplay"
                  className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-5 scroll-mt-32">
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 sm:h-6 bg-orange-500 rounded-full font-[poppins]"></span>
                    Gameplay
                  </h2>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-gray-900 mb-3 sm:mb-5 font-[poppins]">Controls & Key Bindings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {game.controls.map(({ key, action }) => (
                        <div key={key} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl border border-gray-100">
                          <span className="font-[poppins] inline-flex items-center justify-center bg-white border border-gray-300 rounded-lg px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-xs font-bold text-gray-700 shadow-sm min-w-[50px] sm:min-w-[64px] text-center shrink-0" style={{ boxShadow: '0 2px 0 #d1d5db' }}>
                            {key}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600 font-[poppins]">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ═══ RIGHT: SIDEBAR ═══ */}
          <aside className="w-full lg:w-[450px] shrink-0 flex flex-col gap-3 sm:gap-4">
            {/* Play button card */}
            <div className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4">
              {/* <button 
                onClick={handlePlayGame}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 cursor-pointer hover:bg-orange-600 font-[poppins] text-white font-black text-sm sm:text-base py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition-all shadow-sm shadow-orange-200 active:scale-95 mb-2 sm:mb-3"
              >
                <IconPlay size={16} className="sm:w-4.5 sm:h-4.5" />
                Play Now
              </button> */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  onClick={handleLike}
                  className={`flex flex-col cursor-pointer items-center gap-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border transition-all text-xs font-semibold ${liked ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-orange-200 hover:text-orange-500'
                    }`}
                >
                  <IconThumbUp size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-[10px]">{likeCount}</span>
                </button>
                <button
                  onClick={handleWishlist}
                  className={`flex flex-col items-center cursor-pointer gap-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border transition-all text-xs font-semibold ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'
                    }`}
                >
                  <IconHeart size={14} className="sm:w-4 sm:h-4" filled={wishlisted} />
                  <span className="text-[10px]">{wishlistCount}</span>
                </button>
                <button
                  onClick={() => setShowSidebarShareMenu(!showSidebarShareMenu)}
                  className="flex flex-col items-center gap-1 cursor-pointer py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-all text-xs font-semibold relative"
                >
                  <IconShare size={14} className="sm:w-4 sm:h-4" />
                  Share

                  {/* Share Menu Dropdown */}
                  {showSidebarShareMenu && (
                    <div ref={sidebarShareMenuRef} className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="p-2">
                        <p className="text-xs font-bold text-gray-500 px-3 py-2 font-[poppins]">Share this game</p>

                        {/* Social Media Options */}
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 font-[poppins]">Facebook</span>
                        </button>

                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 group-hover:text-sky-600 font-[poppins]">Twitter</span>
                        </button>

                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 group-hover:text-green-600 font-[poppins]">WhatsApp</span>
                        </button>

                        <button
                          onClick={() => handleShare('telegram')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 font-[poppins]">Telegram</span>
                        </button>

                        <button
                          onClick={() => handleShare('reddit')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-600 font-[poppins]">Reddit</span>
                        </button>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-2" />

                        {/* Copy Link */}
                        <button
                          onClick={handleCopyLink}
                          className=" cursor-pointer w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className=" cursor-pointer w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                            {copySuccess ? (
                              <IconCheck size={14} className="text-green-600" />
                            ) : (
                              <svg className=" cursor-pointer w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-semibold font-[poppins] ${copySuccess ? 'text-green-600' : 'text-gray-700 group-hover:text-gray-900'}`}>
                            {copySuccess ? 'Copied!' : 'Copy Link'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <motion.div
              ref={sidebarStatsRef}
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
              className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { icon: <IconStar size={14} className="sm:w-4 sm:h-4 text-orange-500" />, val: `${game.rating}/10`, label: 'Rating' },
                { icon: <IconUsers size={14} className="sm:w-4 sm:h-4 text-blue-500" />, val: game.votes || '0', label: 'Votes' },
                { icon: <IconDownload size={14} className="sm:w-4 sm:h-4 text-green-500" />, val: '50M+', label: 'Downloads' },
                { icon: <IconClock size={14} className="sm:w-4 sm:h-4 text-purple-500" />, val: game.released || 'N/A', label: 'Released' },
              ].map(({ icon, val, label }) => (
                <div key={label} className="flex flex-col gap-1 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl">
                  {icon}
                  <p className="font-black text-gray-900 font-[poppins] text-xs sm:text-sm mt-0.5 sm:mt-1">{val}</p>
                  <p className="text-xs text-gray-500 font-[poppins]">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Similar Games */}
            {similarGames.length > 0 && (
              <motion.div
                ref={similarGamesRef}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 font-[poppins]">Similar Games</h3>
                  <a href="/" className="text-xs text-orange-500 font-semibold hover:underline font-[poppins]">See all</a>
                </div>
                <div className="grid gap-2 sm:gap-3 grid-cols-2">
                  {similarGames.slice(0, 6).map((game) => (
                    <a
                      key={game.id}
                      href={`/game/${game.slug}`}
                      className="group relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer block"
                    >
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-white/10 group-hover:border-orange-400/60 transition-all duration-200 ease-out pointer-events-none z-10" />

                      <img
                        src={game.thumbnail || '/Images/911-prey_16x9-cover.jpg'}
                        alt={game.name || game.title || 'Game'}
                        className="w-full h-24 sm:h-28 object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-5" />

                      {/* Game Name - Center Bottom */}
                      <div className="absolute bottom-12 sm:bottom-8 left-2 sm:left-3 right-2 sm:right-3 z-20">
                        <h3 className="font-[poppins] text-xs sm:text-[10px] font-bold tracking-tight leading-tight group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 text-white drop-shadow-lg">
                          {game.name || game.title || 'Game'}
                        </h3>
                      </div>

                      {/* Rating Badge - Bottom Left */}
                      <div className="absolute bottom-2 sm:bottom-2.5 left-2 sm:left-3 flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 z-20">
                        <IconStar size={10} className="sm:w-3 sm:h-3 text-yellow-400 fill-yellow-400 " />
                        <span className="text-[7px] sm:text-xs font-semibold text-white font-[poppins]">{game.rating}</span>
                      </div>

                      {/* Players Badge - Bottom Right */}
                      <div className="absolute bottom-2 sm:bottom-2.5 right-2 sm:right-3 flex items-center gap-0.5 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 z-20">
                        <IconUsers size={10} className="sm:w-3 sm:h-3 text-orange-500" />
                        <span className="text-[9px] sm:text-xs text-gray-300 font-[poppins]">{game.players}</span>
                      </div>

                      {/* Play Button - Center on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out z-20">
                        <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-500/20 blur-xl animate-pulse" />

                        <div className="relative font-[poppins] bg-orange-500/90 backdrop-blur px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 text-white text-[10px] sm:text-xs font-semibold shadow-xl hover:scale-105 transition-transform duration-200">
                          <IconPlay size={12} className="sm:w-3 sm:h-3" />
                          Play
                        </div>
                      </div>

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-5">
                        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-orange-500/20 to-transparent" />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Platforms */}
            <motion.div
              ref={platformsRef}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="bg-white/60 rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <IconMonitor size={13} className="sm:w-3.75 sm:h-3.75 text-orange-500" />
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm font-[poppins]">Platforms</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {(game.platforms || ['Browser']).map((platform) => (
                  <div key={platform} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-[poppins]">
                    <div className="text-orange-400">
                      {platform.toLowerCase().includes('mobile') || platform.toLowerCase().includes('ios') || platform.toLowerCase().includes('android') ? (
                        <IconSmartphone size={12} className="sm:w-3.5 sm:h-3.5" />
                      ) : (
                        <IconMonitor size={12} className="sm:w-3.5 sm:h-3.5" />
                      )}
                    </div>
                    {platform}
                  </div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}






// 'use client'

// import { useState, useRef } from 'react'
// // import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import StarRating from '@/components/StarRating'
// import {
//   IconPlay, IconHeart, IconShare, IconThumbUp, IconThumbDown,
//   IconMaximize, IconGamepad, IconMonitor, IconSmartphone,
//   IconTag, IconCheck, IconInfo, IconChevronRight, IconUsers,
//   IconTrophy, IconClock, IconDownload, IconZap, IconStar,
// } from '@/components/Icons'

// /* ─── DATA ──────────────────────────────────────────── */
// const GAME = {
//   title: 'Bloxd.io',
//   developer: 'Arthur',
//   rating: 8.6,
//   votes: '1,400,526',
//   released: 'March 2021',
//   technology: 'HTML5',
//   platforms: ['Browser (desktop, mobile, tablet)', 'CrazyGames App (iOS, Android)', 'App Store (iOS, Android)'],
//   wiki: 'Fandom',
//   description: `Bloxd.io is an IO adventure game with Minecraft-style visuals where you can navigate obstacle courses, gather resources, craft tools, battle other players, and much more. With game modes ranging from parkour challenges and creative sandbox building to combat-based gameplay, there's something for every playstyle.`,
//   howToPlay: [
//     {
//       title: 'Gather wood first',
//       body: 'The best way to start playing Bloxd.io is to gather wood, your most essential early resource and useful even in caves. Kill sheep early to collect 3 wool and craft a bed, which gives you a 15-minute speed boost to help you explore faster.',
//     },
//     {
//       title: 'Build a workbench',
//       body: 'Follow this progression: gather wood and craft a workbench, then mine stone for a stone pickaxe. From there, find iron ore, smelt it in a furnace, and craft an iron pickaxe. You\'ll need at least iron to mine diamonds.',
//     },
//     {
//       title: 'Find diamonds',
//       body: 'Look for biomes with spiky black or carved stone formations — a strong indicator that diamonds are nearby. Check the tips and tops of the spike towers, not just the base. Skull-shaped structures sometimes contain chests worth looting.',
//     },
//   ],
//   gameModes: [
//     { name: 'BloxdHop.io', desc: 'Race to the end of the map before time runs out by hopping parkour-style across blocks of all shapes and sizes.' },
//     { name: 'DoodleCube', desc: 'Similar to Gartic.io, players build objects based on a given theme while others vote on how well they match it.' },
//     { name: 'EvilTower', desc: "Climb to the top of the Evil Tower using your parkour skills. Inspired by the Tower of Hell, it's a serious test of patience." },
//     { name: 'Peaceful', desc: 'A creative, pressure-free mode where you roam freely, collect resources, and build whatever you like.' },
//     { name: 'CubeWarfare', desc: 'Compete against other players in a third-person shooter where building blocks are part of the strategy.' },
//   ],
//   allModes: ['BloxdHop.io', 'DoodleCube', 'EvilTower', 'Peaceful', 'CubeWarfare', 'Survival', 'Creative', 'Bedwars', 'Sky Wars', 'OneBlock', 'Greenville', 'Hide and Seek', 'Murder Mystery', 'Plots', 'Pirates', 'Survival Royale', 'Worlds'],
//   tips: [
//     'Pickaxes in Bloxd.io have unlimited durability, so one iron pickaxe goes a long way',
//     'Use homes strategically — set one at your base and another near enemy bases or resource-rich areas',
//     'Avoid fighting mobs and players with unenchanted armor — you can take massive damage in a single hit',
//     "Don't hoard junk items; keep your inventory clean for valuable resources",
//   ],
//   features: [
//     'Explore fun, voxelated worlds for free in your web browser.',
//     'Play various game modes with different objectives.',
//     'Earn gold from your achievements and spend it in the store.',
//     'Join your friends in multiplayer games.',
//     'Customize your character with unique skins.',
//     'Regularly updated with new features and modes.',
//   ],
//   tags: [
//     { label: '.io', count: 121 },
//     { label: 'Meme & bloxy', count: 24 },
//     { label: 'Sandbox', count: 36 },
//     { label: 'Mobile', count: 1983 },
//     { label: 'Parkour', count: 52 },
//     { label: 'Minecraft', count: 78 },
//     { label: 'Jumping', count: 146 },
//     { label: 'Third Person Shooter', count: 76 },
//     { label: 'Building', count: 180 },
//     { label: 'With Friends', count: 131 },
//     { label: 'Multiplayer', count: 335 },
//     { label: 'Block', count: 95 },
//   ],
// }

// const SIMILAR_GAMES = [
//   { name: 'Minecraft', tag: 'Sandbox', rating: 4.9, players: '3.5k', bg: 'from-green-600 to-green-800' },
//   { name: 'Roblox', tag: '.io', rating: 4.7, players: '2.8k', bg: 'from-blue-600 to-blue-800' },
//   { name: 'Surviv.io', tag: 'Battle Royale', rating: 4.5, players: '1.2k', bg: 'from-orange-500 to-orange-700' },
//   { name: 'Krunker.io', tag: 'FPS', rating: 4.6, players: '1.9k', bg: 'from-red-600 to-red-800' },
//   { name: 'ZombsRoyale', tag: 'Battle Royale', rating: 4.4, players: '900', bg: 'from-purple-600 to-purple-800' },
//   { name: 'Moomoo.io', tag: 'Sandbox', rating: 4.3, players: '750', bg: 'from-yellow-500 to-yellow-700' },
// ]

// const TABS = ['All', 'Overview', 'Gameplay', ]

// const CONTROLS = [
//   { key: 'WASD / Arrow Keys', action: 'Move character' },
//   { key: 'Mouse', action: 'Look around / Aim' },
//   { key: 'Left Click', action: 'Attack / Mine / Place block' },
//   { key: 'Right Click', action: 'Use item / Open menu' },
//   { key: 'Space', action: 'Jump' },
//   { key: 'Shift', action: 'Sneak / Sprint' },
//   { key: 'E', action: 'Open inventory' },
//   { key: 'Q', action: 'Drop item' },
//   { key: 'F', action: 'Toggle flashlight' },
//   { key: 'Esc', action: 'Pause / Menu' },
// ]

// /* ─── COMPONENT ──────────────────────────────────────── */
// export default function GameDetailPage() {
//   const [activeTab, setActiveTab] = useState('All')
//   const [liked, setLiked] = useState(false)
//   const [wishlisted, setWishlisted] = useState(false)
//   const [isFullscreen, setIsFullscreen] = useState(false)
//   const gameContainerRef = useRef<HTMLDivElement>(null)

//   // Handle fullscreen toggle
//   const handleFullscreen = () => {
//     if (!gameContainerRef.current) return

//     if (!document.fullscreenElement) {
//       gameContainerRef.current.requestFullscreen().then(() => {
//         setIsFullscreen(true)
//       }).catch((err) => {
//         console.error('Error attempting to enable fullscreen:', err)
//       })
//     } else {
//       document.exitFullscreen().then(() => {
//         setIsFullscreen(false)
//       })
//     }
//   }

//   // Handle tab click with smooth scroll
//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab)

//     if (tab !== 'All') {
//       // Add delay to ensure DOM is ready
//       setTimeout(() => {
//         const sectionId = `section-${tab.toLowerCase()}`
//         const element = document.getElementById(sectionId)
//         if (element) {
//           const offset = 160 // Offset from top for sticky header + tabs (64px header + 72px categories + 24px padding)
//           const elementPosition = element.getBoundingClientRect().top + window.scrollY
//           window.scrollTo({
//             top: elementPosition - offset,
//             behavior: 'smooth'
//           })
//         }
//       }, 100)
//     } else {
//       // Scroll to top when "All" is clicked
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* <Navbar /> */}

//       <main className=" px-4 py-5 bg-[#E8E9ED]">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1.5 text-xs font-[poppins] text-gray-500 mb-4 flex-wrap">
//           {['Games', '.io', 'Adventure', 'Minecraft', 'Bloxd.io'].map((crumb, i, arr) => (
//             <span key={crumb} className="flex items-center gap-1.5">
//               <a href="#" className={`hover:text-orange-500 transition-colors ${i === arr.length - 1 ? 'text-orange-500 font-semibold' : ''}`}>{crumb}</a>
//               {i < arr.length - 1 && <IconChevronRight size={10} className="text-gray-400" />}
//             </span>
//           ))}
//         </nav>

//         <div className="flex gap-5 items-start">
//           {/* ═══ LEFT: MAIN COLUMN ═══ */}
//           <div className="flex-1 min-w-100px flex flex-col gap-4">

//             {/* ── GAME PLAYER ── */}
//             <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
//               {/* Login warning */}
//               {/* <div className="bg-red-900/60 border-b border-red-800 px-4 py-2.5 flex items-center justify-between">
//                 <span className="text-red-200 text-xs font-medium">Your progress won't be saved!</span>
//                 <div className="flex gap-2">
//                   <button className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors">Close</button>
//                   <button className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors">Log in</button>
//                 </div>
//               </div> */}

//               {/* iframe */}
//               <div className="relative bg-gray-950" style={{ paddingBottom: '56.25%' }}>
//                 <iframe
//                   src="about:blank"
//                   className="absolute inset-0 w-full h-full border-0"
//                   allowFullScreen
//                   title="Bloxd.io"
//                 />
//                 {/* Loading overlay */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 gap-4">
//                   <div className="w-20 h-20 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
//                     <IconGamepad size={36} className="text-orange-500" />
//                   </div>
//                   <p className="text-white font-bold text-base">Bloxd.io</p>
//                   <div className="w-64">
//                     <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
//                       <div className="bg-orange-500 h-1.5 rounded-full w-2/3 animate-pulse" />
//                     </div>
//                     <p className="text-gray-500 text-xs text-center mt-2">Loading assets...</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Controls bar */}
//               <div className="px-4 py-3 flex items-center justify-between bg-gray-900">
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center">
//                     <IconGamepad size={14} className="text-orange-500" />
//                   </div>
//                   <span className="text-white font-bold text-sm font-[poppins]">Bloxd.io</span>
//                   {/* <div className="flex items-center gap-0.5 ml-2">
//                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
//                     <span className="text-green-400 text-[10px] font-semibold">LIVE</span>
//                   </div> */}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setLiked(!liked)}
//                     className=" cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
//                   >
//                     <IconThumbUp size={14} className={liked ? 'text-orange-400' : 'text-gray-400 group-hover:text-white'} />
//                     <span className={`text-xs font-semibold ${liked ? 'text-orange-400' : 'text-gray-300'}`}>1.2M</span>
//                   </button>
//                   <button className="w-8 h-8 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
//                     <IconThumbDown size={14} className="text-gray-400" />
//                   </button>
//                   <button
//                     onClick={() => setWishlisted(!wishlisted)}
//                     className="w-8 h-8 cursor-pointer  rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
//                   >
//                     <IconHeart size={14} className={wishlisted ? 'text-red-400 fill-red-400' : 'text-gray-400'} filled={wishlisted} />
//                   </button>
//                   <button className="w-8 h-8 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
//                     <IconMonitor size={14} className="text-gray-400" />
//                   </button>
//                   <button className="w-8 h-8 cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
//                     <IconMaximize size={14} className="text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ── MOBILE CTA ── */}
//             {/* <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-4 flex items-center gap-4">
//               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
//                 <IconSmartphone size={22} className="text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-white font-bold text-sm font-[poppins] ">Play 2000+ games <span className="text-purple-200">on mobile</span>, no installs needed</p>
//               </div>
//               <button className="shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
//                 <IconChevronRight size={14} className="text-white" />
//               </button>
//             </div> */}

//             {/* ── GAME TITLE + META ── */}
//             <div className="bg-white/60  rounded-2xl border border-gray-200 p-5">
//               <div className="flex items-start justify-between gap-4 mb-4">
//                 <div>
//                   <h1 className="text-2xl font-black text-gray-900 mb-1 font-[poppins]">{GAME.title}</h1>
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <button className=" cursor-pointer flex font-[poppins] items-center gap-1.5 bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
//                       <IconShare size={12} />Share
//                     </button>
//                   </div>
//                 </div>
//                 {/* <button
//                   onClick={() => setWishlisted(!wishlisted)}
//                   className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${wishlisted ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-orange-500 hover:bg-orange-600 text-white'
//                     }`}
//                 >
//                   <IconHeart size={15} filled={wishlisted} />
//                   {wishlisted ? 'Wishlisted' : 'Wishlist'}
//                 </button> */}
//               </div>

//               {/* Metadata grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-gray-100">
//                 {[
//                   ['Developer', <a href="#" key="dev" className="text-orange-500 hover:underline font-semibold">{GAME.developer}</a>],
//                   ['Rating', (
//                     <span key="rat" className="flex items-center gap-2">
//                       <span className="font-bold text-gray-900 font-[poppins]">{GAME.rating}</span>
//                       <StarRating value={Math.round(GAME.rating / 2)} size={12} />
//                       <span className="text-gray-400 text-xs font-[poppins]">({GAME.votes} votes)</span>
//                     </span>
//                   )],
//                   ['Released', <span key="rel" className="font-semibold">{GAME.released}</span>],
//                   ['Technology', <span key="tech" className="font-semibold">{GAME.technology}</span>],
//                   ['Platforms', <span key="plat" className="text-xs leading-relaxed">{GAME.platforms.join(', ')}</span>],
//                   ['Wiki pages', <a href="#" key="wiki" className="text-orange-500 hover:underline font-semibold">{GAME.wiki}</a>],
//                 ].map(([label, value]) => (
//                   <div key={String(label)} className="flex items-start gap-3 py-3 sm:odd:pr-6 sm:even:pl-6 sm:odd:border-r sm:odd:border-gray-100">
//                     <span className="text-xs text-gray-600 w-24 shrink-0 pt-0.5 font-[poppins]">{label}:</span>
//                     <span className="text-sm text-gray-700 flex-1 font-[poppins]">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ── TAGS ── */}
//             <div className="bg-white/60 rounded-2xl border border-gray-200 p-5">
//               <div className="flex items-center gap-2 mb-4">
//                 <IconTag size={16} className="text-orange-500" />
//                 <h2 className="font-bold text-gray-900 font-[poppins]">Categories & Tags</h2>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {GAME.tags.map(({ label, count }) => (
//                   <button
//                     key={label}
//                     className=" font-[poppins] inline-flex items-center gap-1.5 bg-gray-100 cursor-pointer hover:bg-orange-50 hover:text-orange-600 text-gray-700 text-sm font-semibold px-3.5 py-1.5 rounded-full transition-colors border border-transparent hover:border-orange-200"
//                   >
//                     {label}
//                     <span className=" font-[poppins] text-xs text-gray-500 font-normal">{count}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* ── TABS ── */}
//             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-[72px] ">
//               <div className="flex border-b border-gray-100 px-2 pt-2 gap-1">
//                 {TABS.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => handleTabClick(tab)}
//                     className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all cursor-pointer ${activeTab === tab
//                       ? 'bg-orange-500 text-white'
//                       : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
//                       }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Content Sections */}
//             <div className="space-y-6">
//               {/* OVERVIEW - Always show all sections */}
//               <div id="section-overview" className="bg-white/60 rounded-2xl border border-gray-200 p-5 scroll-mt-32">
//                 <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-1 h-6 bg-orange-500 rounded-full font-[poppins]"></span>
//                   Overview
//                 </h2>
//                 <div className="space-y-6">
//                   {/* Description */}
//                   <div>
//                     <p className="text-gray-600 text-sm leading-relaxed font-[poppins]">{GAME.description}</p>
//                   </div>

//                   {/* How to Play */}
//                   <div>
//                     <h2 className="text-lg font-black text-gray-900 mb-4 font-[poppins]">How to Play {GAME.title}</h2>
//                     <div className="space-y-4">
//                       {GAME.howToPlay.map(({ title, body }, i) => (
//                         <div key={i} className="flex gap-4">
//                           <div className="w-7 h-7 rounded-lg bg-orange-500  text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
//                             {i + 1}
//                           </div>
//                           <div>
//                             <p className="text-sm font-bold text-gray-800 mb-1 font-[poppins]">{title}</p>
//                             <p className="text-sm text-gray-500 leading-relaxed font-[poppins]">{body}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Game Modes */}
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-3 font-[poppins]">Game Modes</h3>
//                     <div className="space-y-3">
//                       {GAME.gameModes.map(({ name, desc }) => (
//                         <div key={name} className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-orange-200 cursor-pointer hover:bg-orange-50/40 transition-colors">
//                           <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-2" />
//                           <div>
//                             <span className="text-sm font-bold text-gray-900 font-[poppins]">{name}</span>
//                             <span className="text-sm text-gray-500 font-[poppins]">: {desc}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* <p className="text-sm text-gray-500 mt-3 leading-relaxed font-[poppins]">
//                       Bloxd.io is regularly updated with new features and modes. Other available modes include:
//                     </p> */}
//                     {/* <div className="flex flex-wrap gap-2 mt-2">
//                       {GAME.allModes.slice(5).map((mode) => (
//                         <span key={mode} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-[poppins]">{mode}</span>
//                       ))}
//                     </div> */}
//                   </div>

//                   {/* Tips */}
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-3 font-[poppins]">Tips</h3>
//                     <div className="space-y-2">
//                       {GAME.tips.map((tip, i) => (
//                         <div key={i} className="flex items-start gap-2.5 text-sm font-[poppins]">
//                           <IconCheck size={14} className="text-orange-500 shrink-0 mt-0.5" />
//                           <span className="text-gray-600" dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Features */}
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-3 font-[poppins]">Features</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       {GAME.features.map((feat, i) => (
//                         <div key={i} className="flex items-start gap-2.5 text-sm p-3 bg-white rounded-xl border border-gray-100 font-[poppins]">
//                           <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
//                             <IconCheck size={10} className="text-orange-600" />
//                           </div>
//                           <span className="text-gray-600">{feat}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* More games like this */}
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-2 font-[poppins]">More Games Like This</h3>
//                     <p className="text-sm text-gray-500 mb-1 font-[poppins]">
//                       Although Bloxd.io is a unique game that provides endless entertainment, there are similar titles to check out when you&apos;re finished playing. Other{' '}
//                       <a href="#" className="text-orange-500 hover:underline font-semibold">IO games</a> like this include{' '}
//                       <a href="#" className="text-orange-500 hover:underline">Grow A Garden</a>,{' '}
//                       <a href="#" className="text-orange-500 hover:underline">Shell Shockers</a>,{' '}
//                       <a href="#" className="text-orange-500 hover:underline">Survey.io</a>, and more.
//                     </p>
//                   </div>
//                 </div>
//               </div>


//               {/* GAMEPLAY - Always show */}
//               <div id="section-gameplay" className="bg-white/60 rounded-2xl border border-gray-200 p-5 scroll-mt-32">
//                 <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-1 h-6 bg-orange-500 rounded-full font-[poppins]"></span>
//                   Gameplay
//                 </h2>
//                 <div>
//                   <h2 className="text-lg font-black text-gray-900 mb-5 font-[poppins]">Controls & Key Bindings</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {CONTROLS.map(({ key, action }) => (
//                       <div key={key} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
//                         <span className=" font-[poppins] inline-flex items-center justify-center bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-700 shadow-sm min-w-[64px] text-center shrink-0" style={{ boxShadow: '0 2px 0 #d1d5db' }}>
//                           {key}
//                         </span>
//                         <span className="text-sm text-gray-600 font-[poppins]">{action}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>


//               {/* REVIEWS - Always show */}
//               {/* <div id="section-reviews" className="bg-white rounded-2xl border border-gray-200 p-5 scroll-mt-32">
//                 <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
//                   Reviews
//                 </h2>
//                 <div>
//                   <div className="flex items-center gap-6 mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
//                     <div className="text-center">
//                       <p className="text-4xl font-black text-orange-500">{GAME.rating}</p>
//                       <StarRating value={Math.round(GAME.rating / 2)} size={14} />
//                       <p className="text-xs text-gray-400 mt-1">{GAME.votes} votes</p>
//                     </div>
//                     <div className="w-px h-16 bg-orange-200" />
//                     <div className="flex-1 space-y-1.5">
//                       {[
//                         { label: '9-10', pct: 68 },
//                         { label: '7-8', pct: 20 },
//                         { label: '5-6', pct: 8 },
//                         { label: '1-4', pct: 4 },
//                       ].map(({ label, pct }) => (
//                         <div key={label} className="flex items-center gap-2">
//                           <span className="text-xs text-gray-500 w-8 shrink-0">{label}</span>
//                           <div className="flex-1 h-2 bg-orange-100 rounded-full overflow-hidden">
//                             <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
//                           </div>
//                           <span className="text-xs text-gray-400 w-8">{pct}%</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-500 text-center">Sign in to leave a review.</p>
//                 </div>
//               </div> */}


//               {/* MEDIA - Always show */}
//               {/* <div id="section-media" className="bg-white rounded-2xl border border-gray-200 p-5 scroll-mt-32">
//                 <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
//                   Media
//                 </h2>
//                 <div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {['from-green-600 to-green-900', 'from-blue-600 to-blue-900', 'from-purple-600 to-purple-900', 'from-orange-500 to-red-700'].map((g, i) => (
//                       <div key={i} className={`relative h-36 rounded-xl bg-gradient-to-br ${g} overflow-hidden cursor-pointer group`}>
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-all">
//                           <IconMaximize size={22} className="text-white" />
//                         </div>
//                         <span className="absolute bottom-2 left-3 text-white/60 text-[10px] font-semibold">Screenshot {i + 1}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div> */}

//             </div>

//           </div>

//           {/* ═══ RIGHT: SIDEBAR ═══ */}
//           <aside className="w-[450px] shrink-0 flex flex-col gap-4">

//             {/* Play button card */}
//             <div className=" bg-white/60 rounded-2xl border border-gray-200 p-4">
//               <button className="w-full flex items-center justify-center gap-2 bg-orange-500 cursor-pointer hover:bg-orange-600 font-[poppins]  text-white font-black text-base py-3.5 rounded-xl transition-all shadow-sm shadow-orange-200 active:scale-95 mb-3">
//                 <IconPlay size={18} />
//                 Play Now
//               </button>
//               <div className="grid grid-cols-3 gap-2">
//                 <button
//                   onClick={() => setLiked(!liked)}
//                   className={`flex flex-col cursor-pointer items-center gap-1 py-2.5 rounded-xl border transition-all text-xs font-semibold ${liked ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-orange-200 hover:text-orange-500'}`}
//                 >
//                   <IconThumbUp size={16} />
//                   Like
//                 </button>
//                 <button
//                   onClick={() => setWishlisted(!wishlisted)}
//                   className={`flex flex-col items-center  cursor-pointer gap-1 py-2.5 rounded-xl border transition-all text-xs font-semibold ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'}`}
//                 >
//                   <IconHeart size={16} filled={wishlisted} />
//                   {wishlisted ? 'Saved' : 'Save'}
//                 </button>
//                 <button className="flex flex-col items-center gap-1 cursor-pointer py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-all text-xs font-semibold">
//                   <IconShare size={16} />
//                   Share
//                 </button>
//               </div>
//             </div>

//             {/* Quick stats */}
//             <div className="bg-white/60 rounded-2xl border border-gray-200 p-4 grid grid-cols-2 gap-3">
//               {[
//                 { icon: <IconStar size={16} className="text-orange-500" />, val: `${GAME.rating}/10`, label: 'Rating' },
//                 { icon: <IconUsers size={16} className="text-blue-500" />, val: '1.4M+', label: 'Votes' },
//                 { icon: <IconDownload size={16} className="text-green-500" />, val: '50M+', label: 'Downloads' },
//                 { icon: <IconClock size={16} className="text-purple-500" />, val: 'Mar 2021', label: 'Released' },
//               ].map(({ icon, val, label }) => (
//                 <div key={label} className="flex flex-col gap-1 p-3 bg-white rounded-xl">
//                   {icon}
//                   <p className="font-black text-gray-900 font-[poppins] text-sm mt-1">{val}</p>
//                   <p className="text-xs text-gray-500 font-[poppins] ">{label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Promo banner */}
//             {/* <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-4 relative overflow-hidden">
//               <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/30 rounded-full" />
//               <p className="text-white font-black text-sm leading-snug mb-2 relative">
//                 Play 100+ games online with <span className="text-purple-200">your friends</span>
//               </p>
//               <button className="relative w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
//                 <IconChevronRight size={14} className="text-white" />
//               </button>
//             </div> */}

//             {/* Similar Games */}
//             <div className="bg-white/60 rounded-2xl border border-gray-200 p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-bold text-gray-900 font-[poppins] ">Similar Games</h3>
//                 <a href="#" className="text-xs text-orange-500 font-semibold hover:underline font-[poppins] ">See all</a>
//               </div>
//               <div className="grid gap-3 grid-cols-2">
//                 {SIMILAR_GAMES.map((game) => (
//                   <a
//                     key={game.name}
//                     href="#"
//                     className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
//                   >
//                     <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.bg} flex items-center justify-center shrink-0`}>
//                       <IconGamepad size={24} className="text-white/80" />
//                     </div>
//                     <div className="flex-1 min-w-0 text-center w-full">
//                       <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-900 transition-colors truncate font-[poppins] ">{game.name}</p>
//                       <div className="flex items-center justify-center gap-1.5 mt-1">
//                         <StarRating value={Math.round(game.rating)} size={10} />
//                         <span className="text-xs text-gray-400 font-[poppins] ">{game.rating}</span>
//                       </div>
//                       <div className="flex flex-col items-center gap-1 mt-1">
//                         <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full font-[poppins] ">{game.tag}</span>
//                         <span className="text-[10px] text-gray-400 font-[poppins] ">{game.players} playing</span>
//                       </div>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Last updated */}
//             <div className="bg-white/60 rounded-2xl border border-gray-200 p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <IconClock size={15} className="text-orange-500" />
//                 <h3 className="font-bold text-gray-900 text-sm font-[poppins]">Update Info</h3>
//               </div>
//               <div className="space-y-2.5">
//                 {[
//                   ['Version', 'v2.5.1'],
//                   ['Last Update', 'Jan 15, 2025'],
//                   ['Published', 'March 2021'],
//                   ['Status', 'Active development'],
//                 ].map(([label, val]) => (
//                   <div key={String(label)} className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 text-xs font-[poppins] tracking-wide font-semibold  ">{label}</span>
//                     <span className={`font-semibold text-xs ${label === 'Last Update' ? 'text-orange-500 font-[poppins]' : 'text-gray-700 font-[poppins]'}`}>{val}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Platforms */}
//             <div className="bg-white/60 rounded-2xl border border-gray-200 p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <IconMonitor size={15} className="text-orange-500" />
//                 <h3 className="font-bold text-gray-900 text-sm font-[poppins]">Platforms</h3>
//               </div>
//               <div className="space-y-2">
//                 {[
//                   { icon: <IconMonitor size={14} />, label: 'Browser (Desktop)' },
//                   { icon: <IconSmartphone size={14} />, label: 'Browser (Mobile)' },
//                   { icon: <IconSmartphone size={14} />, label: 'iOS App Store' },
//                   { icon: <IconSmartphone size={14} />, label: 'Android (Play Store)' },
//                 ].map(({ icon, label }) => (
//                   <div key={label} className="flex items-center gap-2.5 text-[13px] text-gray-700 font-[poppins]">
//                     <div className="text-orange-400">{icon}</div>
//                     {label}
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </aside>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }

