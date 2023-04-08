import { QueryClient } from '@tanstack/react-query'
import { TimelineQueryKey, Tweet } from '@/utils/types'

export const updateCacheDelete = ({
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
    (oldData: any) => {
      const index = oldData?.tweets?.map((tweet: Tweet) => tweet.id)?.indexOf(variables.id)
      const newTweets = [
        ...(oldData?.tweets?.slice(0, index) || []),
        ...(oldData?.tweets?.slice(index + 1) || []),
      ]
      return {
        tweets: newTweets,
      }
    }
  )
}
