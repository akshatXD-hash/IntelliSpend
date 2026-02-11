# 💰 IntelliSpend - Smart Expense Tracker

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  
  **Track your expenses. Get AI-powered insights. Save money.**
  
  [Demo](#-demo) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage)

</div>

---

## 🌟 Overview

IntelliSpend is a modern, AI-powered expense tracking application that helps you understand your spending habits and make smarter financial decisions. With friendly AI insights and beautiful visualizations, managing your money has never been easier!

## ✨ Features

### 💡 AI-Powered Insights
- **Smart Analysis**: Get personalized spending insights from AI
- **Friendly Advice**: Receive money-saving tips in a conversational tone
- **Pattern Recognition**: Discover spending patterns you didn't know existed

### 📊 Expense Management
- **Easy Tracking**: Add expenses with title, amount, category, and date
- **Category Breakdown**: Visualize spending across different categories
- **Transaction History**: View all your expenses in chronological order

### 🎨 Beautiful UI
- **Modern Design**: Sleek, dark-themed interface with glassmorphism effects
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Delightful micro-interactions throughout

### 🔐 Secure & Private
- **Authentication**: Secure login with NextAuth.js
- **User Privacy**: Your data is yours - each user sees only their expenses
- **Session Management**: Automatic session handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: OpenRouter API (Free AI models)
- **Icons**: Lucide React

## 📸 Demo

### Dashboard
*Beautiful overview of your spending with AI insights*

### AI Insights
*Get personalized tips and spending analysis*

### Category Breakdown
*Visual breakdown of expenses by category*

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))

### Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/intellispend.git
cd intellispend
```

### Step 2: Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Set up environment variables

Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/intellispend"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenRouter AI
OPENROUTER_API_KEY="sk-or-v1-xxxxxxxxxxxxx"

# App URL (optional)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### Step 5: Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

### Adding an Expense

1. Click on "Add Expense" button
2. Fill in the details:
   - **Title**: What did you buy? (e.g., "Lunch at cafe")
   - **Amount**: How much? (e.g., 250)
   - **Category**: What type? (e.g., Food, Bills, Shopping)
   - **Date**: When?
3. Click "Save"

### Viewing AI Insights

1. Navigate to the AI Insights section
2. Click "Refresh Insights" to generate new analysis
3. Read personalized tips and spending breakdown

### Categories

Supported categories:
- 🍕 **Food** - Groceries, restaurants, takeout
- 🚗 **Transportation** - Gas, public transport, rideshare
- 🛍️ **Shopping** - Clothes, electronics, general shopping
- 🎮 **Entertainment** - Movies, games, subscriptions
- 💡 **Bills** - Utilities, rent, phone bills
- 🏥 **Healthcare** - Medicine, doctor visits, insurance
- 💰 **Other** - Everything else

## 🔌 API Endpoints

### Expenses
```typescript
// Add a new expense
POST /api/expenses
Body: {
  title: string,
  amount: number,
  category: string,
  date: string
}

// Get all user expenses
GET /api/expenses
Response: {
  success: boolean,
  record: Expense[]
}
```

### AI Insights
```typescript
// Get AI-powered insights
GET /api/auth/ai-insights
Response: {
  success: boolean,
  insights: string,
  totalSpent: number,
  expenseCount: number,
  categoryBreakdown: object
}
```

## 🤖 AI Models Used

IntelliSpend uses **100% FREE AI models** from OpenRouter:

- `nousresearch/hermes-3-llama-3.1-405b:free`
- `qwen/qwen-2.5-7b-instruct:free`
- `microsoft/phi-3-mini-128k-instruct:free`
- `google/gemma-2-9b-it:free`

The app automatically tries multiple models with fallback to ensure insights are always available.

## 📁 Project Structure
```
intellispend/
├── app/
│   ├── api/
│   │   ├── expenses/          # Expense CRUD endpoints
│   │   └── auth/
│   │       ├── [...nextauth]/  # NextAuth configuration
│   │       └── ai-insights/    # AI insights endpoint
│   ├── components/             # React components
│   ├── lib/
│   │   └── db.ts              # Prisma client
│   └── page.tsx               # Main page
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── .env                       # Environment variables
```

## 🎨 Customization

### Changing the Theme

Edit `tailwind.config.js` to customize colors:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',  // Change primary color
        secondary: '#8B5CF6', // Change secondary color
      }
    }
  }
}
```

### Adding New Categories

1. Update the category normalization in `api/auth/ai-insights/route.ts`
2. Add emoji mapping in `generateBasicInsights` function
3. Update UI components to display new category

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [OpenRouter](https://openrouter.ai/) - Free AI API access
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icons

## 📧 Contact

Have questions or suggestions? Reach out!

- **GitHub**: [akshatXD-hash](https://github.com/akshatXD-hash)
- **Email**: akshatpurohit23dec@gmaill.com


---

<div align="center">
  
  **Made with ❤️ and lots of ☕**
  
  ⭐ Star this repo if you found it helpful!
  
</div>
```

