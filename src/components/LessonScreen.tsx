import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LessonScreenProps {
  lessonId: number;
  onComplete: () => void;
}

interface Question {
  id: number;
  type: 'multiple-choice' | 'picture-match' | 'dialogue';
  videoUrl?: string;
  imageUrl?: string;
  question: string;
  options: { id: string; label: string; imageUrl?: string }[];
  correctAnswer: string;
  explanation?: string;
}

const lessonQuestions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Which letter is being signed?',
    imageUrl: '/images/lessons/thumbs-up.jpg',
    options: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
      { id: 'E', label: 'E' },
      { id: 'F', label: 'F' },
    ],
    correctAnswer: 'A',
    explanation: 'The letter A is signed with a closed fist and thumb to the side.',
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Which letter is being signed?',
    imageUrl: '/images/lessons/three-finder-salute.png',
    options: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
      { id: 'E', label: 'E' },
      { id: 'F', label: 'F' },
    ],
    correctAnswer: 'B',
    explanation: 'The letter B is signed with an open palm and thumb across.',
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'Choose the correct option!',
    imageUrl: '/images/lessons/images.jpeg',
    options: [
      { id: '1', label: 'Play' },
      { id: '2', label: 'Rock' },
    ],
    correctAnswer: '1',
    explanation: 'Great job! The sign represents "play" in ASL.',
  },
];

export function LessonScreen({ lessonId, onComplete }: LessonScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = lessonQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / lessonQuestions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerId: string) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < lessonQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onComplete} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
          <Progress value={progress} className="flex-1 h-3" />
          <span className="text-sm text-gray-600">
            {currentQuestionIndex + 1}/{lessonQuestions.length}
          </span>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-4 py-6">
        <h2 className="mb-6 text-center">{currentQuestion.question}</h2>

        {/* Video/Image Display */}
        <Card className="mb-6 p-6 bg-gray-50">
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            <ImageWithFallback
              src={currentQuestion.imageUrl}
              alt="Sign demonstration"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        {/* Multiple Choice Options */}
        {currentQuestion.type === 'multiple-choice' && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                  selectedAnswer === option.id
                    ? showResult
                      ? option.id === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white ring-4 ring-green-200'
                        : 'bg-red-500 text-white ring-4 ring-red-200'
                      : 'bg-orange-500 text-white ring-4 ring-orange-200'
                    : showResult && option.id === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={showResult}
              >
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Picture Match Options */}
        {currentQuestion.type === 'picture-match' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`relative rounded-xl overflow-hidden transition-all ${
                  selectedAnswer === option.id
                    ? showResult
                      ? option.id === currentQuestion.correctAnswer
                        ? 'ring-4 ring-green-500'
                        : 'ring-4 ring-red-500'
                      : 'ring-4 ring-orange-500'
                    : 'ring-2 ring-gray-200'
                }`}
                disabled={showResult}
              >
                <div className="aspect-video bg-gray-200">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x300/?${option.imageUrl}`}
                    alt={option.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedAnswer === option.id && showResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      {option.id === currentQuestion.correctAnswer ? '✓' : '✗'}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <Card className={`p-4 mb-6 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-green-500' : 'bg-orange-500'
              }`}>
                <span className="text-white">{isCorrect ? '✓' : '!'}</span>
              </div>
              <div>
                <h3 className={isCorrect ? 'text-green-900' : 'text-orange-900'}>
                  {isCorrect ? 'Correct!' : 'Not quite!'}
                </h3>
                <p className="text-sm text-gray-700 mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Button */}
        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
          size="lg"
          onClick={showResult ? handleNext : handleCheckAnswer}
          disabled={!selectedAnswer}
        >
          {showResult 
            ? currentQuestionIndex < lessonQuestions.length - 1 
              ? 'Next' 
              : 'Finish'
            : 'Check Answer'
          }
        </Button>
      </div>
    </div>
  );
}
