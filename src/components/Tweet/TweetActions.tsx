import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import { QueryClient } from '@tanstack/react-query'
import { Tweet } from '@/utils/types'
import { api } from '@/utils/api'
import { updateCache } from '@/modules/Home/updateCache'
import { useSession } from 'next-auth/react'

interface Props {
  tweet: Tweet
  client?: QueryClient
}

const TweetActions = ({ tweet, client }: Props) => {
  const { data: session } = useSession()

  const { mutate: like, isLoading: isLikeLoading } = api.like.likeTweet.useMutation({
    onSuccess: (data, variables) => {
      client &&
        updateCache({
          client,
          variables,
          data,
          action: 'like',
        })
    },
  })
  const { mutate: unlike, isLoading: isDislikeLoading } = api.like.unlikeTweet.useMutation({
    onSuccess: (data, variables) => {
      client &&
        updateCache({
          client,
          variables,
          data,
          action: 'unlike',
        })
    },
  })

  const isLikedByMe = tweet.likes?.some(like => like.author.email === session?.user.email)
  const isLikeButtonDisabled = isLikeLoading || isDislikeLoading

  const likeTweet = () => {
    session?.user &&
      like({
        id: tweet.id,
      })
  }

  const unlikeTweet = () => {
    session?.user &&
      unlike({
        id: tweet.id,
      })
  }

  const handleLikeOrDislike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    isLikedByMe ? unlikeTweet() : likeTweet()
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
