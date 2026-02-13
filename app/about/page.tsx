import React from 'react';
import { Info, Code2, Cpu, Globe, Target, Sparkles, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-[#0b1120] text-slate-200 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            The Mission
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Redefining Financial <span className="text-blue-500">Clarity</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            IntelliSpend is more than just an expense tracker. It is an intelligent companion 
            designed to bridge the gap between raw data and actionable financial wisdom.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-all">
            <div className="bg-blue-600/20 p-3 rounded-2xl w-fit mb-6">
              <Target className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              To empower students and professionals alike with tools that don't just count money, 
              but understand spending behavior using cutting-edge Agentic AI principles.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-all">
            <div className="bg-blue-600/20 p-3 rounded-2xl w-fit mb-6">
              <Cpu className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">The Intelligence</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leveraging Generative AI and LLMs to provide real-time insights, budget alerts, 
              and automated categorizations that save you time and mental energy.
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10"></div>
           
           <div className="flex items-center gap-3 mb-8">
              <Code2 className="text-blue-500 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Built with Modern Tech</h2>
           </div>

           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-slate-100 font-bold">Next.js 15</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Framework</div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-100 font-bold">Neon DB</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Database</div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-100 font-bold">Prisma</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">ORM</div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-100 font-bold">NextAuth</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Security</div>
              </div>
           </div>
        </div>

        {/* Footer / Contact */}
        <div className="text-center pt-8">
          <p className="text-slate-500 text-sm">
            Developed with ❤️ by Akshat | Engineering Student at KLE Technological University
          </p>
        </div>
      </div>
    </main>
  );
}
