import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/db";
import { authOptions } from "../[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    // STEP 1: Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        success: false,
        message: "Please login first",
      }, { status: 401 });
    }

    // STEP 2: Get the user's expenses
    const userId = (session.user as any).id;
    
    const expenses = await prisma.record.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        date: "desc"
      },
    });

    // STEP 3: If no expenses, tell user to add some
    if (expenses.length === 0) {
      return NextResponse.json({
        success: true,
        insights: "Hey! 👋 You haven't added any expenses yet. Start tracking your spending and I'll give you some cool insights!",
      });
    }

    // STEP 4: Calculate total money spent
    let totalMoney = 0;
    const categoryTotals: any = {};
    
  for (let expense of expenses) {
  totalMoney += expense.amount;

  // Normalize category (Bills, bills, BILLS → bills)
  const category = expense.category.toLowerCase();

  if (!categoryTotals[category]) {
    categoryTotals[category] = 0;
  }

  categoryTotals[category] += expense.amount;
}


    // STEP 5: Try to get AI insights from FREE models
    const insights = await getAIInsights(expenses, totalMoney, categoryTotals);

    // STEP 6: Send response
    return NextResponse.json({
      success: true,
      insights: insights,
      totalSpent: totalMoney,
      expenseCount: expenses.length,
      categoryBreakdown: categoryTotals,
    });

  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json({
      success: false,
      message: "Oops! Something went wrong. Try again.",
    }, { status: 500 });
  }
}

// Helper function to try multiple AI models
async function getAIInsights(expenses: any[], totalMoney: number, categoryTotals: any) {
  
  // Make expense list
  let expenseList = "";
  for (let expense of expenses.slice(0, 15)) {
    const dateString = expense.date.toISOString().split("T")[0];
    expenseList += `- ${expense.title}: $${expense.amount} (${expense.category}) on ${dateString}\n`;
  }

  const aiMessage = `Hey! You're my friend and I'm helping you save money. Look at your spending:

Total spent: ₹${totalMoney}
Recent expenses:
${expenseList}

Talk to me like a supportive friend who wants to help. Be casual, use emojis, and give me:
1. A friendly comment about my spending
2. What I'm spending most on
3. 2-3 practical tips to save money (be specific and encouraging)

Keep it real, fun, and helpful! No formal language - just talk like we're texting!`;

  // List of FREE models to try
  const freeModels = [
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "qwen/qwen-2.5-7b-instruct:free", 
    "microsoft/phi-3-mini-128k-instruct:free",
    "google/gemma-2-9b-it:free",
  ];

  // Try each model
  for (const model of freeModels) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Expense Tracker",
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: aiMessage }],
          max_tokens: 400,
          temperature: 0.8, // More creative and friendly
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        console.log(`✅ Success with model: ${model}`);
        return data.choices[0].message.content;
      }
      
    } catch (err) {
      console.log(`❌ Failed with model: ${model}`);
      continue;
    }
  }

  // Fallback to basic friendly analysis
  console.log("⚠️ All AI models failed, using basic analysis");
  return generateBasicInsights(totalMoney, categoryTotals, expenses.length);
}

// Fallback: Super friendly basic analysis
function generateBasicInsights(total: number, categories: any, count: number) {
  
  // Find top spending category
  let topCategory = "";
  let topAmount = 0;
  
  for (const [category, amount] of Object.entries(categories)) {
    if ((amount as number) > topAmount) {
      topAmount = amount as number;
      topCategory = category;
    }
  }

  const avgPerExpense = total / count;

  // Get category emoji
  const categoryEmojis: any = {
    'Food': '🍕',
    'Transportation': '🚗',
    'Shopping': '🛍️',
    'Entertainment': '🎮',
    'Bills': '💡',
    'Healthcare': '🏥',
  };
  
  const emoji = categoryEmojis[topCategory] || '💰';

  return `Hey there! 👋 Let me break down your spending for you:

${emoji} So I noticed you've spent **$${total.toFixed(2)}** across ${count} transactions. Not bad!

Your biggest spending category is **${topCategory}** at $${topAmount.toFixed(2)} - that's where most of your money is going right now.

Here's my friendly advice:

💡 **Try this:** Look at your ${topCategory} expenses. Can you cut back a bit? Maybe cook at home more if it's food, or find free alternatives if it's entertainment!

🎯 **Quick win:** Your average expense is $${avgPerExpense.toFixed(2)}. Try to beat that average - challenge yourself to spend less per transaction!

📱 **Pro tip:** Check your expenses every few days. It really helps you stay aware of where your money goes. Trust me, it works!

You're doing great by tracking everything! Keep it up! 💪✨

Remember - small changes add up to big savings! You got this! 🚀`;
}