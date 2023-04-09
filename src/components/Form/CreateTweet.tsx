import { QueryClient } from '@tanstack/react-query'
import { TimelineQueryKey } from '@/utils/types'
import { api } from '@/utils/api'
import { queryKeys } from '@/utils/constants'
import { updateCacheCreateTweet } from '../Timeline/updateCache'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import NextImage from 'next/image'

interface Props {
  queryKey: TimelineQueryKey
  client: QueryClient
}

const CreateTweet = ({ client }: Props) => {
  const [content, setContent] = useState('')

  const { mutate, isLoading } = api.tweet.create.useMutation({
    onSuccess: data => {
      queryKeys.forEach(queryKey => updateCacheCreateTweet({ client, data: data.tweet, queryKey }))
      setContent('')
    },
  })

  const { data: session } = useSession()

  if (!session) return null

  const handleCreate = () => {
    mutate({
      content,
    })
  }

  const isDisabled = !content.trim() || isLoading

  return (
    <div className='flex w-full gap-4 border-b-[1px] p-4'>
      <div className='flex flex-shrink-0 items-start'>
        <NextImage
          width={32}
          height={32}
          src={session.user.image || ''}
          alt='profile'
          className='rounded-full'
        />
      </div>
      <div className='flex w-full flex-col gap-2'>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className='text-md textarea-primary textarea textarea-lg w-full border p-2 leading-6'
          placeholder='Whats happening?'
          rows={5}
        />
        <div className='flex justify-end'>
          <button className='btn-primary btn' disabled={isDisabled} onClick={handleCreate}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTweet
