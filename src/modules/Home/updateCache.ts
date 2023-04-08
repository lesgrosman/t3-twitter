import { QueryClient } from '@tanstack/react-query'
import { Tweet, TweetLike } from '@/utils/types'

export const updateCache = ({
  client,
  variables,
  data,
  action,
}: {
  client: QueryClient
  variables: {
    id: string
  }
  data: TweetLike
  action: 'like' | 'unlike'
}) => {
  client.setQueryData(
    [
      ['tweet', 'getAll'],
      {
        type: 'query',
      },
    ],
    (oldData?: { tweets?: Tweet[] }) => {
      const newTweets = oldData?.tweets?.map((tweet: Tweet) => {
        if (tweet.id === variables.id) {
          return {
            ...tweet,
            likes:
              action === 'like'
                ? [...tweet.likes, data]
                : tweet.likes.filter((like: TweetLike) => like.tweetId !== variables.id),
          }
        }
        return tweet
      })
      return {
        tweets: newTweets,
      }
    }
  )
}
