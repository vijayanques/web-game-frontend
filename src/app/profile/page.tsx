'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Trophy, Target, Calendar, LogOut } from 'lucide-react';
import { getStoredUser, useLogout, type User as UserType } from '@/hooks/useAuth';
import PageSeoHead from '@/components/PageSeoHead';

export default function ProfilePage() {
  const router = useRouter();
  const logout = useLogout();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
    }

    // Set document metadata - removed, using PageSeoHead instead
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F4F1] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <PageSeoHead pageSlug="/profile" />
      
      <div className="min-h-screen bg-[#F8F4F1] py-12 px-4">
        <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-[poppins] mb-2">
                  {user.username}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="font-[poppins]">{user.email}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-[poppins]"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-[poppins]">Total Score</p>
                <p className="text-2xl font-bold text-gray-900 font-[poppins]">
                  {user.score.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Level Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-[poppins]">Current Level</p>
                <p className="text-2xl font-bold text-gray-900 font-[poppins]">
                  Level {user.level}
                </p>
              </div>
            </div>
          </div>

          {/* Last Login Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-[poppins]">Last Login</p>
                <p className="text-sm font-semibold text-gray-900 font-[poppins]">
                  {new Date(user.last_login_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 font-[poppins] mb-6">
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-[poppins]">User ID</span>
              <span className="font-semibold text-gray-900 font-[poppins]">#{user.id}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-[poppins]">Username</span>
              <span className="font-semibold text-gray-900 font-[poppins]">{user.username}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-[poppins]">Email</span>
              <span className="font-semibold text-gray-900 font-[poppins]">{user.email}</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-[poppins]">Member Since</span>
              <span className="font-semibold text-gray-900 font-[poppins]">
                {new Date(user.last_login_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-800 font-[poppins]">
            <strong>Security Notice:</strong> You can only access your own profile data. 
            Unauthorized access to other users' data is strictly prohibited.
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
