import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import NextImage from 'next/image'

const CreateTweet = () => {
  const [content, setContent] = useState('')
  const ctx = api.useContext()

  const { mutate, isLoading } = api.tweet.create.useMutation({
    onSuccess: async () => {
      setContent('')
      await ctx.tweet.getAll.invalidate()
    },
  })

  const { data: session } = useSession()

  if (!session) return null

  const handleCreate = () => {
    mutate({
      authorEmail: session.user.email || '',
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
          className='textarea-primary textarea textarea-lg w-full border'
          placeholder='Whats happening?'
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
