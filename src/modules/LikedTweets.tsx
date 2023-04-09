import { api } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'
import CreateTweet from '@/components/Form/CreateTweet'
import Timeline from '@/components/Timeline/Timeline'

const LikedTweets = () => {
  const { data } = api.tweet.getLiked.useQuery()
  const client = useQueryClient()

  if (!data) return null

  return (
    <div>
      <CreateTweet queryKey='getLiked' client={client} />
      <Timeline tweets={data.tweets} client={client} />
    </div>
  )
}

export default LikedTweets
