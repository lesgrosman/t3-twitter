import { TweetType } from '@/utils/types'
import Tweet from '@/components/Tweet'

interface Props {
  tweets: TweetType[]
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
