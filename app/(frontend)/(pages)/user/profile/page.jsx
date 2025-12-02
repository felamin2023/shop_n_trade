"use client";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Lock,
  Camera,
  Save,
  X,
  CheckCircle2,
  Leaf,
  Recycle,
  TreePine,
  Award,
  Heart,
  Calendar,
  Edit3,
  Shield,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Form state
  const [formData, setFormData] = useState({
    username: "eco_warrior_kim",
    fullName: "Kimberly Faith Ytac",
    email: "kimberly@example.com",
    address: "Cebu City, Philippines",
    password: "",
    confirmPassword: "",
  });

  // User stats (mock data)
  const userStats = {
    bottlesDonated: 1250,
    projectsSupported: 8,
    treesPlanted: 12,
    memberSince: "January 2024",
    ecoRank: "Gold Recycler",
    badges: ["Early Adopter", "Top Donor", "Eco Champion"],
  };

  useEffect(() => {
    if (profileUpdated) {
      const timer = setTimeout(() => {
        setProfileUpdated(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [profileUpdated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfileUpdated(true);
    setIsEditing(false);
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "stats", name: "Eco Stats", icon: Recycle },
    { id: "security", name: "Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-8">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-8 px-4 mb-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-emerald-200" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              My Profile
            </h1>
            <TreePine className="w-8 h-8 text-emerald-200" />
          </div>
          <p className="text-emerald-100 text-lg">
            Manage your account and track your eco journey 🌱
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 relative">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="leaves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="white" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#leaves)" />
              </svg>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
              <div className="relative">
                <img
                  src="/images/profilePage/profilepic.jpg"
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 hover:bg-emerald-600 
                    rounded-full text-white shadow-md transition-colors">
                    <Camera size={18} />
                  </button>
                )}
                {/* Online Badge */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Name & Actions */}
            <div className="pt-20 sm:pt-4 sm:pl-40 flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="font-noto text-2xl font-bold text-emerald-900">
                  {formData.fullName}
                </h2>
                <p className="text-emerald-600 flex items-center justify-center sm:justify-start gap-1">
                  <span>@{formData.username}</span>
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Award size={12} />
                    {userStats.ecoRank}
                  </span>
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600
                    rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                    transition-all flex items-center justify-center gap-2 mx-auto sm:mx-0"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 mx-auto sm:mx-0">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200
                      rounded-xl text-gray-700 font-semibold transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                      hover:from-emerald-600 hover:to-teal-600
                      rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                      transition-all flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                  <Recycle size={16} />
                </div>
                <p className="text-2xl font-bold text-emerald-800">{userStats.bottlesDonated.toLocaleString()}</p>
                <p className="text-emerald-500 text-xs">Bottles Donated</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                  <Heart size={16} />
                </div>
                <p className="text-2xl font-bold text-emerald-800">{userStats.projectsSupported}</p>
                <p className="text-emerald-500 text-xs">Projects Supported</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                  <TreePine size={16} />
                </div>
                <p className="text-2xl font-bold text-emerald-800">{userStats.treesPlanted}</p>
                <p className="text-emerald-500 text-xs">Trees Planted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-md border border-emerald-100 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl 
                font-medium text-sm transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                    : "text-emerald-700 hover:bg-emerald-50"
                }
              `}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6">
            <h3 className="font-noto text-emerald-800 text-xl font-semibold mb-6 flex items-center gap-2">
              <User size={20} className="text-emerald-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Username */}
              <div className="space-y-2">
                <label className="block text-emerald-700 font-medium text-sm">
                  Username
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 
                      ${isEditing 
                        ? "border-emerald-200 focus:border-emerald-400 bg-white" 
                        : "border-gray-100 bg-gray-50"
                      }
                      text-emerald-800 focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-emerald-700 font-medium text-sm">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 
                      ${isEditing 
                        ? "border-emerald-200 focus:border-emerald-400 bg-white" 
                        : "border-gray-100 bg-gray-50"
                      }
                      text-emerald-800 focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-emerald-700 font-medium text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 
                      ${isEditing 
                        ? "border-emerald-200 focus:border-emerald-400 bg-white" 
                        : "border-gray-100 bg-gray-50"
                      }
                      text-emerald-800 focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-emerald-700 font-medium text-sm">
                  Address
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 
                      ${isEditing 
                        ? "border-emerald-200 focus:border-emerald-400 bg-white" 
                        : "border-gray-100 bg-gray-50"
                      }
                      text-emerald-800 focus:outline-none transition-colors`}
                  />
                </div>
              </div>
            </div>

            {/* Member Since */}
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Calendar size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-emerald-500 text-sm">Member Since</p>
                  <p className="text-emerald-800 font-semibold">{userStats.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            {/* Eco Impact Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6">
              <h3 className="font-noto text-emerald-800 text-xl font-semibold mb-6 flex items-center gap-2">
                <Recycle size={20} className="text-emerald-600" />
                Your Eco Impact
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-4 text-white text-center">
                  <Recycle size={28} className="mx-auto mb-2 opacity-90" />
                  <p className="text-3xl font-bold">{userStats.bottlesDonated.toLocaleString()}</p>
                  <p className="text-emerald-100 text-sm">Bottles Recycled</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 text-white text-center">
                  <Heart size={28} className="mx-auto mb-2 opacity-90" />
                  <p className="text-3xl font-bold">{userStats.projectsSupported}</p>
                  <p className="text-blue-100 text-sm">Schools Helped</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 text-white text-center">
                  <TreePine size={28} className="mx-auto mb-2 opacity-90" />
                  <p className="text-3xl font-bold">{userStats.treesPlanted}</p>
                  <p className="text-green-100 text-sm">Trees Equivalent</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 text-white text-center">
                  <Award size={28} className="mx-auto mb-2 opacity-90" />
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-amber-100 text-sm">Chairs Made</p>
                </div>
              </div>

              {/* Progress to Next Rank */}
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-amber-600" />
                    <span className="text-amber-800 font-semibold">Progress to Platinum Rank</span>
                  </div>
                  <span className="text-amber-600 text-sm">750 bottles to go</span>
                </div>
                <div className="h-3 bg-amber-200 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6">
              <h3 className="font-noto text-emerald-800 text-xl font-semibold mb-6 flex items-center gap-2">
                <Award size={20} className="text-amber-500" />
                Earned Badges
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {userStats.badges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 
                      rounded-2xl border border-emerald-200 hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 
                      rounded-full flex items-center justify-center mb-2 shadow-md">
                      <Award size={28} className="text-white" />
                    </div>
                    <p className="text-emerald-800 font-semibold text-sm text-center">{badge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6">
            <h3 className="font-noto text-emerald-800 text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-emerald-600" />
              Security Settings
            </h3>

            <div className="space-y-5">
              {/* Password */}
              <div className="space-y-2">
                <label className="block text-emerald-700 font-medium text-sm">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-emerald-200 
                      focus:border-emerald-400 bg-white text-emerald-800 
                      placeholder-emerald-300 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-emerald-700 font-medium text-sm">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-emerald-200 
                      focus:border-emerald-400 bg-white text-emerald-800 
                      placeholder-emerald-300 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Update Password Button */}
              <button
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
                  hover:from-emerald-600 hover:to-teal-600
                  rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                  transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Lock size={18} />
                Update Password
              </button>

              {/* Notification Settings */}
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <h4 className="text-emerald-800 font-semibold mb-4 flex items-center gap-2">
                  <Bell size={18} />
                  Notification Preferences
                </h4>

                <div className="space-y-3">
                  {[
                    { label: "Email notifications for new projects", checked: true },
                    { label: "Updates on supported projects", checked: true },
                    { label: "Monthly eco-impact summary", checked: false },
                    { label: "Badge and achievement alerts", checked: true },
                  ].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                      <span className="text-emerald-700">{item.label}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {profileUpdated && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500 text-white rounded-full shadow-lg">
            <CheckCircle2 size={20} />
            <span className="font-medium">Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
