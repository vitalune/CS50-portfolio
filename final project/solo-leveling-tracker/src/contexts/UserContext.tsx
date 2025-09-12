'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export interface UserStats {
  strength: number;
  endurance: number;
  intelligence: number;
  discipline: number;
}

export interface ProfileData {
  username: string;
  profilePicture?: string;
  joinDate: string;
}

export interface UserState {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  stats: UserStats;
  profile: ProfileData;
}

type UserAction =
  | { type: 'ADD_XP'; amount: number }
  | { type: 'LEVEL_UP' }
  | { type: 'UPDATE_STAT'; stat: keyof UserStats; value: number }
  | { type: 'UPDATE_PROFILE'; profile: Partial<ProfileData> }
  | { type: 'LOAD_STATE'; state: UserState };

const initialState: UserState = {
  level: 1,
  currentXP: 0,
  xpForNextLevel: 100,
  stats: {
    strength: 10,
    endurance: 10,
    intelligence: 10,
    discipline: 10,
  },
  profile: {
    username: 'Hunter',
    joinDate: '2025-01-01T00:00:00.000Z', // Fixed date to prevent hydration mismatch
  },
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'ADD_XP':
      const newXP = state.currentXP + action.amount;
      if (newXP >= state.xpForNextLevel) {
        return {
          ...state,
          level: state.level + 1,
          currentXP: newXP - state.xpForNextLevel,
          xpForNextLevel: Math.floor(state.xpForNextLevel * 1.2),
          stats: {
            strength: state.stats.strength + 1,
            endurance: state.stats.endurance + 1,
            intelligence: state.stats.intelligence + 1,
            discipline: state.stats.discipline + 1,
          },
        };
      }
      return { ...state, currentXP: newXP };
    
    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
        currentXP: 0,
        xpForNextLevel: Math.floor(state.xpForNextLevel * 1.2),
        stats: {
          strength: state.stats.strength + 1,
          endurance: state.stats.endurance + 1,
          intelligence: state.stats.intelligence + 1,
          discipline: state.stats.discipline + 1,
        },
      };
    
    case 'UPDATE_STAT':
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.stat]: action.value,
        },
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profile,
        },
      };
    
    case 'LOAD_STATE':
      return action.state;
    
    default:
      return state;
  }
}

interface UserContextType {
  state: UserState;
  addXP: (amount: number) => void;
  levelUp: () => void;
  updateStat: (stat: keyof UserStats, value: number) => void;
  updateProfile: (profile: Partial<ProfileData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from database when authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (status === 'loading') return;
      
      if (session?.user) {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const { user } = await response.json();
            dispatch({
              type: 'LOAD_STATE',
              state: {
                level: user.level,
                currentXP: user.currentXP,
                xpForNextLevel: user.xpForNextLevel,
                stats: {
                  strength: user.strength,
                  endurance: user.endurance,
                  intelligence: user.intelligence,
                  discipline: user.discipline,
                },
                profile: {
                  username: user.username,
                  profilePicture: user.profilePicture,
                  joinDate: user.joinDate,
                },
              },
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else if (status === 'unauthenticated') {
        // Use localStorage for unauthenticated users (fallback)
        try {
          const stored = localStorage.getItem('solo-leveling-user');
          if (stored) {
            const parsedState = JSON.parse(stored);
            dispatch({ type: 'LOAD_STATE', state: parsedState });
          }
        } catch (error) {
          console.error('Error loading from localStorage:', error);
        }
      }
      
      setIsLoading(false);
    };

    loadUserData();
  }, [session, status]);

  // Save to database for authenticated users, localStorage for others
  useEffect(() => {
    const saveUserData = async () => {
      if (isLoading) return;

      if (session?.user) {
        try {
          await fetch('/api/user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              level: state.level,
              currentXP: state.currentXP,
              xpForNextLevel: state.xpForNextLevel,
              strength: state.stats.strength,
              endurance: state.stats.endurance,
              intelligence: state.stats.intelligence,
              discipline: state.stats.discipline,
              profilePicture: state.profile.profilePicture,
              username: state.profile.username,
            }),
          });
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      } else {
        // Save to localStorage for unauthenticated users
        try {
          localStorage.setItem('solo-leveling-user', JSON.stringify(state));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
    };

    saveUserData();
  }, [state, session, isLoading]);

  const addXP = (amount: number) => {
    dispatch({ type: 'ADD_XP', amount });
  };

  const levelUp = () => {
    dispatch({ type: 'LEVEL_UP' });
  };

  const updateStat = (stat: keyof UserStats, value: number) => {
    dispatch({ type: 'UPDATE_STAT', stat, value });
  };

  const updateProfile = (profile: Partial<ProfileData>) => {
    dispatch({ type: 'UPDATE_PROFILE', profile });
  };

  return (
    <UserContext.Provider value={{ state, addXP, levelUp, updateStat, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}