import { useState } from "react"

import { signUserIn } from "../../../supabase/auth/sign-in"

import { useNavigate } from "react-router-dom"

export default function SIgnIn() {

    const navigate = useNavigate()

    const [UserInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserInfo({
            ...UserInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await signUserIn(UserInfo)
        if (response.didError) {
            window.alert(response.data)
        } else {
            navigate("/dashboard")
        }
        
      }

    return(
        <form onSubmit={(e) => handleLogin(e)} className='w-full max-w-3xl px-4 md:px-6 bg-zinc-800 rounded-sm shadow-lg'>
            <p className="text-3xl text-cyan-400 pl-1 min-w-[8rem] w-1/4 text-left my-6 font-light">Log In</p>
            <div className="flex flex-col justify-center items-center pb-4">
                <label htmlFor="email" className="w-full text-left text-white font-light text-xl pl-2">Email</label>
                <input required onChange={(e) => handleChange(e)} value={UserInfo.email} type='email' name='email' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
                <label htmlFor="password" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Password</label>
                <input required onChange={(e) => handleChange(e)} value={UserInfo.password} type='password' name='password' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
                <button type="submit" className="w-full mx-auto h-16 rounded-sm hover:bg-cyan-400 border-2 border-cyan-400 transition-all duration-[300ms] text-white text-2xl font-light hover:cursor-pointer mt-8 mb-1 md:mb-6 hover:bg-opacity-[90%] active:text-neutral-300">Let's Go</button>
            </div>
        </form>
    )
}