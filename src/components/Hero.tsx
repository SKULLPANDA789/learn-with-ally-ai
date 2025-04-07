
import { Button } from "@/components/ui/button";
import { useState } from "react";

const gradeButtons = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Hero() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  return (
    <section className="py-10 px-4">
      <div className="content-container">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-able-darkBrown/70 dark:bg-able-darkBrown/90 p-6 rounded-xl shadow-lg">
            <h2 className="font-gloria text-2xl md:text-3xl text-able-cream mb-4">About ABLE</h2>
            <p className="text-able-cream/90 mb-4">
              Millions of students with disabilities face challenges accessing traditional education. 
              ABLE bridges this gap with AI-powered tools designed to make learning accessible to everyone.
            </p>
            <p className="text-able-cream/90 mb-4">
              Our platform provides text-to-speech, speech-to-text, AI summarization, 
              and adaptive learning — all in one integrated solution.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button 
                variant="default" 
                className="bg-able-orange hover:bg-able-gold text-able-darkBrown font-semibold"
              >
                Take a Tour
              </Button>
              <Button 
                variant="outline" 
                className="border-able-cream text-able-cream hover:bg-able-cream hover:text-able-darkBrown"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="bg-able-lightBrown/70 dark:bg-able-lightBrown/50 p-6 rounded-xl shadow-lg">
            <h3 className="font-gloria text-xl text-able-cream mb-4">Select Your Class</h3>
            <div className="grid grid-cols-2 gap-2">
              {gradeButtons.map((grade) => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "secondary"}
                  className={`${
                    selectedGrade === grade 
                      ? "bg-able-gold text-able-darkBrown" 
                      : "bg-able-brown/80 text-able-cream"
                  } hover:bg-able-gold hover:text-able-darkBrown transition-colors`}
                  onClick={() => setSelectedGrade(grade)}
                >
                  Class {grade}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
