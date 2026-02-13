"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Guest from "./components/Guest";
import AddNewRecord from "./components/AddNewRecord";
import RecordChart from "./components/RecordChart";
import ExpenseStats from "./components/ExpenseStats";
import AIInsights from "./components/AIInsights";
import RecordHistory from "./components/RecordHistory";

export default function Home() {
  const {data:session} = useSession();

  if(!session){
    return <Guest/>
  }

  return (
     <main className='bg-[#0b1120] text-slate-200 font-sans min-h-screen transition-colors duration-300'>
      {/* Mobile-optimized container */}
      <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8'>
        
        {/* Mobile-first responsive grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
          
          {/* Left Column */}
          <div className='space-y-4 sm:space-y-6'>
            
            {/* Welcome section - Blue/Slate Theme */}
            <div className='bg-slate-900/50 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6'>
              
              {/* User Image */}
<div className='relative flex-shrink-0'>
  <img
    // Replace the empty string "" with null or a default avatar URL
    src={session?.user?.image || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
    alt={`${session?.user?.name}'s profile`}
    className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-700 shadow-lg object-cover'
  />
  <div className='absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-[#0b1120] flex items-center justify-center'>
    <span className='text-white text-[10px]'>✓</span>
  </div>
</div>

              {/* User Details */}
              <div className='flex-1 text-center sm:text-left'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-3 mb-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/20 rounded-xl flex items-center justify-center shadow-inner'>
                    <span className='text-sm sm:text-lg'>👋</span>
                  </div>
                  <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white'>
                    Welcome Back, {session?.user?.name}!
                  </h2>
                </div>
                <p className='text-sm sm:text-base text-slate-400 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0'>
                  Here&#39;s a quick overview of your recent expense activity.
                  Track your spending, analyze patterns, and manage your budget
                  efficiently!
                </p>

                {/* Badge Grid - Blue Accents */}
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start'>
                  <div className='bg-blue-900/20 border border-blue-800/50 px-3 py-2 rounded-xl flex items-center gap-2 justify-center sm:justify-start'>
                    <div className='w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-[10px]'>📅</span>
                    </div>
                    <div className='text-center sm:text-left'>
                      <span className='text-[10px] font-medium text-slate-500 uppercase block tracking-wider'>
                        Joined
                      </span>
                      <span className='text-sm font-semibold text-blue-100'>
                        {new Date((session.user as any).createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className='bg-slate-800/40 border border-slate-700 px-3 py-2 rounded-xl flex items-center gap-2 justify-center sm:justify-start'>
                    <div className='w-5 h-5 sm:w-6 sm:h-6 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-[10px]'>⚡</span>
                    </div>
                    <div className='text-center sm:text-left'>
                      <span className='text-[10px] font-medium text-slate-500 uppercase block tracking-wider'>
                        Last Active
                      </span>
                      <span className='text-sm font-semibold text-slate-300'>Just Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Expense */}
            <AddNewRecord />
          </div>

          {/* Right Column */}
          <div className='space-y-4 sm:space-y-6'>
            <RecordChart />
            <ExpenseStats/>
          </div>
        </div>

        {/* Full-width sections below */}
        <div className='mt-6 sm:mt-8 space-y-4 sm:space-y-6'>
          <AIInsights />
          <RecordHistory />
        </div>
      </div>
    </main>
  );
}