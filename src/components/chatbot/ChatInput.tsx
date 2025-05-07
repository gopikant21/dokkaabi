
import { Send, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useAudio } from "@/context/AudioContext";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const { isListening, transcript, startListening, stopListening } = useAudio();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const message = inputValue.trim() || transcript.trim();
    if (message) {
      onSendMessage(message);
      setInputValue("");
      stopListening();
    }
  };
  
  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={isListening && transcript ? transcript : inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message or speak..."
        disabled={isListening}
        className="bg-dashboard-card-bg border-dashboard-border"
      />
      
      <Button type="button" variant="outline" onClick={handleMicToggle}>
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </Button>
      
      <Button type="submit" className="gradient-button">
        <Send size={18} />
      </Button>
    </form>
  );
}
