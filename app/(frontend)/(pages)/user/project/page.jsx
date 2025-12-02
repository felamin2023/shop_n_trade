"use client";
import { useState } from "react";
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
  Clock,
  CheckCircle2,
  Gift,
  Minus,
  Plus,
  Info,
  Phone,
  Mail
} from "lucide-react";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("Post");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [donationAmount, setDonationAmount] = useState(100);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const navlinks = [
    { name: "Post", icon: Sparkles },
    { name: "Plans", icon: Target },
  ];

  const postData = [
    {
      id: "PRJ-001",
      name: "Bug ot Elementary School",
      location: "Lower Bug ot",
      donated: 1500,
      goal: 2000,
      description: "Help us provide comfortable seating for students at Bug ot Elementary. Many students currently sit on old, broken chairs that affect their learning experience.",
      deadline: "Dec 31, 2025",
      donors: 45,
      contactPerson: "Maria Santos",
      contactEmail: "maria.santos@bugot.edu.ph",
      contactPhone: "+63 912 345 6789",
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      id: "PRJ-002",
      name: "CTU Argao Campus",
      location: "Argao",
      donated: 300,
      goal: 1000,
      description: "CTU Argao needs additional chairs for their expanding student population. Your recyclables can help provide quality education facilities.",
      deadline: "Jan 15, 2026",
      donors: 12,
      contactPerson: "Juan Dela Cruz",
      contactEmail: "juan.delacruz@ctu.edu.ph",
      contactPhone: "+63 917 654 3210",
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      id: "PRJ-003",
      name: "Pool Bankal Elementary School",
      location: "Pool Bankal, Lapu Lapu City",
      donated: 400,
      goal: 800,
      description: "Pool Bankal Elementary serves underprivileged communities. Help us give their students proper furniture for a better learning environment.",
      deadline: "Jan 30, 2026",
      donors: 23,
      contactPerson: "Ana Reyes",
      contactEmail: "ana.reyes@poolbankal.edu.ph",
      contactPhone: "+63 918 111 2222",
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      id: "PRJ-004",
      name: "Sibonga National High School",
      location: "Sibonga",
      donated: 100,
      goal: 500,
      description: "Sibonga NHS is in urgent need of chairs for their Grade 7 classrooms. Support education in rural communities!",
      deadline: "Feb 14, 2026",
      donors: 8,
      contactPerson: "Pedro Garcia",
      contactEmail: "pedro.garcia@sibonga.edu.ph",
      contactPhone: "+63 919 333 4444",
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      id: "PRJ-005",
      name: "Greenhills Elementary School",
      location: "Greenhills",
      donated: 900,
      goal: 1200,
      description: "We're almost there! Help Greenhills Elementary reach their goal of providing new chairs for all classrooms.",
      deadline: "Dec 20, 2025",
      donors: 67,
      contactPerson: "Lisa Tan",
      contactEmail: "lisa.tan@greenhills.edu.ph",
      contactPhone: "+63 920 555 6666",
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      id: "PRJ-006",
      name: "Sangat National High School",
      location: "Sangat",
      donated: 500,
      goal: 600,
      description: "Just 100 more bottles to go! Help Sangat NHS complete their classroom furniture project.",
      deadline: "Dec 15, 2025",
      donors: 34,
      contactPerson: "Mark Lim",
      contactEmail: "mark.lim@sangat.edu.ph",
      contactPhone: "+63 921 777 8888",
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
  ];

  const projectData = [
    {
      id: "PLAN-001",
      schoolname: "Bug ot Elementary School",
      location: "Lower Bug ot",
      chairsneeded: 500,
      urgency: "high",
      description: "New building expansion requires additional 500 chairs for 10 new classrooms opening next school year.",
      targetDate: "March 2026",
      contactPerson: "Maria Santos",
      contactEmail: "maria.santos@bugot.edu.ph",
      contactPhone: "+63 912 345 6789",
      bottlesPerChair: 100,
    },
    {
      id: "PLAN-002",
      schoolname: "Pool Bankal Elementary School",
      location: "Pool Bankal, Lapu Lapu City",
      chairsneeded: 1000,
      urgency: "medium",
      description: "Replacement program for old wooden chairs that are beyond repair. Will benefit over 1,000 students.",
      targetDate: "June 2026",
      contactPerson: "Ana Reyes",
      contactEmail: "ana.reyes@poolbankal.edu.ph",
      contactPhone: "+63 918 111 2222",
      bottlesPerChair: 100,
    },
    {
      id: "PLAN-003",
      schoolname: "CTU Argao Campus",
      location: "Argao Kintanar",
      chairsneeded: 1500,
      urgency: "low",
      description: "Long-term project to upgrade all classroom furniture to eco-friendly recycled materials.",
      targetDate: "December 2026",
      contactPerson: "Juan Dela Cruz",
      contactEmail: "juan.delacruz@ctu.edu.ph",
      contactPhone: "+63 917 654 3210",
      bottlesPerChair: 100,
    },
    {
      id: "PLAN-004",
      schoolname: "Greenhills Elementary School",
      location: "Greenhills",
      chairsneeded: 200,
      urgency: "high",
      description: "Emergency request for kindergarten section. Current chairs are unsafe for young children.",
      targetDate: "February 2026",
      contactPerson: "Lisa Tan",
      contactEmail: "lisa.tan@greenhills.edu.ph",
      contactPhone: "+63 920 555 6666",
      bottlesPerChair: 100,
    },
  ];

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

  const openDonateModal = (post) => {
    setSelectedPost(post);
    setDonationAmount(100);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
    setSelectedPost(null);
  };

  const openSupportModal = (plan) => {
    setSelectedPlan(plan);
    setIsSupportModalOpen(true);
  };

  const closeSupportModal = () => {
    setIsSupportModalOpen(false);
    setSelectedPlan(null);
  };

  const quickAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-8">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-8 px-4 mb-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TreePine className="w-8 h-8 text-emerald-200" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              Charity School Projects
            </h1>
            <School className="w-8 h-8 text-emerald-200" />
          </div>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Support schools in need by donating recyclables. Every bottle counts towards 
            building a better future for students! 📚
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <School className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">12 Schools Helped</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">4,200+ Donations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Tab Navigation & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="flex bg-white rounded-2xl p-1.5 shadow-md border border-emerald-100">
            {navlinks.map((link, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(link.name)}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm
                  transition-all duration-300
                  ${
                    activeTab === link.name
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                      : "text-emerald-700 hover:bg-emerald-50"
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
              className="w-full sm:w-72 bg-white text-emerald-800 placeholder-emerald-400 
                px-5 py-2.5 pl-11 rounded-full border border-emerald-200 
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
                shadow-md transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Content */}
        {activeTab === "Post" ? (
          <>
            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              <h2 className="font-noto text-emerald-800 text-xl font-semibold flex items-center gap-2">
                <Sparkles size={20} className="text-amber-500" />
                Active Donation Posts
              </h2>
              <div className="h-1 w-8 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((data, i) => {
                const progress = Math.round((data.donated / data.goal) * 100);
                return (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                      border border-emerald-100 hover:border-emerald-300
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
                        rounded-full px-3 py-1 shadow-md flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-emerald-600" />
                        <span className="text-emerald-800 text-xs font-bold">{progress}%</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-noto text-emerald-900 font-semibold text-base mb-1">
                        {data.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-emerald-600 mb-3">
                        <MapPin size={14} />
                        <span className="text-sm">{data.location}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-emerald-600 font-medium">
                            {data.donated.toLocaleString()} bottles
                          </span>
                          <span className="text-emerald-400">
                            Goal: {data.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full
                              transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button 
                        onClick={() => openDonateModal(data)}
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                          hover:from-emerald-600 hover:to-teal-600
                          rounded-xl text-white text-sm font-semibold
                          transform transition-all duration-200 hover:scale-[1.02]
                          shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <Heart size={16} />
                        Donate Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-emerald-300 mb-3" />
                <p className="text-emerald-600">No projects found matching "{searchQuery}"</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              <h2 className="font-noto text-emerald-800 text-xl font-semibold flex items-center gap-2">
                <Target size={20} className="text-teal-500" />
                Upcoming Project Plans
              </h2>
              <div className="h-1 w-8 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
            </div>

            {/* Plans List */}
            <div className="space-y-4">
              {filteredPlans.map((data, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                    border border-emerald-100 hover:border-emerald-300
                    transition-all duration-300 p-5 flex flex-col sm:flex-row 
                    sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* School Icon */}
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 
                      p-3 rounded-xl border border-emerald-200">
                      <School size={24} className="text-emerald-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-noto text-emerald-900 font-semibold text-lg">
                        {data.schoolname}
                      </h3>
                      <div className="flex items-center gap-1.5 text-emerald-600 mt-1">
                        <MapPin size={14} />
                        <span className="text-sm">{data.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Chairs Needed */}
                    <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl">
                      <Armchair size={18} className="text-emerald-600" />
                      <div>
                        <p className="text-emerald-800 font-bold">{data.chairsneeded.toLocaleString()}</p>
                        <p className="text-emerald-500 text-xs">chairs needed</p>
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
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                        hover:from-emerald-600 hover:to-teal-600
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
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-emerald-300 mb-3" />
                <p className="text-emerald-600">No plans found matching "{searchQuery}"</p>
              </div>
            )}

            {/* Info Card */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Leaf size={24} />
                </div>
                <div>
                  <h4 className="font-noto font-semibold text-lg mb-1">
                    How Your Donation Helps 💚
                  </h4>
                  <p className="text-emerald-100 text-sm leading-relaxed">
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

      {/* Donate Now Modal */}
      {isDonateModalOpen && selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeDonateModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div 
                className="h-44 bg-cover bg-center rounded-t-3xl"
                style={{ backgroundImage: `url(${selectedPost.imgs[0]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-3xl"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeDonateModal}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full
                  hover:bg-white/40 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-emerald-300 text-sm mb-1">
                  <Heart size={14} />
                  <span>Donate to this project</span>
                </div>
                <h2 className="font-noto text-white text-2xl font-bold">
                  {selectedPost.name}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald-700 font-semibold">
                    {selectedPost.donated.toLocaleString()} / {selectedPost.goal.toLocaleString()} bottles
                  </span>
                  <span className="text-emerald-500">
                    {Math.round((selectedPost.donated / selectedPost.goal) * 100)}% funded
                  </span>
                </div>
                <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    style={{ width: `${Math.min((selectedPost.donated / selectedPost.goal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Description */}
              <p className="text-emerald-700 text-sm mb-6 leading-relaxed">
                {selectedPost.description}
              </p>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
                  <Calendar size={18} className="text-amber-600" />
                  <div>
                    <p className="text-amber-500 text-xs">Deadline</p>
                    <p className="text-amber-800 font-semibold text-sm">{selectedPost.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl">
                  <Users size={18} className="text-purple-600" />
                  <div>
                    <p className="text-purple-500 text-xs">Donors</p>
                    <p className="text-purple-800 font-semibold text-sm">{selectedPost.donors} people</p>
                  </div>
                </div>
              </div>

              {/* Donation Amount */}
              <div className="mb-6">
                <label className="block text-emerald-800 font-semibold mb-3">
                  How many bottles will you donate?
                </label>
                
                {/* Quick Select */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                        ${donationAmount === amount 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md" 
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDonationAmount(Math.max(10, donationAmount - 10))}
                    className="p-2 bg-emerald-100 rounded-xl hover:bg-emerald-200 transition-colors"
                  >
                    <Minus size={20} className="text-emerald-700" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full text-center text-2xl font-bold text-emerald-800 
                        py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-400
                        focus:outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 text-sm">
                      bottles
                    </span>
                  </div>
                  <button
                    onClick={() => setDonationAmount(donationAmount + 10)}
                    className="p-2 bg-emerald-100 rounded-xl hover:bg-emerald-200 transition-colors"
                  >
                    <Plus size={20} className="text-emerald-700" />
                  </button>
                </div>
              </div>

              {/* Impact Info */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <Gift size={18} />
                  <span className="font-semibold">Your Impact</span>
                </div>
                <p className="text-emerald-600 text-sm">
                  Your donation of <strong>{donationAmount} bottles</strong> will contribute to making{" "}
                  <strong>{Math.floor(donationAmount / 100)} chair{Math.floor(donationAmount / 100) !== 1 ? "s" : ""}</strong> for students!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeDonateModal}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200
                    rounded-xl text-gray-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600
                    rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                    transition-all flex items-center justify-center gap-2"
                >
                  <Heart size={18} />
                  Confirm Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {isSupportModalOpen && selectedPlan && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeSupportModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-t-3xl relative">
              {/* Close Button */}
              <button
                onClick={closeSupportModal}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full
                  hover:bg-white/40 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <School size={32} className="text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm flex items-center gap-1">
                    <Target size={14} />
                    Project Plan
                  </p>
                  <h2 className="font-noto text-white text-xl font-bold">
                    {selectedPlan.schoolname}
                  </h2>
                  <div className="flex items-center gap-1.5 text-emerald-100 mt-1">
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
              <p className="text-emerald-700 text-sm mb-6 leading-relaxed">
                {selectedPlan.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Armchair size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-emerald-500 text-xs">Chairs Needed</p>
                    <p className="text-emerald-800 font-bold">{selectedPlan.chairsneeded.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Recycle size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-blue-500 text-xs">Bottles Needed</p>
                    <p className="text-blue-800 font-bold">
                      {(selectedPlan.chairsneeded * selectedPlan.bottlesPerChair).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-purple-500 text-xs">Target Date</p>
                    <p className="text-purple-800 font-bold text-sm">{selectedPlan.targetDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Info size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-amber-500 text-xs">Per Chair</p>
                    <p className="text-amber-800 font-bold text-sm">{selectedPlan.bottlesPerChair} bottles</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="text-emerald-800 font-semibold mb-3 flex items-center gap-2">
                  <Users size={16} />
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold text-sm">
                        {selectedPlan.contactPerson.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{selectedPlan.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Mail size={14} />
                    <span>{selectedPlan.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Phone size={14} />
                    <span>{selectedPlan.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* How to Support */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <Leaf size={18} />
                  <span className="font-semibold">How to Support</span>
                </div>
                <ul className="text-emerald-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Collect plastic bottles and bring them to our collection center</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Spread the word to friends and family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Volunteer at school events and collection drives</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeSupportModal}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200
                    rounded-xl text-gray-700 font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600
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
