import Home from './assets/components/homepage'
import Landing from './assets/components/homepage/landing'
import SignIn from './assets/components/auth/sign-in'
import SignUp from './assets/components/auth/sign-up'
import Dashboard from './assets/components/dashboard'

import { Routes, Route } from 'react-router-dom'

export default function App() {

  return(
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}
