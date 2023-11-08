
import { useContext } from 'react'
import { DashboardContext } from '../dashboardContext'

import arrow from '../../../static/arrow.png'

export default function DayHeader({ MonthName }) {

    const { SelectedDate, setShowCalendar } = useContext(DashboardContext)

    const getSuffix = (dayNumber) => {
        if ([1, 21, 31].includes(dayNumber)) {
            return `${dayNumber}st`
        } else if ([2,22].includes(dayNumber)) {
            return `${dayNumber}nd`
        } else if ([3,23].includes(dayNumber)) {
            return `${dayNumber}rd`
        } else {
            return `${dayNumber}th`
        }
    }

    return(
        <div className="relative flex items-center w-full">
            <p className="text-3xl md:text-4xl font-semibold text-white w-8/12">{MonthName} {getSuffix(SelectedDate.day)}</p>
            <div onClick={() => setShowCalendar(true)} className="absolute right-4 h-12 w-12 pr-1 flex justify-center items-center rounded-full bg-zinc-800 hover:bg-opacity-60 active:bg-opacity-100 hover:cursor-pointer">
                <img
                    src={arrow}
                    alt='Back to Calendar'
                    className="rotate-180 scale-[55%]"
                />
            </div>
        </div>
    )
}