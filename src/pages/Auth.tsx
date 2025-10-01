import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      if (!username.trim()) {
        toast.error("Please enter a username");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, username);
      if (error) {
        toast.error(error.message);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating colorful bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { color: 'bg-primary/20', size: 'w-24 h-24', left: '10%', top: '20%' },
          { color: 'bg-accent/20', size: 'w-32 h-32', left: '80%', top: '10%' },
          { color: 'bg-secondary/20', size: 'w-20 h-20', left: '15%', top: '70%' },
          { color: 'bg-success/20', size: 'w-28 h-28', left: '85%', top: '75%' },
          { color: 'bg-primary/15', size: 'w-16 h-16', left: '50%', top: '15%' },
          { color: 'bg-accent/15', size: 'w-36 h-36', left: '45%', top: '80%' },
        ].map((bubble, i) => (
          <div
            key={i}
            className={`absolute ${bubble.size} ${bubble.color} rounded-full backdrop-blur-sm animate-float`}
            style={{
              left: bubble.left,
              top: bubble.top,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm p-8 shadow-glow-purple relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-card-foreground mb-2">
            Welcome to TaskQuest
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? "Create your account to start your quest" : "Sign in to continue your journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-card-foreground">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="bg-white/5 border-white/10"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/5 border-white/10"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-card-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-white/5 border-white/10"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full shadow-glow-blue"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;