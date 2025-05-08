import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  audioUrl?: string;
}

interface ChatMessageProps {
  message: Message;
  onPlayAudio: (url: string) => Promise<void>;
}

export default function ChatMessage({
  message,
  onPlayAudio,
}: ChatMessageProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { toast } = useToast();

  const handlePlayAudio = async () => {
    if (!message.audioUrl) return;

    try {
      setIsPlayingAudio(true);
      await onPlayAudio(message.audioUrl);
      // The audio context will handle the audio state and events
    } catch (error) {
      console.error("Error playing audio:", error);
      toast({
        title: "Error",
        description: "Failed to play audio message",
        variant: "destructive",
      });
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3",
        message.sender === "user" ? "flex-row-reverse" : ""
      )}
    >
      <Avatar className="h-9 w-9">
        {message.sender === "user" ? (
          <AvatarImage src="/placeholder.svg" alt="User" />
        ) : (
          <AvatarImage src="/placeholder.svg" alt="AI" />
        )}
        <AvatarFallback
          className={message.sender === "ai" ? "bg-purple-600 text-white" : ""}
        >
          {message.sender === "user" ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "rounded-lg p-3 max-w-[75%]",
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>

        {message.sender === "ai" && message.audioUrl && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handlePlayAudio}
            >
              {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
