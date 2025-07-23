import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashBoardPage'
import PreviewQuizPage from './pages/PreviewQuizPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path='preview/:id' element={<PreviewQuizPage />} />
    </Routes>
  )
}

export default App
