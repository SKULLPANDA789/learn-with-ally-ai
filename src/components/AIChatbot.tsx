
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

// Mock API endpoint - in a real application, this would be your actual API URL
const AI_API_ENDPOINT = "https://api.example.com/chat"; // Replace with actual API endpoint

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
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
    
    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate a successful API call with a delayed response
      const apiResponse = await callChatAPI(inputMessage);
      
      const aiResponse: Message = {
        role: "assistant",
        content: apiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API call function - replace with actual implementation when API is ready
  const callChatAPI = async (message: string): Promise<string> => {
    // This is a placeholder for the actual API call
    // In a real implementation, you would use fetch or axios to call your API
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll return predefined responses based on keywords in the message
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes("math") || lowerCaseMessage.includes("equation")) {
      return "In mathematics, equations represent relationships between variables. What specific concept are you struggling with?";
    } else if (lowerCaseMessage.includes("science") || lowerCaseMessage.includes("biology")) {
      return "Science is all about discovery and understanding our world. I'd be happy to explain any scientific concepts you're curious about!";
    } else if (lowerCaseMessage.includes("literature") || lowerCaseMessage.includes("book")) {
      return "Literature analysis involves understanding the author's intent, historical context, and various literary devices. What are you reading?";
    } else if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("stuck")) {
      return "I understand this topic can be challenging. Let me break it down into simpler steps for you. What specific part is confusing?";
    } else {
      return "That's an interesting question! Would you like me to explain this topic in more detail or provide some practice examples?";
    }
    
    /* 
    // Real API implementation would look something like this:
    try {
      const response = await fetch(AI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message,
          context: "education" 
        }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
    */
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
