"use client";
import { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Heart, 
  TreePine, 
  School, 
  Target,
  Armchair,
  TrendingUp,
  Sparkles,
  Leaf,
  Users,
  X,
  Recycle,
  Calendar,
  CheckCircle2,
  Info,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("Post");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navlinks = [
    { name: "Post", icon: Sparkles },
    { name: "Plans", icon: Target },
  ];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/project");
        const data = await response.json();
        if (data.status === 200 && data.project) {
          setProjects(data.project);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Transform projects for Post tab (pending projects)
  const postData = projects
    .filter((p) => p.status === "PENDING")
    .map((project) => ({
      id: project.projectID,
      name: project.school,
      location: project.location,
      donated: 0,
      goal: project.itemgoal,
      description: `Help us provide chairs for students at ${project.school}. Your recyclables can make a difference!`,
      deadline: "Ongoing",
      donors: 0,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    }));

  // Transform projects for Plans tab
  const projectData = projects.map((project) => ({
    id: project.projectID,
    schoolname: project.school,
    location: project.location,
    chairsneeded: project.itemgoal,
    urgency: project.itemgoal > 1000 ? "high" : project.itemgoal > 500 ? "medium" : "low",
    description: `Project to provide ${project.itemgoal} chairs for ${project.school}.`,
    targetDate: "2026",
    status: project.status,
    bottlesPerChair: 100,
  }));

  const filteredPosts = postData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlans = projectData.filter(
    (data) =>
      data.schoolname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-600 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "low":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const openSupportModal = (plan) => {
    setSelectedPlan(plan);
    setIsSupportModalOpen(true);
  };

  const closeSupportModal = () => {
    setIsSupportModalOpen(false);
    setSelectedPlan(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="text-green-500 animate-spin" />
          <p className="text-green-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-8 px-4 mb-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TreePine className="w-8 h-8 text-green-300" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              Charity School Projects
            </h1>
            <School className="w-8 h-8 text-green-300" />
          </div>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Support schools in need by donating recyclables. Every bottle counts towards 
            building a better future for students! 📚
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <School className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{projects.length} Schools</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Active Projects</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Tab Navigation & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="flex bg-[#0d2818] rounded-2xl p-1.5 shadow-md border border-[#1a3d1a]">
            {navlinks.map((link, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(link.name)}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm
                  transition-all duration-300
                  ${
                    activeTab === link.name
                      ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white shadow-md"
                      : "text-green-400/70 hover:bg-[#132d13]"
                  }
                `}
              >
                <link.icon size={18} />
                {link.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search schools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72 bg-[#0d2818] text-white placeholder-green-500/50 
                px-5 py-2.5 pl-11 rounded-full border border-[#1a3d1a] 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                shadow-md transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/50" />
          </div>
        </div>

        {/* Content */}
        {activeTab === "Post" ? (
          <>
            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-[#0d3d0d] rounded-full"></div>
              <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
                <Sparkles size={20} className="text-amber-400" />
                Active Donation Posts
              </h2>
              <div className="h-1 w-8 bg-gradient-to-r from-[#0d3d0d] to-green-500 rounded-full"></div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((data, i) => {
                const progress = Math.round((data.donated / data.goal) * 100);
                return (
                  <div
                    key={i}
                    className="group bg-gray-50 rounded-2xl shadow-md hover:shadow-xl 
                      border border-gray-100 hover:border-green-400
                      transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Gallery */}
                    <div className="relative h-48 grid grid-cols-3 gap-1 p-2">
                      <div className="col-span-2 rounded-xl overflow-hidden">
                        <img
                          src={data.imgs[0]}
                          alt="Main"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex-1 rounded-xl overflow-hidden">
                          <img
                            src={data.imgs[1]}
                            alt="Secondary 1"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 rounded-xl overflow-hidden">
                          <img
                            src={data.imgs[2]}
                            alt="Secondary 2"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Progress Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm 
                        rounded-full px-3 py-1 shadow-md flex items-center gap-1.5 border border-gray-200">
                        <TrendingUp size={14} className="text-green-600" />
                        <span className="text-gray-800 text-xs font-bold">{progress}%</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-noto text-gray-800 font-semibold text-base mb-1">
                        {data.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-green-600 mb-3">
                        <MapPin size={14} />
                        <span className="text-sm">{data.location}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-green-600 font-medium">
                            {data.donated.toLocaleString()} bottles
                          </span>
                          <span className="text-gray-500">
                            Goal: {data.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] rounded-full
                              transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                <Search size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">No projects found matching "{searchQuery}"</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-[#0d3d0d] rounded-full"></div>
              <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
                <Target size={20} className="text-green-400" />
                Upcoming Project Plans
              </h2>
              <div className="h-1 w-8 bg-gradient-to-r from-[#0d3d0d] to-green-500 rounded-full"></div>
            </div>

            {/* Plans List */}
            <div className="space-y-4">
              {filteredPlans.map((data, i) => (
                <div
                  key={i}
                  className="group bg-gray-50 rounded-2xl shadow-md hover:shadow-xl 
                    border border-gray-100 hover:border-green-400
                    transition-all duration-300 p-5 flex flex-col sm:flex-row 
                    sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* School Icon */}
                    <div className="bg-gradient-to-br from-green-100 to-green-50 
                      p-3 rounded-xl border border-green-200">
                      <School size={24} className="text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-noto text-gray-800 font-semibold text-lg">
                        {data.schoolname}
                      </h3>
                      <div className="flex items-center gap-1.5 text-green-600 mt-1">
                        <MapPin size={14} />
                        <span className="text-sm">{data.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Chairs Needed */}
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                      <Armchair size={18} className="text-green-600" />
                      <div>
                        <p className="text-gray-800 font-bold">{data.chairsneeded.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs">chairs needed</p>
                      </div>
                    </div>

                    {/* Urgency Badge */}
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border
                      ${getUrgencyColor(data.urgency)}`}>
                      {data.urgency === "high" && "🔴 Urgent"}
                      {data.urgency === "medium" && "🟡 Moderate"}
                      {data.urgency === "low" && "🟢 Low Priority"}
                    </div>

                    {/* Support Button */}
                    <button 
                      onClick={() => openSupportModal(data)}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                        hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                        rounded-xl text-white text-sm font-semibold
                        transform transition-all duration-200 hover:scale-105
                        shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Users size={16} />
                      Support
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                <Search size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">No plans found matching "{searchQuery}"</p>
              </div>
            )}

            {/* Info Card */}
            <div className="mt-6 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] rounded-2xl p-6 text-white border border-[#2a7c2a]">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Leaf size={24} />
                </div>
                <div>
                  <h4 className="font-noto font-semibold text-lg mb-1">
                    How Your Donation Helps 💚
                  </h4>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Every 100 plastic bottles collected can be recycled into materials for 1 school chair. 
                    By donating your recyclables, you're not just helping the environment—you're giving 
                    students a comfortable place to learn and grow!
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Support Modal */}
      {isSupportModalOpen && selectedPlan && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeSupportModal}
        >
          <div 
            className="bg-[#0d2818] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] p-6 rounded-t-3xl relative">
              {/* Close Button */}
              <button
                onClick={closeSupportModal}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full
                  hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <School size={32} className="text-white" />
                </div>
                <div>
                  <p className="text-green-200 text-sm flex items-center gap-1">
                    <Target size={14} />
                    Project Plan
                  </p>
                  <h2 className="font-noto text-white text-xl font-bold">
                    {selectedPlan.schoolname}
                  </h2>
                  <div className="flex items-center gap-1.5 text-green-200 mt-1">
                    <MapPin size={14} />
                    <span className="text-sm">{selectedPlan.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Urgency Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4
                ${getUrgencyColor(selectedPlan.urgency)}`}>
                {selectedPlan.urgency === "high" && "🔴 Urgent Priority"}
                {selectedPlan.urgency === "medium" && "🟡 Moderate Priority"}
                {selectedPlan.urgency === "low" && "🟢 Low Priority"}
              </div>

              {/* Description */}
              <p className="text-green-300/80 text-sm mb-6 leading-relaxed">
                {selectedPlan.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-[#132d13] rounded-xl border border-[#1a3d1a]">
                  <div className="p-2 bg-[#1a3d1a] rounded-lg">
                    <Armchair size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-500/50 text-xs">Chairs Needed</p>
                    <p className="text-white font-bold">{selectedPlan.chairsneeded.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#1a2d3d] rounded-xl border border-[#2a4d5c]">
                  <div className="p-2 bg-[#2a4d5c] rounded-lg">
                    <Recycle size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-cyan-500/50 text-xs">Bottles Needed</p>
                    <p className="text-white font-bold">
                      {(selectedPlan.chairsneeded * selectedPlan.bottlesPerChair).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#2d1a3d] rounded-xl border border-[#4a2d5c]">
                  <div className="p-2 bg-[#4a2d5c] rounded-lg">
                    <Calendar size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-500/50 text-xs">Target Date</p>
                    <p className="text-white font-bold text-sm">{selectedPlan.targetDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#3d2d0d] rounded-xl border border-[#5c4a1a]">
                  <div className="p-2 bg-[#5c4a1a] rounded-lg">
                    <Info size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-500/50 text-xs">Per Chair</p>
                    <p className="text-white font-bold text-sm">{selectedPlan.bottlesPerChair} bottles</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-[#0a1f0a] rounded-xl p-4 mb-6 border border-[#1a3d1a]">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Users size={16} />
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-300/80">
                    <div className="w-8 h-8 bg-[#132d13] rounded-full flex items-center justify-center border border-[#1a3d1a]">
                      <span className="text-green-400 font-semibold text-sm">
                        {selectedPlan.contactPerson.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{selectedPlan.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400/60 text-sm">
                    <Mail size={14} />
                    <span>{selectedPlan.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400/60 text-sm">
                    <Phone size={14} />
                    <span>{selectedPlan.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* How to Support */}
              <div className="bg-[#132d13] rounded-xl p-4 mb-6 border border-[#1a3d1a]">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Leaf size={18} />
                  <span className="font-semibold">How to Support</span>
                </div>
                <ul className="text-green-300/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-500" />
                    <span>Collect plastic bottles and bring them to our collection center</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-500" />
                    <span>Spread the word to friends and family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-500" />
                    <span>Volunteer at school events and collection drives</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeSupportModal}
                  className="flex-1 py-3 px-4 bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-xl text-green-400 font-semibold transition-colors border border-[#1a3d1a]"
                >
                  Close
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                    hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                    rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                    transition-all flex items-center justify-center gap-2"
                >
                  <Heart size={18} />
                  Pledge Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
