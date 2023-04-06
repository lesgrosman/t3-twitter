import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      include: {
        author: true,
        comments: true,
        likes: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      tweets,
    }
  }),

  getLiked: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.session.user.email || '',
      },
    })

    if (!user) throw new Error('INTERNAL_SERVER_ERROR: Unauthorized')

    const tweetLikes = await ctx.prisma.tweetLike.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        tweet: {
          include: {
            author: true,
            comments: true,
            likes: {
              include: {
                author: true,
              },
            },
          },
        },
      },
    })

    return {
      tweets: tweetLikes.map(like => like.tweet),
    }
  }),

  getMy: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.session.user.email || '',
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
        likes: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      tweets,
    }
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const tweet = await ctx.prisma.tweet.findUnique({
      where: {
        id: input.id,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            likes: {
              include: {
                author: true,
              },
            },
          },
        },
        likes: {
          include: {
            author: true,
          },
        },
      },
    })

    if (!tweet) throw new Error('INTERNAL_SERVER_ERROR: Tweet does not exist')

    return {
      tweet,
    }
  }),

  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || '',
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
