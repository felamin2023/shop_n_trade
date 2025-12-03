"use client";

import { useState, useEffect } from "react";
import {
  Search,
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  X,
  School,
  MapPin,
  Armchair,
  CheckCircle2,
  Clock,
  AlertCircle,
  Save,
  RotateCcw,
  Target,
  TrendingUp,
  Filter,
  ChevronDown,
} from "lucide-react";

const ProjectPage = () => {
  const [allDataProject, setAllDataProject] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [inputData, setInputData] = useState({
    school: "",
    location: "",
    itemgoal: "",
    status: "PENDING",
  });
  const [updateData, setUpdateData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(
      () => setNotification({ show: false, type: "", message: "" }),
      3000
    );
  };

  // Fetch projects
  async function fetchAllDataProject() {
    try {
      setLoading(true);
      const res = await fetch("/api/project");
      const data = await res.json();
      if (data.status === 200 && data.project) {
        setAllDataProject(data.project);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      showNotification("error", "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllDataProject();
  }, []);

  // Filter projects
  const filteredProjects = allDataProject.filter((project) => {
    const matchesSearch =
      project.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const totalProjects = allDataProject.length;
  const pendingCount = allDataProject.filter(
    (p) => p.status === "PENDING"
  ).length;
  const doneCount = allDataProject.filter((p) => p.status === "DONE").length;
  const totalChairs = allDataProject.reduce(
    (acc, p) => acc + (p.itemgoal || 0),
    0
  );

  // Handle row click for editing
  const handleRowClick = (project) => {
    setFormMode("edit");
    setUpdateData(project);
    setInputData({
      school: project.school,
      location: project.location,
      itemgoal: project.itemgoal.toString(),
      status: project.status,
    });
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formMode === "edit" && updateData) {
      setUpdateData((prev) => ({ ...prev, [name]: value }));
      setInputData((prev) => ({ ...prev, [name]: value }));
    } else {
      setInputData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormMode("add");
    setUpdateData(null);
    setInputData({
      school: "",
      location: "",
      itemgoal: "",
      status: "PENDING",
    });
  };

  // Save project
  async function saveProject(e) {
    e.preventDefault();

    if (!inputData.school || !inputData.location || !inputData.itemgoal) {
      showNotification("error", "Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school: inputData.school,
          location: inputData.location,
          itemgoal: parseInt(inputData.itemgoal, 10),
          status: inputData.status,
        }),
      });

      const data = await res.json();

      if (data.status === 201) {
        showNotification("success", "Project added successfully!");
        fetchAllDataProject();
        resetForm();
      } else {
        showNotification("error", "Failed to add project");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", "Failed to add project");
    }
  }

  // Update project
  async function updateProject(e) {
    e.preventDefault();

    if (!updateData || !updateData.projectID) {
      showNotification("error", "No project selected for update");
      return;
    }

    try {
      const res = await fetch("/api/project", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectID: updateData.projectID,
          school: inputData.school,
          location: inputData.location,
          itemgoal: parseInt(inputData.itemgoal, 10),
          status: inputData.status,
        }),
      });

      const data = await res.json();

      if (data.status === 200) {
        showNotification("success", "Project updated successfully!");
        fetchAllDataProject();
        resetForm();
      } else {
        showNotification("error", "Failed to update project");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", "Failed to update project");
    }
  }

  // Delete project
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch("/api/project", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectID: projectToDelete }),
      });

      const data = await res.json();

      if (data.status === 200) {
        showNotification("success", "Project deleted successfully!");
        fetchAllDataProject();
      } else {
        showNotification("error", "Failed to delete project");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", "Failed to delete project");
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "DONE":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-28">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-6 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <FolderKanban className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-noto text-white text-2xl md:text-3xl font-bold">
                  Project Management
                </h1>
                <p className="text-green-200/70 text-sm">
                  Manage school charity projects 🏫
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Projects</p>
                <p className="text-white text-3xl font-bold">{totalProjects}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <FolderKanban className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a4d1a] to-[#0d2d0d] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Pending</p>
                <p className="text-white text-3xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a5c1a] to-[#1a4d1a] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Completed</p>
                <p className="text-white text-3xl font-bold">{doneCount}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0d3d0d] to-[#0d2d0d] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Chairs Goal</p>
                <p className="text-white text-3xl font-bold">
                  {totalChairs.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Armchair className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Table */}
          <div className="lg:col-span-2">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
                <School size={22} className="text-green-400" />
                School Projects
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 bg-[#0d2818] text-white placeholder-green-400/40 
                      px-5 py-2.5 pl-11 rounded-xl border border-[#1a3d1a] 
                      focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/50" />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0d2818] text-white 
                      rounded-xl border border-[#1a3d1a] hover:border-green-500 transition-colors"
                  >
                    <Filter size={16} />
                    {statusFilter}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isFilterOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isFilterOpen && (
                    <div
                      className="absolute top-full mt-2 right-0 w-36 bg-[#0d2818] rounded-xl 
                      border border-[#1a3d1a] shadow-xl z-20 overflow-hidden"
                    >
                      {["All", "PENDING", "DONE"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            setStatusFilter(filter);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#132d13] transition-colors
                            ${
                              statusFilter === filter
                                ? "bg-green-600 text-white"
                                : "text-green-300/80"
                            }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#132d13]/80">
                      <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">
                        School
                      </th>
                      <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">
                        Location
                      </th>
                      <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">
                        Chairs
                      </th>
                      <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">
                        Status
                      </th>
                      <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-16">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-green-400/60">
                              Loading projects...
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-16">
                          <div className="flex flex-col items-center gap-3">
                            <FolderKanban className="w-12 h-12 text-green-500/30" />
                            <p className="text-green-400/60">
                              No projects found
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((project, i) => (
                        <tr
                          key={i}
                          onClick={() => handleRowClick(project)}
                          className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors cursor-pointer"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-[#1a5c1a]/30 rounded-lg">
                                <School size={18} className="text-green-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {project.school}
                                </p>
                                <p className="text-green-400/50 text-xs">
                                  ID: {project.projectID?.slice(0, 8)}
                                </p>
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
                            <div className="flex items-center justify-center gap-1">
                              <Armchair size={14} className="text-green-400" />
                              <span className="text-white font-semibold">
                                {project.itemgoal}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                                project.status
                              )}`}
                            >
                              {project.status === "DONE" && (
                                <CheckCircle2
                                  size={12}
                                  className="inline mr-1"
                                />
                              )}
                              {project.status === "PENDING" && (
                                <Clock size={12} className="inline mr-1" />
                              )}
                              {project.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRowClick(project);
                                }}
                                className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProjectToDelete(project.projectID);
                                  setIsDeleteModalOpen(true);
                                }}
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  {formMode === "add" ? (
                    <>
                      <Plus size={20} className="text-green-400" />
                      Add New Project
                    </>
                  ) : (
                    <>
                      <Edit size={20} className="text-green-400" />
                      Edit Project
                    </>
                  )}
                </h3>
                {formMode === "edit" && (
                  <button
                    onClick={resetForm}
                    className="p-2 bg-[#132d13] rounded-lg hover:bg-[#1a3d1a] transition-colors"
                  >
                    <RotateCcw size={16} className="text-green-400/70" />
                  </button>
                )}
              </div>

              <form
                onSubmit={formMode === "add" ? saveProject : updateProject}
                className="space-y-4"
              >
                {/* School Name */}
                <div>
                  <label className="block text-green-400/60 text-sm mb-2">
                    School Name
                  </label>
                  <div className="relative">
                    <School
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                    />
                    <input
                      type="text"
                      name="school"
                      value={inputData.school}
                      onChange={handleChange}
                      placeholder="Enter school name"
                      className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                        pl-11 pr-4 py-3 rounded-xl border border-[#1a3d1a] 
                        focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-green-400/60 text-sm mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                    />
                    <input
                      type="text"
                      name="location"
                      value={inputData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                      className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                        pl-11 pr-4 py-3 rounded-xl border border-[#1a3d1a] 
                        focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Chairs Needed */}
                <div>
                  <label className="block text-green-400/60 text-sm mb-2">
                    Chairs Needed
                  </label>
                  <div className="relative">
                    <Armchair
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                    />
                    <input
                      type="number"
                      name="itemgoal"
                      value={inputData.itemgoal}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                        pl-11 pr-4 py-3 rounded-xl border border-[#1a3d1a] 
                        focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Status (for edit mode) */}
                {formMode === "edit" && (
                  <div>
                    <label className="block text-green-400/60 text-sm mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={inputData.status}
                      onChange={handleChange}
                      className="w-full bg-[#0d2818] text-white 
                        px-4 py-3 rounded-xl border border-[#1a3d1a] 
                        focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-white font-semibold 
                    flex items-center justify-center gap-2 transition-all
                    ${
                      formMode === "add"
                        ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] hover:from-[#1a4d1a] hover:to-[#0d2d0d]"
                        : "bg-gradient-to-r from-[#1a4d1a] to-[#0d3d0d] hover:from-[#1a5c1a] hover:to-[#0d2d0d]"
                    }`}
                >
                  {formMode === "add" ? (
                    <>
                      <Plus size={18} />
                      Add Project
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Update Project
                    </>
                  )}
                </button>
              </form>

              {/* Help Info */}
              <div className="mt-6 p-4 bg-[#1a5c1a]/10 rounded-xl border border-[#1a3d1a]">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Target size={16} />
                  <span className="font-semibold text-sm">Quick Tip</span>
                </div>
                <p className="text-green-400/50 text-sm">
                  Click on any project row to edit it. Changes will be reflected
                  immediately after saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <h3 className="text-white text-lg font-semibold mb-2">
                Delete Project
              </h3>
              <p className="text-green-400/60 mb-6">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#132d13] hover:bg-[#1a3d1a] text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg
          flex items-center gap-2 animate-bounce
          ${
            notification.type === "success" ? "bg-emerald-500" : "bg-red-500"
          } text-white`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
