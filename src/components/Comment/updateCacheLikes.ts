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
          return {
            ...comment,
            likes:
              action === 'like'
                ? [...comment.likes, data]
                : comment.likes.filter((like: CommentLike) => like.commentId !== variables.id),
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
