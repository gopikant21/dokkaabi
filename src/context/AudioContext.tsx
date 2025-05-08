import {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import { apiService } from "../services/api";
import { useToast } from "@/hooks/use-toast";

interface AudioContextType {
  isListening: boolean;
  isPlaying: boolean;
  startListening: () => Promise<void>;
  stopListening: () => Promise<string>;
  playAudio: (url: string) => Promise<void>;
  stopAudio: () => void;
  transcript: string;
  isProcessing: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const { toast } = useToast();

  // Function to start listening for voice input
  const startListening = async () => {
    try {
      setIsListening(true);
      setTranscript("");
      audioChunksRef.current = [];

      // Generate a unique session ID
      const sessionId = `session-${Date.now()}`;

      // Initialize WebSocket for real-time transcription
      const socket = apiService.initializeSTTWebSocket(sessionId);
      websocketRef.current = socket;

      // Handle incoming messages from WebSocket
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle transcript updates
          if (data.transcript) {
            setTranscript(data.transcript);
          }

          // Handle AI response
          if (data.event === "ai_response_ready") {
            toast({
              title: "AI Response",
              description: "Received AI response from server",
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create a MediaRecorder instance to capture audio
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Event handler for audio data
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);

          // Send audio chunk to WebSocket for real-time transcription
          if (
            websocketRef.current &&
            websocketRef.current.readyState === WebSocket.OPEN
          ) {
            websocketRef.current.send(event.data);
          }
        }
      };

      // Start recording audio
      mediaRecorder.start(250); // Collect data every 250ms

      toast({
        title: "Listening",
        description: "Speak now...",
      });
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

  // Function to stop listening and process the recording
  const stopListening = useCallback(async () => {
    setIsListening(false);

    // Stop media recorder if it's active
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();

      // Stop all tracks in the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    }

    let finalTranscript = transcript;

    // If we have audio chunks, process them with the API
    if (audioChunksRef.current.length > 0) {
      try {
        setIsProcessing(true);

        // Create audio blob from collected chunks
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const sessionId = `process-${Date.now()}`;

        // Send to API for processing
        const response = await apiService.speechToText(audioBlob, sessionId);

        // Update the transcript with the final result
        if (response.transcript) {
          finalTranscript = response.transcript;
          setTranscript(response.transcript);
        }
      } catch (error) {
        console.error("Error processing audio:", error);
        toast({
          title: "Error",
          description: "Failed to process audio. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }

    // Close WebSocket connection
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }

    toast({
      title: "Stopped listening",
    });

    return finalTranscript;
  }, [transcript, toast]);

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
        isProcessing,
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
