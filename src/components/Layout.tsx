import NavBar from './Navbar'
import Sidebar from '@/components/Sidebar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <main>
    <NavBar />
    <div className='container mx-auto h-screen'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-3'>
          <Sidebar />
        </div>
        <div className='col-span-6 h-screen border-x-[1px] bg-white'>{children}</div>
        <div className='col-span-3' />
      </div>
    </div>
  </main>
)

export default Layout
