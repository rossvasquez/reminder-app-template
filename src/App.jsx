import Home from './assets/components/homepage'
import Landing from './assets/components/homepage/landing'
import LogIn from './assets/components/auth/logIn'
import SignUp from './assets/components/auth/signUp'
import Dashboard from './assets/components/dashboard'

import { Routes, Route } from 'react-router-dom'

export default function App() {

  return(
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}
