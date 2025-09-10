'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface UserStats {
  strength: number;
  endurance: number;
  intelligence: number;
  discipline: number;
}

export interface ProfileData {
  username: string;
  avatar: string;
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
    avatar: 'warrior',
    joinDate: new Date().toISOString(),
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
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [storedState, setStoredState] = useLocalStorage<UserState | null>('solo-leveling-user', null);

  useEffect(() => {
    if (storedState) {
      dispatch({ type: 'LOAD_STATE', state: storedState });
    }
  }, [storedState]);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

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