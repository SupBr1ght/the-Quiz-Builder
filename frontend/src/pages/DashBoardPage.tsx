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
        axios.get('http://localhost:3000/quiz/all')
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-3xl text-center">
      <h1 className="text-3xl font-bold mb-6">All Quizzes</h1>

      <button
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => navigate('/create')}
      >
        ➕ Create New Quiz
      </button>

      {quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes found.</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map(quiz => (
            <li
              key={quiz.id}
              className="p-4 bg-green-200 shadow rounded flex flex-col items-center gap-2"
            >
              <div>
                <h2 className="text-lg font-semibold">{quiz.title}</h2>
                <p className="text-sm text-gray-500">ID: {quiz.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit/${quiz.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => navigate(`/preview/${quiz.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  👁️ Preview
                </button>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
