# SENSAi — Your AI Career Coach for Professional Success
SENSAi is a **Full Stack AI-powered Career Coaching platform** designed to help job seekers advance their careers with **personalized guidance**, **AI-driven interview preparation**, **resume enhancement**, and other career growth tools.

![image](https://github.com/user-attachments/assets/5a7aaff6-3f16-4259-a172-dc122ae7430f)


✨ Key Features
✅ AI-Powered Resume Enhancer — Optimize your resume for ATS compatibility with smart suggestions.

✅ Interview Preparation — Receive AI-generated interview questions and model answers tailored to your role.

✅ Career Insights Dashboard — Track your career progress and get actionable recommendations.

✅ Integrated Growth Tools — Access custom AI tools for job searching, grammar checking, and career advice.

✅ Secure User Authentication — Manage login and onboarding seamlessly with Clerk.

✅ Background Task Handling — Efficiently handle background tasks using Inngest for smooth asynchronous operations.

🛠️ Tech Stack
Next.js 14 — A full-stack React framework with the App Router for modern web development.

TailwindCSS — For responsive and modern UI design.

Shadcn/UI — A beautiful and accessible component library to enhance user experience.

Neon Database — A serverless PostgreSQL database for reliable storage.

Prisma — Type-safe database ORM for easier data management.

Inngest — For handling background jobs and workflows.

Clerk — A comprehensive solution for user authentication and management.

Gemini AI API — Powers the AI functionalities (provided by Google Gemini).

🚀 Getting Started
To get started with the SENSAi platform locally, follow these steps:

1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/swatiiyadawar/Ai-Career-Coach.git
cd Ai-Career-Coach
2️⃣ Install Dependencies
Run the following command to install the required dependencies:

bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy
Edit
DATABASE_URL=<your-database-url>

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=<your-gemini-api-key>
4️⃣ Run the Development Server
After setting up the environment variables, run the development server using the following command:

bash
Copy
Edit
npm run dev
