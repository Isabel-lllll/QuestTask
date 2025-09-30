import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconBgColor?: string;
}

export const StatsCard = ({ icon: Icon, label, value, iconBgColor = "bg-primary" }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-lg flex items-center gap-3">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBgColor)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-lg font-bold text-card-foreground">{value}</p>
      </div>
    </div>
  );
};
