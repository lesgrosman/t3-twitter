import { api } from '@/utils/api'
import CreateTweet from '@/components/Form/CreateTweet'
import Timeline from '@/components/Timeline/Timeline'

const LikedTweets = () => {
  const { data } = api.tweet.getLiked.useQuery()

  if (!data) return null

  return (
    <div>
      <CreateTweet />
      <Timeline tweets={data.tweets} queryKey='getLiked' />
    </div>
  )
}

export default LikedTweets
