import { Progress } from "@/components/ui/progress";

interface LevelProgressProps {
  currentLevel: number;
  nextLevel: number;
  currentXP: number;
  xpNeeded: number;
}

export const LevelProgress = ({ currentLevel, nextLevel, currentXP, xpNeeded }: LevelProgressProps) => {
  const progressPercentage = (currentXP / xpNeeded) * 100;
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg">
      <h3 className="text-sm font-semibold text-card-foreground mb-3">Level Progress</h3>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>Level {currentLevel}</span>
        <span>Level {nextLevel}</span>
      </div>
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-secondary/20"
        />
      </div>
      <p className="text-xs text-right text-muted-foreground mt-2">
        {currentXP}/{xpNeeded} XP
      </p>
    </div>
  );
};
