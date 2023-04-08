import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { QueryClient } from '@tanstack/react-query'
import { TimelineQueryKey, Tweet } from '@/utils/types'
import { api } from '@/utils/api'
import { updateCacheDelete } from '../Timeline/updateCacheDelete'
import { useSession } from 'next-auth/react'

interface Props {
  tweet: Tweet
  openModal: () => void
  client?: QueryClient
  queryKey?: TimelineQueryKey
}

const MoreActions = ({ tweet, openModal, client, queryKey }: Props) => {
  const { data: session } = useSession()

  const { mutate } = api.tweet.delete.useMutation({
    onSuccess: variables => {
      // await ctx.tweet.getMy.invalidate()
      // await ctx.tweet.getAll.invalidate()
      client && updateCacheDelete({ client, variables: variables.tweetId, queryKey })
    },
  })

  const isMyTweet = session?.user.email === tweet.author.email

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    isMyTweet &&
      mutate({
        id: tweet.id,
      })
  }

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    openModal()
  }

  return isMyTweet ? (
    <div>
      <div className='dropdown-left dropdown-hover dropdown'>
        <button
          className='h-6 w-6 text-gray-500 transition-all duration-200 hover:scale-110'
          onClick={e => e.stopPropagation()}
        >
          <EllipsisVerticalIcon />
        </button>
        <ul className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'>
          <li>
            <button onClick={handleEdit}>Edit</button>
          </li>
          <li>
            <button onClick={handleDelete}>Delete</button>
          </li>
        </ul>
      </div>
    </div>
  ) : null
}

export default MoreActions
