import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface AchievementCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
  iconBgColor?: string;
}

export const AchievementCard = ({
  icon: Icon,
  title,
  description,
  unlocked,
  progress,
  total,
  iconBgColor = "bg-primary"
}: AchievementCardProps) => {
  const hasProgress = progress !== undefined && total !== undefined;
  const progressPercentage = hasProgress ? (progress / total) * 100 : 0;
  
  return (
    <div className={cn(
      "p-4 rounded-xl transition-all",
      unlocked 
        ? "bg-gradient-card shadow-glow-blue" 
        : "bg-white/5 opacity-60"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          unlocked ? iconBgColor : "bg-white/10"
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
          <p className="text-xs text-white/70 leading-relaxed">{description}</p>
          {hasProgress && !unlocked && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>{progress}/{total} tasks</span>
                <span>{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-1.5 bg-white/20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
