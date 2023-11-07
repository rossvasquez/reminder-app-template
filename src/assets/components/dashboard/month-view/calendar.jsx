

export default function Calendar({SelectedDate, setSelectedDate, CurrentDate, Gregorian, setShowCalendar}) {

    const handleSelectedDay = (id) => {
        setSelectedDate({
            ...SelectedDate,
            day:(id+1)
        })
        setShowCalendar(false)
    }

    const isToday = (id) => {
        let dayIsToday = false
        if (SelectedDate.year === CurrentDate.getFullYear()) {
            if (SelectedDate.month === CurrentDate.getMonth()) {
                if ((id+1) === CurrentDate.getDate()) {
                    dayIsToday = true
                }
            }
        }
        return dayIsToday
    }

    return(
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(6rem,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] gap-2">
            {Gregorian[SelectedDate.month].days.map((day, id) =>
                <div onClick={() => handleSelectedDay(id)} key={id} className="h-24 md:h-32 lg:h-40 rounded-md bg-zinc-800 hover:shadow-md hover:bg-opacity-60 hover:bg-neutral-400 hover:cursor-pointer hover:scale-[103%] transition-all">
                    <div className={`relative pl-2 pt-1 flex items-center w-full ${isToday(id) ? 'text-cyan-400' : 'text-white'}`}>
                        <p>{id + 1}</p> 
                        <p className="absolute right-2 text-zinc-300 text-sm">{isToday(id) ? 'Today' : null}</p>
                    </div>
                    <div className="px-2 md:px-3 py-1 md:py-2 gap-2 w-full rounded-lg flex flex-wrap">
                        {day.map((completed, id) =>
                            <div key={id} className={`w-3 md:w-5 h-3 md:h-5 rounded-full ${completed ? 'bg-cyan-400' : 'border-[.1rem] border-white'}`} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}