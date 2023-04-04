import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const likeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ id: z.string(), authorEmail: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.authorEmail,
        },
      })

      if (!user) throw new Error('INTERNAL SERVER ERROR: User does not exist')

      const tweet = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likes: true,
        },
      })

      if (!tweet) throw new Error('INTERNAL SERVER ERROR: Tweet does not exist')

      if (tweet.likes.some(like => like.authorId === user.id)) {
        throw new Error('INTERNAL SERVER ERROR: Current user already liked this tweet')
      }

      const tweetLike = await ctx.prisma.tweetLike.create({
        data: {
          authorId: user.id,
          tweetId: input.id,
        },
      })

      return tweetLike
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string(), authorEmail: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.authorEmail,
        },
      })

      if (!user) throw new Error('INTERNAL SERVER ERROR: User does not exist')

      const tweet = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likes: true,
        },
      })

      if (!tweet) throw new Error('INTERNAL SERVER ERROR: Tweet does not exist')

      const tweeLike = tweet.likes.find(like => like.authorId === user.id)

      if (!tweeLike) {
        throw new Error('INTERNAL SERVER ERROR: Current user didnt like this tweet')
      }

      const tweetLikeId = await ctx.prisma.tweetLike.delete({
        where: {
          id: tweeLike.id,
        },
      })

      return tweetLikeId
    }),
})
