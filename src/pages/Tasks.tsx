import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { LevelProgress } from "@/components/LevelProgress";
import { TaskItem } from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, User, Zap, Flame, CheckSquare } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete onboarding tutorial", completed: true },
    { id: "2", title: "Create your first task", completed: true },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const stats = {
    level: 1,
    xp: 40,
    streak: 0,
    tasksCompleted: tasks.filter(t => t.completed).length,
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    toast.success("Task added! +10 XP");
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          toast.success("Task completed! +20 XP", {
            icon: "✨",
          });
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast("Task deleted");
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatsCard icon={User} label="Level" value={stats.level} iconBgColor="bg-secondary" />
          <StatsCard icon={Zap} label="Total XP" value={stats.xp} iconBgColor="bg-accent" />
          <StatsCard icon={Flame} label="Streak" value={`${stats.streak} days`} iconBgColor="bg-destructive" />
          <StatsCard icon={CheckSquare} label="Today" value={`${stats.tasksCompleted} tasks`} iconBgColor="bg-success" />
        </div>

        {/* Level Progress */}
        <div className="mb-6">
          <LevelProgress
            currentLevel={stats.level}
            nextLevel={stats.level + 1}
            currentXP={stats.xp}
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
              >
                All
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
              >
                Completed
              </Button>
            </div>
          </div>

          {/* Add Task Input */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            <Button onClick={handleAddTask} className="shadow-glow-blue">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 mb-2">No {filter !== "all" ? filter : ""} tasks</p>
                <p className="text-white/30 text-sm">Add a new task to get started!</p>
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
    </div>
  );
};

export default Tasks;
