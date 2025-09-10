'use client';

import { useState } from 'react';
import { 
  Sword, 
  Shield, 
  Wand2, 
  Target, 
  Crown, 
  Zap,
  User,
  Upload,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

const PRESET_AVATARS = [
  { id: 'warrior', name: 'Warrior', icon: Sword, color: 'bg-red-500' },
  { id: 'paladin', name: 'Paladin', icon: Shield, color: 'bg-yellow-500' },
  { id: 'mage', name: 'Mage', icon: Wand2, color: 'bg-blue-500' },
  { id: 'archer', name: 'Archer', icon: Target, color: 'bg-green-500' },
  { id: 'assassin', name: 'Assassin', icon: Zap, color: 'bg-purple-500' },
  { id: 'king', name: 'Monarch', icon: Crown, color: 'bg-amber-500' },
];

interface AvatarSelectorProps {
  selectedAvatar: string;
  onAvatarSelect: (avatar: string) => void;
  profilePicture?: string;
  onProfilePictureChange: (file: File | null) => void;
  className?: string;
}

export default function AvatarSelector({
  selectedAvatar,
  onAvatarSelect,
  profilePicture,
  onProfilePictureChange,
  className
}: AvatarSelectorProps) {
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadPreview(result);
        onProfilePictureChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearProfilePicture = () => {
    setUploadPreview(null);
    onProfilePictureChange(null);
  };

  const currentProfilePicture = uploadPreview || profilePicture;

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Profile Picture Upload */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-purple-400" />
          Profile Picture
        </h3>
        
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-600 bg-slate-700 flex items-center justify-center">
              {currentProfilePicture ? (
                <img 
                  src={currentProfilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-slate-400" />
              )}
            </div>
            {currentProfilePicture && (
              <button
                onClick={clearProfilePicture}
                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            )}
          </div>
          
          <div>
            <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-slate-400 mt-1">Max 5MB • JPG, PNG, GIF</p>
          </div>
        </div>
      </div>

      {/* Avatar Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Crown className="h-5 w-5 mr-2 text-yellow-400" />
          Choose Your Class
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {PRESET_AVATARS.map((avatar) => {
            const Icon = avatar.icon;
            const isSelected = selectedAvatar === avatar.id;
            
            return (
              <button
                key={avatar.id}
                onClick={() => onAvatarSelect(avatar.id)}
                className={clsx(
                  'p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105',
                  isSelected
                    ? 'border-purple-400 bg-purple-600/20 shadow-lg shadow-purple-500/25'
                    : 'border-slate-600 bg-slate-700 hover:border-slate-500 hover:bg-slate-600'
                )}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={clsx(
                    'p-3 rounded-lg transition-all duration-200',
                    avatar.color,
                    isSelected && 'scale-110 shadow-lg'
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={clsx(
                    'text-sm font-medium transition-colors',
                    isSelected ? 'text-white' : 'text-slate-300'
                  )}>
                    {avatar.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}