// Game-related TypeScript types

export interface Game {
  id: number
  title: string
  slug: string
  description: string
  thumbnail: string
  game_url: string
  iframe_url?: string
  rating: number
  votes: string
  category: string
  category_id: number
  category_slug?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GameDetail extends Game {
  developer: string
  released: string
  technology: string
  platforms: string[]
  wiki?: string
  howToPlay?: HowToPlayStep[]
  gameModes?: GameMode[]
  tips?: string[]
  features?: string[]
  tags?: Tag[]
  controls?: Control[]
}

export interface HowToPlayStep {
  title: string
  body: string
}

export interface GameMode {
  name: string
  desc: string
}

export interface Tag {
  label: string
  count: number
}

export interface Control {
  key: string
  action: string
}

export interface SimilarGame {
  id: number
  name: string
  slug: string
  tag: string
  rating: number
  players: string
  thumbnail: string
  url: string
  bg?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  created_at: string
}

export interface UserActivity {
  id: number
  user_id: number
  game_id: number
  category_id: number
  played_at: string
  game_name?: string
  game_slug?: string
  category_name?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  count?: number
}

// API Request/Response types
export interface GetGameBySlugResponse extends ApiResponse<GameDetail> {}
export interface GetGamesResponse extends ApiResponse<SimilarGame[]> {}
export interface TrackActivityRequest {
  userId: number
  gameId: number
  categoryId: number
}
export interface TrackActivityResponse extends ApiResponse<null> {}
export interface GetUserActivityResponse extends ApiResponse<UserActivity[]> {}
