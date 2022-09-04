import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'
import { AprendendoContext } from './AprendendoContext'

export function Router() {
  return (
    <Routes>
      <Route path="https://timer-pomodoro-ignite-rocket.vercel.app/" element={<DefaultLayout />}>
        <Route path="https://timer-pomodoro-ignite-rocket.vercel.app/" element={<Home />} />
        <Route path="https://timer-pomodoro-ignite-rocket.vercel.app/history" element={<History />} />

        <Route path="https://timer-pomodoro-ignite-rocket.vercel.app/1533" element={<AprendendoContext />} />
      </Route>
    </Routes>
  )
}
