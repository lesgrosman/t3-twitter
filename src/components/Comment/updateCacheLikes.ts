import { Comment, CommentLike } from '@/utils/types'
import { QueryClient } from '@tanstack/react-query'

export const updateCacheCommentLikes = ({
  client,
  variables,
  data,
  action,
  tweetId,
}: {
  client: QueryClient
  variables: {
    id: string
  }
  data: CommentLike
  tweetId: string
  action: 'like' | 'unlike'
}) => {
  client.setQueryData(
    [
      ['tweet', 'getById'],
      {
        input: {
          id: tweetId,
        },
        type: 'query',
      },
    ],
    (oldData: any) => {
      const newComments = oldData?.tweet?.comments?.map((comment: Comment) => {
        if (comment.id === variables.id) {
          if (action === 'like') {
            return {
              ...comment,
              likes: [data, ...comment.likes],
            }
          } else {
            const unlikeIndex = comment.likes
              .map((like: CommentLike) => like.commentId)
              .indexOf(variables.id)
            const newLikes = [
              ...comment.likes.slice(0, unlikeIndex),
              ...comment.likes.slice(unlikeIndex + 1),
            ]

            return {
              ...comment,
              likes: newLikes,
            }
          }
        } else {
          return comment
        }
      })
      return {
        tweet: {
          ...oldData?.tweet,
          comments: newComments,
        },
      }
    }
  )
}
