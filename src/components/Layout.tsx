import NavBar from './Navbar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <main>
    <NavBar />
    <div className='container mx-auto h-screen bg-slate-100'>{children}</div>
  </main>
)

export default Layout
