
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, BookMarked, Volume2 } from "lucide-react";

// Define a simple content structure for subjects
const subjects = [
  {
    id: "math",
    name: "Mathematics",
    description: "Numbers, shapes, patterns, and logical thinking",
    icon: "📐",
    grades: {
      1: [
        { title: "Counting Numbers", content: "Learn to count from 1 to 100 with interactive examples." },
        { title: "Basic Addition", content: "Start adding single-digit numbers together." },
        { title: "Shapes Recognition", content: "Identify circles, squares, triangles, and rectangles." },
      ],
      5: [
        { title: "Fractions", content: "Learn about fractions, how to compare them, and basic operations." },
        { title: "Decimals", content: "Introduction to decimals and their relationship to fractions." },
        { title: "Geometry Basics", content: "Area and perimeter of simple shapes." },
      ],
      10: [
        { title: "Algebra II", content: "Advanced algebraic expressions and equations." },
        { title: "Trigonometry", content: "Functions, identities and applications." },
        { title: "Statistics", content: "Data analysis, probability, and distributions." },
      ],
    },
  },
  {
    id: "science",
    name: "Science",
    description: "Discovering how our world works through observation and experimentation",
    icon: "🔬",
    grades: {
      1: [
        { title: "Living Things", content: "Introduction to plants, animals, and humans." },
        { title: "Weather", content: "Basic understanding of weather patterns." },
        { title: "The Five Senses", content: "Explore how we perceive the world through our senses." },
      ],
      5: [
        { title: "Ecosystems", content: "How living things interact with their environment." },
        { title: "Matter & Energy", content: "Properties of matter and different forms of energy." },
        { title: "Human Body", content: "Major body systems and their functions." },
      ],
      10: [
        { title: "Physics", content: "Forces, motion, energy, and waves." },
        { title: "Chemistry", content: "Atomic structure, periodic table, and chemical reactions." },
        { title: "Biology", content: "Cells, genetics, evolution, and human physiology." },
      ],
    },
  },
  {
    id: "english",
    name: "English",
    description: "Reading, writing, speaking, and understanding language",
    icon: "📚",
    grades: {
      1: [
        { title: "Phonics", content: "Learning letter sounds and basic word formation." },
        { title: "Sight Words", content: "Common words to recognize instantly." },
        { title: "Simple Sentences", content: "Creating basic sentences with subjects and verbs." },
      ],
      5: [
        { title: "Reading Comprehension", content: "Understanding meaning and drawing conclusions from text." },
        { title: "Grammar", content: "Parts of speech, sentence structure, and punctuation." },
        { title: "Creative Writing", content: "Expressing ideas through stories and descriptions." },
      ],
      10: [
        { title: "Literature Analysis", content: "Critical reading of classic and contemporary texts." },
        { title: "Essay Writing", content: "Forming arguments and supporting with evidence." },
        { title: "Research Skills", content: "Finding and evaluating sources, citing properly." },
      ],
    },
  },
];

export default function Subjects() {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const handleTopicToggle = (index: number) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };
  
  // Text to speech for content
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getGradeOptions = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
      <Button
        key={grade}
        variant={selectedGrade === grade ? "default" : "outline"}
        className={`${
          selectedGrade === grade ? "bg-able-brown text-able-cream" : ""
        } m-1`}
        onClick={() => setSelectedGrade(grade)}
      >
        {grade}
      </Button>
    ));
  };

  const getSubjectContent = () => {
    const subject = subjects.find((s) => s.id === selectedSubject);
    if (!subject) return null;

    // For demo purposes, if a grade doesn't have content, show grade 5 content
    const gradeContent = subject.grades[selectedGrade as keyof typeof subject.grades] || 
                         subject.grades[5 as keyof typeof subject.grades];
    
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">
          {subject.name} - Grade {selectedGrade}
        </h3>
        <div className="space-y-4">
          {gradeContent.map((topic, index) => (
            <Card key={index} className="bg-background/50">
              <CardHeader 
                className="cursor-pointer py-3" 
                onClick={() => handleTopicToggle(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-able-brown" />
                    <CardTitle className="text-base">{topic.title}</CardTitle>
                  </div>
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${expandedTopic === index ? 'transform rotate-90' : ''}`} 
                  />
                </div>
              </CardHeader>
              {expandedTopic === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-2">{topic.content}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => speakText(topic.content)}
                    className="text-xs flex items-center gap-1"
                  >
                    <Volume2 className="h-3 w-3" />
                    Read Aloud
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 px-4">
      <div className="content-container">
        <h2 className="font-gloria text-2xl md:text-3xl mb-6 text-center">Subject Library</h2>
        
        <Tabs defaultValue="math" value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList className="w-full justify-start mb-6 overflow-x-auto bg-able-brown/20 p-1">
            {subjects.map((subject) => (
              <TabsTrigger 
                key={subject.id} 
                value={subject.id}
                className="flex items-center gap-2"
              >
                <span>{subject.icon}</span>
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {subjects.map((subject) => (
            <TabsContent 
              key={subject.id} 
              value={subject.id}
              className="border rounded-lg p-4 bg-able-brown/5 dark:bg-able-darkBrown/20"
            >
              <div className="mb-4">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {subject.name}
                </h3>
                <p className="text-muted-foreground">{subject.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap">{getGradeOptions()}</div>
              </div>
              
              {getSubjectContent()}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
