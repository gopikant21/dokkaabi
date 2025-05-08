import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSendMessage,
  isDisabled = false,
  placeholder = "Type your message...",
}: ChatInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value.trim() && !isDisabled) {
      onSendMessage(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        className="flex-grow bg-background"
      />

      <Button type="submit" size="icon" disabled={isDisabled || !value.trim()}>
        <Send size={18} />
      </Button>
    </form>
  );
}
