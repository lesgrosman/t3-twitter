import { api } from '@/utils/api'
import CreateTweet from '@/components/Form/CreateTweet'
import Feed from '@/components/Feed'

const Home = () => {
  const { data } = api.tweet.getAll.useQuery()

  if (!data) return null

  return (
    <div>
      <CreateTweet />
      <Feed tweets={data.tweets} />
    </div>
  )
}

export default Home
