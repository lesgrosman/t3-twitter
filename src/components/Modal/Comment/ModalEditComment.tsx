import { Comment } from '@/utils/types'
import { api } from '@/utils/api'
import React, { useState } from 'react'
import View from './View'

interface Props {
  comment: Comment
  authorImage?: string | null
  onClose: () => void
  isOpen: boolean
  title: string
}

const ModalEditComment = ({ comment, authorImage, onClose, isOpen, title }: Props) => {
  const { data } = api.comment.getById.useQuery({
    id: comment.id,
  })

  const [content, setContent] = useState(data?.comment.content || '')

  const ctx = api.useContext()
  const { mutate, isLoading } = api.comment.update.useMutation({
    onSuccess: async () => {
      setContent('')
      await ctx.tweet.getById.invalidate()
      onClose()
    },
  })

  if (!data?.comment) return null

  const handleCreate = () => {
    content.trim() &&
      mutate({
        id: comment.id,
        content,
      })
  }

  const isCreateDisabled = isLoading || !content.trim()

  return (
    <View
      isOpen={isOpen}
      initialContent={data.comment.content}
      onChange={(val: string) => setContent(val)}
      isDisabled={isCreateDisabled}
      onClose={onClose}
      title={title}
      onSubmit={handleCreate}
      authorImage={authorImage || ''}
    />
  )
}

export default ModalEditComment
