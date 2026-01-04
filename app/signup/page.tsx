"use client"
import React, { useState } from 'react';
import { LockKeyhole, Mail, User, ArrowRight, Wallet, PieChart, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Signup() {
    const router = useRouter();
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");


    async function submit(e:React.FormEvent) {
       e.preventDefault();
       const response = await axios.post("/api/auth/signup",{name,email,password});
       //@ts-ignore
       if(response.data.success){
         router.push("/");
       }
    }


  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-16 flex-col justify-between text-white relative overflow-hidden">
        {/* Decorative background elements for that 'Transparent' depth */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">IntelliSpend</h1>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight mb-8">
            Master your money <br /> with AI-driven <br /> precision.
          </h2>

          <div className="space-y-6 max-w-sm">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <PieChart className="h-6 w-6 text-cyan-200 mt-1" />
              <div>
                <p className="font-bold text-white">Smart Analytics</p>
                <p className="text-blue-50/80 text-sm leading-relaxed">Visualize your spending habits with automated, real-time charts.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ShieldCheck className="h-6 w-6 text-cyan-200 mt-1" />
              <div>
                <p className="font-bold text-white">Secure by Design</p>
                <p className="text-blue-50/80 text-sm leading-relaxed">Bank-grade encryption ensures your financial data stays yours.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-100 font-semibold tracking-widest uppercase">
          Finance Evolved • 2026
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Get Started</h2>
            <p className="text-slate-600 text-lg">
              Experience the future of expense tracking.
            </p>
          </div>

          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Full Name</label>
              <div className="group relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                <input
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value);
                  }}
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-500"
                  placeholder="e.g. Raj Sharma"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Email Address</label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                <input
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-500"
                  placeholder="raj123@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
              <div className="group relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                <input
                  value={password}
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-500 font-sans"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-200 mt-2"
            >
              Create My Account
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-center text-slate-700 font-medium">
              Already have an account?{' '}
              <a href="/api/auth/signin" className="text-blue-600 font-bold hover:underline underline-offset-4">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}