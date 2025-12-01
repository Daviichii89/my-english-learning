import { BucketCard } from './components/BucketCard'
import data from './data.json'

export const BucketList = () => {
  return (
    <>
        <h2 className='text-2xl font-bold'>
            Bucket List
        </h2>
        <p className='mt-2'>
            This is my list of 5 things I want to do in my life.
        </p>
        <div className='my-6 flex flex-col items-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
              {data.map((item, index) => (
                <BucketCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  link={item.link}
                />
              ))}
          </div>
        </div>
    </>
  )
}