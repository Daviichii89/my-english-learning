import { Link } from "react-router"

export const PlayVideogames = () => {
  return (
    <div className='max-w-3xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-md flex flex-col items-center'>
        <nav className='w-full mb-4'>
            <Link to="/bucket-list" className='text-blue-500 hover:underline'>Back to Bucket List</Link>
        </nav>
        <h1 className="font-bold text-xl">Playing Video Games</h1>
        <div className='flex flex-col justify-center items-center'>
            <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/10/trofeo-platino-ps4-2110869.jpg?tf=3840x" alt="Video Games" className='w-[325px] h-auto my-4' />
            <article className='ml-6 text-left'>
                <p className='mt-4'>
                    One of the most exciting items on my bucket list is to play as many video games as I can, collecting as many Platinum trophies as possible along the way.
                </p>
                <p className='mt-4'>
                    Since I was a child, I have been passionate about gaming because it gives me a chance to live incredible adventures and explore different worlds. Although some trophies can be really hard to unlock, the satisfaction I get when I see that Platinum notification makes me very very happy.
                </p>
                <p className='mt-4'>
                    Right now, I’m playing games like Final Fantasy VII Rebirth, The Walking Dead Telltales series, and Final Fantasy XVI. They offer amazing stories.
                </p>
                <p className='mt-4'>
                    I usually play late in the evening, after I have finished work and English classes. Some sessions are short, but other times I go on until night, especially when I’m close to unlocking a rare achievement.
                </p>
                <p className='mt-4'>
                    I hope to build a collection I can be proud of, so that one day I can look back and say:
                </p>
                <p className='mt-4 font-bold'>
                    “I did it. I conquered these digital worlds."
                </p>
            </article>
        </div>
    </div>
  )
}