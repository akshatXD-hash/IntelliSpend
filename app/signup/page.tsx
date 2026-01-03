import React from 'react';
import { LockKeyhole, Mail, User, ArrowRight, Wallet, PieChart, ShieldCheck } from 'lucide-react';

export default function Signup() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Left Side: Branding & Features (Hidden on mobile) */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-16 flex-col justify-between text-white relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight italic">IntelliSpend</h1>
          </div>

          <h2 className="text-5xl font-bold leading-[1.1] mb-8">
            Master your money <br /> with AI-driven <br /> precision.
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <PieChart className="h-6 w-6 text-cyan-200 mt-1" />
              <div>
                <p className="font-semibold text-white">Smart Analytics</p>
                <p className="text-blue-100 text-sm">Visualize your spending habits with beautiful, automated charts.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <ShieldCheck className="h-6 w-6 text-cyan-200 mt-1" />
              <div>
                <p className="font-semibold text-white">Bank-Grade Security</p>
                <p className="text-blue-100 text-sm">Your financial data is encrypted and kept strictly private.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-100 font-medium tracking-wide">
          SMART FINANCIAL MANAGEMENT • 2026
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Get Started</h2>
            <p className="mt-3 text-slate-500 text-lg">
              Start tracking your expenses with <span className="text-blue-600 font-semibold">IntelliSpend</span> today.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="group relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="group relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-200"
            >
              Create My Account
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
            <p className="text-slate-600">
              Already a member?{' '}
              <a href="/api/auth/signin" className="font-bold text-blue-600 hover:text-blue-700">
                Log in
              </a>
            </p>
            <p className="text-[11px] text-slate-400 text-center uppercase tracking-widest px-8 leading-relaxed">
              By joining, you agree to our <span className="underline cursor-pointer">Terms</span> & <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}