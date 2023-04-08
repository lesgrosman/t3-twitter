import { api } from '@/utils/api'
import CreateTweet from '@/components/Form/CreateTweet'
import Tweet from '@/components/Tweet/Tweet'

const LikedTweets = () => {
  const { data } = api.tweet.getLiked.useQuery()

  if (!data) return null

  return (
    <div>
      <CreateTweet />
      {data.tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}

export default LikedTweets
