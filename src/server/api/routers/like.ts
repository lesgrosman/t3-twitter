import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const likeRouter = createTRPCRouter({
  likeTweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || '',
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
        include: {
          author: true,
        },
      })

      return tweetLike
    }),

  unlikeTweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || '',
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

      const removedTweetLike = await ctx.prisma.tweetLike.delete({
        where: {
          id: tweeLike.id,
        },
        include: {
          author: true,
        },
      })

      return removedTweetLike
    }),

  likeComment: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || '',
        },
      })

      if (!user) throw new Error('INTERNAL SERVER ERROR: Unauthorized')

      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likes: true,
        },
      })

      if (!comment) throw new Error('INTERNAL SERVER ERROR: Comment does not exist')

      if (comment.likes.some(like => like.authorId === user.id)) {
        throw new Error('INTERNAL SERVER ERROR: Current user already liked this comment')
      }

      const commentLike = await ctx.prisma.commentLike.create({
        data: {
          authorId: user.id,
          commentId: input.id,
        },
        include: {
          author: true,
        },
      })

      return commentLike
    }),

  unlikeComment: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || '',
        },
      })

      if (!user) throw new Error('INTERNAL SERVER ERROR: User does not exist')

      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likes: true,
        },
      })

      if (!comment) throw new Error('INTERNAL SERVER ERROR: Comment does not exist')

      const commentLike = comment.likes.find(like => like.authorId === user.id)

      if (!commentLike) {
        throw new Error('INTERNAL SERVER ERROR: Current user didnt like this comment')
      }

      const removedCommentLike = await ctx.prisma.commentLike.delete({
        where: {
          id: commentLike.id,
        },
        include: {
          author: true,
        },
      })

      return removedCommentLike
    }),
})
