import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    })

    return {
      tweets,
    }
  }),

  getMy: protectedProcedure
    .input(z.object({ authorEmail: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.authorEmail,
        },
      })

      if (!user) return null

      const tweets = await ctx.prisma.tweet.findMany({
        where: {
          authorId: user.id,
        },
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      })

      return {
        tweets,
      }
    }),

  create: protectedProcedure
    .input(z.object({ authorEmail: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.authorEmail,
        },
      })

      if (!user) return null

      const tweet = await ctx.prisma.tweet.create({
        data: {
          authorId: user.id,
          content: input.content,
        },
      })

      return {
        tweet,
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      })

      return {
        tweet,
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tweetId = await ctx.prisma.tweet.delete({
        where: {
          id: input.id,
        },
      })

      return {
        tweetId,
      }
    }),
})
