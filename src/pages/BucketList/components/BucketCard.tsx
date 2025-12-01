import { Link } from "react-router";

interface BucketCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
}

export const BucketCard = ({ title, description, image, link}: BucketCardProps) => {
  return (
    <Link to={`/bucket-list${link}`} className='flex flex-col justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-30 max-w-[300px] h-full'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <p className="mb-2">
            {description}
        </p>
        {image && <img src={image} alt={title} className='w-[300px] h-[150px] mb-4' />}
    </Link>
  )
}