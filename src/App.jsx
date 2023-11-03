import task from './assets/static/task.png'

import Calendar from './assets/components/calendar'
import LogIn from './assets/components/logIn'
import SignUp from './assets/components/signUp'

import { useState, useEffect } from 'react'

import { fetchUserInfo } from './supabase/getUserInfo'

export default function App() {

  const [PageState, setPageState] = useState('landing')

  const [UserName, setUserName] = useState('Loading')

  const Header = () =>
  <header className="flex items-center w-full h-28 bg-gradient-to-br from-cyan-400 via-teal-200 to-blue-300 px-10">
    <img
      src={task}
      alt='Reminder App Logo'
      className="h-20 w-20 drop-shadow-md"
    />
  </header>

  const LandingMessage = () =>
  <div className='flex flex-col justify-center items-center px-24 py-16 bg-zinc-800 rounded-lg shadow-lg'>
    <h1 className="text-white text-5xl font-semibold">The Reminder App</h1>
    <h2 className="text-white text-3xl font-light max-w-[40rem] text-center leading-[3rem] mt-6">Keep track of the tasks that mean the most to you. Create an account to start your journey of worrying less and doing more.</h2>
    <div className="flex gap-4 mt-16 max-w-[36rem] w-full">
      <button onClick={() => setPageState('signup')} className="h-20 w-full bg-transparent border-2 border-white text-white rounded-full text-3xl pb-1 font-light hover:cursor-pointer hover:text-cyan-400">Sign Up</button>
      <button onClick={() => setPageState('login')} className="h-20 w-full bg-cyan-400 text-zinc-800 rounded-full text-3xl pb-1 font-light hover:shadow-md hover:cursor-pointer hover:text-white">Log In</button>
    </div>
  </div>

  useEffect(() => {
    if (PageState === 'dashboard') {
      const getName = async () => {
        const name = await fetchUserInfo()
        console.log(name)
        setUserName(name)
      }
      getName()
    }
  }, [PageState])

  const Reminders = () =>
  <div className='px-4 md:px-6 w-full'>
    <p className='w-full text-left text-4xl font-semibold text-white md:px-10'>Hey <span className={`text-cyan-400 ${UserName == 'Loading' ? 'animate-pulse font-light' : null}`}>{UserName}</span></p>
    <p className='w-full text-left text-2xl font-light text-white md:px-10 mt-2'>Browse and add your reminders below.</p>
    <Calendar />
  </div>

  return(
    <div className="min-h-screen w-screen bg-zinc-800">
        <Header />
        <main className="max-w-[1600px] mx-auto">
          <div className="w-full min-[1600px]:px-[4px] bg-gradient-to-br from-teal-200 via-blue-300 to-cyan-400 shadow-md">
            <div className="min-h-[calc(100vh-7rem)] w-full shadow-inner bg-zinc-700 flex flex-col justify-start items-center py-8 md:py-16">
              {PageState === 'landing' && <LandingMessage />}
              {PageState === 'signup' && <SignUp ChangeState={() => setPageState('dashboard')} />}
              {PageState === 'login' && <LogIn ChangeState={() => setPageState('dashboard')} />}
              {PageState === 'dashboard' && <Reminders />}
            </div>
          </div>
        </main>
    </div>
  )
}
