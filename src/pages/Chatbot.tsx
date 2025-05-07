
import { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChatMessage from "@/components/chatbot/ChatMessage";
import ChatInput from "@/components/chatbot/ChatInput";
import { ChatMessage as ChatMessageType } from "@/data/models";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/context/AudioContext";

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI recruitment assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  const { playAudio } = useAudio();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Generate mock response based on user input
      let responseText = "";
      
      if (text.toLowerCase().includes("job") || text.toLowerCase().includes("opening")) {
        responseText = "We currently have 4 open positions: Sr. UX Designer, Growth Manager, Financial Analyst, and Senior Developer. Which one would you like to know more about?";
      } else if (text.toLowerCase().includes("candidate") || text.toLowerCase().includes("applicant")) {
        responseText = "We have 6 candidates in the pipeline at various stages. Would you like me to filter them based on specific criteria?";
      } else if (text.toLowerCase().includes("interview") || text.toLowerCase().includes("schedule")) {
        responseText = "You have 3 interviews scheduled for this week. Would you like me to show you the details or help you schedule a new one?";
      } else {
        responseText = "I can help you with information about jobs, candidates, interviews, and hiring analytics. What specific information are you looking for?";
      }
      
      // Generate speech for the response
      const audioUrl = await apiService.textToSpeech(responseText);
      
      // Add AI response
      const aiMessage: ChatMessageType = {
        id: `ai-${Date.now()}`,
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
        audioUrl
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Play audio automatically
      playAudio(audioUrl);
      
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-dashboard-text-secondary mt-1">
            Chat with your AI recruitment assistant
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 my-4 bg-dashboard-card-bg rounded-lg border border-dashboard-border">
          <div className="space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-center">
                <div className="bg-dashboard-card-bg rounded-full p-3 w-12">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-dashboard-text-secondary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-dashboard-text-secondary animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-dashboard-text-secondary animate-pulse" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 bg-dashboard-card-bg rounded-lg border border-dashboard-border">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </MainLayout>
  );
}
