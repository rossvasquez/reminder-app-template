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
            <label htmlFor="email" className="w-full text-left text-white font-light text-xl pl-2">Email</label>
            <input required onChange={(e) => handleEmail(e)} value={UserInfo.email} type='email' name='email' className="mt-1 focus:outline-none w-full text-2xl rounded-lg h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="password" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Password</label>
            <input required onChange={(e) => handlePassword(e)} value={UserInfo.password} type='password' name='password' className="mt-1 focus:outline-none w-full text-2xl rounded-lg h-14 font-light text-zinc-800 px-3" />
            <div className="w-full relative h-8">
                <p className="absolute right-2 text-white mt-2 underline hover:cursor-pointer hover:opacity-60 active:text-cyan-400">Forgot Password</p>
            </div>
            <button type="submit" className="w-full h-16 rounded-lg bg-cyan-400 text-white text-2xl font-light hover:cursor-pointer mt-6">Log In</button>
        </form>
    )
}