import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState(['']);
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const updated = [...questions];
        updated[index] = value;
        setQuestions(updated);
    };

    const handleSubmit = async () => {
        try {
            const quizRes = await axios.post('http://localhost:3000/quiz', {
                title,
                description,
                questions: questions.filter(q => q.trim() !== '')
                    .map(q => ({
                        text: q,
                        answers: [], // якщо є
                    }))
            });

            const quizId = quizRes.data.id;
            navigate(`/preview/${quizId}`);
        } catch (err) {
            console.error('Failed to create quiz', err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>

            <input
                className="mb-2 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
                placeholder="Quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="mb-4 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
                placeholder="Quiz description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="w-full max-w-md mb-4">
                <h2 className="font-semibold mb-2">Questions:</h2>
                {questions.map((q, i) => (
                    <input
                        key={i}
                        className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
                        placeholder={`Question ${i + 1}`}
                        value={q}
                        onChange={(e) => handleQuestionChange(i, e.target.value)}
                    />
                ))}
                <button
                    className="text-blue-500 underline text-sm mt-1"
                    onClick={handleAddQuestion}
                >
                    + Add another question
                </button>
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Create Quiz
            </button>
        </div>
    );
};

export default CreateQuizPage;
