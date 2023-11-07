import { useState } from "react"

import { signUpUser } from "../../../supabase/auth/sign-up"

import { useNavigate } from "react-router-dom"

export default function SignUp() {

    const navigate = useNavigate()

    const [FormInfo, setFormInfo] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        password_match: true,
        signup_error_message: '',
    })

    const handleChange = (e) => {
        setFormInfo({
            ...FormInfo,
            [e.target.name]: e.target.value
        })
    }

    const checkPasswordMatch = () => {
        if (FormInfo.password !== '' && FormInfo.password2 !== '') {
            if (FormInfo.password == FormInfo.password2) {
                setFormInfo({
                    ...FormInfo,
                    password_match: true
                })
            } else {
                setFormInfo({
                    ...FormInfo,
                    password_match: false
                })
            }
        } else {
            setFormInfo({
                ...FormInfo,
                password_match: true
            })
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const response = await signUpUser(FormInfo)
        if (response.didError) {
          window.alert(response.data)
        } else {
          navigate('/dashboard')
        }
      }

    return(
        <form onSubmit={(e) => handleSignUp(e)} className='w-full max-w-3xl px-4 md:px-6 bg-zinc-800 rounded-sm shadow-lg'>
            <p className="text-3xl font-light text-cyan-400 w-1/4 min-w-[10rem] text-left my-6 pl-1">Sign Up</p>
            <div className="flex flex-col justify-center items-center pb-4">
                <label htmlFor="name" className="w-full text-left text-white font-light text-xl pl-2">First Name</label>
                <input required onChange={(e) => handleChange(e)} value={FormInfo.name} type='text' name='name' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
                <label htmlFor="email" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Email</label>
                <input required onChange={(e) => handleChange(e)} value={FormInfo.email} type='email' name='email' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
                <label htmlFor="password" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Password</label>
                <input required onBlur={() => checkPasswordMatch()} onChange={(e) => handleChange(e)} value={FormInfo.password} type='password' name='password' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
                <label htmlFor="passwordCheck" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Confirm Password</label>
                <input required onBlur={() => checkPasswordMatch()} onChange={(e) => handleChange(e)} value={FormInfo.password2} type='password' name='password2' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
                {FormInfo.password_match ? null : <p className="text-xl text-cyan-400 mt-4 w-full font-light">Passwords Do Not Match</p>}
                <button type="submit" className="w-full h-16 rounded-sm transition-all border-2 border-cyan-400 hover:bg-cyan-400 text-white text-2xl duration-[300ms] text-white font-light hover:cursor-pointer active:text-neutral-300 mt-8 mb-1 md:mb-6">Let's Go</button>
            </div>
        </form>
    )
}