import { Link } from "react-router-dom"

export default function Landing() {

    return(
        <div className='flex flex-col justify-center items-center px-6 md:px-24 py-8 md:py-16 bg-zinc-800 rounded-sm shadow-lg'>
          <h1 className="text-white text-5xl w-full md:text-center font-semibold">The Reminder App</h1>
          <h2 className="text-white text-3xl font-light w-full md:max-w-[40rem] md:text-center leading-[3rem] mt-6">Keep track of the tasks that mean the most to you. Create an account to start your journey of worrying less and doing more.</h2>
          <div className="flex flex-col-reverse md:flex-row gap-4 mt-16 max-w-[36rem] w-full">
            <Link to='/signup' className="flex justify-center items-center h-16 md:h-20 w-full hover:bg-zinc-700 transition-all duration-[300ms] border-2 border-white text-white rounded-sm text-3xl pb-1 font-light hover:cursor-pointer">Sign Up</Link>
            <Link to='/login'className="flex justify-center items-center h-16 md:h-20 w-full transition-all duration-[300ms] hover:text-zinc-700 bg-cyan-400 rounded-sm text-3xl pb-1 font-light hover:shadow-md hover:cursor-pointer text-white">Log In</Link>
          </div>
        </div>
    )
}