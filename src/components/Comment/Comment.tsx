import { Comment as CommentType } from '@/utils/types'
import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import CommentActions from './CommentActions'
import LocalizedDate from '@/utils/components/LocalizedDate'
import ModalEditComment from '../Modal/Comment/ModalEditComment'
import MoreActions from './MoreActions'
import NextImage from 'next/image'

interface Props {
  comment: CommentType
  client: QueryClient
}

const Comment = ({ comment, client }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log(isModalOpen)

  return (
    <>
      <ModalEditComment
        comment={comment}
        onClose={() => setIsModalOpen(false)}
        authorImage={comment.author.image || ''}
        isOpen={isModalOpen}
        title='Edit comment'
      />
      <div className='w-full border-b-[1px] p-4'>
        <div className='flex gap-4'>
          <div className='flex flex-shrink-0 items-start'>
            <NextImage
              width={32}
              height={32}
              src={comment.author.image || ''}
              alt='profile'
              className='rounded-full'
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <span>{comment.author.name}</span>
                <span className='text-gray-400'>
                  <LocalizedDate date={comment.createdAt} />
                </span>
              </div>
              <MoreActions comment={comment} openModal={() => setIsModalOpen(true)} />
            </div>
            <span className='text-gray-500'>{comment.content}</span>
            <CommentActions comment={comment} client={client} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment
