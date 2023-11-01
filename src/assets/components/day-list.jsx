import { useState } from "react"

export default function DayList({Month, Day, Back}) {

    const [Reminders, setReminders] = useState([])

    const [AddReminder, setAddReminder] = useState(false)

    const getSuffix = (Day) => {
        if ([1, 21, 31].includes(Day)) {
            return `${Day}st`
        } else if ([2,22].includes(Day)) {
            return `${Day}nd`
        } else if ([3,23].includes(Day)) {
            return `${Day}rd`
        } else {
            return `${Day}th`
        }
    }

    const ReminderForm = () => {

        const [ReminderToAdd, setReminderToAdd] = useState({
            reminder: '',
            comments: '',
            completed: false
        })

        const [ShowError, setShowError] = useState(false)

        const handleReminder = (e) => {
            let tempObj = {...ReminderToAdd}
            tempObj.reminder = e.target.value
            setReminderToAdd(tempObj)
        }

        const handleComments = (e) => {
            let tempObj = {...ReminderToAdd}
            tempObj.comments = e.target.value
            setReminderToAdd(tempObj)
        }

        const formHandler = (e) => {
            e.preventDefault()
            if (ReminderToAdd.reminder == '') {
                setShowError(true)
            } else {
                let tempArr = [...Reminders]
                tempArr.push(ReminderToAdd)
                setReminders(tempArr)
                setAddReminder(false)
                setShowError(false)
                setReminderToAdd({
                    reminder: '',
                    comments: '',
                    completed: false
                })
            }
        }

        return(
            <form onSubmit={(e) => formHandler(e)} className="flex flex-col max-w-5xl mx-auto mt-8">
                <div className="flex w-full relative items-center">
                    <label for="Reminder" className="text-white font-light text-xl">Reminder</label>
                    {ShowError ? <p className="text-cyan-400 absolute right-2">Please Fill Out</p> : null}
                </div>
                <input onChange={(e) => handleReminder(e)} value={ReminderToAdd.reminder} placeholder="ex. Go to Grocery Store" name="Reminder" type="text" className="mt-1 focus:outline-none text-2xl rounded-lg h-12 font-light text-zinc-800 px-3" />
                <label for="Comments" className="text-white font-light text-xl mt-4">Comments (Optional)</label>
                <textarea onChange={(e) => handleComments(e)} value={ReminderToAdd.comments} placeholder="ex. Get Milk, Eggs, and Bacon" name="Comments" className="mt-1 focus:outline-none text-2xl rounded-lg h-40 font-light text-zinc-800 px-3 py-1 resize-none" />
                <button type="submit" className="w-full rounded-lg mt-6 bg-cyan-400 text-white h-14 text-xl hover:bg-opacity-[80%] active:text-neutral-300">Add</button>
            </form>
        )
    }

    const handleCompleted = (id, action) => {
        let tempArr = [...Reminders]
        if (action == 'select') {
            tempArr[id].completed = true
        } else if (action == 'deselect') {
            tempArr[id].completed = false
        }
        
        setReminders(tempArr)
    }

    const removeReminder = (id) => {
        let tempArr = [...Reminders]
        let firstHalf = tempArr.slice(0,id)
        let secondHalf = tempArr.slice(id+1)
        setReminders([...firstHalf, ...secondHalf])
    }

    return(
        <>
        <div className="relative flex items-center w-full">
            <p className="text-4xl font-semibold text-white">{Month} {getSuffix(Day)}'s Reminders</p>
            <div onClick={Back} className="absolute right-4 px-6 py-3 rounded-lg bg-cyan-400 text-white hover:bg-opacity-60 active:bg-cyan-300 hover:cursor-pointer">
                Back
            </div>
        </div>
        <div className={`${Reminders.length === 0 ? 'flex justify-center items-center px-2' : 'p-4' } min-h-[20rem] mt-6 text-3xl font-light rounded-lg border-2 text-white border-zinc-800`}>
            {Reminders.length === 0 ? "There's nothing here 😞" : 
            <div className="flex flex-col gap-4">
            {Reminders.map((item, id) =>
            <div className="w-full flex gap-4">
                <div onClick={Reminders[id].completed ? () => handleCompleted(id, 'deselect') : () => handleCompleted(id, 'select')} className={`h-4 w-4 mt-3 rounded-full hover:cursor-pointer ${Reminders[id].completed ? 'bg-cyan-400' : 'border-2 border-white hover:bg-white hover:bg-opacity-40'}`} />
                <div className="flex flex-col">
                    <p className="font-semibold">{item.reminder}</p>
                    <p className="text-xl text-neutral-200">{item.comments}</p>
                    <p onClick={() => removeReminder(id)} className="text-lg underline text-neutral-300 hover:cursor-pointer hover:opacity-80 active:text-cyan-400">Remove</p>
                </div>
            </div>
            )}
            </div>
            }
        </div>
        {AddReminder ? <ReminderForm /> :
        <div onClick={() => setAddReminder(true)} className="max-w-6xl mt-4 w-full h-12 rounded-lg border-2 border-cyan-400 mx-auto flex justify-center items-center text-white text-2xl pb-1 font-semibold hover:cursor-pointer hover:bg-cyan-400">+</div>
        }
        </>
    )
}