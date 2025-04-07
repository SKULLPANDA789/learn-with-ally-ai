
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Play, Square, RefreshCw } from "lucide-react";

// This is a dictionary of ASL signs for demonstration
// In a real implementation, you would use an API or a more comprehensive library
const signLanguageDictionary: Record<string, string> = {
  "a": "👆",
  "b": "👋",
  "c": "👌",
  "d": "👍",
  "e": "🤟",
  "f": "👊",
  "g": "👉",
  "h": "🤙",
  "i": "🖐️",
  "j": "🤞",
  "k": "🤘",
  "l": "👋",
  "m": "👇",
  "n": "👈",
  "o": "👌",
  "p": "👆",
  "q": "👋",
  "r": "🤘",
  "s": "✊",
  "t": "👍",
  "u": "🤟",
  "v": "✌️",
  "w": "👌",
  "x": "🤙",
  "y": "🤘",
  "z": "👈",
  " ": " ",
  ".": ".",
  "?": "?",
  "!": "!"
};

export default function SignLanguageConverter() {
  const [inputText, setInputText] = useState("");
  const [signOutput, setSignOutput] = useState<string[]>([]);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  // Convert text to sign language
  const convertToSignLanguage = () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to convert",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    // Convert each character to its sign language equivalent
    const signs = inputText.toLowerCase().split("").map(char => {
      return signLanguageDictionary[char] || char; // Use the character itself if no sign is found
    });

    setSignOutput(signs);
    setCurrentSignIndex(0);
    toast({
      title: "Converted to Sign Language",
      description: "Text has been converted to sign language symbols",
    });
  };

  // Function to play the sign language animation
  const playSignLanguage = () => {
    if (signOutput.length === 0) {
      convertToSignLanguage();
      return;
    }

    setIsPlaying(true);
    setCurrentSignIndex(0);

    // Start the animation with a timer
    let index = 0;
    const interval = setInterval(() => {
      if (index < signOutput.length - 1) {
        index++;
        setCurrentSignIndex(index);
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 800); // Show each sign for 800ms
  };

  // Function to stop the animation
  const stopSignLanguage = () => {
    setIsPlaying(false);
  };

  // Function to copy signs to clipboard
  const copyToClipboard = () => {
    if (signOutput.length === 0) {
      toast({
        title: "Nothing to copy",
        description: "Convert text to signs first",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(signOutput.join("")).then(() => {
      toast({
        title: "Copied!",
        description: "Sign symbols copied to clipboard",
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

  // Reset the converter
  const resetConverter = () => {
    setInputText("");
    setSignOutput([]);
    setCurrentSignIndex(0);
    setIsPlaying(false);
  };

  return (
    <Card className="bg-able-brown/10 dark:bg-able-darkBrown/30 border-able-tan/20">
      <CardHeader>
        <CardTitle className="font-gloria text-able-brown dark:text-able-tan">Text to Sign Language</CardTitle>
        <CardDescription>Convert text to sign language symbols</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Textarea 
            placeholder="Enter text to convert to sign language..."
            className="mb-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={convertToSignLanguage}
              className="bg-able-orange hover:bg-able-gold text-able-darkBrown font-semibold"
            >
              Convert to Sign
            </Button>
            <Button 
              onClick={playSignLanguage}
              disabled={isPlaying || signOutput.length === 0}
              className="bg-able-orange hover:bg-able-gold text-able-darkBrown font-semibold"
            >
              <Play className="h-4 w-4 mr-1" /> Play Signs
            </Button>
            {isPlaying && (
              <Button 
                onClick={stopSignLanguage}
                variant="destructive"
                className="font-semibold"
              >
                <Square className="h-4 w-4 mr-1" /> Stop
              </Button>
            )}
            <Button 
              onClick={copyToClipboard}
              variant="outline"
              className="font-semibold"
            >
              <Copy className="h-4 w-4 mr-1" /> Copy Signs
            </Button>
            <Button 
              onClick={resetConverter}
              variant="outline"
              className="font-semibold"
            >
              <RefreshCw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
        
        {/* Sign Language Display Area */}
        <div className="mt-6">
          <div className="p-4 bg-background rounded-md border min-h-[120px] flex flex-col items-center">
            {signOutput.length > 0 && (
              <>
                {/* Current sign being displayed during "play" */}
                {isPlaying ? (
                  <div className="text-6xl mb-4 animate-bounce">
                    {signOutput[currentSignIndex]}
                  </div>
                ) : (
                  <div className="text-lg flex flex-wrap gap-2 justify-center">
                    {signOutput.map((sign, index) => (
                      <span 
                        key={index} 
                        className="text-3xl"
                      >
                        {sign}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mt-4">
                  {isPlaying 
                    ? `Playing sign ${currentSignIndex + 1} of ${signOutput.length}` 
                    : `${signOutput.length} signs generated`}
                </p>
              </>
            )}
            
            {signOutput.length === 0 && (
              <p className="text-muted-foreground text-center">
                Enter text and click "Convert to Sign" to see the sign language representation
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
