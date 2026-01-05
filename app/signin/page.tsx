"use client";

import React, { useState } from 'react';
import { signIn } from "next-auth/react"; // Import the signin function
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Wallet, PieChart, Shield, Github } from 'lucide-react';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // This triggers the 'authorize' function in your route.ts
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirect to handle errors here
    });

    if (res?.error) {
      setError("Invalid credentials or user does not exist");
      setLoading(false);
    } else {
      // Success! User found in DB and session created
      router.push("/"); 
      router.refresh(); 
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#0ea5e9] p-12 flex-col justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg"><Wallet size={24} /></div>
          <span className="text-2xl font-bold tracking-tight">IntelliSpend</span>
        </div>

        <div>
          <h1 className="text-6xl font-extrabold leading-tight mb-8">
            Master your money <br /> with AI-driven <br /> precision.
          </h1>
          <div className="space-y-4 max-w-md">
            <FeatureItem icon={<PieChart size={20}/>} title="Smart Analytics" desc="Visualize spending habits with real-time charts." />
            <FeatureItem icon={<Shield size={20}/>} title="Secure by Design" desc="Bank-grade encryption for your financial data." />
          </div>
        </div>
        <div className="text-xs font-bold opacity-70">FINANCE EVOLVED • 2026</div>
      </div>

      {/* Right Panel: Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-500 mt-2">Welcome back! Access your dashboard.</p>
          </div>

          {/* Error Message */}
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="raj123@gmail.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required 
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"} <ArrowRight size={20} />
            </button>
          </form>

          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] bg-gray-200 flex-grow" />
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="h-[1px] bg-gray-200 flex-grow" />
          </div>

          {/* GitHub Login Button */}
          <button 
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
          >
            <Github size={20} /> Continue with GitHub
          </button>

          <p className="text-center text-gray-500">
            Don't have an account? <a href="/signup" className="text-[#1d4ed8] font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-white/80 text-sm">{desc}</p>
      </div>
    </div>
  );
}