import { supabase } from './supabase/initialize'

import Dashboard from './assets/components/dashboard'
import Header from './assets/components/header'
import Landing from './assets/components/landing'
import LogIn from './assets/components/logIn'
import SignUp from './assets/components/signUp'

import { useState, useEffect } from 'react'

export default function App() {

  const [PageState, setPageState] = useState('landing')

  useEffect(() => {
    const getSessionData = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session === null) {
        return
      } else if (data.session.user.aud == 'authenticated') {
        setPageState('dashboard')
      }
    }
    getSessionData()
  }, [])

  return(
    <div className="min-h-screen w-screen bg-zinc-800 select-none">
        <Header />
        <main className={`max-w-[1600px] mx-auto`}>
          <div className="w-full min-[1600px]:px-[4px] bg-gradient-to-br from-teal-200 via-blue-300 to-cyan-400 shadow-md">
            <div className={`min-h-[calc(100vh-7rem)] ${PageState === 'dashboard' ? null : 'px-2'} w-full shadow-inner bg-zinc-700 flex flex-col justify-start items-center py-8 md:py-16`}>
              {PageState === 'landing' && <Landing GoToLogIn={() => setPageState('login')} GoToSignUp={() => setPageState('signup')} />}
              {PageState === 'signup' && <SignUp ChangeState={() => setPageState('dashboard')} />}
              {PageState === 'login' && <LogIn ChangeState={() => setPageState('dashboard')} />}
              {PageState === 'dashboard' && <Dashboard ChangeState={() => setPageState('landing')} />}
            </div>
          </div>
        </main>
    </div>
  )
}
