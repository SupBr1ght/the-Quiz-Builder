import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Answer = {
  id: number
  text: string
}

type Question = {
  id: number
  text: string
  answers: Answer[]
}

type Quiz = {
  id: number
  title: string
  description: string
  createdAt: string
  questions: Question[]
}

export default function PreviewQuizPage() {
  const { id } = useParams<{ id: string }>()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [error, setError] = useState('')
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get<Quiz>(`http://localhost:3000/quiz/${id}`)
        setQuiz(data)
      } catch (err) {
        setError('Failed to load quiz.')
        console.error(err)
      }
    }

    fetchQuiz()
  }, [id])

  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }))
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</div>
  }

  if (!quiz) {
    return <div style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>Loading...</div>
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{quiz.title}</h1>
      <p style={descStyle}>{quiz.description}</p>

      {quiz.questions.length === 0 ? (
        <p style={noQuestionsStyle}>No questions found.</p>
      ) : (
        <form>
          {quiz.questions.map(question => (
            <div key={question.id} style={questionCardStyle}>
              <p style={questionTextStyle}>{question.text}</p>
              {question.answers.map(answer => (
                <div key={answer.id} style={answerWrapperStyle}>
                  <input
                    type="radio"
                    id={`answer-${question.id}-${answer.id}`}
                    name={`question-${question.id}`}
                    value={answer.id}
                    checked={selectedAnswers[question.id] === answer.id}
                    onChange={() => handleSelectAnswer(question.id, answer.id)}
                    style={radioInputStyle}
                  />
                  <label 
                    htmlFor={`answer-${question.id}-${answer.id}`}
                    style={radioLabelStyle}
                  >
                    {answer.text}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </form>
      )}
    </div>
  )
}

const containerStyle = {
  maxWidth: 700,
  margin: '40px auto',
  padding: 20,
  backgroundColor: '#f9fafb',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
} as React.CSSProperties

const titleStyle = {
  textAlign: 'center',
  fontSize: 32,
  marginBottom: 10,
  color: '#047857',
} as React.CSSProperties

const descStyle = {
  textAlign: 'center',
  marginBottom: 30,
  color: '#374151',
} as React.CSSProperties

const noQuestionsStyle = {
  textAlign: 'center',
  color: '#6b7280',
} as React.CSSProperties

const questionCardStyle = {
  backgroundColor: '#d1fae5',
  padding: 16,
  borderRadius: 6,
  marginBottom: 24,
  boxShadow: 'inset 0 0 8px rgba(4, 120, 87, 0.2)',
} as React.CSSProperties

const questionTextStyle = {
  fontWeight: 600,
  marginBottom: 12,
  fontSize: 18,
} as React.CSSProperties

const answerWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
} as React.CSSProperties


const radioInputStyle = {
  marginRight: 10,
  cursor: 'pointer',
  width: 16,
  height: 16,
  minWidth: 16,
  minHeight: 16,

  appearance: 'auto',
  WebkitAppearance: 'radio',
  MozAppearance: 'radio',

  opacity: 1,
  visibility: 'visible',
  display: 'block',
  position: 'relative',
  zIndex: 1,
} as React.CSSProperties

const radioLabelStyle = {
  cursor: 'pointer',
  fontSize: 16,
  userSelect: 'none',
  color: '#374151',
} as React.CSSProperties