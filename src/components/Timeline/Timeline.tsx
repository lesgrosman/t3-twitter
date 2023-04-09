import { QueryClient } from '@tanstack/react-query'
import { Tweet as TweeType } from '@/utils/types'
import Tweet from '@/components/Tweet/Tweet'

interface Props {
  tweets: TweeType[]
  client: QueryClient
}

const Timeline = ({ tweets, client }: Props) => {
  return (
    <div>
      {tweets?.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} client={client} />
      ))}
    </div>
  )
}

export default Timeline
