import { Navigation } from "@/components/Navigation";
import { AchievementCard } from "@/components/AchievementCard";
import { Star, Flame, Target, Trophy, Sparkles, Award, CheckCircle, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Achievements = () => {
  const achievementStats = {
    unlocked: 1,
    remaining: 7,
    completionRate: 13,
    bonusXP: 50,
  };

  const achievements = [
    {
      icon: Star,
      title: "First Steps",
      description: "Complete your first task",
      unlocked: true,
      iconBgColor: "bg-primary",
    },
    {
      icon: CheckCircle,
      title: "Getting Started",
      description: "Complete 5 tasks",
      unlocked: false,
      progress: 2,
      total: 5,
      iconBgColor: "bg-success",
    },
    {
      icon: Target,
      title: "Task Master",
      description: "Complete 25 tasks",
      unlocked: false,
      progress: 2,
      total: 25,
      iconBgColor: "bg-primary",
    },
    {
      icon: Flame,
      title: "Streak Starter",
      description: "Maintain a 3-day streak",
      unlocked: false,
      progress: 0,
      total: 3,
      iconBgColor: "bg-destructive",
    },
    {
      icon: Sparkles,
      title: "Consistency King",
      description: "Complete tasks 7 days in a row",
      unlocked: false,
      progress: 0,
      total: 7,
      iconBgColor: "bg-secondary",
    },
    {
      icon: Zap,
      title: "XP Hunter",
      description: "Reach 100 total XP",
      unlocked: false,
      progress: 40,
      total: 100,
      iconBgColor: "bg-accent",
    },
    {
      icon: Trophy,
      title: "Daily Warrior",
      description: "Complete 5 tasks in a single day",
      unlocked: false,
      progress: 2,
      total: 5,
      iconBgColor: "bg-accent",
    },
    {
      icon: Award,
      title: "Legendary",
      description: "Reach Level 10",
      unlocked: false,
      progress: 1,
      total: 10,
      iconBgColor: "bg-accent",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Achievement Gallery Header */}
        <div className="bg-gradient-card rounded-xl p-8 mb-6 shadow-glow-blue">
          <h1 className="font-serif text-3xl font-bold text-white text-center mb-2">
            Achievement Gallery
          </h1>
          <p className="text-white/80 text-center mb-6">
            Track your progress and unlock rewards
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{achievementStats.unlocked}</div>
              <div className="text-sm text-white/70">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{achievementStats.remaining}</div>
              <div className="text-sm text-white/70">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{achievementStats.completionRate}%</div>
              <div className="text-sm text-white/70">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{achievementStats.bonusXP}</div>
              <div className="text-sm text-white/70">Bonus XP</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Overall Progress</span>
              <span>{achievementStats.completionRate}%</span>
            </div>
            <Progress value={achievementStats.completionRate} className="h-2 bg-white/20" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Unlocked Achievements */}
          <div className="bg-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-accent" />
              <h2 className="font-serif text-xl font-bold text-card-foreground">Unlocked Achievements</h2>
              <span className="text-sm text-muted-foreground">1 unlocked</span>
            </div>
            <div className="space-y-3">
              {achievements.filter(a => a.unlocked).map((achievement) => (
                <AchievementCard key={achievement.title} {...achievement} />
              ))}
            </div>
          </div>

          {/* Locked Achievements */}
          <div className="bg-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-serif text-xl font-bold text-card-foreground">Locked Achievements</h2>
              <span className="text-sm text-muted-foreground">7 remaining</span>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {achievements.filter(a => !a.unlocked).map((achievement) => (
                <AchievementCard key={achievement.title} {...achievement} />
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Tips */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Achievement Tips</h3>
              <ul className="space-y-1 text-sm text-white/80">
                <li>• Complete tasks daily to maintain your streak and unlock streak-based achievements</li>
                <li>• Focus on high-priority tasks to earn more XP and reach XP milestone badges</li>
                <li>• Try to complete multiple tasks in a single day for daily challenge achievements</li>
                <li>• Each unlocked achievement gives you a 50 XP bonus to boost your level progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
