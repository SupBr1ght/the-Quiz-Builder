import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Question = {
  id: number;
  text: string;
};

type Quiz = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  questions: Question[];
};

export default function PreviewQuizPage() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get<Quiz>(`http://localhost:3000/quiz/${id}`);
        setQuiz(response.data);
      } catch (err) {
        setError('Failed to load quiz.');
        console.error(err);
      }
    };

    fetchQuiz();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-green-200 rounded-xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">{quiz.title}</h1>
        <p className="text-gray-600 mb-6 text-center">{quiz.description}</p>

        <h2 className="text-lg font-semibold mb-2">Questions:</h2>
        <ul className="list-disc list-inside space-y-2">
          {quiz.questions.map((q) => (
            <li key={q.id}>{q.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
