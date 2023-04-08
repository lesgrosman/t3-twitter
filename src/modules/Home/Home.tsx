import { api } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'
import CreateTweet from '@/components/Form/CreateTweet'
import Tweet from '@/components/Tweet/Tweet'

const Home = () => {
  const client = useQueryClient()
  const { data } = api.tweet.getAll.useQuery()

  if (!data) return null

  return (
    <div>
      <CreateTweet />
      {data.tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} client={client} />
      ))}
    </div>
  )
}

export default Home
