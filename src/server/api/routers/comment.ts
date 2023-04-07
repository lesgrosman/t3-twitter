import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const comments = await ctx.prisma.comment.findMany({
      where: {
        tweetId: input.id,
      },
      include: {
        author: true,
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
      comments,
    }
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const comment = await ctx.prisma.comment.findUnique({
      where: {
        id: input.id,
      },
      include: {
        author: true,
      },
    })

    if (!comment) throw new Error('INTERNAL_SERVER_ERROR: Comment does not exist')

    return {
      comment,
    }
  }),

  create: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || '',
        },
      })

      if (!user) throw new Error('INTERNAL_SERVER_ERROR: Unauthorized')

      const comment = await ctx.prisma.comment.create({
        data: {
          tweetId: input.id,
          content: input.content,
          authorId: user.id,
        },
      })

      return {
        comment,
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      })

      return {
        comment,
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx
      await prisma.$transaction([
        prisma.commentLike.deleteMany({
          where: {
            commentId: input.id,
          },
        }),
      ])
      const commentId = await ctx.prisma.comment.delete({
        where: {
          id: input.id,
        },
      })

      return {
        commentId,
      }
    }),
})
