import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Upload, X, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ProfilePictureUploadProps {
  currentAvatarUrl?: string;
  onAvatarUpdate: (url: string | null) => void;
}

export const ProfilePictureUpload = ({ currentAvatarUrl, onAvatarUpdate }: ProfilePictureUploadProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      // Create file path with user ID
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Delete existing avatar if it exists
      if (currentAvatarUrl) {
        const existingPath = currentAvatarUrl.split('/').slice(-2).join('/'); // Extract user_id/filename
        await supabase.storage.from('avatars').remove([existingPath]);
      }

      // Upload new file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { 
          cacheControl: '3600',
          upsert: true 
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          avatar_type: 'upload'
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setPreviewUrl(publicUrl);
      onAvatarUpdate(publicUrl);
      toast.success('Profile picture updated successfully!');

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || !currentAvatarUrl) return;

    setUploading(true);
    
    try {
      // Extract path from URL
      const path = currentAvatarUrl.split('/').slice(-2).join('/');
      
      // Remove from storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([path]);

      if (deleteError) throw deleteError;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: null,
          avatar_type: 'upload'
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setPreviewUrl(null);
      onAvatarUpdate(null);
      toast.success('Profile picture removed');

    } catch (error: any) {
      console.error('Remove error:', error);
      toast.error('Failed to remove profile picture');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-card-foreground">Profile Picture</Label>
      
      {/* Avatar Preview */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-card rounded-full flex items-center justify-center shadow-glow-purple overflow-hidden">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={() => {
                  setPreviewUrl(null);
                  onAvatarUpdate(null);
                }}
              />
            ) : (
              <User className="w-16 h-16 text-accent-foreground" />
            )}
          </div>
          
          {previewUrl && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0"
              onClick={handleRemoveAvatar}
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Upload Controls */}
      <div className="flex flex-col items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload New Picture'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Supports JPEG, PNG, WebP. Max 5MB.
        </p>
      </div>
    </div>
  );
};