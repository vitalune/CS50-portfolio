'use client';

import { 
  BarChart3,
  TrendingUp,
  Calendar,
  Activity,
  Target,
  Award,
  Heart,
  Zap
} from 'lucide-react';

export default function Stats() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <BarChart3 className="h-8 w-8 mr-3" />
              Health & Stats Tracking
            </h1>
            <p className="text-blue-100 mt-1">
              Monitor your physical and mental health metrics
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Add Metric</span>
          </button>
        </div>
      </div>

      {/* Health Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Physical</h3>
              <p className="text-sm text-slate-400">Body metrics</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            No data yet
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Mental</h3>
              <p className="text-sm text-slate-400">Mood & focus</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            No data yet
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Energy</h3>
              <p className="text-sm text-slate-400">Daily levels</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            No data yet
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Progress</h3>
              <p className="text-sm text-slate-400">Trends</p>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            No data yet
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Weekly Overview
        </h3>
        <div className="h-64 bg-slate-600 rounded-lg flex items-center justify-center">
          <div className="text-center text-slate-400">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-500" />
            <p className="text-lg font-medium">Charts Coming Soon</p>
            <p className="text-sm">Start tracking metrics to see your progress visualized</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-slate-700 rounded-xl p-8 border border-slate-600 text-center">
        <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Activity className="h-12 w-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Start Tracking Your Health</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Begin monitoring your physical and mental wellness. Track metrics like mood, energy, 
          exercise, sleep, and more to understand your patterns and improve your quality of life.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
          <Heart className="h-5 w-5" />
          <span>Add First Health Metric</span>
        </button>
      </div>

      {/* Planned Features */}
      <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4">Planned Health Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Daily mood and energy tracking</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Sleep quality and duration logs</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Exercise and activity tracking</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Water intake and nutrition</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Meditation and mindfulness</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Progress charts and analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}