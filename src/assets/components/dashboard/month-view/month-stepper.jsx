
import { useContext } from 'react'
import { DashboardContext } from '../dashboardContext'

import arrow from '../../../static/arrow.png'

export default function MonthStepper() {

    const { Gregorian, SelectedDate, setSelectedDate } = useContext(DashboardContext)

    const handleStepper = (direction) => {
        let tempSelectedDate = {...SelectedDate}
        if (direction == 'backwards') {
            if (SelectedDate.month > 0) {
                tempSelectedDate.month = tempSelectedDate.month - 1
            } else {
                tempSelectedDate.year = tempSelectedDate.year - 1
                tempSelectedDate.month = 11
            }
        } else {
            if (SelectedDate.month < 11) {
                tempSelectedDate.month = tempSelectedDate.month + 1
            } else {
                tempSelectedDate.year = tempSelectedDate.year + 1
                tempSelectedDate.month = 0
            }
        }
        setSelectedDate(tempSelectedDate)
    }

    return(
        <div className="w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-center md:justify-start mt-4 mb-6 md:my-4">
            <div className="flex gap-2 scale-[80%] md:scale-100 mt-2 md:mt-0">
                <div onClick={() => handleStepper('backwards')} className="w-10 h-10 pr-1 flex justify-center items-center rounded-full bg-neutral-300 bg-opacity-0 -ml-4 md:-ml-0 hover:cursor-pointer group">
                    <img src={arrow} alt='Move Back A Month' className="rotate-180 h-2/3 group-hover:opacity-80 group-active:opacity-60" />
                </div>
                <div onClick={() => handleStepper('forwards')} className="w-10 h-10 flex justify-center items-center pl-1 rounded-full bg-neutral-300 bg-opacity-0 hover:cursor-pointer group">
                    <img src={arrow} alt='Move Forward A Month' className="h-2/3 group-hover:opacity-80 group-active:opacity-60" />
                </div>
            </div>
            <p className="md:px-4 text-3xl text-white font-semibold md:text-center md:mb-1">{Gregorian[SelectedDate.month].monthName} {SelectedDate.year}</p>
        </div>
    )
}