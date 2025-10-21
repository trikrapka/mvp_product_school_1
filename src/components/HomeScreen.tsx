import { Flame, Trophy, Target, ChevronRight, Crown, Lock } from 'lucide-react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PaywallScreen } from './PaywallScreen';
import { useState } from 'react';

interface HomeScreenProps {
  onStartLesson: (lessonId: number) => void;
}

const lessons = [
  { id: 1, title: 'ASL Alphabet', description: 'Learn A-Z fingerspelling', progress: 75, locked: false },
  { id: 2, title: 'Basic Greetings', description: 'Hello, goodbye, thank you', progress: 40, locked: true },
  { id: 3, title: 'Family Signs', description: 'Mom, dad, sister, brother', progress: 20, locked: true },
  { id: 4, title: 'Common Phrases', description: 'Everyday conversations', progress: 0, locked: true },
  { id: 5, title: 'Numbers 1-100', description: 'Counting in ASL', progress: 0, locked: true },
];

export function HomeScreen({ onStartLesson }: HomeScreenProps) {
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleLessonClick = (lesson: any) => {
    if (lesson.locked && !isPremium) {
      setShowPaywall(true);
    } else {
      onStartLesson(lesson.id);
    }
  };

  const handlePaymentComplete = () => {
    setIsPremium(true);
    setShowPaywall(false);
  };

  if (showPaywall) {
    return <PaywallScreen onClose={() => setShowPaywall(false)} onPaymentComplete={handlePaymentComplete} />;
  }

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white">🤟</span>
          </div>
          <span className="text-orange-500">SignLearn</span>
        </div>
        <h1>Welcome back!</h1>
        <p className="text-gray-600">Continue your ASL journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Flame className="text-white" size={20} />
            </div>
            <div className="text-center">
              <div className="text-orange-600">7</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <Trophy className="text-white" size={20} />
            </div>
            <div className="text-center">
              <div className="text-yellow-600">342</div>
              <div className="text-xs text-gray-600">Total XP</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Crown className="text-white" size={20} />
            </div>
            <div className="text-center">
              <div className="text-blue-600">#12</div>
              <div className="text-xs text-gray-600">League</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Goal */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="text-purple-500" size={20} />
            <span className="text-purple-900">Daily Goal</span>
          </div>
          <span className="text-purple-600">12/20 XP</span>
        </div>
        <Progress value={60} className="h-2" />
      </Card>

      {/* Lessons */}
      <div>
        <h2 className="mb-4">Your Lessons</h2>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                lesson.locked && !isPremium ? 'opacity-60' : ''
              }`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  lesson.locked && !isPremium
                    ? 'bg-gray-200' 
                    : lesson.progress === 100
                    ? 'bg-gradient-to-br from-green-400 to-green-600'
                    : 'bg-gradient-to-br from-orange-400 to-orange-600'
                }`}>
                  <span className="text-white text-2xl">
                    {lesson.locked && !isPremium ? '🔒' : lesson.progress === 100 ? '✓' : '📚'}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{lesson.title}</h3>
                    {lesson.progress > 0 && (!lesson.locked || isPremium) && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {lesson.progress}%
                      </Badge>
                    )}
                    {lesson.locked && !isPremium && (
                      <Badge variant="outline" className="border-orange-200 text-orange-600">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                  {(!lesson.locked || isPremium) && lesson.progress > 0 && (
                    <Progress value={lesson.progress} className="h-1.5" />
                  )}
                </div>

                {(!lesson.locked || isPremium) && (
                  <ChevronRight className="text-gray-400" size={20} />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
