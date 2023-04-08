import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import NextImage from 'next/image'
import Timeline from '@/components/Timeline/Timeline'

const Profile = () => {
  const { data: session } = useSession()
  const { data } = api.tweet.getMy.useQuery()

  if (!session) return null

  return (
    <div className='pt-20'>
      <div className='flex flex-col items-center'>
        <NextImage
          src={session.user.image || ''}
          width={130}
          height={130}
          alt='profile'
          className='mb-8 rounded-full'
        />
        <h1 className='text-xl font-semibold'>{session.user.name}</h1>
        <span className='mb-8 text-gray-400'>{session.user.email}</span>
      </div>
      <Timeline tweets={data?.tweets || []} queryKey='getMy' />
    </div>
  )
}

export default Profile
