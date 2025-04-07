
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-able-brown dark:bg-able-darkBrown py-4 px-4 md:px-6">
        <div className="content-container flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img src="/assets/logo.png" alt="ABLE Logo" className="h-12 w-auto" />
            <h1 className="font-gloria text-3xl text-able-cream">ABLE</h1>
          </div>
          <p className="text-able-cream text-sm md:text-base">AI-Based Learning Assistant for Students with Disabilities</p>
        </div>
      </header>

      <nav className="bg-able-darkBrown/80 dark:bg-able-darkBrown/90 py-2">
        <div className="content-container flex items-center justify-between">
          <div className="flex gap-4 text-able-cream">
            <Link to="/" className="hover:text-able-gold transition-colors">Home</Link>
            <Link to="/subjects" className="hover:text-able-gold transition-colors">Subjects</Link>
            <Link to="/chat" className="hover:text-able-gold transition-colors">AI Tutor</Link>
            <Link to="/tools" className="hover:text-able-gold transition-colors">Accessibility Tools</Link>
            <Link to="/sign-language" className="hover:text-able-gold transition-colors">Sign Language</Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="text-able-cream hover:text-able-gold"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-able-darkBrown/80 dark:bg-able-darkBrown py-4 text-center text-able-cream/70 mt-10">
        <p>© 2025 ABLE - AI-Based Learning for Everyone</p>
      </footer>
    </div>
  );
}
