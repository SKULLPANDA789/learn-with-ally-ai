
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Camera, StopCircle, RefreshCw, HandMetal } from "lucide-react";

// Mock sign language gestures database - in a real app, you would use a trained ML model
const signGestureDatabase: Record<string, string> = {
  "✊": "A",
  "👍": "B", 
  "👌": "C",
  "👉": "D",
  "🤟": "I love you",
  "✌️": "Peace",
  "👋": "Hello",
  "🤙": "Call me"
};

export default function SignLanguageRecognition() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [recognizedSign, setRecognizedSign] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [detectionHistory, setDetectionHistory] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toast } = useToast();
  
  // Clean up stream on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start webcam capture
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCapturing(true);
        
        // Start sign detection (simulated)
        startSignDetection();
        
        toast({
          title: "Camera started",
          description: "Sign language detection is now active"
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera access error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  // Stop webcam capture
  const stopCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      setIsCapturing(false);
      toast({
        title: "Camera stopped",
        description: "Sign language detection has stopped"
      });
    }
  };

  // Reset the session
  const resetSession = () => {
    stopCapture();
    setRecognizedSign(null);
    setRecognizedText("");
    setDetectionHistory([]);
    toast({
      title: "Session reset",
      description: "All detection history has been cleared"
    });
  };

  // Start sign language detection (simulated)
  const startSignDetection = () => {
    // In a real app, this would use a trained machine learning model
    // Here we're simulating detection with random signs from our database
    
    const detectionInterval = setInterval(() => {
      if (!isCapturing) {
        clearInterval(detectionInterval);
        return;
      }
      
      // Simulate processing video frame
      if (videoRef.current && canvasRef.current && isCapturing) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (context) {
          // Take snapshot from video to canvas
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          
          // Simulate detection (random sign for demo)
          const randomDetection = Math.random() > 0.8; // 20% chance to "detect" a sign
          
          if (randomDetection) {
            // Get a random sign from our database
            const signs = Object.keys(signGestureDatabase);
            const randomSign = signs[Math.floor(Math.random() * signs.length)];
            const meaning = signGestureDatabase[randomSign];
            
            setRecognizedSign(randomSign);
            setRecognizedText(meaning);
            
            // Add to history
            setDetectionHistory(prev => [
              `${randomSign} - ${meaning}`, 
              ...prev.slice(0, 7)
            ]);
            
            // Show toast for new detection
            toast({
              title: "Sign Detected",
              description: `Detected: ${randomSign} (${meaning})`,
              duration: 1500,
            });
          }
        }
      }
    }, 3000); // Check every 3 seconds
    
    // Clean up interval
    return () => clearInterval(detectionInterval);
  };

  return (
    <Card className="bg-able-brown/10 dark:bg-able-darkBrown/30 border-able-tan/20">
      <CardHeader>
        <CardTitle className="font-gloria text-able-brown dark:text-able-tan">Sign Language Recognition</CardTitle>
        <CardDescription>Use your camera to recognize sign language gestures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Camera View */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden mb-4">
              {!isCapturing && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <HandMetal className="w-12 h-12 opacity-50" />
                  <p className="absolute mt-16 text-sm opacity-75">Camera not active</p>
                </div>
              )}
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${!isCapturing ? 'opacity-40' : ''}`}
              />
              <canvas 
                ref={canvasRef}
                width="320"
                height="240"
                className="hidden" // Hidden canvas for processing
              />
              
              {recognizedSign && isCapturing && (
                <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-md text-lg animate-bounce">
                  {recognizedSign}
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-2">
              {!isCapturing ? (
                <Button 
                  onClick={startCapture} 
                  className="bg-able-orange hover:bg-able-gold text-able-darkBrown font-semibold"
                >
                  <Camera className="h-4 w-4 mr-1" /> Start Camera
                </Button>
              ) : (
                <Button 
                  onClick={stopCapture}
                  variant="destructive"
                  className="font-semibold"
                >
                  <StopCircle className="h-4 w-4 mr-1" /> Stop Camera
                </Button>
              )}
              <Button 
                onClick={resetSession}
                variant="outline"
                className="font-semibold"
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
          </div>
          
          {/* Recognition Results */}
          <div className="flex flex-col">
            <div className="border rounded-md p-4 mb-4 bg-background min-h-[100px] flex items-center justify-center">
              {recognizedSign ? (
                <div className="text-center">
                  <p className="text-6xl mb-2">{recognizedSign}</p>
                  <p className="text-lg font-medium">{recognizedText}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  No sign detected yet. Start the camera and make a sign gesture.
                </p>
              )}
            </div>
            
            <h4 className="font-medium mb-2">Detection History</h4>
            <div className="border rounded-md p-3 bg-background flex-1 overflow-y-auto max-h-[140px]">
              {detectionHistory.length > 0 ? (
                <ul className="space-y-1">
                  {detectionHistory.map((item, index) => (
                    <li key={index} className="text-sm border-b last:border-0 pb-1 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center text-sm py-4">
                  Detection history will appear here
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a demonstration using simulated sign language recognition.
            In a production environment, this would use a trained machine learning model for accurate sign detection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
