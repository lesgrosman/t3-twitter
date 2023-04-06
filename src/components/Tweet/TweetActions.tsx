import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import { Tweet } from '@/utils/types'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'

interface Props {
  tweet: Tweet
}

const TweetActions = ({ tweet }: Props) => {
  const { data: session } = useSession()
  const ctx = api.useContext()

  const { mutate: like, isLoading: isLikeLoading } = api.like.create.useMutation({
    onSuccess: async () => {
      await ctx.tweet.getMy.invalidate()
      await ctx.tweet.getAll.invalidate()
      await ctx.tweet.getById.invalidate()
    },
  })
  const { mutate: dislike, isLoading: isDislikeLoading } = api.like.delete.useMutation({
    onSuccess: async () => {
      await ctx.tweet.getMy.invalidate()
      await ctx.tweet.getAll.invalidate()
      await ctx.tweet.getById.invalidate()
    },
  })

  const isLikedByMe = tweet.likes?.some(like => like.author.email === session?.user.email)
  const isLikeButtonDisabled = isLikeLoading || isDislikeLoading

  const likeTweet = () => {
    session?.user &&
      like({
        authorEmail: session.user.email || '',
        id: tweet.id,
      })
  }

  const dislikeTweet = () => {
    session?.user &&
      dislike({
        id: tweet.id,
        authorEmail: session.user.email || '',
      })
  }

  const handleLikeOrDislike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    isLikedByMe ? dislikeTweet() : likeTweet()
  }

  return (
    <div className='mt-4 flex w-full justify-between'>
      <div className='flex gap-4'>
        <div className='flex gap-1'>
          <button onClick={handleLikeOrDislike} disabled={isLikeButtonDisabled}>
            <HeartIcon
              className={`mx-auto h-5 w-5 transition-all duration-200 hover:scale-110 ${
                isLikedByMe ? 'text-error' : 'text-gray-300 hover:text-red-300'
              }`}
            />
          </button>
          {<span className='text-sm'>{tweet.likes.length}</span>}
        </div>
        <div className='flex gap-1'>
          <button>
            <ChatBubbleOvalLeftIcon className='h-5 w-5 text-gray-300 transition-all duration-200 hover:scale-110' />
          </button>
          {<span className='text-sm'>{tweet.comments.length}</span>}
        </div>
      </div>
    </div>
  )
}

export default TweetActions
