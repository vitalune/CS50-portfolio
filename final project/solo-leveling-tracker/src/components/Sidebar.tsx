'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { 
  Home, 
  User, 
  Target, 
  BarChart3, 
  Swords,
  Zap,
  Star,
  Sword,
  Shield,
  Brain,
  Crown,
  LucideIcon
} from 'lucide-react';
import { clsx } from 'clsx';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    name: 'Quests',
    href: '/quests',
    icon: Target,
  },
  {
    name: 'Stats',
    href: '/stats',
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useUser();

  const getAvatarIcon = (avatarType: string): LucideIcon => {
    const avatarMap: Record<string, LucideIcon> = {
      warrior: Sword,
      paladin: Shield,
      mage: Brain,
      archer: Target,
      assassin: Star,
      king: Crown,
    };
    return avatarMap[avatarType] || User;
  };

  const getAvatarColor = (avatarType: string) => {
    const colorMap: Record<string, string> = {
      warrior: 'bg-red-500',
      paladin: 'bg-yellow-500',
      mage: 'bg-blue-500',
      archer: 'bg-green-500',
      assassin: 'bg-purple-500',
      king: 'bg-amber-500',
    };
    return colorMap[avatarType] || 'bg-slate-500';
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Swords className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Solo Leveling</h1>
            <p className="text-sm text-slate-400">Tracker</p>
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="p-4 border-b border-slate-700">
        <Link href="/profile" className="block">
          <div className="bg-slate-800 hover:bg-slate-750 rounded-lg p-3 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-600 bg-slate-700 flex items-center justify-center">
                  {state.profile?.profilePicture ? (
                    <img 
                      src={state.profile.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${getAvatarColor(state.profile?.avatar || 'warrior')}`}>
                      {(() => {
                        const AvatarIcon = getAvatarIcon(state.profile?.avatar || 'warrior');
                        return <AvatarIcon className="h-5 w-5 text-white" />;
                      })()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{state.profile?.username || 'Hunter'}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span className="text-slate-400">Level {state.level}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{state.currentXP} XP</span>
                </div>
              </div>
            </div>
            
            {/* Mini XP Bar */}
            <div className="mt-2">
              <div className="w-full bg-slate-600 rounded-full h-1">
                <div 
                  className="h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${(state.currentXP / state.xpForNextLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md hover:shadow-purple-500/10'
                  )}
                >
                  <item.icon 
                    className={clsx(
                      'h-5 w-5 transition-all duration-200',
                      isActive 
                        ? 'text-white' 
                        : 'text-slate-400 group-hover:text-purple-400'
                    )} 
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-2 text-slate-400 text-sm">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span>Level up your life</span>
        </div>
      </div>
    </div>
  );
}