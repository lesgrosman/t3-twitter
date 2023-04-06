import { Comment as CommentType } from '@/utils/types'
import LocalizedDate from '@/utils/components/LocalizedDate'
import MoreActions from './MoreActions'
import NextImage from 'next/image'

interface Props {
  comment: CommentType
}

const Comment = ({ comment }: Props) => {
  return (
    <div className='w-full border-b-[1px] p-4 hover:bg-slate-100'>
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
            <MoreActions comment={comment} />
          </div>
          <span className='text-gray-500'>{comment.content}</span>
        </div>
      </div>
    </div>
  )
}

export default Comment
