import { api } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'
import CreateTweet from '@/components/Form/CreateTweet'
import Timeline from '@/components/Timeline/Timeline'

const Home = () => {
  const { data } = api.tweet.getAll.useQuery()
  const client = useQueryClient()

  if (!data) return null

  return (
    <div>
      <CreateTweet queryKey='getAll' client={client} />
      <Timeline tweets={data.tweets} client={client} />
    </div>
  )
}

export default Home
