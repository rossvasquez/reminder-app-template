
import React from "react"

import { useState } from "react"

import { gregorian } from '../../data/gregorian-calendar'
 
export const DashboardContext = React.createContext()

export const DashboardContextProvider = ({ children }) => {

    const [Gregorian, setGregorian] = useState(gregorian)

    const [CurrentDate] = useState(new Date())

    const [SelectedDate, setSelectedDate] = useState({
        month: CurrentDate.getMonth(),
        day: CurrentDate.getDate(),
        year: CurrentDate.getFullYear()
    })

    const [ShowCalendar, setShowCalendar] = useState(true)

    const [UserName, setUserName] = useState('Loading')

    return (
        <DashboardContext.Provider value={{ 
            CurrentDate, 
            SelectedDate, setSelectedDate,
            ShowCalendar, setShowCalendar, 
            Gregorian, setGregorian,
            UserName, setUserName, 
            }}>
            {children}
        </DashboardContext.Provider>
    );
};