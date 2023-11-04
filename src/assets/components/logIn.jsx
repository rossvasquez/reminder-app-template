import { useState } from "react"

import { signUserIn } from "../../supabase/auth/signIn"

export default function LogIn({ChangeState}) {

    const [UserInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const handleEmail = (e) => {
        let tempObj = {...UserInfo}
        tempObj.email = e.target.value
        setUserInfo(tempObj)
    }

    const handlePassword = (e) => {
        let tempObj = {...UserInfo}
        tempObj.password = e.target.value
        setUserInfo(tempObj)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const logIn = await signUserIn(UserInfo)
        if (logIn) {
            ChangeState()
        } else {
            window.alert('Error logging in, please retry. If issue persists contact support.')
        }
        
      }

    return(
        <form onSubmit={(e) => handleLogin(e)} className='flex flex-col justify-center items-center w-full max-w-3xl px-4 md:px-6 py-6 bg-zinc-800 rounded-lg shadow-lg'>
            <p className="text-3xl font-semibold text-cyan-400 border-b-[1px] pb-4 w-full text-left mb-4 pl-2 font-normal">Log In</p>
            <label htmlFor="email" className="w-full text-left text-white font-light text-xl pl-2">Email</label>
            <input required onChange={(e) => handleEmail(e)} value={UserInfo.email} type='email' name='email' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="password" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Password</label>
            <input required onChange={(e) => handlePassword(e)} value={UserInfo.password} type='password' name='password' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <button type="submit" className="w-1/2 mx-auto h-16 rounded-full bg-cyan-400 hover:text-zinc-800 text-white text-2xl font-light hover:cursor-pointer mt-6 hover:bg-opacity-[90%] active:text-neutral-300">Let's Go!</button>
        </form>
    )
}