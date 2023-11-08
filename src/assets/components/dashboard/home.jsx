
import { useContext, useEffect } from "react"

import { DashboardContext } from "./dashboardContext"

import MonthView from './month-view'
import DayView from "./day-view"

import { getDots } from "../../../supabase/calendar/fetch-dots"
import { getName } from "../../../supabase/user/get-name"

export default function DashboardHome() {

    const { ShowCalendar, Gregorian, setGregorian, SelectedDate, UserName, setUserName } = useContext(DashboardContext)

    useEffect(() => {
        const fetchName = async () => {
          const name = await getName()
          setUserName(name)
        }

        fetchName()
    }, [])

    // Check for Leap Year

    useEffect(() => {
        let isLeapYear = false
        for (let i = 2024; i < 2100; i+=4) {
            if ((SelectedDate.year) === i) {
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
        
    }, [(SelectedDate.year)])

    // Get reminder info to set dot preview on calendar view

    useEffect(() => {
        const completedDots = async () => {
            let tempArr = [...Gregorian]
            let dotsArr = await getDots((SelectedDate.year))
            for (let i=0;i<dotsArr.length;i++) {
                tempArr[dotsArr[i].monthInd].days[dotsArr[i].dayInd] = dotsArr[i].completedArr
            }
            setGregorian(tempArr)
        }

        completedDots()
    }, [(SelectedDate.year), ShowCalendar])

    return(
        <div className='px-4 md:px-16 w-full'>
          <p className='w-full text-left text-4xl font-semibold text-white'>Hey <span className={`text-cyan-400 ${UserName == 'Loading' ? 'animate-pulse font-light' : null}`}>{UserName}</span></p>
          <p className='w-full text-left text-2xl font-light text-white mt-2'>Browse and add your reminders below.</p>
            <div className="h-auto w-auto mt-6">
                {ShowCalendar ? 
                <MonthView /> :
                <DayView />}
            </div>
        </div>
    )
}