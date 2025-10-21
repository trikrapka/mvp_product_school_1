import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { LessonScreen } from './components/LessonScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { Home, BookOpen, User } from 'lucide-react';

type Screen = 'home' | 'lesson' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);

  const startLesson = (lessonId: number) => {
    setCurrentLesson(lessonId);
    setCurrentScreen('lesson');
  };

  const completeLesson = () => {
    setCurrentScreen('home');
    setCurrentLesson(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Content Area */}
        <div className="pb-20">
          {currentScreen === 'home' && <HomeScreen onStartLesson={startLesson} />}
          {currentScreen === 'lesson' && currentLesson !== null && (
            <LessonScreen lessonId={currentLesson} onComplete={completeLesson} />
          )}
          {currentScreen === 'profile' && <ProfileScreen />}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'home' ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen('lesson')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'lesson' ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              <BookOpen size={24} />
              <span className="text-xs">Learn</span>
            </button>
            <button
              onClick={() => setCurrentScreen('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'profile' ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              <User size={24} />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
