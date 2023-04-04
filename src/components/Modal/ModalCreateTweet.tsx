import { api } from '@/utils/api'
import NextImage from 'next/image'
import React, { useState } from 'react'

interface Props {
  authorImage?: string | null
  authorEmail?: string | null
  onClose: () => void
  isOpen: boolean
}

const ModalCreateTweet = ({ authorImage, authorEmail, onClose, isOpen }: Props) => {
  const [content, setContent] = useState('')

  const ctx = api.useContext()
  const { mutate, isLoading } = api.tweet.create.useMutation({
    onSuccess: async () => {
      setContent('')
      await ctx.tweet.getAll.invalidate()
      await ctx.tweet.getMy.invalidate()
      onClose()
    },
  })

  const handleCreate = () => {
    content.trim() &&
      mutate({
        authorEmail: authorEmail || '',
        content,
      })
  }

  const handleClose = () => {
    setContent('')
    onClose()
  }

  const isCreateDisabled = isLoading || !content.trim()

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className='modal-box relative'>
        <button className='btn-sm btn-circle btn absolute right-2 top-2' onClick={handleClose}>
          ✕
        </button>
        <h3 className='mb-4 text-lg font-bold'>Write a tweet!</h3>
        <div className='flex w-full gap-4 border-b-[1px] p-4'>
          <div className='flex flex-shrink-0 items-start'>
            <NextImage
              width={32}
              height={32}
              src={authorImage || ''}
              alt='profile'
              className='rounded-full'
            />
          </div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className='textarea-primary textarea textarea-lg w-full border'
            placeholder='Whats happening?'
          />
        </div>

        <div className='modal-action'>
          <button className='btn-primary btn' onClick={handleCreate} disabled={isCreateDisabled}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCreateTweet
