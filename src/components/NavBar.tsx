import { Link } from 'react-router'

export const NavBar = () => {
  return (
    <nav className='flex gap-2'>
      <Link to="/" className='p-2 hover:bg-gray-700 rounded'>Home</Link>
      <Link to="/bucket-list" className='p-2 hover:bg-gray-700 rounded'>Bucket list</Link>
      <Link to="/movement-verbs" className='p-2 hover:bg-gray-700 rounded'>Movement Verbs</Link>
    </nav>
  )
}