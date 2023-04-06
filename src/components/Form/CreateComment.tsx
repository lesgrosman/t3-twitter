import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import NextImage from 'next/image'

interface Props {
  tweetId: string
}

const CreateComment = ({ tweetId }: Props) => {
  const [content, setContent] = useState('')
  const ctx = api.useContext()
  const { data: session } = useSession()

  const { mutate, isLoading } = api.comment.create.useMutation({
    onSuccess: async () => {
      setContent('')
      await ctx.tweet.getById.invalidate()
    },
  })

  if (!session) return null

  const handleCreate = () => {
    mutate({
      id: tweetId,
      content,
    })
  }

  const isDisabled = !content.trim() || isLoading

  return (
    <div className='flex w-full gap-4 p-4'>
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
          placeholder='What do you think?'
          rows={4}
        />
        <div className='flex justify-end'>
          <button className='btn-primary btn' disabled={isDisabled} onClick={handleCreate}>
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
