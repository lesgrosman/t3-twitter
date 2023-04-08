import { Comment } from '@/utils/types'
import { HeartIcon } from '@heroicons/react/24/solid'
import { QueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import { updateCacheCommentLikes } from './updateCacheLikes'
import { useSession } from 'next-auth/react'

interface Props {
  comment: Comment
  client: QueryClient
}

const CommentActions = ({ comment, client }: Props) => {
  const { data: session } = useSession()

  const { mutate: like, isLoading: isLikeLoading } = api.like.likeComment.useMutation({
    onSuccess: async (data, variables) => {
      await updateCacheCommentLikes({
        client,
        tweetId: comment.tweetId,
        action: 'like',
        data,
        variables,
      })
    },
  })
  const { mutate: unlike, isLoading: isDislikeLoading } = api.like.unlikeComment.useMutation({
    onSuccess: async (data, variables) => {
      await updateCacheCommentLikes({
        client,
        tweetId: comment.tweetId,
        action: 'unlike',
        data,
        variables,
      })
    },
  })

  const isLikedByMe = comment.likes.some(like => like.author.email === session?.user.email)
  const isLikeButtonDisabled = isLikeLoading || isDislikeLoading

  const likeComment = () => {
    session?.user &&
      like({
        id: comment.id,
      })
  }

  const unlikeComment = () => {
    session?.user &&
      unlike({
        id: comment.id,
      })
  }

  const handleLikeOrDislike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    isLikedByMe ? unlikeComment() : likeComment()
  }

  return (
    <div className='mt-4 flex w-full justify-between'>
      <div className='flex gap-4'>
        <div className='flex gap-1'>
          <button onClick={handleLikeOrDislike} disabled={isLikeButtonDisabled}>
            <HeartIcon
              className={`mx-auto h-5 w-5 transition-all duration-200 hover:scale-110 ${
                isLikedByMe ? 'text-error' : 'text-gray-300 hover:text-red-300'
              }`}
            />
          </button>
          {<span className='text-sm'>{comment.likes.length}</span>}
        </div>
      </div>
    </div>
  )
}

export default CommentActions
