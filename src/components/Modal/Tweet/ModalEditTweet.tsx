import { QueryClient } from '@tanstack/react-query'
import { Tweet } from '@/utils/types'
import { api } from '@/utils/api'
import { queryKeys } from '@/utils/constants'
import { updateCacheEditTweet } from '@/components/Timeline/updateCache'
import React, { useState } from 'react'
import View from './ViewEdit'

interface Props {
  tweet: Tweet
  authorImage?: string | null
  onClose: () => void
  isOpen: boolean
  title: string
  client: QueryClient
}

const ModalEditTweet = ({ tweet, authorImage, onClose, isOpen, title, client }: Props) => {
  const [content, setContent] = useState(tweet.content || '')

  const { mutate, isLoading } = api.tweet.update.useMutation({
    onSuccess: (data, variables) => {
      queryKeys.forEach(queryKey =>
        updateCacheEditTweet({ client, data: data.tweet, variables, queryKey })
      )
      setContent('')
      onClose()
    },
  })

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
      initialContent={tweet.content}
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
