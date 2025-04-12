// contexts/user-context.tsx
'use client'

import { createContext, useContext, useState } from 'react';
import { UserProfile } from '../components/layout/user-profile';

type UserContextType = {
  activeUser: UserProfile;
  setActiveUser: (user: UserProfile) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [activeUser, setActiveUser] = useState<UserProfile>({
    id: 0,
    name: 'Bill',
    initials: 'B',
  });

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Wrap your app with UserProvider in layout.tsx