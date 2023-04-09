import { api } from '@/utils/api'
import { updateCacheCreateTweet } from '@/components/Timeline/updateCache'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import View from './ViewCreate'

interface Props {
  authorImage?: string | null
  onClose: () => void
  isOpen: boolean
  title: string
}

const ModalCreateTweet = ({ authorImage, onClose, isOpen, title }: Props) => {
  const [content, setContent] = useState('')
  const client = useQueryClient()

  const { mutate, isLoading } = api.tweet.create.useMutation({
    onSuccess: data => {
      setContent('')
      updateCacheCreateTweet({ client, data: data.tweet, queryKey: 'getAll' })
      updateCacheCreateTweet({ client, data: data.tweet, queryKey: 'getMy' })
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
      content={content}
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
