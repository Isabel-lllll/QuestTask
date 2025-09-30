import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Award, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardEntry {
  username: string;
  level: number;
  xp: number;
  tasks_completed: number;
}

const Community = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("user_progress")
      .select(`
        level,
        xp,
        tasks_completed,
        profiles!inner(username)
      `)
      .order("xp", { ascending: false })
      .limit(10);

    if (data && !error) {
      const formattedData = data.map((entry: any) => ({
        username: entry.profiles.username,
        level: entry.level,
        xp: entry.xp,
        tasks_completed: entry.tasks_completed,
      }));
      setLeaderboard(formattedData);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-card-foreground mb-2">Community</h1>
          <p className="text-muted-foreground">See how you rank against other questers</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-card rounded-xl shadow-lg p-6">
          <h2 className="font-serif text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Leaderboard
          </h2>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No data yet. Be the first to complete tasks!
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg transition-all",
                    index === 0 && "bg-gradient-card shadow-glow-gold",
                    index === 1 && "bg-secondary/20",
                    index === 2 && "bg-accent/20",
                    index > 2 && "bg-card-foreground/5 hover:bg-card-foreground/10"
                  )}
                >
                  <div className="flex-shrink-0 w-8 text-center">
                    {index < 3 ? (
                      <Award className={cn(
                        "w-6 h-6 mx-auto",
                        index === 0 && "text-yellow-400",
                        index === 1 && "text-gray-400",
                        index === 2 && "text-amber-600"
                      )} />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                    )}
                  </div>

                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">
                      {entry.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="font-semibold text-card-foreground">{entry.username}</div>
                    <div className="text-sm text-muted-foreground">
                      Level {entry.level} • {entry.tasks_completed} tasks
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">{entry.xp}</div>
                    <div className="text-xs text-muted-foreground">XP</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-lg text-center">
            <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-card-foreground">
              {leaderboard.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Questers</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-lg text-center">
            <Award className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-card-foreground">
              {leaderboard.reduce((sum, entry) => sum + entry.tasks_completed, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default Community;