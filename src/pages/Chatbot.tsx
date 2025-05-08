import { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChatMessage from "@/components/chatbot/ChatMessage";
import ChatInput from "@/components/chatbot/ChatInput";
import { ChatMessage as ChatMessageType } from "@/data/models";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { apiService } from "@/services/api";

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI recruitment assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Get audio context functionality
  const {
    isListening,
    isPlaying,
    startListening,
    stopListening,
    playAudio,
    stopAudio,
    transcript,
  } = useAudio();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Update input field when transcript changes
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText(""); // Clear input after sending
    setIsProcessing(true);

    try {
      // Generate AI response text
      const responseText = generateResponseText(text);

      // Generate audio with the TTS API
      let audioUrl = "";
      try {
        audioUrl = await apiService.textToSpeech(responseText);
        console.log("Generated audio URL:", audioUrl);
      } catch (error) {
        console.error("Failed to generate audio:", error);
      }

      // Add AI response
      const aiMessage: ChatMessageType = {
        id: `ai-${Date.now()}`,
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
        audioUrl,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Play audio automatically if available
      if (audioUrl) {
        playAudio(audioUrl);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle voice input button click
  const handleVoiceInput = async () => {
    if (isListening) {
      // Stop listening and get the transcript
      const finalTranscript = await stopListening();
      if (finalTranscript) {
        // Send the transcript as a message
        handleSendMessage(finalTranscript);
      }
    } else {
      // Start listening
      await startListening();
    }
  };

  // Toggle audio playback for the last AI message
  const handleToggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      // Find the last AI message with audio and play it
      const lastAudioMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "ai" && m.audioUrl);

      if (lastAudioMessage && lastAudioMessage.audioUrl) {
        playAudio(lastAudioMessage.audioUrl);
      }
    }
  };

  // Helper function to generate contextual responses based on user input
  const generateResponseText = (text: string): string => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("job") ||
      lowerText.includes("opening") ||
      lowerText.includes("position")
    ) {
      return "We currently have 4 open positions: Sr. UX Designer, Growth Manager, Financial Analyst, and Senior Developer. Which one would you like to know more about?";
    } else if (
      lowerText.includes("candidate") ||
      lowerText.includes("applicant")
    ) {
      return "We have 6 candidates in the pipeline at various stages. Would you like me to filter them based on specific criteria?";
    } else if (
      lowerText.includes("interview") ||
      lowerText.includes("schedule")
    ) {
      return "You have 3 interviews scheduled for this week. Would you like me to show you the details or help you schedule a new one?";
    } else if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey")
    ) {
      return "Hello! I'm your AI recruitment assistant. How can I assist you with your hiring needs today?";
    } else {
      return "I can help you with information about jobs, candidates, interviews, and hiring analytics. What specific information are you looking for?";
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <p className="text-dashboard-text-secondary mt-1">
              Chat with your AI recruitment assistant
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              className={
                isListening ? "bg-red-100 text-red-500 border-red-300" : ""
              }
            >
              {isListening ? <MicOff /> : <Mic />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleAudio}
              disabled={!messages.some((m) => m.sender === "ai" && m.audioUrl)}
            >
              {isPlaying ? <VolumeX /> : <Volume2 />}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 my-4 bg-dashboard-card-bg rounded-lg border border-dashboard-border">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onPlayAudio={playAudio}
              />
            ))}

            {isProcessing && (
              <div className="flex items-center">
                <div className="bg-dashboard-card-bg rounded-full p-3 w-12">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-dashboard-text-secondary animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-dashboard-text-secondary animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-dashboard-text-secondary animate-pulse"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {isListening && (
              <div className="flex items-center text-red-500">
                <div className="animate-pulse mr-2">● Recording</div>
                <div>{transcript}</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 bg-dashboard-card-bg rounded-lg border border-dashboard-border">
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSendMessage={handleSendMessage}
            isDisabled={isProcessing || isListening}
            placeholder={isListening ? "Listening..." : "Type your message..."}
          />
        </div>
      </div>
    </MainLayout>
  );
}
