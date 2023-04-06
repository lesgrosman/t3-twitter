import { Tweet } from '@/utils/types'
import { api } from '@/utils/api'
import React, { useState } from 'react'
import View from './View'

interface Props {
  tweet: Tweet
  authorImage?: string | null
  onClose: () => void
  isOpen: boolean
  title: string
}

const ModalEditTweet = ({ tweet, authorImage, onClose, isOpen, title }: Props) => {
  const { data } = api.tweet.getById.useQuery({
    id: tweet.id,
  })

  const [content, setContent] = useState(data?.tweet.content || '')

  const ctx = api.useContext()
  const { mutate, isLoading } = api.tweet.update.useMutation({
    onSuccess: async () => {
      setContent('')
      await ctx.tweet.getAll.invalidate()
      await ctx.tweet.getMy.invalidate()
      await ctx.tweet.getById.invalidate()
      onClose()
    },
  })

  if (!data?.tweet) return null

  const handleCreate = () => {
    content.trim() &&
      mutate({
        id: tweet.id,
        content,
      })
  }

  const isCreateDisabled = isLoading || !content.trim()

  return (
    <View
      isOpen={isOpen}
      initialContent={data.tweet.content}
      onChange={(val: string) => setContent(val)}
      isDisabled={isCreateDisabled}
      onClose={onClose}
      title={title}
      onSubmit={handleCreate}
      authorImage={authorImage || ''}
    />
  )
}

export default ModalEditTweet
