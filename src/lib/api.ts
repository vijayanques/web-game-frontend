// API utility functions for game-related operations

import type {
  GameDetail,
  SimilarGame,
  GetGameBySlugResponse,
  GetGamesResponse,
  TrackActivityRequest,
  TrackActivityResponse,
  GetUserActivityResponse
} from '@/types/game'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Fetch game details by slug
 */
export async function getGameBySlug(slug: string): Promise<GameDetail> {
  const response = await fetch(`${API_URL}/api/games/${slug}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Game not found')
    }
    throw new Error('Failed to fetch game data')
  }

  const data: GetGameBySlugResponse = await response.json()
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch game data')
  }

  return data.data
}

/**
 * Fetch similar games based on category
 */
export async function getSimilarGames(
  categoryId: number,
  excludeId?: number,
  limit: number = 6
): Promise<SimilarGame[]> {
  const params = new URLSearchParams({
    category: categoryId.toString(),
    limit: limit.toString(),
    ...(excludeId && { exclude: excludeId.toString() })
  })

  const response = await fetch(`${API_URL}/api/games?${params}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    console.error('Failed to fetch similar games')
    return []
  }

  const data: GetGamesResponse = await response.json()
  return data.data || []
}

/**
 * Search games by title
 */
export async function searchGames(
  query: string,
  limit: number = 10
): Promise<SimilarGame[]> {
  const params = new URLSearchParams({
    search: query,
    limit: limit.toString()
  })

  const response = await fetch(`${API_URL}/api/games?${params}`, {
    next: { revalidate: 60 } // Cache for 1 minute
  })

  if (!response.ok) {
    console.error('Failed to search games')
    return []
  }

  const data: GetGamesResponse = await response.json()
  return data.data || []
}

/**
 * Track user activity (game play)
 */
export async function trackGamePlay(
  userId: number,
  gameId: number,
  categoryId: number
): Promise<boolean> {
  try {
    const body: TrackActivityRequest = {
      userId,
      gameId,
      categoryId
    }

    const response = await fetch(`${API_URL}/api/user-activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      console.error('Failed to track activity')
      return false
    }

    const data: TrackActivityResponse = await response.json()
    return data.success
  } catch (error) {
    console.error('Error tracking activity:', error)
    return false
  }
}

/**
 * Get user activity history
 */
export async function getUserActivity(
  userId: number,
  limit: number = 50
): Promise<GetUserActivityResponse> {
  const params = new URLSearchParams({
    userId: userId.toString()
  })

  const response = await fetch(`${API_URL}/api/user-activity?${params}`, {
    next: { revalidate: 60 } // Cache for 1 minute
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user activity')
  }

  return response.json()
}

/**
 * Get all games with optional filters
 */
export async function getGames(options?: {
  category?: number
  limit?: number
  search?: string
}): Promise<SimilarGame[]> {
  const params = new URLSearchParams()
  
  if (options?.category) params.append('category', options.category.toString())
  if (options?.limit) params.append('limit', options.limit.toString())
  if (options?.search) params.append('search', options.search)

  const response = await fetch(`${API_URL}/api/games?${params}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    console.error('Failed to fetch games')
    return []
  }

  const data: GetGamesResponse = await response.json()
  return data.data || []
}

/**
 * Prefetch game data for faster navigation
 */
export function prefetchGame(slug: string): void {
  // This will trigger Next.js to prefetch the data
  fetch(`${API_URL}/api/games/${slug}`, {
    method: 'HEAD'
  }).catch(() => {
    // Silently fail - prefetch is optional
  })
}
