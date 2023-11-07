
import { useNavigate } from "react-router-dom"

import { signOut } from "../../../../supabase/auth/sign-out"

import Calendar from "./calendar"
import MonthStepper from "./month-stepper"

export default function MonthView({Gregorian, CurrentDate, SelectedDate, setSelectedDate, setShowCalendar}) {
    
    let navigate = useNavigate()

    const handleSignOut = async () => {
      const signOutReturn = await signOut()
      if (signOutReturn) {
            navigate('/')
        } else {
            window.alert('Error signing out, please retry. If issue persists contact support.')
        }
    }

    const SignOutBtn = () =>
    <div onClick={() => handleSignOut()} className='w-60 rounded-sm text-white border-2 border-cyan-400 transition-all duration-300 hover:bg-cyan-400 h-16 mt-14 flex justify-center items-center text-2xl text-white active:text-neutral-400 hover:cursor-pointer font-light'>Sign Out</div>

    return(
    <div className="flex flex-col justify-start">
        <MonthStepper Gregorian={Gregorian} SelectedDate={SelectedDate} setSelectedDate={setSelectedDate} />
        <Calendar SelectedDate={SelectedDate} setSelectedDate={setSelectedDate} CurrentDate={CurrentDate} Gregorian={Gregorian} setShowCalendar={setShowCalendar} />
        <SignOutBtn />
    </div>
    )
}