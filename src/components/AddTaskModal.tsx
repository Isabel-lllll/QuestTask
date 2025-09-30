import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (title: string, priority: string, dueDate: Date | null) => void;
}

export const AddTaskModal = ({ open, onOpenChange, onAddTask }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAddTask(title, priority, dueDate);
    setTitle("");
    setPriority("medium");
    setDueDate(null);
    onOpenChange(false);
  };

  const xpReward = priority === "high" ? 30 : priority === "medium" ? 20 : 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Add New Task</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter your task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label>Priority Level</Label>
            <div className="flex gap-2">
              <Button
                variant={priority === "low" ? "default" : "outline"}
                onClick={() => setPriority("low")}
                className={cn(
                  "flex-1",
                  priority !== "low" && "text-[#0047AB]"
                )}
              >
                Low
                <span className="text-xs ml-1">+10 XP</span>
              </Button>
              <Button
                variant={priority === "medium" ? "default" : "outline"}
                onClick={() => setPriority("medium")}
                className={cn(
                  "flex-1",
                  priority !== "medium" && "text-[#0047AB]"
                )}
              >
                Medium
                <span className="text-xs ml-1">+20 XP</span>
              </Button>
              <Button
                variant={priority === "high" ? "default" : "outline"}
                onClick={() => setPriority("high")}
                className={cn(
                  "flex-1",
                  priority !== "high" && "text-[#0047AB]"
                )}
              >
                High
                <span className="text-xs ml-1">+30 XP</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deadline (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate || undefined}
                  onSelect={(date) => setDueDate(date || null)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
            <span className="text-sm text-muted-foreground">XP Reward:</span>
            <span className="text-lg font-bold text-accent">+{xpReward} XP</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 text-[#0047AB]">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 shadow-glow-blue">
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};