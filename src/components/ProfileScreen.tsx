import { Settings, Award, Calendar, TrendingUp, Users, Video } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';

export function ProfileScreen() {
  const achievements = [
    { id: 1, title: 'First Lesson', description: 'Complete your first lesson', earned: true },
    { id: 2, title: 'Week Warrior', description: '7 day streak', earned: true },
    { id: 3, title: 'ASL Master', description: 'Complete all alphabet lessons', earned: false },
    { id: 4, title: 'Social Butterfly', description: 'Join a live practice session', earned: false },
  ];

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1>Profile</h1>
          <p className="text-gray-600">Track your progress</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Settings className="text-gray-600" size={24} />
        </button>
      </div>

      {/* User Info */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h2>John Doe</h2>
            <p className="text-gray-600">ASL Learner</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-orange-200">
          <div className="text-center">
            <div className="text-orange-600">7</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-orange-600">342</div>
            <div className="text-xs text-gray-600">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-orange-600">15</div>
            <div className="text-xs text-gray-600">Lessons Done</div>
          </div>
        </div>
      </Card>

      {/* Learning Stats */}
      <div className="mb-6">
        <h3 className="mb-3">Learning Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-gray-900">85%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-gray-900">24</div>
                <div className="text-xs text-gray-600">Days Active</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Video className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-gray-900">3</div>
                <div className="text-xs text-gray-600">Live Sessions</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Users className="text-pink-600" size={20} />
              </div>
              <div>
                <div className="text-gray-900">#12</div>
                <div className="text-xs text-gray-600">League Rank</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-6">
        <h3 className="mb-3">Weekly Activity</h3>
        <Card className="p-4">
          <div className="flex justify-between items-end h-32 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const heights = [60, 80, 40, 100, 70, 90, 50];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-t" style={{ height: `${heights[index]}%` }}>
                    <div 
                      className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-t w-full"
                      style={{ height: '100%' }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{day.slice(0, 1)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3>Achievements</h3>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            2/4
          </Badge>
        </div>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`p-4 ${achievement.earned ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'opacity-60'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                    : 'bg-gray-200'
                }`}>
                  <Award className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Practice CTA */}
      <Card className="mt-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Video size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-white">Live Practice Sessions</h3>
            <p className="text-sm text-white/90">Connect with native ASL speakers</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-white text-purple-600 py-3 rounded-lg hover:bg-white/90 transition-colors">
          Join Waiting List
        </button>
      </Card>
    </div>
  );
}
