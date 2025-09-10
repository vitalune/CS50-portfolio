'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface UserStats {
  strength: number;
  endurance: number;
  intelligence: number;
  discipline: number;
}

export interface UserState {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  stats: UserStats;
}

type UserAction =
  | { type: 'ADD_XP'; amount: number }
  | { type: 'LEVEL_UP' }
  | { type: 'UPDATE_STAT'; stat: keyof UserStats; value: number };

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
    
    default:
      return state;
  }
}

interface UserContextType {
  state: UserState;
  addXP: (amount: number) => void;
  levelUp: () => void;
  updateStat: (stat: keyof UserStats, value: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const addXP = (amount: number) => {
    dispatch({ type: 'ADD_XP', amount });
  };

  const levelUp = () => {
    dispatch({ type: 'LEVEL_UP' });
  };

  const updateStat = (stat: keyof UserStats, value: number) => {
    dispatch({ type: 'UPDATE_STAT', stat, value });
  };

  return (
    <UserContext.Provider value={{ state, addXP, levelUp, updateStat }}>
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