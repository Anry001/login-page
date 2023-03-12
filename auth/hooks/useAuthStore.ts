import {
  registerAuthorizationToken,
  removeAuthorizationToken,
} from '@/lib/axios';
import { create } from 'zustand';
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from 'zustand/middleware';

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  groups: string[];
  role: string;
  username: string;
  verified: boolean;
}
export interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface UseAuthStoreData {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUserData: (data: AuthData) => void;
  logout: () => void;
}

const useAuthStore = create(
  subscribeWithSelector(
    persist<UseAuthStoreData>(
      (set) => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        setUserData: ({ user, accessToken, refreshToken }) => {
          set({ user, accessToken, refreshToken });
        },
        logout: () => {
          set({ user: null, accessToken: null, refreshToken: null });
        },
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

useAuthStore.subscribe(
  (s) => s.accessToken,
  (accessToken) => {
    if (accessToken) registerAuthorizationToken(accessToken);
    else removeAuthorizationToken();
  },
  { fireImmediately: true },
);

export default useAuthStore;
