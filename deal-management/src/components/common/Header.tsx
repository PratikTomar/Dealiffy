import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-around items-center px-4 py-2 bg-blue-500 text-white shadow-md shadow-blue-500 '>
      <Link to="/">
      <span className='text-3xl font-medium'>Dealifyy</span>
      </Link>
     <Link to="/new-deal">
      <button className='text-lg font-light bg-white text-black px-4 py-2 rounded-md cursor-pointer'>
        New Deal
      </button>
      </Link>
    </div>
  )
}

export default Header