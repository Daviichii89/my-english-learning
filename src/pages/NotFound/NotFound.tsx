import { Link } from "react-router"

export const NotFound = () => {
  return (
    <>
        <img src="https://media.tenor.com/MYZgsN2TDJAAAAAM/this-is.gif" width={400} height={250} alt="Page Not Found" className='mx-auto mt-6' />
        <h2 className='text-2xl font-bold text-center mt-8'>
            Page Not Found
        </h2>
        <p className='text-center mt-4'>
            The page you are looking for does not exist.
        </p>
        <p className='mt-4'>
            Please check the URL 
        </p>
        <p className="mb-4">
            or 
        </p>
        <Link to={"/"} className="p-4 bg-blue-500 hover:bg-blue-400 text-white rounded-md">
            Return to the homepage
        </Link>
    </>
  )
}
