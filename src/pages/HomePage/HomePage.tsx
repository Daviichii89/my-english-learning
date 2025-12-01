export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h2 className='text-2xl font-bold mt-2'>
            Welcome to My English Learning
        </h2>
        <p className='mt-2'>
            This is a personal project to improve my English skills.
        </p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" width={400} height={250} alt="Welcome" className='mt-12' />
    </div>
  )
}