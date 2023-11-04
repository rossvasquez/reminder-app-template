import { useState } from "react"

import { signUpUser } from "../../supabase/auth/signUp"

export default function SignUp({ChangeState}) {

    const [SignUpInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleName = (e) => {
        let tempObj = {...SignUpInfo}
        tempObj.name = e.target.value
        setSignUpInfo(tempObj)
    }

    const handleEmail = (e) => {
        let tempObj = {...SignUpInfo}
        tempObj.email = e.target.value
        setSignUpInfo(tempObj)
    }

    const handlePassword = (e) => {
        let tempObj = {...SignUpInfo}
        tempObj.password = e.target.value
        setSignUpInfo(tempObj)
    }

    const handlePassword2 = (e) => {
        let tempObj = {...SignUpInfo}
        tempObj.password2 = e.target.value
        setSignUpInfo(tempObj)
    }

    const [PasswordMatch, setPasswordMatch] = useState(true)

    const checkPasswordMatch = () => {
        if (SignUpInfo.password !== '' && SignUpInfo.password2 !== '') {
            if (SignUpInfo.password == SignUpInfo.password2) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        } else {
            setPasswordMatch(true)
        }
    }

    const preventDefault = (e) => {
        e.preventDefault()
        handleSignUp()
    }

    const handleSignUp = async () => {
        const didExecute = await signUpUser(SignUpInfo)
        if (didExecute) {
          ChangeState()
        } else {
          window.alert('Error signing up, please try again. If error persists contact support.')
        }
      }

    return(
        <form onSubmit={(e) => preventDefault(e)} className='flex flex-col justify-center items-center w-full max-w-3xl px-4 md:px-6 py-6 bg-zinc-800 rounded-lg shadow-lg'>
             <p className="text-3xl font-semibold text-cyan-400 border-b-[1px] pb-4 w-full text-left mb-4 pl-2 font-normal">Sign Up</p>
            <label htmlFor="name" className="w-full text-left text-white font-light text-xl pl-2">First Name</label>
            <input required onChange={(e) => handleName(e)} value={SignUpInfo.name} type='text' name='name' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="email" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Email</label>
            <input required onChange={(e) => handleEmail(e)} value={SignUpInfo.email} type='email' name='email' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="password" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Password</label>
            <input required onBlur={() => checkPasswordMatch()} onChange={(e) => handlePassword(e)} value={SignUpInfo.password} type='password' name='password' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            <label htmlFor="passwordCheck" className="w-full text-left text-white font-light text-xl pl-2 mt-4">Confirm Password</label>
            <input required onBlur={() => checkPasswordMatch()} onChange={(e) => handlePassword2(e)} value={SignUpInfo.password2} type='password' name='passwordCheck' className="mt-1 focus:outline-none w-full text-2xl rounded-sm h-14 font-light text-zinc-800 px-3" />
            {PasswordMatch ? null : <p className="text-xl text-cyan-400 mt-4 w-full font-light">Passwords Do Not Match</p>}
            <button type="submit" className="w-1/2 h-16 rounded-full bg-cyan-400 text-white text-2xl hover:text-zinc-800 text-white font-light hover:cursor-pointer hover:bg-opacity-[90%] active:text-neutral-300 mt-6">Count me in.</button>
        </form>
    )
}