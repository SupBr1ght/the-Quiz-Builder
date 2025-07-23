import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Answer {
  id?: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id?: number;
  text: string;
  answers: Answer[];
}

interface Quiz {
  id?: number;
  title: string;
  description?: string;
  questions: Question[];
}

const EditQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>({
    title: '',
    description: '',
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // upload quiz by id
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3000/quiz/${id}`)
      .then(res => {
        setQuiz(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load quiz');
        setLoading(false);
      });
  }, [id]);

  // handle changes in form
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz(prev => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz(prev => ({ ...prev, description: e.target.value }));
  };

  // change question
  const handleQuestionTextChange = (index: number, text: string) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].text = text;
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  // change answer
  const handleAnswerChange = (qIndex: number, aIndex: number, text: string) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].answers[aIndex].text = text;
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  // change new corrects qwestion
  const handleAnswerCorrectToggle = (qIndex: number, aIndex: number) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].answers[aIndex].isCorrect = !newQuestions[qIndex].answers[aIndex].isCorrect;
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  // Add new question 
  const addQuestion = () => {
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', answers: [] }],
    }));
  };

  // Add answer to the quiz
  const addAnswer = (qIndex: number) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].answers.push({ text: '', isCorrect: false });
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  // Send updated quiz
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/quiz/${id}`, quiz);
      navigate(`/preview/${id}`);
    } catch (err) {
      setError('Failed to update quiz');
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Edit Quiz</h1>

    <input
      type="text"
      value={quiz.title}
      onChange={handleTitleChange}
      placeholder="Quiz Title"
      className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
    <input
      type="text"
      value={quiz.description}
      onChange={handleDescriptionChange}
      placeholder="Quiz Description"
      className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />

    {quiz.questions.map((question, qIndex) => (
      <div
        key={qIndex}
        className="mb-8 p-4 border rounded-lg bg-gray-50 shadow-sm"
      >
        <div className="flex justify-between items-center mb-3">
          <input
            type="text"
            value={question.text}
            onChange={e => handleQuestionTextChange(qIndex, e.target.value)}
            placeholder={`Question #${qIndex + 1}`}
            className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={() => addAnswer(qIndex)}
            className="ml-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
          >
            + Add Answer
          </button>
        </div>

        {question.answers.map((answer, aIndex) => (
          <div
            key={aIndex}
            className="flex items-center mb-2 ml-6"
          >
            <input
              type="text"
              value={answer.text}
              onChange={e => handleAnswerChange(qIndex, aIndex, e.target.value)}
              placeholder={`Answer #${aIndex + 1}`}
              className="flex-grow px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <label className="flex items-center ml-4 space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleAnswerCorrectToggle(qIndex, aIndex)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700 select-none">Correct</span>
            </label>
          </div>
        ))}
      </div>
    ))}

    <div className="flex justify-between">
      <button
        onClick={addQuestion}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
      >
        + Add Question
      </button>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md transition"
      >
        Save Quiz
      </button>
    </div>
  </div>
);

};

export default EditQuizPage;
