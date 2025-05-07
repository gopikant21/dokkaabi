
import { createContext, useState, useContext, useRef, ReactNode } from "react";
import { apiService } from "../services/api";
import { useToast } from "@/hooks/use-toast";

interface AudioContextType {
  isListening: boolean;
  isPlaying: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
  playAudio: (url: string) => Promise<void>;
  stopAudio: () => void;
  transcript: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  
  const { toast } = useToast();
  
  // Function to start listening for voice input
  const startListening = async () => {
    try {
      setIsListening(true);
      setTranscript("");
      
      // Generate a unique session ID
      const sessionId = `session-${Date.now()}`;
      
      // Initialize WebSocket for real-time transcription
      const socket = apiService.initializeSTTWebSocket(sessionId);
      websocketRef.current = socket;
      
      // Handle incoming messages
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.transcript) {
            setTranscript(data.transcript);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      
      toast({
        title: "Listening",
        description: "Speak now...",
      });
      
      // In a real app, we would now capture audio from the microphone
      // For this demo, we'll just simulate with a timeout
      setTimeout(() => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
          // In a real app, we would send audio chunks through the WebSocket
          console.log("Sending audio data to WebSocket...");
          
          // For demo purposes, let's simulate getting a transcript after a delay
          setTimeout(() => {
            setTranscript("This is a simulated transcript from the WebSocket API.");
          }, 2000);
        }
      }, 500);
      
    } catch (error) {
      console.error("Error starting listening:", error);
      setIsListening(false);
      toast({
        title: "Error",
        description: "Failed to start listening. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to stop listening
  const stopListening = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
    setIsListening(false);
    toast({
      title: "Stopped listening",
    });
  };
  
  // Function to play audio from a URL
  const playAudio = async (url: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "Error",
          description: "Failed to play audio",
          variant: "destructive",
        });
      };
      
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
      toast({
        title: "Error",
        description: "Failed to play audio",
        variant: "destructive",
      });
    }
  };
  
  // Function to stop audio playback
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  };
  
  return (
    <AudioContext.Provider
      value={{
        isListening,
        isPlaying,
        startListening,
        stopListening,
        playAudio,
        stopAudio,
        transcript,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
