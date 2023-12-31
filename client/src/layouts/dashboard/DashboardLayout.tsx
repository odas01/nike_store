import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Aside from './components/Aside';
import Header from './components/Header';

import { authApi } from '@/api';
import { Loading } from '@/components';
import authStore from '@/stores/authStore';

function DashboardLayout() {
   const { logOut } = authStore();
   const { data, isLoading } = useQuery({
      queryKey: ['authCheck'],
      queryFn: () => authApi.authChecker(),
   });

   if (data?.role === 'customer') {
      logOut();
   }

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className='flex h-screen overflow-hidden'>
         <div className='w-64 h-full'>
            <Aside />
         </div>

         <div className='flex-1 px-8 overflow-scroll text-[#272727] bg-[#fefefe] dark:text-white dark:bg-aside_db'>
            <Header />
            <div className='pb-6'>
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default DashboardLayout;
