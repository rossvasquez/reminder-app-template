import task from '../../static/task.png'

export default function Header() {

    return(
        <header className="flex items-center w-full h-28 bg-gradient-to-br from-cyan-400 via-teal-200 to-blue-300 px-4 md:px-10">
          <img
            src={task}
            alt='Reminder App Logo'
            className="h-20 w-20 drop-shadow-md"
          />
        </header>
    )
}