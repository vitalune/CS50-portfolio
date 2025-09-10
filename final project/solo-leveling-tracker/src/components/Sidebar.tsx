'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Target, 
  BarChart3, 
  Swords,
  Zap
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