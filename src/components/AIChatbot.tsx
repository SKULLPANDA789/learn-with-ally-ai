
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Volume2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Types for our chat
type MessageRole = "user" | "assistant";

interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Default Messages
const defaultMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello! I'm your AI learning assistant. How can I help you with your studies today?",
    timestamp: new Date(),
  },
];

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // In a real app, this would be an API call to an AI service
    setTimeout(() => {
      const responses = [
        "That's an excellent question! In mathematics, equations are used to represent relationships between variables.",
        "I understand this topic can be challenging. Let me break it down into simpler steps for you.",
        "Great observation! When studying literature, it's important to analyze the author's intent and the historical context.",
        "I'd recommend practicing with these example problems to strengthen your understanding of this concept.",
        "Science is all about curiosity and discovery. Let's explore this topic together!",
      ];
      
      const aiResponse: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages(defaultMessages);
    toast({
      title: "Chat Cleared",
      description: "Started a new conversation",
    });
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support text-to-speech",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-able-brown/5 dark:bg-able-darkBrown/30 border-able-tan/20 h-full">
      <CardHeader>
        <CardTitle className="font-gloria text-able-brown dark:text-able-tan flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Learning Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col">
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="flex items-center gap-1 text-xs"
          >
            <RefreshCw className="h-3 w-3" />
            New Chat
          </Button>
        </div>

        <div className="border rounded-md p-4 h-[400px] overflow-y-auto mb-4 bg-background/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-able-brown/20 text-foreground"
                    : "bg-able-lightBrown/20 text-foreground"
                } p-3 rounded-lg`}
              >
                <div className="flex-shrink-0 flex items-start">
                  {message.role === "user" ? (
                    <User className="h-5 w-5 mt-1" />
                  ) : (
                    <Bot className="h-5 w-5 mt-1" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="break-words">{message.content}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.role === "assistant" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => speakMessage(message.content)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-able-lightBrown/20 text-foreground p-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question about your studies..."
            className="resize-none"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-able-orange hover:bg-able-gold text-able-darkBrown font-semibold"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
