import { api } from '@/utils/api'
import CreateTweet from '@/components/Form/CreateTweet'
import Feed from '@/components/Feed'

const LikedTweets = () => {
  const { data } = api.tweet.getLiked.useQuery()

  if (!data) return null

  return (
    <div>
      <CreateTweet />
      <Feed tweets={data.tweets} />
    </div>
  )
}

export default LikedTweets
