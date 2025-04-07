
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, BookMarked, Activity, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // This would typically come from a user profile or learning management system
  const recentSubjects = [
    { name: "Mathematics", progress: 65, lastAccessed: "Today" },
    { name: "Science", progress: 40, lastAccessed: "Yesterday" },
    { name: "English", progress: 80, lastAccessed: "3 days ago" },
  ];
  
  const upcomingQuizzes = [
    { subject: "Mathematics", topic: "Fractions", date: "Tomorrow", time: "10:00 AM" },
    { subject: "Science", topic: "Ecosystems", date: "In 3 days", time: "2:30 PM" },
  ];
  
  return (
    <section className="py-6 px-4">
      <div className="content-container">
        <h2 className="sr-only">Your Learning Dashboard</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Subjects */}
          <Card className="col-span-full md:col-span-1 lg:col-span-2 bg-able-brown/10 dark:bg-able-darkBrown/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Your Recent Subjects
              </CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubjects.map((subject, index) => (
                  <div key={index} className="bg-background/50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{subject.name}</h4>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {subject.lastAccessed}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={subject.progress} className="h-2" />
                      <span className="text-xs font-medium w-10">{subject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center pt-2">
              <Button asChild variant="ghost" className="text-able-orange hover:text-able-gold">
                <Link to="/subjects" className="flex items-center gap-1">
                  View All Subjects <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Upcoming Quizzes */}
          <Card className="bg-able-brown/10 dark:bg-able-darkBrown/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5" />
                Upcoming Quizzes
              </CardTitle>
              <CardDescription>Prepare for your assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingQuizzes.map((quiz, index) => (
                  <div key={index} className="bg-background/50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{quiz.subject}</h5>
                        <p className="text-sm text-muted-foreground">{quiz.topic}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{quiz.date}</p>
                        <p className="text-xs text-muted-foreground">{quiz.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {upcomingQuizzes.length === 0 && (
                  <p className="text-center text-muted-foreground py-6">
                    No upcoming quizzes
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-center pt-2">
              <Button asChild variant="ghost" className="text-able-orange hover:text-able-gold">
                <Link to="/tools" className="flex items-center gap-1">
                  Study Tools <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Learning Progress */}
          <Card className="col-span-full bg-able-brown/10 dark:bg-able-darkBrown/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Weekly Learning Progress
              </CardTitle>
              <CardDescription>Track your engagement and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[100px] flex items-end justify-between gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                  // Generate random heights for the demo
                  const height = 20 + Math.floor(Math.random() * 60);
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-able-orange w-8 rounded-t-sm transition-all" 
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs mt-1">{day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-between text-sm">
              <span>Total Learning Time: 12.5 hours</span>
              <span>Completed Activities: 24</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
