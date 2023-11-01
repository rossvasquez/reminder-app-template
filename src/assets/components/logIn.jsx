

export default function LogIn({ChangeState}) {

    return(
        <form onSubmit={ChangeState} className='flex flex-col justify-center items-center w-full max-w-4xl px-6 py-16 bg-zinc-800 rounded-lg shadow-lg'>
            <label htmlFor="email" className="w-full text-left text-white font-light text-xl pl-2">Email</label>
            <input type='email' name='email' className="mt-1 focus:outline-none w-full text-2xl rounded-lg h-12 font-light text-zinc-800 px-3" />
            <label htmlFor="password" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Password</label>
            <input type='password' name='password' className="mt-1 focus:outline-none w-full text-2xl rounded-lg h-12 font-light text-zinc-800 px-3" />
            <button type="submit" className="w-full h-16 rounded-lg bg-cyan-400 text-white text-2xl font-light hover:cursor-pointer mt-8">Sign In</button>
        </form>
    )
}