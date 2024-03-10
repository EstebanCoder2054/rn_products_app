import { create } from 'zustand';
import { User } from '../../../domain/entities/user';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import {
  authCheckStatus,
  authLogin,
  authRegister,
} from '../../../actions/auth/auth';
import { StorageAdapter } from '../../../config/adapters/async-storage';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, _get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  register: async (email: string, password: string, fullName: string) => {
    const resp = await authRegister(email, password, fullName);
    if (!resp) {
      set({ status: 'unathenticated', token: undefined, user: undefined });
      return false;
    }

    // Saving the token in the async storage
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true; // this is because of the Promise<boolean> definition
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: 'authenticated', token: undefined, user: undefined });
      return false; // this is because of the Promise<boolean> definition
    }
    // Saving the token in the async storage
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true; // this is because of the Promise<boolean> definition
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: 'unathenticated', token: undefined, user: undefined });
      return;
    }
    // Updating the token in the async storage
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },

  logout: async () => {
    // Delete the token from the async storage
    await StorageAdapter.removeItem('token');
    set({ status: 'unathenticated', token: undefined, user: undefined });
  },
}));
