import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Trophy, Flame, CheckCircle, Zap, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const userStats = {
    level: 1,
    title: "Quester",
    xp: 40,
    achievements: 1,
    totalAchievements: 8,
    streak: 0,
    longestStreak: 0,
    tasksCompleted: 2,
    tasksToday: 2,
    totalXP: 40,
  };

  const handleResetProgress = () => {
    toast.error("This will permanently delete all of your tasks, progress, and achievements. This action cannot be undone.", {
      duration: 5000,
    });
  };

  const levelProgress = (userStats.xp / 100) * 100;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <div className="bg-gradient-card rounded-xl p-8 mb-6 shadow-glow-purple text-center">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">
            Level {userStats.level} {userStats.title}
          </h1>
          <p className="text-white/80 mb-4">
            {userStats.xp} XP earned • {userStats.achievements} achievements unlocked
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Level Progress</span>
              <span>{levelProgress.toFixed(0)}%</span>
            </div>
            <Progress value={levelProgress} className="h-2 bg-white/20" />
            <p className="text-xs text-white/60 mt-2">{userStats.xp}/100 XP to next level</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{userStats.tasksCompleted}</div>
            </div>
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{userStats.longestStreak}</div>
            </div>
            <p className="text-sm text-muted-foreground">Longest Streak</p>
          </div>
        </div>

        {/* Your Statistics */}
        <div className="bg-card rounded-xl p-6 shadow-lg mb-6">
          <h2 className="font-serif text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Statistics
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-card-foreground">Achievements Unlocked</span>
              </div>
              <span className="text-sm font-bold text-primary">
                {userStats.achievements}/{userStats.totalAchievements}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-card-foreground">Current Streak</span>
              </div>
              <span className="text-sm font-bold text-destructive">
                {userStats.streak} days
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-card-foreground">Achievements Unlocked</span>
              </div>
              <span className="text-sm font-bold text-primary">
                {userStats.achievements}/{userStats.totalAchievements}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-card-foreground">Current Streak</span>
              </div>
              <span className="text-sm font-bold text-destructive">
                {userStats.streak} days
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-card-foreground">Tasks Completed Today</span>
              </div>
              <span className="text-sm font-bold text-card-foreground">{userStats.tasksToday}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-card-foreground">Total Experience</span>
              </div>
              <span className="text-sm font-bold text-accent">{userStats.totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-card rounded-xl p-6 shadow-lg mb-6">
          <h2 className="font-serif text-xl font-bold text-card-foreground mb-4">Recent Achievements</h2>
          <div className="bg-gradient-card rounded-lg p-4 flex items-center gap-3 shadow-glow-blue">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">First Steps</h3>
              <p className="text-xs text-white/70">Complete your first task</p>
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full mb-4"
          onClick={() => window.location.href = '/achievements'}
        >
          <Trophy className="w-4 h-4 mr-2" />
          View All Achievements
        </Button>

        {/* Danger Zone */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Danger Zone</h3>
              <p className="text-sm text-white/80">
                This will permanently delete all of your tasks, progress, and achievements. This action cannot be undone.
              </p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleResetProgress}
          >
            Reset All Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
