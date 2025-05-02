# SENSAi — Your AI Career Coach for Professional Success

SENSAi is a **Full Stack AI-powered Career Coaching platform** designed to help job seekers advance their careers with **personalized guidance**, **AI-driven interview preparation**, **resume enhancement**, and other career growth tools.

![image](https://github.com/user-attachments/assets/a1ddd1ac-1940-4ee0-8575-6d9d88107d89)

## ✨ Key Features

- ✅ **AI-powered Resume Enhancer** — Optimize resumes to be ATS-friendly with smart suggestions
- ✅ **Interview Preparation** — Get AI-generated interview questions and model answers
- ✅ **Career Insights Dashboard** — Track progress and get recommendations
- ✅ **Integrated Growth Tools** — Custom AI tools for job search, grammar checking, and career tips
- ✅ **User Authentication** — Secure login and onboarding flow with Clerk  
- ✅ **Background Tasks Handling** — Using Inngest for smooth task queues and async operations

## 🛠️ Tech Stack

- **Next.js 14** — App Router (Full-stack React framework)
- **TailwindCSS** — Modern UI styling
- **Shadcn/UI** — Beautiful and accessible component library
- **Neon Database** — Serverless PostgreSQL database
- **Prisma** — Type-safe database ORM
- **Inngest** — Background jobs and workflows
- **Clerk** — Authentication and user management
- **Gemini AI API** — AI functionalities (powered by Google Gemini)

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/swatiiyadawar/Ai-Career-Coach.git
cd Ai-Career-Coach


### 2️⃣ Install dependencies
npm install

### 3️⃣ Make sure to create a .env file with following variables -

DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=

4️⃣ Run the development server
npm run dev
 
