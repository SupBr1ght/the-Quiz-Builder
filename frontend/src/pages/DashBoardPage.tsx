import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Quiz = {
  id: string
  title: string
}

export default function DashboardPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3000/quiz/all')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error('Failed to fetch quizzes', err))
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/quiz/${id}`)
      setQuizzes(prev => prev.filter(q => q.id !== id))
    } catch (err) {
      console.error('Failed to delete quiz', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">All Quizzes</h1>

        <button
          onClick={() => navigate('/create')}
          className="mb-8 inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          ➕ Create New Quiz
        </button>

        {quizzes.length === 0 ? (
          <p className="text-gray-500 text-lg">No quizzes found.</p>
        ) : (
          <ul className="space-y-6">
            {quizzes.map(quiz => (
              <li
                key={quiz.id}
                className="p-6 bg-green-100 rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-semibold text-green-900">{quiz.title}</h2>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => navigate(`/edit/${quiz.id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => navigate(`/preview/${quiz.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
                  >
                    👁️ Preview
                  </button>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition-colors"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
