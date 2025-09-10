'use client';

import { useUser } from '@/contexts/UserContext';
import XPBar from '@/components/XPBar';
import { 
  Sword, 
  Shield, 
  Brain, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const { state } = useUser();

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    color 
  }: { 
    icon: any; 
    label: string; 
    value: number; 
    color: string; 
  }) => (
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-purple-500/50 transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Hunter!</h1>
            <p className="text-purple-100 mt-1">
              Level {state.level} • Ready to level up your life?
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span className="text-lg font-semibold">
                {state.currentXP}/{state.xpForNextLevel} XP
              </span>
            </div>
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-purple-100 mb-2">
            <span>Progress to Level {state.level + 1}</span>
            <span>{Math.round((state.currentXP / state.xpForNextLevel) * 100)}%</span>
          </div>
          <XPBar />
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-400" />
          Your Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Sword}
            label="Strength"
            value={state.stats.strength}
            color="bg-red-500"
          />
          <StatCard
            icon={Shield}
            label="Endurance"
            value={state.stats.endurance}
            color="bg-green-500"
          />
          <StatCard
            icon={Brain}
            label="Intelligence"
            value={state.stats.intelligence}
            color="bg-blue-500"
          />
          <StatCard
            icon={Target}
            label="Discipline"
            value={state.stats.discipline}
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Quests */}
        <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400" />
              Today&apos;s Quests
            </h3>
            <span className="text-sm text-slate-400">0/0 Complete</span>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-400">No quests available yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Set up your daily challenges to start earning XP!
            </p>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
              Weekly Goals
            </h3>
            <span className="text-sm text-slate-400">0% Complete</span>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-400">No weekly goals set</p>
            <p className="text-sm text-slate-500 mt-1">
              Define your long-term objectives to track progress!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
