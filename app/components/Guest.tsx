import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  ArrowRight, 
  BrainCircuit, 
  MessageSquare, 
  LayoutDashboard,
  Lock,
  Key
} from 'lucide-react';

const Guest = () => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-900/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-24"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Next.js 15 + NextAuth + AI
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Smart Expenses. <br /> Private AI Insights.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Take control of your data with **NextAuth** protected sessions. 
            Leverage **OpenRouter AI** for categorization and **Neon PostgreSQL** for lightning-fast data persistence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all group">
              Sign In to Continue
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl font-bold border border-slate-700 hover:bg-slate-800/50 transition-all">
              Explore Demo
            </button>
          </div>
        </motion.div>

        {/* AI Features Grid */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Intelligence</h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <FeatureCard 
              icon={<BrainCircuit className="text-blue-400" />}
              title="Automated Labeling"
              desc="OpenRouter AI intelligently processes your transaction descriptions to assign accurate categories instantly."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-emerald-400" />}
              title="Financial AI Chat"
              desc="Discuss your budget with an AI assistant that understands your spending history and offers saving tips."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-indigo-400" />}
              title="Visual Analytics"
              desc="Transform raw data into beautiful, interactive Chart.js visualizations to identify spending trends."
            />
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-center mb-12">Full-Stack Architecture</h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <TechCard 
              title="Identity" 
              items={["NextAuth v5 (Auth.js)", "OAuth & Email Providers", "JWT Session Management"]} 
              icon={<Key className="text-orange-400" />} 
            />
            <TechCard 
              title="Core Framework" 
              items={["Next.js 15 (App Router)", "React 19 Hooks", "Server Actions"]} 
              icon={<Zap className="text-yellow-400" />} 
            />
            <TechCard 
              title="Database" 
              items={["Neon (Serverless SQL)", "Prisma Client", "Type-safe Schemas"]} 
              icon={<LayoutDashboard className="text-purple-400" />} 
            />
            <TechCard 
              title="Artificial Intel" 
              items={["OpenRouter AI Gateway", "Categorization Engine", "Insight Generation"]} 
              icon={<ShieldCheck className="text-blue-400" />} 
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 text-center text-slate-500 text-sm">
        <p>Developed with Next.js 15, NextAuth, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
      className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm transition-colors group"
    >
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
};

const TechCard = ({ title, items, icon }: any) => {
  return (
    <div className="p-6 rounded-xl border border-slate-800/50 bg-slate-900/20">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item: string) => (
          <li key={item} className="text-slate-400 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guest;