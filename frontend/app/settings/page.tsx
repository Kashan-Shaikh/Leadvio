'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Bell, Lock, Eye, Download, Trash2, Mail, User, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    leadAlerts: true,
    weeklyReport: true,
    darkMode: false,
    twoFactorEnabled: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/sign-in');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    setLoading(false);
  }, [router]);

  const handleSettingChange = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userSettings');
    localStorage.removeItem('leads');
    router.push('/');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userSettings');
    localStorage.removeItem('leads');
    setShowDeleteConfirm(false);
    router.push('/');
  };

  const downloadData = () => {
    const userData = {
      user: user,
      settings: settings,
      leads: JSON.parse(localStorage.getItem('leads') || '[]'),
    };
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(userData, null, 2)));
    element.setAttribute('download', 'leadvio-data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-300" />
            </button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
        </div>

        {/* Account Section */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" />
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Account Name</p>
                <p className="text-white font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-white font-medium">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Notifications
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive email updates</p>
              </div>
              <button
                onClick={() => handleSettingChange('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div>
                <p className="text-white font-medium">Lead Alerts</p>
                <p className="text-sm text-gray-400">Get alerts for new high-quality leads</p>
              </div>
              <button
                onClick={() => handleSettingChange('leadAlerts')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.leadAlerts ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.leadAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div>
                <p className="text-white font-medium">Weekly Report</p>
                <p className="text-sm text-gray-400">Receive weekly performance reports</p>
              </div>
              <button
                onClick={() => handleSettingChange('weeklyReport')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.weeklyReport ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-500" />
            Security & Privacy
          </h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
              <div className="text-left">
                <p className="text-white font-medium">Change Password</p>
                <p className="text-sm text-gray-400">Update your password regularly</p>
              </div>
              <Eye className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </button>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Enhanced security for your account</p>
              </div>
              <button
                onClick={() => handleSettingChange('twoFactorEnabled')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Download className="w-5 h-5 text-orange-500" />
            Data & Privacy
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={downloadData}
              className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <div className="text-left">
                <p className="text-white font-medium">Download Your Data</p>
                <p className="text-sm text-gray-400">Export all your data as JSON</p>
              </div>
              <Download className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass rounded-2xl p-6 md:p-8 border border-red-500/20 bg-red-950/10">
          <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-red-950/20 rounded-lg hover:bg-red-950/40 transition-colors group border border-red-500/20"
            >
              <div className="text-left">
                <p className="text-red-400 font-medium">Logout</p>
                <p className="text-sm text-red-300/70">Sign out from your account</p>
              </div>
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            </button>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-between p-4 bg-red-950/20 rounded-lg hover:bg-red-950/40 transition-colors group border border-red-500/20"
              >
                <div className="text-left">
                  <p className="text-red-400 font-medium">Delete Account</p>
                  <p className="text-sm text-red-300/70">Permanently delete your account and data</p>
                </div>
                <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
              </button>
            ) : (
              <div className="p-4 bg-red-950/30 rounded-lg border border-red-500/30">
                <p className="text-red-200 mb-4 font-medium">Are you sure? This cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
