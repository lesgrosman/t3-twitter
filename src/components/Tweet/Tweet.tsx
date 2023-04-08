import { QueryClient } from '@tanstack/react-query'
import { Tweet } from '@/utils/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LocalizedDate from '@/utils/components/LocalizedDate'
import ModalEditTweet from '../Modal/Tweet/ModalEditTweet'
import MoreActions from './MoreActions'
import NextImage from 'next/image'
import TweetActions from './TweetActions'

interface Props {
  tweet: Tweet
  client?: QueryClient
}

const Tweet = ({ tweet, client }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleTweetClick = () => {
    router.push(`/tweet/${tweet.id}`)
  }

  return (
    <>
      <ModalEditTweet
        tweet={tweet}
        onClose={() => setIsModalOpen(false)}
        authorImage={tweet.author.image || ''}
        isOpen={isModalOpen}
        title='Edit tweet'
      />
      <div
        className='w-full cursor-pointer border-b-[1px] p-4 hover:bg-slate-100'
        onClick={handleTweetClick}
      >
        <div className='flex gap-4'>
          <div className='flex flex-shrink-0 items-start'>
            <NextImage
              width={32}
              height={32}
              src={tweet.author.image || ''}
              alt='profile'
              className='rounded-full'
            />
          </div>
          <div className='flex w-full flex-col'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <span className='font-semibold'>{tweet.author.name}</span>
                <span className='text-gray-400'>
                  <LocalizedDate date={tweet.createdAt} />
                </span>
              </div>
              <MoreActions tweet={tweet} openModal={() => setIsModalOpen(true)} />
            </div>
            <span>{tweet.content}</span>
            <TweetActions tweet={tweet} client={client} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Tweet
