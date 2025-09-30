import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { LevelProgress } from "@/components/LevelProgress";
import { TaskItem } from "@/components/TaskItem";
import { AddTaskModal } from "@/components/AddTaskModal";
import { Button } from "@/components/ui/button";
import { User, Zap, Flame, CheckSquare, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
  due_date: string | null;
  xp_reward: number;
}

interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  tasks_completed: number;
}

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    streak: 0,
    tasks_completed: 0,
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchProgress();
    }
  }, [user]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (data && !error) {
      setTasks(data);
    }
    setLoading(false);
  };

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    if (data && !error) {
      setProgress(data);
    }
  };

  const handleAddTask = async (title: string, priority: string, dueDate: Date | null) => {
    const xpReward = priority === "high" ? 30 : priority === "medium" ? 20 : 10;
    
    const { data, error } = await supabase
      .from("tasks")
      .insert([{
        user_id: user?.id as string,
        title,
        priority,
        due_date: dueDate ? dueDate.toISOString().split('T')[0] : null,
        xp_reward: xpReward,
      }])
      .select()
      .single();

    if (data && !error) {
      setTasks([data, ...tasks]);
      toast.success(`Task added! +${xpReward} XP on completion`);
    } else {
      toast.error("Failed to add task");
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;
    
    const { error } = await supabase
      .from("tasks")
      .update({ 
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null
      })
      .eq("id", id);

    if (!error) {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: newCompleted } : t));
      
      if (newCompleted) {
        const newXP = progress.xp + task.xp_reward;
        const newLevel = Math.floor(newXP / 100) + 1;
        const newTasksCompleted = progress.tasks_completed + 1;
        
        await supabase
          .from("user_progress")
          .update({
            xp: newXP,
            level: newLevel,
            tasks_completed: newTasksCompleted,
            last_task_date: new Date().toISOString().split('T')[0]
          })
          .eq("user_id", user?.id);
        
        setProgress({
          ...progress,
          xp: newXP,
          level: newLevel,
          tasks_completed: newTasksCompleted
        });
        
        toast.success(`Task completed! +${task.xp_reward} XP`, { icon: "✨" });
        
        if (newLevel > progress.level) {
          toast.success(`Level Up! You're now level ${newLevel}!`, { icon: "🎉" });
        }
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (!error) {
      setTasks(tasks.filter(t => t.id !== id));
      toast("Task deleted");
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const xpForNextLevel = progress.level * 100;
  const xpProgress = (progress.xp % 100);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatsCard icon={User} label="Level" value={progress.level} iconBgColor="bg-secondary" />
          <StatsCard icon={Zap} label="Total XP" value={progress.xp} iconBgColor="bg-accent" />
          <StatsCard icon={Flame} label="Streak" value={`${progress.streak} days`} iconBgColor="bg-destructive" />
          <StatsCard icon={CheckSquare} label="Completed" value={`${progress.tasks_completed} tasks`} iconBgColor="bg-success" />
        </div>

        {/* Level Progress */}
        <div className="mb-6">
          <LevelProgress
            currentLevel={progress.level}
            nextLevel={progress.level + 1}
            currentXP={xpProgress}
            xpNeeded={100}
          />
        </div>

        {/* Tasks Section */}
        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-card-foreground">Your Tasks</h2>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={filter !== "all" ? "text-[#0047AB]" : ""}
              >
                All
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
                className={filter !== "active" ? "text-[#0047AB]" : ""}
              >
                Active
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
                className={filter !== "completed" ? "text-[#0047AB]" : ""}
              >
                Completed
              </Button>
            </div>
          </div>

          {/* Add Task Button */}
          <Button 
            onClick={() => setShowAddModal(true)} 
            className="w-full mb-6 shadow-glow-blue"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">No {filter !== "all" ? filter : ""} tasks</p>
                <p className="text-muted-foreground/70 text-sm">Add a new task to get started!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <AddTaskModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Tasks;