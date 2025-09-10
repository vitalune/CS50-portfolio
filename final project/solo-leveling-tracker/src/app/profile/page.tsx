'use client';

import { useState } from 'react';
import { useUser, ProfileData } from '@/contexts/UserContext';
import ProfileSetup from '@/components/ProfileSetup';
import { 
  User, 
  Sword, 
  Shield, 
  Brain, 
  Target, 
  Award,
  TrendingUp,
  Star,
  Crown,
  Edit,
  Calendar,
  LucideIcon
} from 'lucide-react';

export default function Profile() {
  const { state, addXP, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);


  const handleProfileSave = (profileData: Partial<ProfileData>) => {
    updateProfile(profileData);
    setIsEditing(false);
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StatBar = ({ 
    icon: Icon, 
    label, 
    value, 
    color,
    maxValue = 50 
  }: { 
    icon: LucideIcon; 
    label: string; 
    value: number; 
    color: string;
    maxValue?: number;
  }) => {
    const percentage = (value / maxValue) * 100;
    
    return (
      <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium">{label}</span>
          </div>
          <span className="text-xl font-bold text-white">{value}</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${color.replace('bg-', 'bg-')}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <ProfileSetup
          initialProfile={state.profile}
          onSave={handleProfileSave}
          onCancel={() => setIsEditing(false)}
          isFirstTime={false}
        />
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 bg-slate-700 flex items-center justify-center">
                {state.profile.profilePicture ? (
                  <img 
                    src={state.profile.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-slate-300" />
                )}
              </div>
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{state.profile.username}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-xl font-semibold">Level {state.level}</span>
                </div>
                <div className="text-purple-100">
                  <span className="text-sm">Total XP: </span>
                  <span className="font-semibold">{state.currentXP + (state.level - 1) * 100}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-purple-200 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatJoinDate(state.profile.joinDate)}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-purple-100 mb-1">
                  <span>Progress to Level {state.level + 1}</span>
                  <span>{state.currentXP}/{state.xpForNextLevel} XP</span>
                </div>
                <div className="w-full bg-purple-800/50 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-500"
                    style={{ width: `${(state.currentXP / state.xpForNextLevel) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-blue-400" />
          Character Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatBar
            icon={Sword}
            label="Strength"
            value={state.stats.strength}
            color="bg-red-500"
          />
          <StatBar
            icon={Shield}
            label="Endurance"
            value={state.stats.endurance}
            color="bg-green-500"
          />
          <StatBar
            icon={Brain}
            label="Intelligence"
            value={state.stats.intelligence}
            color="bg-blue-500"
          />
          <StatBar
            icon={Target}
            label="Discipline"
            value={state.stats.discipline}
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Award className="h-6 w-6 mr-3 text-yellow-400" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 opacity-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-300">First Steps</h3>
              <p className="text-sm text-slate-400 mt-1">Complete your first quest</p>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 opacity-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-300">Level Up</h3>
              <p className="text-sm text-slate-400 mt-1">Reach level 5</p>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 opacity-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-300">Consistency</h3>
              <p className="text-sm text-slate-400 mt-1">Complete 7 days in a row</p>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Section (for testing) */}
      <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-3">Debug Actions</h3>
        <button
          onClick={() => addXP(25)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add 25 XP (Testing)
        </button>
      </div>
    </div>
  );
}