import NextImage from 'next/image'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  authorImage?: string
  content: string
  onChange: (val: string) => void
  onSubmit: () => void
  isDisabled: boolean
}

const View = ({
  isOpen,
  onClose,
  title,
  authorImage,
  content,
  onChange,
  isDisabled,
  onSubmit,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className='modal-box relative'>
        <button className='btn-sm btn-circle btn absolute right-2 top-2' onClick={onClose}>
          ✕
        </button>
        <h3 className='mb-4 text-lg font-bold'>{title}</h3>
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
            onChange={handleChange}
            className='textarea-primary textarea textarea-lg w-full border leading-6'
            placeholder='Whats happening?'
            rows={5}
          />
        </div>

        <div className='modal-action'>
          <button className='btn-primary btn' onClick={onSubmit} disabled={isDisabled}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default View
