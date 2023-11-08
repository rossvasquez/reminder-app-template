
import { DashboardContextProvider } from "./dashboardContext"

import DashboardHome from "./home"

export default function Dashboard() {

    return(
        <DashboardContextProvider>
            <DashboardHome />
        </DashboardContextProvider>
    )
}