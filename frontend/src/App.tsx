import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashBoardPage'
import PreviewQuizPage from './pages/PreviewQuizPage'
import CreateQuizPage from './pages/CreateQuizPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path='preview/:id' element={<PreviewQuizPage />} />
      <Route path='create' element={<CreateQuizPage />} />
    </Routes>
  )
}

export default App
