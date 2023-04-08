import { TimelineQueryKey, Tweet as TweeType } from '@/utils/types'
import { useQueryClient } from '@tanstack/react-query'
import Tweet from '@/components/Tweet/Tweet'

interface Props {
  tweets: TweeType[]
  queryKey: TimelineQueryKey
}

const Timeline = ({ tweets, queryKey }: Props) => {
  const client = useQueryClient()

  return (
    <div>
      {tweets?.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} client={client} queryKey={queryKey} />
      ))}
    </div>
  )
}

export default Timeline
