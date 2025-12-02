"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Users,
  FolderKanban,
  Package,
  TrendingUp,
  Recycle,
  Leaf,
  LayoutDashboard,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  School,
  Armchair,
  Eye,
  Trash2,
  Edit,
  ChevronDown,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";

const AdminHomepage = () => {
  const [productData, setProductData] = useState([]);
  const [allDataProject, setAllDataProject] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [dashboardFilter, setDashboardFilter] = useState("user");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordFilter, setRecordFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Mock data for demo (will be replaced by API calls)
  const mockUsers = [
    {
      userID: "USR001ABC",
      fullname: "Jovanie Felamin Ceballos",
      contact: "09123456789",
      email: "felaminjovanie@gmail.com",
      address: "Pool Bankal Lapu-Lapu City",
      joinDate: "Jan 15, 2024",
      bottlesDonated: 450,
    },
    {
      userID: "USR002DEF",
      fullname: "Joshua Briones",
      contact: "09234567890",
      email: "joshuabriones@gmail.com",
      address: "Greenhills",
      joinDate: "Feb 20, 2024",
      bottlesDonated: 320,
    },
    {
      userID: "USR003GHI",
      fullname: "Ivan Brigoli",
      contact: "09345678901",
      email: "ivanbrigoli@gmail.com",
      address: "Greenhills",
      joinDate: "Mar 10, 2024",
      bottlesDonated: 280,
    },
    {
      userID: "USR004JKL",
      fullname: "Albert Guazo",
      contact: "09456789012",
      email: "albertguazo@gmail.com",
      address: "Nangkaan",
      joinDate: "Apr 5, 2024",
      bottlesDonated: 150,
    },
    {
      userID: "USR005MNO",
      fullname: "Kimberly Faith Ytac",
      contact: "09567890123",
      email: "kimberly@gmail.com",
      address: "Cebu City",
      joinDate: "May 12, 2024",
      bottlesDonated: 520,
    },
  ];

  const mockProjects = [
    {
      projectID: "PRJ001ABC",
      school: "Bug-ot Elementary School",
      location: "Bug-ot Lower",
      itemgoal: 200,
      status: "PENDING",
      progress: 65,
    },
    {
      projectID: "PRJ002DEF",
      school: "Bankal Elementary School",
      location: "Pool Bankal Lapu-Lapu City",
      itemgoal: 1500,
      status: "DONE",
      progress: 100,
    },
    {
      projectID: "PRJ003GHI",
      school: "Greenhills Elementary School",
      location: "Greenhills",
      itemgoal: 300,
      status: "PENDING",
      progress: 40,
    },
    {
      projectID: "PRJ004JKL",
      school: "Argao National High School",
      location: "Argao",
      itemgoal: 700,
      status: "DONE",
      progress: 100,
    },
  ];

  const mockProducts = [
    {
      productID: "PDT001ABC",
      product: "Nike T-Shirt",
      material: "Water Bottles",
      materialGoal: 500,
      stock: 10,
      img: "/images/productPage/product1.jpg",
    },
    {
      productID: "PDT002DEF",
      product: "Rolex Daytona",
      material: "Water Bottles",
      materialGoal: 10000,
      stock: 1,
      img: "/images/productPage/product2.jpg",
    },
    {
      productID: "PDT003GHI",
      product: "Jordan Nike Air",
      material: "Water Bottles",
      materialGoal: 5000,
      stock: 1,
      img: "/images/productPage/product3.jpg",
    },
    {
      productID: "PDT004JKL",
      product: "Adidas Cap",
      material: "Water Bottles",
      materialGoal: 200,
      stock: 3,
      img: "/images/productPage/product4.jpg",
    },
  ];

  // Fetch functions (keeping original API calls but with fallback to mock data)
  async function fetchProductData() {
    try {
      const res = await fetch("http://localhost:3000/api/product");
      const data = await res.json();
      setProductData(data.product || mockProducts);
    } catch (error) {
      console.log(error);
      setProductData(mockProducts);
    }
  }

  async function fetchAllDataProject() {
    try {
      const res = await fetch("http://localhost:3000/api/project");
      const data = await res.json();
      setAllDataProject(data.project || mockProjects);
    } catch (error) {
      console.log(error);
      setAllDataProject(mockProjects);
    }
  }

  async function fetchAllUsers() {
    try {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      setAllUser(data.users || mockUsers);
    } catch (error) {
      console.log(error);
      setAllUser(mockUsers);
    }
  }

  useEffect(() => {
    fetchProductData();
    fetchAllDataProject();
    fetchAllUsers();
  }, []);

  // Stats calculations
  const allUsersCount = allUser.length;
  const allProjectCount = allDataProject.length;
  const allProductCount = productData.length;
  const pendingProjectCount = allDataProject.filter(
    (project) => project.status === "PENDING"
  ).length;
  const doneProjectCount = allDataProject.filter(
    (project) => project.status === "DONE"
  ).length;
  const totalBottles = allUser.reduce((acc, user) => acc + (user.bottlesDonated || 0), 0);

  // Filter functions
  const filteredUsers = allUser.filter(
    (user) =>
      user.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = allDataProject.filter((project) => {
    const matchesSearch =
      project.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      recordFilter === "All" || project.status === recordFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = productData.filter(
    (product) =>
      product.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "DONE":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "PENDING":
        return "bg-lime-500/20 text-lime-400 border-lime-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Mock delete - would call API in real implementation
    console.log("Deleting:", itemToDelete);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const dashboardTabs = [
    { id: "user", name: "Users", icon: Users, count: allUsersCount, color: "from-[#1a5c1a] to-[#0d3d0d]" },
    { id: "project", name: "Projects", icon: FolderKanban, count: allProjectCount, color: "from-[#1a4d1a] to-[#0d2d0d]" },
    { id: "product", name: "Products", icon: Package, count: allProductCount, color: "from-[#1a3d1a] to-[#0d1d0d]" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-8">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-6 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-noto text-white text-2xl md:text-3xl font-bold">
                  Admin Dashboard
                </h1>
                <p className="text-green-200/70 text-sm">
                  Manage your eco-friendly platform 🌱
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Recycle className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">
                  {totalBottles.toLocaleString()} Total Bottles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {dashboardTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDashboardFilter(tab.id)}
              className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 
                ${dashboardFilter === tab.id 
                  ? "ring-2 ring-white/50 scale-[1.02]" 
                  : "hover:scale-[1.01]"
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-90`}></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{tab.name}</p>
                  <p className="text-white text-3xl font-bold mt-1">{tab.count}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <tab.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              {dashboardFilter === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50"></div>
              )}
            </button>
          ))}
        </div>

        {/* Quick Stats for Projects */}
        {dashboardFilter === "project" && (
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0d2818]/80 rounded-xl border border-[#1a3d1a]">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-300/80 text-sm">Done: {doneProjectCount}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0d2818]/80 rounded-xl border border-[#1a3d1a]">
              <div className="w-2 h-2 rounded-full bg-lime-500"></div>
              <span className="text-green-300/80 text-sm">Pending: {pendingProjectCount}</span>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
            {dashboardFilter === "user" && <Users size={22} className="text-green-400" />}
            {dashboardFilter === "project" && <FolderKanban size={22} className="text-green-400" />}
            {dashboardFilter === "product" && <Package size={22} className="text-green-400" />}
            {dashboardFilter === "user" ? "User Management" : 
             dashboardFilter === "project" ? "Project Management" : "Product Management"}
          </h2>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-[#0d2818] text-white placeholder-green-400/40 
                  px-5 py-2.5 pl-11 rounded-xl border border-[#1a3d1a] 
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                  transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/50" />
            </div>

            {/* Filter for Projects */}
            {dashboardFilter === "project" && (
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0d2818] text-white 
                    rounded-xl border border-[#1a3d1a] hover:border-green-500 transition-colors"
                >
                  <Filter size={16} />
                  {recordFilter}
                  <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </button>
                {isFilterOpen && (
                  <div className="absolute top-full mt-2 right-0 w-40 bg-[#0d2818] rounded-xl 
                    border border-[#1a3d1a] shadow-xl z-20 overflow-hidden">
                    {["All", "PENDING", "DONE"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setRecordFilter(filter);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#132d13] transition-colors
                          ${recordFilter === filter ? "bg-green-600 text-white" : "text-green-300/80"}`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] overflow-hidden">
          {/* Users Table */}
          {dashboardFilter === "user" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#132d13]/80">
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">User</th>
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Contact</th>
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Email</th>
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Address</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <tr key={i} className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] 
                            flex items-center justify-center text-white font-semibold">
                            {user.fullname?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.fullname}</p>
                            <p className="text-green-400/50 text-xs">ID: {user.userID?.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-green-300/80">
                          <Phone size={14} className="text-green-500/60" />
                          {user.contact}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-green-300/80">
                          <Mail size={14} className="text-green-500/60" />
                          {user.email}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-green-300/80">
                          <MapPin size={14} className="text-green-500/60" />
                          {user.address}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openViewModal(user)}
                            className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto text-[#1a3d1a] mb-3" />
                  <p className="text-green-400/50">No users found</p>
                </div>
              )}
            </div>
          )}

          {/* Projects Table */}
          {dashboardFilter === "project" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#132d13]/80">
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">School</th>
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Location</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Chairs Needed</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Progress</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Status</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, i) => (
                    <tr key={i} className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#1a5c1a]/30 rounded-lg">
                            <School size={20} className="text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{project.school}</p>
                            <p className="text-green-400/50 text-xs">ID: {project.projectID?.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-green-300/80">
                          <MapPin size={14} className="text-green-500/60" />
                          {project.location}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Armchair size={16} className="text-green-400" />
                          <span className="text-white font-semibold">{project.itemgoal}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-full max-w-[120px] mx-auto">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-green-400/50">{project.progress || 0}%</span>
                          </div>
                          <div className="h-2 bg-[#0a1f0a] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(project.status)}`}>
                          {project.status === "DONE" && <CheckCircle2 size={12} className="inline mr-1" />}
                          {project.status === "PENDING" && <Clock size={12} className="inline mr-1" />}
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openViewModal(project)}
                            className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          {project.status === "PENDING" && (
                            <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                              <Edit size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => openDeleteModal(project)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <FolderKanban size={48} className="mx-auto text-[#1a3d1a] mb-3" />
                  <p className="text-green-400/50">No projects found</p>
                </div>
              )}
            </div>
          )}

          {/* Products Table */}
          {dashboardFilter === "product" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#132d13]/80">
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Product</th>
                    <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Material</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Material Goal</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Stock</th>
                    <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, i) => (
                    <tr key={i} className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#0a1f0a] overflow-hidden">
                            {product.img ? (
                              <img src={product.img} alt={product.product} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={20} className="text-green-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{product.product}</p>
                            <p className="text-green-400/50 text-xs">ID: {product.productID?.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-green-300/80">
                          <Recycle size={14} className="text-green-500/60" />
                          {product.material}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-white font-semibold">{product.materialGoal?.toLocaleString()}</span>
                        <span className="text-green-400/50 text-sm ml-1">bottles</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${product.stock > 5 ? "bg-green-600/20 text-green-400" : 
                            product.stock > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openViewModal(product)}
                            className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(product)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-[#1a3d1a] mb-3" />
                  <p className="text-green-400/50">No products found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div 
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-md border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#1a3d1a] flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold">Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 hover:bg-[#132d13] rounded-lg transition-colors"
              >
                <X size={20} className="text-green-400/70" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-green-300/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div 
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-sm border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Delete Confirmation</h3>
              <p className="text-green-400/60 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#132d13] hover:bg-[#1a3d1a] text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomepage;
