import { useState, useEffect } from "react"

import arrow from '../../static/arrow.png'

import DayList from "./day-list"

import { getDots } from "../../../supabase/calendar/fetchDots"
import { signOut } from "../../../supabase/auth/signOut"

export default function Calendar({ChangeState}) {

    const [CurrentDate] = useState(new Date())

    const [SelectedDate, setSelectedDate] = useState({
        month: CurrentDate.getMonth(),
        day: CurrentDate.getDate(),
        year: CurrentDate.getFullYear()
    })

    const [ShowCalendar, setShowCalendar] = useState(true)

    const [Gregorian, setGregorian] = useState([
        {
            month: "January",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "February",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "March",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "April",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "May",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "June",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "July",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "August",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "September",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "October",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "November",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
        {
            month: "December",
            days: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        },
    ])

    useEffect(() => {
        let isLeapYear = false
        for (let i = 2024; i < 2100; i+=4) {
            if (SelectedDate.year === i) {
                isLeapYear = true
            }
        }
        let tempArr = [...Gregorian]
        let february = tempArr[1].days
        if (isLeapYear) {
            if (february.length === 28) {
                february.push([])
            }
        } else {
            if (february.length === 29) {
                february.pop()
            }
        }
        setGregorian(tempArr)
        
    }, [SelectedDate.year])

    useEffect(() => {
        const completedDots = async () => {
            let tempArr = [...Gregorian]
            let dotsArr = await getDots(SelectedDate.year)
            for (let i=0;i<dotsArr.length;i++) {
                tempArr[dotsArr[i].monthInd].days[dotsArr[i].dayInd] = dotsArr[i].completedArr
            }
            setGregorian(tempArr)
        }

        completedDots()
    }, [SelectedDate.year, ShowCalendar])

    const handleStepper = (direction) => {
        let tempObj = {...SelectedDate}
        if (direction == 'backwards') {
            if (SelectedDate.month > 0) {
                tempObj.month = tempObj.month - 1
            } else {
                tempObj.year = tempObj.year - 1
                tempObj.month = 11
            }
        } else {
            if (SelectedDate.month < 11) {
                tempObj.month = tempObj.month + 1
            } else {
                tempObj.year = tempObj.year + 1
                tempObj.month = 0
            }
        }
        setSelectedDate(tempObj)
    }

    const MonthStepper = () =>
    <div className="w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-center md:justify-start mt-4 mb-6 md:my-4">
        <div className="flex gap-2 scale-[80%] md:scale-100 mt-2 md:mt-0">
            <div onClick={() => handleStepper('backwards')} className="w-10 h-10 pr-1 flex justify-center items-center rounded-full bg-neutral-300 bg-opacity-0 -ml-4 md:-ml-0 md:active:bg-opacity-60 hover:cursor-pointer group">
                <img src={arrow} alt='Move Back A Month' className="rotate-180 h-2/3 group-hover:opacity-80 active:opacity-60" />
            </div>
            <div onClick={() => handleStepper('forwards')} className="w-10 h-10 flex justify-center items-center pl-1 rounded-full bg-neutral-300 bg-opacity-0 md:active:bg-opacity-60 hover:cursor-pointer group">
                <img src={arrow} alt='Move Forward A Month' className="h-2/3 group-hover:opacity-80 active:opacity-60" />
            </div>
        </div>
        <p className="md:px-4 text-3xl text-white font-semibold md:text-center md:mb-1">{Gregorian[SelectedDate.month].month} {SelectedDate.year}</p>
    </div>

    const isToday = (id) => {
        let truthy = false
        if (SelectedDate.year === CurrentDate.getFullYear()) {
            if (SelectedDate.month === CurrentDate.getMonth()) {
                if ((id+1) === CurrentDate.getDate()) {
                    truthy = true
                }
            }
        }
        return truthy
    }

    const handleCalendar = (id) => {
        let tempObj = {...SelectedDate}
        tempObj.day = (id+1)
        setSelectedDate(tempObj)
        setShowCalendar(false)
    }

    const handleSignOut = async () => {
      const signOutReturn = await signOut()
      if (signOutReturn) {
            ChangeState()
        } else {
            window.alert('Error signing out, please retry. If issue persists contact support.')
        }
    }
    const FullCalendar = () =>
    <div className="flex flex-col justify-start">
        <MonthStepper />
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(6rem,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] gap-2">
        {Gregorian[SelectedDate.month].days.map((day, id) =>
            <div onClick={() => handleCalendar(id)} key={id} className="h-24 md:h-32 lg:h-40 rounded-md bg-zinc-800 hover:shadow-md hover:bg-opacity-60 hover:bg-neutral-400 hover:cursor-pointer hover:scale-[103%] transition-all">
                <div className={`relative pl-2 pt-1 flex items-center w-full ${isToday(id) ? 'text-cyan-400' : 'text-white'}`}>
                    <p>{id + 1}</p> 
                    <p className="absolute right-2 text-zinc-300 text-sm">{isToday(id) ? 'Today' : null}</p>
                </div>
                <div className="px-3 py-2 gap-2 w-full rounded-lg flex flex-wrap">
                    {day.map((completed, id) =>
                        <div key={id} className={`w-3 h-3 rounded-full ${completed ? 'bg-cyan-400' : 'border-[.1rem] border-white'}`} />
                    )}
                </div>
            </div>
        )}
        </div>
        <div onClick={() => handleSignOut()} className='w-full rounded-lg bg-cyan-400 h-16 mt-8 flex justify-center items-center text-2xl text-white hover:bg-opacity-80 active:text-neutral-400 hover:cursor-pointer font-light'>Sign Out</div>
    </div>

    return(
        <div className="h-auto w-auto mt-6">
            {ShowCalendar && <FullCalendar />}
            {!ShowCalendar && <DayList Day={SelectedDate.day} Month={Gregorian[SelectedDate.month].month} MonthNum={SelectedDate.month} Year={SelectedDate.year} Back={() => setShowCalendar(true)} />}
        </div>
    )
}