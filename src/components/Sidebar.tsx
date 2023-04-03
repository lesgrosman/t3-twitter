import { useSession } from 'next-auth/react'
import NextLink from 'next/link'

const Sidebar = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <ul className='menu rounded-box w-56 gap-2 bg-base-100 p-2 text-xl'>
      <li>
        <NextLink href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mr-2 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
          </svg>
          Home
        </NextLink>
      </li>
      <li>
        <NextLink href='/profile'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mr-2 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Profile
        </NextLink>
      </li>
      <li>
        <NextLink href='/liked'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mr-2 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
          </svg>
          Liked tweets
        </NextLink>
      </li>
      <li>
        <button className='btn-primary btn'>Tweet</button>
      </li>
    </ul>
  )
}

export default Sidebar
