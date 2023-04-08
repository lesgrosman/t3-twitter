import { QueryClient } from '@tanstack/react-query'
import { TimelineQueryKey, Tweet, TweetLike } from '@/utils/types'

export const updateCache = ({
  client,
  variables,
  data,
  action,
  queryKey,
}: {
  client: QueryClient
  variables: {
    id: string
  }
  data: TweetLike
  action: 'like' | 'unlike'
  queryKey?: TimelineQueryKey
}) => {
  client.setQueryData(
    [
      ['tweet', queryKey],
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
