'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message, SensorData } from '@/lib/types';
import { analyzeHeatStatus } from '@/ai/flows/analyze-heat-status';
import { aiAnswerQuestions } from '@/ai/flows/ai-answer-questions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Bus, Sparkles } from 'lucide-react';
import SensorPanel from '@/components/bus-guardian-ai/sensor-panel';
import ChatPanel from '@/components/bus-guardian-ai/chat-panel';
import PhysicsSection from '@/components/bus-guardian-ai/physics-section';
import SummarySection from '@/components/bus-guardian-ai/summary-section';

// Simple UUID generator for browser compatibility
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const SYSTEM_PROMPT = `You are an AI assistant for a project called 'AI-Based Bus Heat Energy Monitoring System.'
Your job is to answer ANY question related to this system. You must:
- Explain bus overheating using physics (conduction, convection, radiation).
- Use the given sensor data (engine temp, cabin temp, coolant level, ventilation quality, outside temp, and camera notes) to assess overheating.
- Diagnose likely causes such as low coolant, blocked ventilation, poor airflow, or very hot weather.
- Always give practical recommendations (slow down, stop bus, check coolant, open vents, improve airflow, etc.).
- Use clear, simple language suitable for school/college students.
- If the user asks about buses, heat, overheating, sensors, AI, physics, safety, fuel efficiency, or this project’s design, ALWAYS answer in detail.
- If the question is outside this topic, briefly answer only if you can relate it back to the Bus Heat Energy Monitoring System. Otherwise gently redirect the user back to this topic.
- Whenever possible, explicitly mention conduction, convection and radiation in your explanations, and connect them to what is happening in the bus.`;

export default function Home() {
  const { toast } = useToast();
  const [sensorData, setSensorData] = useState<SensorData>({
    engineTemperature: 90,
    cabinTemperature: 22,
    coolantLevel: 80,
    ventilationQuality: 'Good',
    cameraObservations: 'No visible issues',
    outsideTemperature: 20,
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      role: 'assistant',
      content:
        'Welcome to the **BusGuardian AI**. I can analyze bus heat data and answer your questions about this system. Use the panel on the left to simulate sensor data and click "Analyze Heat Status", or ask me a question below.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelLoading, setIsPanelLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsPanelLoading(true);
    setMessages(prev => [
      ...prev,
      { id: generateId(), role: 'user', content: 'Analyzing current heat status...' },
    ]);

    try {
      const result = await analyzeHeatStatus(sensorData);
      const analysisMessage = `
### Heat Status Analysis

**Analysis:** ${result.analysis}

**Suggestions:** ${result.suggestions}
      `;
      setMessages(prev => [
        ...prev,
        { id: generateId(), role: 'assistant', content: analysisMessage },
      ]);
    } catch (error) {
      console.error('Error analyzing heat status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get analysis from AI. Please try again.',
      });
       setMessages(prev => prev.slice(0, prev.length -1));
    } finally {
      setIsPanelLoading(false);
    }
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;
    setIsLoading(true);
    const newMessages: Message[] = [
      ...messages,
      { id: generateId(), role: 'user', content: userMessage },
    ];
    setMessages(newMessages);

    try {
      const sensorDataString = `Engine: ${sensorData.engineTemperature}°C, Cabin: ${sensorData.cabinTemperature}°C, Coolant: ${sensorData.coolantLevel}%, Ventilation: ${sensorData.ventilationQuality}, Outside: ${sensorData.outsideTemperature}°C, Camera: ${sensorData.cameraObservations}`;
      const conversationHistory = newMessages.map(m => `${m.role}: ${m.content}`).join('\n');

      const result = await aiAnswerQuestions({
        question: userMessage,
        systemPrompt: SYSTEM_PROMPT,
        sensorData: sensorDataString,
        conversationHistory,
      });

      setMessages(prev => [
        ...prev,
        { id: generateId(), role: 'assistant', content: result.answer },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get response from AI. Please try again.',
      });
      setMessages(prev => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 border-b shadow-sm">
        <div className="container mx-auto flex items-center gap-4">
          <Bot className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold font-headline text-primary">BusGuardian AI</h1>
            <p className="text-sm text-muted-foreground">An AI-Based Bus Heat Energy Monitoring System</p>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <SensorPanel
              sensorData={sensorData}
              setSensorData={setSensorData}
              onAnalyze={handleAnalyze}
              isLoading={isPanelLoading}
            />
          </div>
          <div className="lg:col-span-3 h-[40rem] lg:h-[calc(100vh-12rem)] flex flex-col">
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="space-y-8">
            <PhysicsSection />
            <SummarySection />
        </div>
      </main>

       <footer className="p-4 border-t mt-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          Built for a Physics + AI Demonstration.
        </div>
      </footer>
    </div>
  );
}
