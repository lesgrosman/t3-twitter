import { HeartIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { TweetType } from '@/utils/types'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import LocalizedDate from '@/utils/components/LocalizedDate'
import NextImage from 'next/image'

interface Props {
  tweet: TweetType
}

const Tweet = ({ tweet }: Props) => {
  const { data: session } = useSession()
  const ctx = api.useContext()

  const { author, content, createdAt, id } = tweet

  const { mutate } = api.tweet.delete.useMutation({
    onSuccess: async () => {
      await ctx.tweet.getMy.invalidate()
      await ctx.tweet.getAll.invalidate()
    },
  })

  const { mutate: like, isLoading: isLikeLoading } = api.like.create.useMutation({
    onSuccess: async () => {
      await ctx.tweet.getMy.invalidate()
      await ctx.tweet.getAll.invalidate()
    },
  })
  const { mutate: dislike, isLoading: isDislikeLoading } = api.like.delete.useMutation({
    onSuccess: async () => {
      await ctx.tweet.getMy.invalidate()
      await ctx.tweet.getAll.invalidate()
    },
  })

  const isUsersTweet = session?.user.email === tweet.author.email
  const isLikedByMe = tweet.likes?.some(like => like.author.email === session?.user.email)
  const areLikes = !!tweet.likes?.length

  const handleLikeOrDislike = () => (isLikedByMe ? dislikeTweet() : likeTweet())
  const isLikeButtonDisabled = isLikeLoading || isDislikeLoading

  const handleDelete = () => {
    isUsersTweet &&
      mutate({
        id,
      })
  }

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

  return (
    <div className='w-full cursor-pointer border-b-[1px] p-4 hover:bg-slate-100'>
      <div className='flex gap-4'>
        <div className='flex flex-shrink-0 items-start'>
          <NextImage
            width={32}
            height={32}
            src={author.image || ''}
            alt='profile'
            className='rounded-full'
          />
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex gap-2'>
            <span className='font-semibold'>{author.name}</span>
            <span className='text-gray-400'>
              <LocalizedDate date={createdAt} />
            </span>
          </div>
          <span>{content}</span>
          <div className='mt-4 flex w-full justify-between'>
            <div className='flex gap-1'>
              <button onClick={handleLikeOrDislike} disabled={isLikeButtonDisabled}>
                <HeartIcon
                  className={`mx-auto h-5 w-5 transition-all duration-200 hover:scale-110 ${
                    isLikedByMe ? 'text-error' : 'text-gray-300 hover:text-red-300'
                  }`}
                />
              </button>
              {areLikes && <span className='text-sm'>{tweet.likes?.length}</span>}
            </div>
            {isUsersTweet && (
              <TrashIcon
                className='h-5 w-5 text-error transition-all duration-200 hover:scale-110'
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
