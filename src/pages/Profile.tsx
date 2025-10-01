import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { ProfilePictureUpload } from "@/components/ProfilePictureUpload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Trophy, Flame, CheckCircle, Zap, AlertTriangle, LogOut, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// Lazy load the avatar customizer for better performance
const AvatarCustomizer = lazy(() => import("@/components/AvatarCustomizer").then(module => ({ default: module.AvatarCustomizer })));

const Profile = () => {
  const { user, signOut } = useAuth();
  const [userProgress, setUserProgress] = useState({
    level: 1,
    xp: 0,
    streak: 0,
    longest_streak: 0,
    tasks_completed: 0,
  });
  const [profile, setProfile] = useState({
    username: "",
    avatar_type: "upload" as "upload" | "custom",
    avatar_url: null as string | null,
  });
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchProgress();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (data && !error) {
      setProfile({
        username: data.username || "",
        avatar_type: (data.avatar_type as "upload" | "custom") || "upload",
        avatar_url: data.avatar_url || null,
      });
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
      setUserProgress(data);
    }
  };

  const handleResetProgress = async () => {
    const { error: tasksError } = await supabase
      .from("tasks")
      .delete()
      .eq("user_id", user?.id);

    const { error: progressError } = await supabase
      .from("user_progress")
      .update({
        level: 1,
        xp: 0,
        streak: 0,
        longest_streak: 0,
        tasks_completed: 0,
      })
      .eq("user_id", user?.id);

    if (!tasksError && !progressError) {
      setUserProgress({
        level: 1,
        xp: 0,
        streak: 0,
        longest_streak: 0,
        tasks_completed: 0,
      });
      toast.success("Progress reset successfully");
      setShowResetDialog(false);
    } else {
      toast.error("Failed to reset progress");
    }
  };

  const handleSaveAvatar = async (options: any) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        avatar_type: "custom",
        avatar_hairstyle: options.hairstyle,
        avatar_clothing: options.clothing,
        avatar_face_shape: options.faceShape,
        avatar_skin_tone: options.skinTone,
        avatar_accessories: options.accessories,
        avatar_hair_color: options.hairColor,
        avatar_clothing_color: options.clothingColor,
        avatar_accessory_color: options.accessoryColor,
      })
      .eq("id", user?.id);

    if (!error) {
      toast.success("Avatar customized successfully!");
      setShowAvatarDialog(false);
      setProfile({ ...profile, avatar_type: "custom", avatar_url: null });
    } else {
      toast.error("Failed to save avatar");
    }
  };

  const levelProgress = (userProgress.xp % 100);

  const handleAvatarUpdate = (url: string | null) => {
    setProfile({ ...profile, avatar_url: url, avatar_type: "upload" });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <div className="bg-gradient-card rounded-xl p-8 mb-6 shadow-glow-purple text-center">
          <div 
            className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-gold cursor-pointer overflow-hidden"
            onClick={() => setShowAvatarDialog(true)}
          >
            {profile.avatar_url && profile.avatar_type === "upload" ? (
              <img 
                src={profile.avatar_url} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={() => handleAvatarUpdate(null)}
              />
            ) : (
              <User className="w-12 h-12 text-accent-foreground" />
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowAvatarDialog(true)} className="mb-4">
            <Upload className="w-4 h-4 mr-2" />
            Customize Avatar
          </Button>
          
          <h1 className="font-serif text-3xl font-bold text-white mb-2">
            {profile.username}
          </h1>
          <p className="text-white/80 mb-4">
            Level {userProgress.level} • {userProgress.xp} XP earned
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Level Progress</span>
              <span>{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{levelProgress}/100 XP to next level</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{userProgress.tasks_completed}</div>
            </div>
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{userProgress.longest_streak}</div>
            </div>
            <p className="text-sm text-muted-foreground">Longest Streak</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/achievements'}
          >
            <Trophy className="w-4 h-4 mr-2" />
            View All Achievements
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Danger Zone</h3>
              <p className="text-sm text-card-foreground/80">
                This will permanently delete all of your tasks, progress, and achievements. This action cannot be undone.
              </p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => setShowResetDialog(true)}
          >
            Reset All Progress
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to reset all your progress?</DialogTitle>
            <DialogDescription>
              This will permanently delete all of your tasks, progress, and achievements. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowResetDialog(false)}
              className="flex-1"
            >
              No
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleResetProgress}
              className="flex-1"
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Avatar Customization Dialog */}
      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customize Your Avatar</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="custom" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Picture</TabsTrigger>
              <TabsTrigger value="custom">Customize Avatar</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4">
              <ProfilePictureUpload 
                currentAvatarUrl={profile.avatar_url} 
                onAvatarUpdate={handleAvatarUpdate}
              />
            </TabsContent>
            <TabsContent value="custom">
              <Suspense fallback={<div className="text-center p-8 text-muted-foreground">Loading customizer...</div>}>
                <AvatarCustomizer onSave={handleSaveAvatar} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;