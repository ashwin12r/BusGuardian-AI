# BusGuardian AI

An AI-Based Bus Heat Energy Monitoring System that demonstrates the application of physics principles and artificial intelligence for vehicle safety and efficiency.

## 🚌 Project Overview

BusGuardian AI is an educational web application that simulates a real-time bus heat monitoring system. It combines physics concepts (conduction, convection, and radiation) with Google's Gemini AI to analyze sensor data, detect overheating conditions, and provide intelligent recommendations.

## ✨ Features

- **Interactive Sensor Simulation**: Adjust engine temperature, cabin temperature, coolant levels, ventilation quality, outside temperature, and camera observations
- **AI-Powered Heat Analysis**: Real-time analysis of sensor data to detect overheating and predict causes (low coolant, blocked vents, poor airflow)
- **Intelligent Chatbot**: Ask questions about bus overheating, physics principles, and the monitoring system
- **Physics Education**: Dedicated section explaining heat transfer principles (conduction, convection, radiation) in the context of bus heat management
- **Chat History**: Maintains conversation context for more intelligent AI responses
- **Responsive Design**: Clean, modern UI with burnt orange accent colors

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript and Turbopack
- **AI Integration**: Google Genkit + Gemini API
- **UI Components**: Radix UI + Tailwind CSS
- **Styling**: Custom theme with burnt orange accents (#CC5500)
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:9002](http://localhost:9002) in your browser

### Optional: Genkit Developer UI

To test AI flows independently:
```bash
npm run genkit:dev
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and theme
├── ai/
│   ├── genkit.ts             # Genkit AI configuration
│   └── flows/
│       ├── analyze-heat-status.ts    # Heat analysis AI flow
│       └── ai-answer-questions.ts    # Chatbot AI flow
├── components/
│   └── bus-guardian-ai/
│       ├── sensor-panel.tsx         # Sensor input controls
│       ├── chat-panel.tsx           # Chat interface
│       ├── physics-section.tsx      # Physics explanations
│       └── summary-section.tsx      # Project summary
└── lib/
    ├── types.ts              # TypeScript type definitions
    └── utils.ts              # Utility functions
```

## 🎯 How It Works

1. **Sensor Input**: Users adjust simulated sensor values (temperature, coolant, ventilation)
2. **Heat Analysis**: Click "Analyze Heat Status" to get AI-powered assessment of overheating risk
3. **AI Chatbot**: Ask questions about buses, heat physics, or the monitoring system
4. **Physics Learning**: Read explanations of how conduction, convection, and radiation apply to bus heat management
5. **Real-time Feedback**: Get practical recommendations (check coolant, improve airflow, etc.)

## 📚 Educational Value

This project demonstrates:
- **Physics Principles**: Practical application of heat transfer concepts
- **AI Integration**: Using large language models for data analysis and Q&A
- **System Design**: How sensors and AI can improve vehicle safety
- **Full-Stack Development**: Modern web development with React, TypeScript, and AI APIs

## 🎨 Design

- **Primary Color**: Burnt Orange (#CC5500) - draws attention to critical information
- **Background**: Very light gray (#F5F5F5) - clean, neutral backdrop
- **Typography**: Inter font for modern, readable interface
- **Layout**: Responsive grid with sensor panel, chat interface, and educational sections

## 📝 Available Scripts

- `npm run dev` - Start development server (port 9002)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types
- `npm run genkit:dev` - Launch Genkit Developer UI
- `npm run genkit:watch` - Launch Genkit with auto-reload

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## 📄 License

Built for educational demonstration purposes.

---

**Built with** ❤️ **for Physics + AI Education**
