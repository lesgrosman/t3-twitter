import { api } from '@/utils/api'
import React, { useState } from 'react'
import View from './View'

interface Props {
  authorImage?: string | null
  onClose: () => void
  isOpen: boolean
  title: string
}

const ModalCreateTweet = ({ authorImage, onClose, isOpen, title }: Props) => {
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
        content,
      })
  }

  const isCreateDisabled = isLoading || !content.trim()

  return (
    <View
      isOpen={isOpen}
      onChange={(val: string) => setContent(val)}
      isDisabled={isCreateDisabled}
      onClose={onClose}
      title={title}
      onSubmit={handleCreate}
      authorImage={authorImage || ''}
    />
  )
}

export default ModalCreateTweet
