
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/data/models";
import { useAudio } from "@/context/AudioContext";
import { useState } from "react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { isPlaying, playAudio, stopAudio } = useAudio();
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(message.audioUrl || null);
  
  const { toast } = useToast();
  
  const handlePlayPause = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    
    if (audioUrl) {
      playAudio(audioUrl);
      return;
    }
    
    // Generate audio for the message
    try {
      setIsLoadingAudio(true);
      const url = await apiService.textToSpeech(message.text);
      setAudioUrl(url);
      playAudio(url);
    } catch (error) {
      console.error("Failed to generate audio:", error);
      toast({
        title: "Error",
        description: "Failed to generate audio for this message.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAudio(false);
    }
  };

  return (
    <div className={cn(
      "flex gap-3 mb-4",
      message.sender === "user" ? "flex-row-reverse" : ""
    )}>
      <Avatar>
        {message.sender === "user" ? (
          <AvatarImage src="/lovable-uploads/6e14eacf-27c0-4038-a4ba-79be58ed6051.png" />
        ) : (
          <AvatarImage src="/placeholder.svg" />
        )}
        <AvatarFallback>{message.sender === "user" ? "U" : "AI"}</AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "max-w-[75%]",
        message.sender === "user" 
          ? "bg-dashboard-accent-purple text-white" 
          : "bg-dashboard-card-bg text-dashboard-text-primary",
        "rounded-2xl p-4"
      )}>
        <p>{message.text}</p>
        
        {message.sender === "ai" && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handlePlayPause}
              disabled={isLoadingAudio}
            >
              {isLoadingAudio ? (
                <span className="animate-pulse">...</span>
              ) : isPlaying ? (
                <VolumeX size={14} />
              ) : (
                <Volume2 size={14} />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
