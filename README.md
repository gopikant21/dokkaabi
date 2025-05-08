# Dokkaabi

A modern talent management platform for recruiters to manage candidates and job positions effectively, with integrated voice assistant capabilities.

## 🚀 Features

- **Candidate Management**: Track and manage candidate profiles and applications
- **Job Management**: Create, edit, and manage job listings
- **Dashboard**: Get an overview of your recruitment process
- **Insights**: Data-driven recruitment analytics
- **Chatbot**: AI-powered voice assistant for recruitment queries with text-to-speech and speech-to-text capabilities

## 💻 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: Shadcn UI (based on Radix UI)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query
- **Charts**: Recharts
- **Audio Processing**: WebSockets for real-time speech-to-text

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or bun

### Installation

1. Clone the repository

```bash
git clone https://github.com/gopikant21/dokkaabi.git
cd dokkaabi
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📦 Build

```bash
npm run build
# or
yarn build
# or
bun build
```

To preview the build:

```bash
npm run preview
# or
yarn preview
# or
bun preview
```

## 🧪 Linting

```bash
npm run lint
# or
yarn lint
# or
bun lint
```

## 📁 Project Structure

```
dokkaabi/
├── public/              # Static assets
│   └── lovable-uploads/ # Uploaded images and media
├── src/
│   ├── components/      # Reusable components
│   │   ├── candidates/  # Candidate-related components
│   │   ├── chatbot/     # Voice assistant components
│   │   ├── insights/    # Analytics and reporting components
│   │   ├── jobs/        # Job-related components
│   │   ├── layout/      # Layout components
│   │   └── ui/          # UI components (from shadcn/ui)
│   ├── context/         # React contexts
│   │   ├── AppContext   # Application state management
│   │   └── AudioContext # Audio processing for voice assistant
│   ├── data/            # Data models and mock data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages
│   ├── services/        # API services and external integrations
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
└── ...config files      # Various configuration files
```

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
VITE_API_URL=http://localhost:2900
```

## 📄 License

[MIT](LICENSE)
