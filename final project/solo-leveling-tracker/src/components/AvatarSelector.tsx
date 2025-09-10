'use client';

import { useState } from 'react';
import { 
  User,
  Upload,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

interface AvatarSelectorProps {
  profilePicture?: string;
  onProfilePictureChange: (file: File | null) => void;
  className?: string;
}

export default function AvatarSelector({
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
    <div className={clsx('', className)}>
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
    </div>
  );
}