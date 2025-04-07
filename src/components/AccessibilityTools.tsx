
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, StopCircle, Volume2, FilePlus, Copy, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SignLanguageConverter from "./SignLanguageConverter";

export default function AccessibilityTools() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const { toast } = useToast();
  
  // Use a ref to store the recognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const startSpeechToText = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive",
      });
      return;
    }
    
    // Setup Speech Recognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Speech recognition is not available in your browser",
        variant: "destructive",
      });
      return;
    }
    
    recognitionRef.current = new SpeechRecognitionAPI();
    const recognition = recognitionRef.current;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Start speaking now",
      });
    };
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setRecognizedText(transcript);
      setInputText(transcript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      toast({
        title: "Error",
        description: `Speech recognition error: ${event.error}`,
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const stopSpeechToText = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "Stopped Listening",
      });
    }
  };

  // Text to speech
  const speakText = (text: string) => {
    if (!text) {
      toast({
        title: "No text to speak",
        description: "Please enter or generate text first",
        variant: "destructive",
      });
      return;
    }

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
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error", event);
        setIsSpeaking(false);
        toast({
          title: "Error",
          description: "Failed to speak the text",
          variant: "destructive",
        });
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Text-to-Speech Not Supported",
        description: "Your browser doesn't support text-to-speech",
        variant: "destructive",
      });
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // AI Summarization (mock implementation)
  const summarizeText = () => {
    if (!inputText) {
      toast({
        title: "No text to summarize",
        description: "Please enter or generate text first",
        variant: "destructive",
      });
      return;
    }
    
    // This would be replaced with an actual API call to an AI summarization service
    setTimeout(() => {
      // Mock summarization - in a real app, this would call an AI API
      const summary = inputText.length > 100 
        ? inputText.substring(0, Math.floor(inputText.length / 3)) + "..." 
        : "The text is already concise.";
      
      setSummarizedText(summary);
      toast({
        title: "Text Summarized",
        description: "Check the summary below",
      });
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Failed to copy",
        description: "Check console for details",
        variant: "destructive",
      });
    });
  };

  return (
    <section className="py-10 px-4">
      <div className="content-container">
        <h2 className="font-gloria text-2xl md:text-3xl mb-6 text-center">Accessibility Tools</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Speech to Text Card */}
          <Card className="bg-able-brown/10 dark:bg-able-darkBrown/30 border-able-tan/20">
            <CardHeader>
              <CardTitle className="font-gloria text-able-brown dark:text-able-tan">Speech to Text</CardTitle>
              <CardDescription>Start speaking and see your words appear as text</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                {!isListening ? (
                  <Button onClick={startSpeechToText} className="bg-able-orange hover:bg-able-gold flex items-center gap-2">
                    <Mic size={18} />
                    Start Listening
                  </Button>
                ) : (
                  <Button onClick={stopSpeechToText} variant="destructive" className="flex items-center gap-2">
                    <StopCircle size={18} />
                    Stop Listening
                  </Button>
                )}
                {recognizedText && (
                  <Button variant="outline" onClick={() => copyToClipboard(recognizedText)} className="flex items-center gap-2">
                    <Copy size={18} />
                    Copy
                  </Button>
                )}
              </div>
              <div className="min-h-[120px] p-4 bg-background rounded-md">
                {isListening && <span className="text-able-orange animate-pulse">Listening...</span>}
                <p>{recognizedText || "Your speech will appear here..."}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Text to Speech Card */}
          <Card className="bg-able-brown/10 dark:bg-able-darkBrown/30 border-able-tan/20">
            <CardHeader>
              <CardTitle className="font-gloria text-able-brown dark:text-able-tan">Text to Speech</CardTitle>
              <CardDescription>Convert text to spoken words</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter text to be spoken..."
                className="mb-4 h-[80px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="flex gap-2">
                {!isSpeaking ? (
                  <Button onClick={() => speakText(inputText)} className="bg-able-orange hover:bg-able-gold flex items-center gap-2">
                    <Volume2 size={18} />
                    Speak Text
                  </Button>
                ) : (
                  <Button onClick={stopSpeaking} variant="destructive" className="flex items-center gap-2">
                    <StopCircle size={18} />
                    Stop Speaking
                  </Button>
                )}
                <Button variant="outline" onClick={() => setInputText("")} className="flex items-center gap-2">
                  <FilePlus size={18} />
                  New
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Summarizer */}
          <Card className="md:col-span-2 bg-able-brown/10 dark:bg-able-darkBrown/30 border-able-tan/20">
            <CardHeader>
              <CardTitle className="font-gloria text-able-brown dark:text-able-tan">AI Text Summarizer</CardTitle>
              <CardDescription>Simplify complex text using AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Original Text</h4>
                  <Textarea 
                    placeholder="Enter text to summarize..."
                    className="h-[150px]"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold mb-1">Summarized Text</h4>
                  <div className="bg-background rounded-md flex-1 p-3 min-h-[150px] border">
                    {summarizedText || "Summary will appear here..."}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button onClick={summarizeText} className="bg-able-orange hover:bg-able-gold flex items-center gap-2">
                  <ArrowRight size={18} />
                  Summarize
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Sign Language Converter */}
          <Card className="md:col-span-2 bg-able-brown/10 dark:bg-able-darkBrown/30 border-able-tan/20">
            <CardHeader>
              <CardTitle className="font-gloria text-able-brown dark:text-able-tan">Text to Sign Language</CardTitle>
              <CardDescription>Convert text to sign language representation</CardDescription>
            </CardHeader>
            <CardContent>
              <SignLanguageConverter />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
