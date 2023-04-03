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

  const isUsersTweet = session?.user.email === tweet.author.email

  const handleDelete = () => {
    isUsersTweet &&
      mutate({
        id,
      })
  }
  return (
    <div className='w-full cursor-pointer border-b-[1px] p-4 hover:bg-slate-100'>
      <div className='mb-4 flex gap-4'>
        <div className='flex flex-shrink-0 items-start'>
          <NextImage
            width={32}
            height={32}
            src={author.image || ''}
            alt='profile'
            className='rounded-full'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <span className='font-semibold'>{author.name}</span>
            <span className='text-gray-400'>
              <LocalizedDate date={createdAt} />
            </span>
          </div>
          <span>{content}</span>
        </div>
      </div>
      <div className='flex justify-end'>
        {isUsersTweet && (
          <TrashIcon
            className='h-5 w-5 text-error transition-all duration-200 hover:scale-110'
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default Tweet
