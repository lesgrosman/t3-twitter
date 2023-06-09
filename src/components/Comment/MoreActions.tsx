import { Comment } from '@/utils/types'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'

interface Props {
  comment: Comment
  openModal: () => void
}

const MoreActions = ({ comment, openModal }: Props) => {
  const { data: session } = useSession()
  const ctx = api.useContext()

  const { mutate } = api.comment.delete.useMutation({
    onSuccess: async () => {
      await ctx.tweet.getById.invalidate()
    },
  })

  const isMyComment = session?.user.email === comment.author.email

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    isMyComment &&
      mutate({
        id: comment.id,
      })
  }

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    openModal()
  }

  return isMyComment ? (
    <div className={`dropdown-left dropdown-hover dropdown`}>
      <button
        className='h-6 w-6 text-gray-500 transition-all duration-200 hover:scale-110'
        onClick={e => e.stopPropagation()}
      >
        <EllipsisVerticalIcon />
      </button>
      <ul className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'>
        <li>
          <button onClick={handleEdit}>Edit</button>
        </li>
        <li>
          <button onClick={handleDelete}>Delete</button>
        </li>
      </ul>
    </div>
  ) : null
}

export default MoreActions
