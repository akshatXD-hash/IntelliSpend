"use client"
import React, { useState } from 'react';
import { Sparkles, Calendar, Tag, DollarSign, PlusCircle } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


export default function AddNewRecord() {
   const [title,setTitle] = useState("");
   const [amount,setAmount] = useState("");
   const [category,setCategory] = useState("");
   const [date,setDate] = useState("");
   const [loading,setLoading] = useState(false);

   const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);

    const { data } = await axios.post('/api/auth/addexpense',{title,amount:parseFloat(amount),category,date: new Date(date).toISOString()})
    if(data.success){
      toast.success("Expense added successfully 🎉!!!");
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
    else{
      toast.error(data.message || "Failed to add expense");
    }

    setLoading(false);
   }
    
  return (
    <>

    <Toaster position='top-right'/>
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-full max-w-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600/20 p-2 rounded-lg">
          <PlusCircle className="text-blue-500 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Add New Expense</h2>
          <p className="text-slate-400 text-sm">Track your spending with AI assistance</p>
        </div>
      </div>
       
       <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Expense Description
          </label>
          <div className="relative">
            <input 
              value={title}
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              type="text" 
              placeholder="Coffee, groceries, gas..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors">
              <Sparkles size={18} />
            </button>
          </div>
        </div>

        {/* Date Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Expense Date
          </label>
          <div className="relative">
            <input
            value={date}
            onChange={(e)=>{
              setDate(e.target.value)
            }} 
              type="date" 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Category Input (Changed from Select) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Category
          </label>
          <input 
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            type="text"
            placeholder="Food, Bills, Travel..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
            <input 
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
              type="number" 
              placeholder="0.00"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button 
       className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
        <PlusCircle size={20} />
        Add Expense
      </button>
      </form>
    </div>
    </>
  );
}