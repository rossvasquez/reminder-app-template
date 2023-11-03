import Calendar from "./calendar"

import { useState, useEffect } from 'react'

import { getName } from "../../../supabase/user/getName"

export default function Dashboard({ChangeState}) {

    const [UserName, setUserName] = useState('Loading')

    useEffect(() => {
        const fetchName = async () => {
          const name = await getName()
          setUserName(name)
        }

        fetchName()
    }, [])

    return(
        <div className='px-4 md:px-16 w-full'>
          <p className='w-full text-left text-4xl font-semibold text-white'>Hey <span className={`text-cyan-400 ${UserName == 'Loading' ? 'animate-pulse font-light' : null}`}>{UserName}</span></p>
          <p className='w-full text-left text-2xl font-light text-white mt-2'>Browse and add your reminders below.</p>
          <Calendar ChangeState={ChangeState} />
        </div>
    )
}