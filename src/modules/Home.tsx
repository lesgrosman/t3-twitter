import { api } from '@/utils/api'
import CreateTweet from '@/components/Form/CreateTweet'
import Timeline from '@/components/Timeline/Timeline'

const Home = () => {
  const { data } = api.tweet.getAll.useQuery()

  if (!data) return null

  return (
    <div>
      <CreateTweet />
      <Timeline tweets={data.tweets} queryKey='getAll' />
    </div>
  )
}

export default Home
