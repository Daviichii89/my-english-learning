import { Link } from 'react-router'
import { NavBar } from './NavBar'

export const Header = () => {
  return (
    <header className='bg-black min-h-16 text-white flex flex-col p-3'>
        <Link to="/" className='p-2 hover:bg-gray-700 rounded text-2xl font-bold w-fit mx-auto'>
          My English learning
        </Link>
        <NavBar />
    </header>
  )
}