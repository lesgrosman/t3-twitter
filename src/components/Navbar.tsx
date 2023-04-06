import { signIn, signOut, useSession } from 'next-auth/react'
import NextImage from 'next/image'
import NextLink from 'next/link'

const NavBar = () => {
  return (
    <div className='navbar bg-primary'>
      <div className='mx-auto flex w-full max-w-7xl justify-between'>
        <div className='flex-1'>
          <NextLink className='btn-ghost btn text-xl normal-case' href='/'>
            Twitter
          </NextLink>
        </div>
        <div className='flex gap-2'>
          <div className='form-control'>
            <input type='text' placeholder='Search' className='input-bordered input' />
          </div>
          <UserLogo />
        </div>
      </div>
    </div>
  )
}

export default NavBar

const UserLogo = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <button className='btn-secondary btn' onClick={() => signIn()}>
        Sign In
      </button>
    )
  }

  return (
    <div className='dropdown-end dropdown'>
      <label tabIndex={0} className='btn-ghost btn-circle avatar btn'>
        <div className='w-10 rounded-full'>
          <NextImage src={session.user.image || ''} alt='profile' fill className='rounded-full' />
        </div>
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
      >
        <li>
          <a onClick={() => signOut()}>Logout</a>
        </li>
      </ul>
    </div>
  )
}
