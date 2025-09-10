'use client';

import { useState } from 'react';
import { 
  User, 
  Save,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import AvatarSelector from './AvatarSelector';
import { ProfileData } from '@/contexts/UserContext';

interface ProfileSetupProps {
  initialProfile: ProfileData;
  onSave: (profile: Partial<ProfileData>) => void;
  onCancel?: () => void;
  isFirstTime?: boolean;
  className?: string;
}

interface FormErrors {
  username?: string;
}

export default function ProfileSetup({
  initialProfile,
  onSave,
  onCancel,
  isFirstTime = false,
  className
}: ProfileSetupProps) {
  const [formData, setFormData] = useState({
    username: initialProfile.username,
    profilePicture: initialProfile.profilePicture,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setSaveLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters';
    } else if (!/^[a-zA-Z0-9_\s]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, spaces, and underscores';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setFormData(prev => ({ ...prev, username }));
    
    // Clear username error when user starts typing
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };


  const handleProfilePictureChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, profilePicture: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaveLoading(true);
    
    try {
      // Simulate save delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSave({
        username: formData.username.trim(),
        profilePicture: formData.profilePicture,
      });
      
      setShowSuccess(true);
      
      // Auto-hide success message
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const hasChanges = 
    formData.username !== initialProfile.username ||
    formData.profilePicture !== initialProfile.profilePicture;

  return (
    <div className={clsx('bg-slate-700 rounded-xl p-6 border border-slate-600 animate-scale-in', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center animate-slide-in-right">
          <User className="h-6 w-6 mr-3 text-purple-400" />
          {isFirstTime ? 'Create Your Hunter Profile' : 'Edit Profile'}
        </h2>
        {!isFirstTime && onCancel && (
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors animate-fade-in"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isFirstTime && (
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 mb-6">
          <p className="text-purple-100 text-sm">
            🎮 Welcome to your Solo Leveling journey! Set up your hunter profile to get started.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Hunter Name *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={handleUsernameChange}
            placeholder="Enter your hunter name..."
            className={clsx(
              'w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
              'transition-all duration-200 input-gaming',
              errors.username 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-slate-600 hover:border-slate-500'
            )}
          />
          {errors.username && (
            <div className="flex items-center mt-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.username}
            </div>
          )}
        </div>

        {/* Avatar Selection */}
        <AvatarSelector
          profilePicture={formData.profilePicture}
          onProfilePictureChange={handleProfilePictureChange}
        />

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-600">
          <div className="flex items-center space-x-4">
            {showSuccess && (
              <div className="flex items-center text-green-400 text-sm animate-in fade-in duration-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                Profile saved successfully!
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {!isFirstTime && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !hasChanges}
              className={clsx(
                'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2',
                'disabled:opacity-50 disabled:cursor-not-allowed btn-gaming',
                hasChanges && !isLoading
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25 animate-glow-pulse'
                  : 'bg-slate-600 text-slate-400'
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isFirstTime ? 'Start Journey' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}