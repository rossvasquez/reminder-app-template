

export default function DayHeader({Day, Month, Back, Arrow}) {

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

    return(
        <div className="relative flex items-center w-full">
            <p className="text-3xl md:text-4xl font-semibold text-white w-8/12">{Month} {getSuffix(Day)}'s Reminders</p>
            <div onClick={Back} className="absolute right-4 h-12 w-12 pr-1 flex justify-center items-center rounded-full bg-zinc-800 hover:bg-opacity-60 active:bg-opacity-100 hover:cursor-pointer">
                <img
                    src={Arrow}
                    alt='Back to Calendar'
                    className="rotate-180 scale-[55%]"
                />
            </div>
        </div>
    )
}