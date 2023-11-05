import { supabase } from "../../../supabase/initialize"

import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { useEffect } from 'react'

import Header from "./header"

export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
      const getSessionData = async () => {
        const { data } = await supabase.auth.getSession()
        console.log(data.session)
        if (data.session === null) {
          navigate('/')
        } else if (data.session.user.aud == 'authenticated') {
          navigate('/dashboard')
        }
      }
      getSessionData()
    }, [])

    const location = useLocation()
    const currentPath = location.pathname

    return(
        <div className="min-h-screen w-screen bg-zinc-800 select-none">
            <Header />
            <main className={`max-w-[1600px] mx-auto`}>
              <div className="w-full min-[1600px]:px-[4px] bg-gradient-to-br from-teal-200 via-blue-300 to-cyan-400 shadow-md">
                <div className={`min-h-[calc(100vh-7rem)] ${currentPath === '/dashboard' ? null : 'px-2'} w-full shadow-inner bg-zinc-700 flex flex-col justify-start items-center py-8 md:py-16`}>
                  <Outlet />
                </div>
              </div>
            </main>
        </div>
    )
}