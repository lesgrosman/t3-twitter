import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import Comment from '@/components/Comment/Comment'
import CreateComment from '@/components/Form/CreateComment'
import NextImage from 'next/image'
import TweetActions from '@/components/Tweet/TweetActions'

const Tweet = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = api.tweet.getById.useQuery({
    id: id as string,
  })

  if (!data) return null

  const { tweet } = data

  return (
    <div>
      <div className='border-b-[1px] p-4'>
        <div className='flex items-center justify-start gap-4'>
          <div className='flex flex-shrink-0 items-start'>
            <NextImage
              src={tweet.author.image || ''}
              width={36}
              height={36}
              alt='profile'
              className='rounded-full'
            />
          </div>
          <div>
            <h5 className='font-bold'>{tweet.author.name}</h5>
            <span className='text-gray-400'>{tweet.author.email}</span>
          </div>
        </div>
        <div className='my-8'>
          <p>{tweet.content}</p>
        </div>
        <TweetActions tweet={tweet} />
      </div>
      <div className='p-4'>
        <h2 className='p-4 text-xl font-semibold'>Comments</h2>

        <CreateComment tweetId={tweet.id} />
      </div>
      <div>
        {tweet.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default Tweet
