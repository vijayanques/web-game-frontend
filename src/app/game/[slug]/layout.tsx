import { generateMetadata } from './metadata'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export { generateMetadata }

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
