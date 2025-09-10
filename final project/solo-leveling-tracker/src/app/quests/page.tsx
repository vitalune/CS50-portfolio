'use client';

import { 
  Target,
  Plus,
  Calendar,
  Clock,
  Award
} from 'lucide-react';

export default function Quests() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Target className="h-8 w-8 mr-3" />
              Daily Quests
            </h1>
            <p className="text-purple-100 mt-1">
              Complete your daily challenges to gain XP and level up!
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Quest</span>
          </button>
        </div>
      </div>

      {/* Quest Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Daily Habits</h3>
              <p className="text-sm text-slate-400">Recurring tasks</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            0 quests
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Time-based</h3>
              <p className="text-sm text-slate-400">Timed challenges</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            0 quests
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Achievements</h3>
              <p className="text-sm text-slate-400">Long-term goals</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            0 quests
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-slate-700 rounded-xl p-8 border border-slate-600 text-center">
        <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-12 w-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Quests Yet</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Start your journey by creating your first quest. Define daily habits, set challenges, 
          and track your progress as you level up your life!
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
          <Plus className="h-5 w-5" />
          <span>Create Your First Quest</span>
        </button>
      </div>

      {/* Coming Soon Features */}
      <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4">Coming Soon</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Custom quest creation</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Difficulty levels and XP rewards</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Quest categories and tags</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Progress tracking and streaks</span>
          </div>
        </div>
      </div>
    </div>
  );
}