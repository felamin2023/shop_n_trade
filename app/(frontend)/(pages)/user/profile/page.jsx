"use client";
import { useState, useEffect, useRef } from "react";
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
  TreePine,
  Award,
  Heart,
  Calendar,
  Edit3,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Phone,
  Loader2,
  AlertCircle,
  Recycle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const ProfilePage = () => {
  const { user, login, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [updatingName, setUpdatingName] = useState(false);
  const fileInputRef = useRef(null);

  // Form state - initialized from user data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    contact: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullname || "",
        email: user.email || "",
        address: user.address || "",
        contact: user.contact || "",
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  // User stats (can be fetched from API later)
  const userStats = {
    bottlesDonated: 0,
    projectsSupported: 0,
    treesPlanted: 0,
    memberSince: "2024",
    ecoRank: "Member",
    badges: ["New Member"],
  };

  useEffect(() => {
    if (profileUpdated) {
      const timer = setTimeout(() => {
        setProfileUpdated(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [profileUpdated]);

  useEffect(() => {
    if (passwordSuccess) {
      const timer = setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear password error when user types
    if (
      name === "currentPassword" ||
      name === "password" ||
      name === "confirmPassword"
    ) {
      setPasswordError("");
    }
  };

  const handleSave = () => {
    setProfileUpdated(true);
    setIsEditing(false);
  };

  const handleUpdateName = async () => {
    if (!formData.fullName.trim()) {
      return;
    }

    setUpdatingName(true);

    try {
      const response = await fetch(`/api/users/${user.userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname: formData.fullName }),
      });

      const data = await response.json();

      if (data.status === 200) {
        login({ ...user, fullname: formData.fullName });
        setProfileUpdated(true);
        setIsEditingName(false);
      }
    } catch (error) {
      console.error("Name update error:", error);
    } finally {
      setUpdatingName(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordError("");

    // Validation
    if (!formData.currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    if (!formData.password) {
      setPasswordError("Please enter a new password");
      return;
    }
    if (formData.password.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setPasswordUpdating(true);

    try {
      const response = await fetch(`/api/users/${user.userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        setPasswordSuccess(true);
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          password: "",
          confirmPassword: "",
        }));
      } else {
        setPasswordError(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);
      setPasswordError("Failed to update password. Please try again.");
    } finally {
      setPasswordUpdating(false);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB");
      return;
    }

    setImageError("");
    setUploadingImage(true);

    try {
      // Create unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.userID}_${Date.now()}.${fileExt}`;

      // Upload to Supabase storage (using 'profile' bucket)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("profile")
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;

      // Update user in database
      const response = await fetch(`/api/users/${user.userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: imageUrl }),
      });

      const data = await response.json();

      if (data.status === 200) {
        // Update local state and auth context
        setProfilePicture(imageUrl);
        login({ ...user, img: imageUrl });
        setProfileUpdated(true);
      } else {
        setImageError(data.message || "Failed to update profile picture");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setImageError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
  ];

  // Loading state
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="text-green-500 animate-spin" />
          <p className="text-green-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24 flex items-center justify-center">
        <div className="text-center">
          <User size={48} className="text-green-500/50 mx-auto mb-4" />
          <p className="text-green-400">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-8 px-4 mb-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-green-300" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              My Profile
            </h1>
            <TreePine className="w-8 h-8 text-green-300" />
          </div>
          <p className="text-green-200/70 text-lg">
            Manage your account and track your eco journey 🌱
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Profile Card */}
        <div className="bg-[#0d2818] rounded-3xl shadow-xl border border-[#1a3d1a] overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-[#1a5c1a] via-[#1a4d1a] to-[#0d3d0d] relative">
            <div className="absolute inset-0 opacity-30">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="leaves"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
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
                {profilePicture ||
                (user?.img && user.img !== "hehe" && user.img !== "") ? (
                  <img
                    src={profilePicture || user.img}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#0d2818] shadow-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user?.fullname || "User") +
                        "&background=1a5c1a&color=fff&size=128";
                    }}
                  />
                ) : (
                  <img
                    src={
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user?.fullname || "User") +
                      "&background=1a5c1a&color=fff&size=128"
                    }
                    alt="Default Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#0d2818] shadow-lg"
                  />
                )}
                {/* Edit Profile Picture Button - Always visible */}
                <button
                  onClick={handleProfilePictureClick}
                  disabled={uploadingImage}
                  className="absolute bottom-0 right-0 p-2 bg-green-600 hover:bg-green-700 
                    disabled:bg-green-800 disabled:cursor-not-allowed
                    rounded-full text-white shadow-md transition-colors"
                >
                  {uploadingImage ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Camera size={18} />
                  )}
                </button>
                {/* Online Badge */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0d2818]"></div>
              </div>
            </div>

            {/* Name & Info */}
            <div className="pt-20 sm:pt-4 sm:pl-40">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                {/* Editable Name */}
                {isEditingName ? (
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-[#0a1f0a] border-2 border-green-500 rounded-lg px-3 py-1.5 
                        text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-400
                        w-48 sm:w-64"
                      autoFocus
                    />
                    <button
                      onClick={handleUpdateName}
                      disabled={updatingName}
                      className="p-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-white 
                        disabled:opacity-50 transition-colors"
                    >
                      {updatingName ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setFormData((prev) => ({
                          ...prev,
                          fullName: user.fullname || "",
                        }));
                      }}
                      className="p-1.5 bg-[#132d13] hover:bg-[#1a3d1a] rounded-lg text-green-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="font-noto text-2xl font-bold text-white">
                      {formData.fullName || "User"}
                    </h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1.5 bg-[#132d13] hover:bg-[#1a3d1a] rounded-lg text-green-400 
                        hover:text-white transition-colors"
                      title="Edit name"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                )}
                <p className="text-green-400 flex items-center justify-center sm:justify-start gap-1">
                  <span>{formData.email}</span>
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Award size={12} />
                    {userStats.ecoRank}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#0d2818] rounded-2xl p-1.5 shadow-md border border-[#1a3d1a] mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl 
                font-medium text-sm transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white shadow-md"
                    : "text-green-400/70 hover:bg-[#132d13]"
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
          <div className="bg-[#0d2818] rounded-3xl shadow-xl border border-[#1a3d1a] p-6">
            <h3 className="font-noto text-white text-xl font-semibold mb-6 flex items-center gap-2">
              <User size={20} className="text-green-400" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Contact */}
              <div className="space-y-2">
                <label className="block text-green-400/60 font-medium text-sm">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 
                      ${
                        isEditing
                          ? "border-[#1a3d1a] focus:border-green-500 bg-[#0a1f0a]"
                          : "border-[#132d13] bg-[#132d13]"
                      }
                      text-white focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-green-400/60 font-medium text-sm">
                  Address
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 
                      ${
                        isEditing
                          ? "border-[#1a3d1a] focus:border-green-500 bg-[#0a1f0a]"
                          : "border-[#132d13] bg-[#132d13]"
                      }
                      text-white focus:outline-none transition-colors`}
                  />
                </div>
              </div>
            </div>

            {/* Member Since */}
            <div className="mt-6 p-4 bg-[#132d13]/50 rounded-xl border border-[#1a3d1a]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f5f5f0] rounded-lg">
                  <Calendar size={20} className="text-[#0d3d0d]" />
                </div>
                <div>
                  <p className="text-green-400/50 text-sm">Member Since</p>
                  <p className="text-white font-semibold">
                    {userStats.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-[#0d2818] rounded-3xl shadow-xl border border-[#1a3d1a] p-6">
            <h3 className="font-noto text-white text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-green-400" />
              Security Settings
            </h3>

            <div className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-green-400/60 font-medium text-sm">
                  Current Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-[#1a3d1a] 
                      focus:border-green-500 bg-[#0a1f0a] text-white 
                      placeholder-green-600/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-green-400/60 font-medium text-sm">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-[#1a3d1a] 
                      focus:border-green-500 bg-[#0a1f0a] text-white 
                      placeholder-green-600/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-green-400/60 font-medium text-sm">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-[#1a3d1a] 
                      focus:border-green-500 bg-[#0a1f0a] text-white 
                      placeholder-green-600/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {passwordError && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <AlertCircle size={18} />
                  <span className="text-sm">{passwordError}</span>
                </div>
              )}

              {/* Update Password Button */}
              <button
                onClick={handleUpdatePassword}
                disabled={passwordUpdating}
                className="w-full py-3 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                  hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                  transition-all flex items-center justify-center gap-2 mt-4"
              >
                {passwordUpdating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {profileUpdated && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-6 py-3 bg-[#1a5c1a] text-white rounded-full shadow-lg border border-[#2a7c2a]">
            <CheckCircle2 size={20} />
            <span className="font-medium">Profile updated successfully!</span>
          </div>
        </div>
      )}

      {/* Password Success Notification */}
      {passwordSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-6 py-3 bg-[#1a5c1a] text-white rounded-full shadow-lg border border-[#2a7c2a]">
            <CheckCircle2 size={20} />
            <span className="font-medium">Password updated successfully!</span>
          </div>
        </div>
      )}

      {/* Image Error Notification */}
      {imageError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full shadow-lg border border-red-500">
            <AlertCircle size={20} />
            <span className="font-medium">{imageError}</span>
            <button
              onClick={() => setImageError("")}
              className="ml-2 hover:text-red-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
