import { supabase } from "../initialize"

export const getDots = async (year) => {

    const returnObj = []

    const { data, error } = await supabase
        .from('reminders')
        .select('reminders, date')

    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }

    for (let i=0;i<data.length;i++) {

        let thisDate = data[i].date
        let monthIndex = thisDate.indexOf('/')
        let month = Number(thisDate.slice(0, monthIndex)) - 1
        let theRest = thisDate.slice(monthIndex+1)
        let dayIndex = theRest.indexOf('/')
        let day = Number(theRest.slice(0, dayIndex)) - 1
        let objYear = Number(theRest.slice(dayIndex+1))

        let selectedBool = []

        if (year == objYear) {
            for (let j=0;j<data[i].reminders.length;j++) {
                selectedBool.push(data[i].reminders[j].completed)
            }
            returnObj.push({
                monthInd: month,
                dayInd: day,
                completedArr: selectedBool,
            })
        }

    }

    return returnObj

}