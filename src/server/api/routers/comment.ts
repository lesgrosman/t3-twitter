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
    })

    return {
      comments,
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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
