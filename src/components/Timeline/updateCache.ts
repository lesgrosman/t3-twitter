import { QueryClient } from '@tanstack/react-query'
import { TimelineQueryKey, Tweet, TweetLike } from '@/utils/types'

export const updateCacheLikeTweet = ({
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

export const updateCacheDeleteTweet = ({
  client,
  variables,
  queryKey,
}: {
  client: QueryClient
  variables: {
    id: string
  }
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
      if (oldData && oldData.tweets) {
        const index = oldData.tweets.map((tweet: Tweet) => tweet.id).indexOf(variables.id)
        const newTweets = [
          ...oldData?.tweets?.slice(0, index),
          ...oldData?.tweets?.slice(index + 1),
        ]
        return {
          tweets: newTweets,
        }
      }

      return {
        twets: oldData?.tweets,
      }
    }
  )
}

export const updateCacheCreateTweet = ({
  client,
  data,
  queryKey,
}: {
  client: QueryClient
  data: Tweet
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
      if (oldData && oldData.tweets) {
        const newTweets = [data, ...oldData.tweets]
        return {
          tweets: newTweets,
        }
      }

      return {
        tweets: oldData?.tweets,
      }
    }
  )
}

export const updateCacheEditTweet = ({
  client,
  variables,
  data,
  queryKey,
}: {
  client: QueryClient
  data: Tweet
  variables: {
    id: string
    content: string
  }
  queryKey?: TimelineQueryKey
}) => {
  client &&
    client.setQueryData(
      [
        ['tweet', queryKey],
        {
          type: 'query',
        },
      ],
      (oldData?: { tweets?: Tweet[] }) => {
        if (oldData && oldData.tweets) {
          const index = oldData.tweets.map((tweet: Tweet) => tweet.id).indexOf(variables.id)
          const newTweets = [
            ...oldData?.tweets?.slice(0, index),
            data,
            ...oldData?.tweets?.slice(index + 1),
          ]
          return {
            tweets: newTweets,
          }
        }

        return {
          tweets: oldData?.tweets,
        }
      }
    )
}
