import { Tweet as TweeType } from '@/utils/types'
import Tweet from '@/components/Tweet/Tweet'

interface Props {
  tweets: TweeType[]
}

const Feed = ({ tweets }: Props) => {
  return (
    <div>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}

export default Feed
