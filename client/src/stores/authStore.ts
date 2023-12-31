import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { notify } from '@/helpers';
import { token } from '@/constants';
import { authApi, userApi } from '@/api';
import { IUser, TokenUser } from '@/types';

const ACCESS_TOKEN = token.access_token;
const REFRESH_TOKEN = token.refresh_token;

type Store = {
   currentUser: IUser | null;
   isLogin: boolean;
   previousLocation: string;
};

type Actions = {
   logOut: () => void;
   saveToken: (token: TokenUser) => void;
   removeToken: () => void;
   setCurrentUser: (values: IUser) => void;
   updateInfo: (values: Partial<IUser>) => void;
   setPreviousLocation: (location: string) => void;
   adminLogin: (value: any) => void;
   updateUser: (userId: string, data: any) => void;
   signinWithGoogle: (token: string) => any;
};

const initialState = {
   currentUser: null,
   isLogin: false,
   previousLocation: '/',
};

const authStore = create<Store & Actions>()(
   persist(
      (set, get) => ({
         ...initialState,
         logOut: () => {
            set({ currentUser: null, isLogin: false });
            get().removeToken();
         },
         saveToken: (token) => {
            localStorage.setItem(ACCESS_TOKEN, token.accessToken);
            localStorage.setItem(REFRESH_TOKEN, token.refreshToken);
         },
         removeToken: () => {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
         },
         setCurrentUser: (values) => {
            set({
               currentUser: values,
               isLogin: true,
            });
         },
         updateInfo: (values) => {
            const user = get().currentUser;

            if (user) {
               set((state) => ({
                  currentUser: state.currentUser && {
                     ...state.currentUser,
                     ...values,
                  },
               }));
            }
         },
         setPreviousLocation: (location: string) =>
            set({ previousLocation: location }),
         adminLogin: async (value) => {
            try {
               const { user, token } = await authApi.adminLogin(value);

               get().saveToken(token);

               set({
                  currentUser: user,
                  isLogin: true,
               });

               notify('success', 'Welcome to dashboard');
            } catch (err: any) {
               notify('error', err.message);
            }
         },
         updateUser: async (userId, value) => {
            try {
               const { user } = await userApi.update(userId, value);

               set({
                  currentUser: user,
               });
            } catch (err: any) {
               notify('error', err.message);
            }
         },
         signinWithGoogle: async (token) => {
            try {
               const res = await authApi.googleLogin(token);
               // get().saveToken(token);
               set({
                  currentUser: res.user,
                  isLogin: true,
                  // isAuth: false,
               });
               return res.user;
            } catch (err) {
               return {
                  success: false,
                  err,
               };
            }
         },
      }),
      {
         name: 'auth-store',
         partialize: (state) => ({
            currentUser: state.currentUser,
            isLogin: state.isLogin,
         }),
      }
   )
);

export default authStore;
