import { createTRPCRouter } from '@/server/api/trpc'
import { likeRouter } from './routers/like'
import { tweetRouter } from './routers/tweet'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tweet: tweetRouter,
  like: likeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
