import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ id, title, completed, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all group">
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="border-2 border-primary data-[state=checked]:bg-success data-[state=checked]:border-success"
      />
      <span className={`flex-1 ${completed ? "line-through text-white/50" : "text-white"}`}>
        {title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
