"use client";
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Package, 
  Truck, 
  Eye,
  Recycle,
  ShoppingBag,
  Filter,
  Leaf,
  CircleDashed,
  PackageCheck,
  X,
  MapPin,
  Calendar,
  Hash,
  Phone,
  User,
  MessageSquare,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const RequestPage = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ITEMS_PER_PAGE = 8;

  const statusOptions = [
    { value: "ALL", label: "All Status", icon: Filter },
    { value: "PENDING", label: "Pending", icon: CircleDashed },
    { value: "ACCEPTED", label: "Accepted", icon: CheckCircle2 },
    { value: "REJECTED", label: "Rejected", icon: XCircle },
    { value: "DELIVERED", label: "Delivered", icon: PackageCheck },
  ];

  // Fetch transactions from database
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.userID) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/transaction?userID=${user.userID}`);
        const data = await response.json();
        
        if (data.status === 200) {
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  // Filter transactions by status
  const filteredByStatus = statusFilter === "ALL" 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);
  
  const filteredList = filteredByStatus.filter(
    (item) =>
      item.product?.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product?.material?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: CircleDashed,
          label: "Pending",
        };
      case "ACCEPTED":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: Truck,
          label: "Accepted",
        };
      case "DELIVERED":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: PackageCheck,
          label: "Delivered",
        };
      case "REJECTED":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-200",
          icon: XCircle,
          label: "Rejected",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: Package,
          label: status,
        };
    }
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const openCancelModal = (request) => {
    setRequestToCancel(request);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setRequestToCancel(null);
  };

  const handleConfirmCancel = async () => {
    if (!requestToCancel) return;
    
    try {
      // Delete the transaction from the database
      const response = await fetch(`/api/transaction/${requestToCancel.transacID}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        // Remove from local state
        setTransactions(prev => prev.filter(t => t.transacID !== requestToCancel.transacID));
      }
    } catch (error) {
      console.error("Failed to cancel request:", error);
    }
    closeCancelModal();
  };

  const pendingCount = transactions.filter(t => t.status === "PENDING").length;
  const acceptedCount = transactions.filter(t => t.status === "ACCEPTED").length;
  const deliveredCount = transactions.filter(t => t.status === "DELIVERED").length;
  const rejectedCount = transactions.filter(t => t.status === "REJECTED").length;

  const getSelectedStatusOption = () => {
    return statusOptions.find(opt => opt.value === statusFilter) || statusOptions[0];
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-8 px-4 mb-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBag className="w-8 h-8 text-green-300" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              My Requests
            </h1>
            <Package className="w-8 h-8 text-green-300" />
          </div>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Track your trade requests and delivery status. Exchange recyclables for amazing rewards! 🎁
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{pendingCount} Pending</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{acceptedCount} Accepted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Truck className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{deliveredCount} Delivered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <XCircle className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{rejectedCount} Rejected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-5 py-2.5 bg-[#0d2818] rounded-xl 
                border border-[#1a3d1a] shadow-md hover:border-green-500/50 transition-all min-w-[180px]"
            >
              {(() => {
                const selected = getSelectedStatusOption();
                const Icon = selected.icon;
                return (
                  <>
                    <Icon size={18} className="text-green-400" />
                    <span className="text-white font-medium text-sm flex-1 text-left">
                      {selected.label}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-green-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </>
                );
              })()}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-[#0d2818] rounded-xl border border-[#1a3d1a] 
                shadow-xl z-50 overflow-hidden">
                {statusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setStatusFilter(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                        ${statusFilter === option.value 
                          ? 'bg-[#1a3d1a] text-white' 
                          : 'text-green-400/80 hover:bg-[#132d13]'
                        }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search requests..."
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

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-[#0d3d0d] rounded-full"></div>
          <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
            <Package size={20} className="text-green-400" />
            Transaction History
            <span className="text-green-400/60 text-sm font-normal ml-2">
              ({filteredList.length} {filteredList.length === 1 ? 'request' : 'requests'})
            </span>
          </h2>
          <div className="h-1 w-8 bg-gradient-to-r from-[#0d3d0d] to-green-500 rounded-full"></div>
        </div>

        {/* Table Container */}
        <div className="bg-[#0d2818] rounded-2xl border border-[#1a3d1a] overflow-hidden shadow-lg mb-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#132d13] border-b border-[#1a3d1a]">
            <div className="col-span-4 text-green-400 font-semibold text-sm flex items-center gap-2">
              <Package size={16} />
              Product
            </div>
            <div className="col-span-2 text-green-400 font-semibold text-sm flex items-center gap-2">
              <Recycle size={16} />
              Material
            </div>
            <div className="col-span-2 text-green-400 font-semibold text-sm flex items-center gap-2">
              <Calendar size={16} />
              Schedule
            </div>
            <div className="col-span-2 text-green-400 font-semibold text-sm flex items-center gap-2">
              <CircleDashed size={16} />
              Status
            </div>
            <div className="col-span-2 text-green-400 font-semibold text-sm text-center">
              Actions
            </div>
          </div>

          {/* Table Body */}
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
              </div>
            ) : paginatedList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-green-400/60">
                <Package size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No requests found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search query</p>
              </div>
            ) : (
              paginatedList.map((request) => {
                const statusStyle = getStatusStyle(request.status);
                const StatusIcon = statusStyle.icon;
                
                return (
                  <div
                    key={request.transacID}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1a3d1a]/50 
                      hover:bg-[#132d13]/50 transition-colors items-center"
                  >
                    {/* Product */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg bg-cover bg-center border border-[#1a3d1a] flex-shrink-0"
                        style={{ backgroundImage: `url(${request.product?.img})` }}
                      />
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {request.product?.product}
                        </p>
                        <p className="text-green-400/60 text-xs">
                          ID: {request.transacID?.slice(0, 8)}...
                        </p>
                      </div>
                    </div>

                    {/* Material */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1 text-green-400">
                        <Recycle size={14} />
                        <span className="text-sm">{request.product?.materialGoal?.toLocaleString()}</span>
                      </div>
                      <p className="text-green-400/60 text-xs">{request.product?.material}</p>
                    </div>

                    {/* Schedule */}
                    <div className="col-span-2">
                      <p className="text-white text-sm">{request.scheduledDate || 'Not set'}</p>
                      <p className="text-green-400/60 text-xs">{request.scheduledTime || ''}</p>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                        ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                        <StatusIcon size={12} />
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => openModal(request)}
                        className="p-2 bg-[#1a3d1a] hover:bg-[#1a5c1a] rounded-lg transition-colors
                          text-green-400 hover:text-white"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {request.status === "PENDING" && (
                        <button
                          onClick={() => openCancelModal(request)}
                          className="p-2 bg-red-900/30 hover:bg-red-900/50 rounded-lg transition-colors
                            text-red-400 hover:text-red-300"
                          title="Cancel Request"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pagination Controls - Always visible when there are multiple pages */}
        {!isLoading && filteredList.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || totalPages <= 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300 border
                ${currentPage === 1 || totalPages <= 1
                  ? "bg-[#0d2818] border-[#1a3d1a] text-green-500/30 cursor-not-allowed"
                  : "bg-[#0d2818] border-[#1a3d1a] text-green-400 hover:bg-[#132d13] hover:border-green-500/50"
                }`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-[#132d13] rounded-xl border border-[#1a3d1a]">
              <span className="text-green-400 font-medium text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <span className="text-green-500/50 text-xs">
                ({filteredList.length} items)
              </span>
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages <= 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300 border
                ${currentPage === totalPages || totalPages <= 1
                  ? "bg-[#0d2818] border-[#1a3d1a] text-green-500/30 cursor-not-allowed"
                  : "bg-[#0d2818] border-[#1a3d1a] text-green-400 hover:bg-[#132d13] hover:border-green-500/50"
                }`}
            >
              Next
              <ChevronRight size={18} />
            </button>
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
                How Trading Works 🔄
              </h4>
              <p className="text-green-200 text-sm leading-relaxed">
                Once your request is approved, collect the required bottles and bring them to our 
                collection center. After verification, your reward will be prepared for delivery 
                or pickup. Thank you for helping the environment!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal/Dialog for View Details */}
      {isModalOpen && selectedRequest && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] overflow-y-auto
              transform transition-all duration-300 animate-in fade-in zoom-in-95 border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Compact */}
            <div className="relative">
              <div 
                className="h-24 bg-cover bg-center rounded-t-2xl"
                style={{ backgroundImage: `url(${selectedRequest.product?.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818] to-transparent rounded-t-2xl"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 p-1.5 bg-[#0d2818]/50 backdrop-blur-sm rounded-full
                  hover:bg-[#0d2818]/80 transition-colors border border-[#1a3d1a]"
              >
                <X size={16} className="text-white" />
              </button>

              {/* Product Title Overlay */}
              <div className="absolute bottom-2 left-3 right-3">
                <h2 className="font-noto text-white text-lg font-bold">
                  {selectedRequest.product?.product}
                </h2>
                <div className="flex items-center gap-2 text-green-300/80">
                  <Recycle size={12} />
                  <span className="text-xs">{selectedRequest.product?.materialGoal} {selectedRequest.product?.material}</span>
                </div>
              </div>
            </div>

            {/* Modal Body - Compact */}
            <div className="p-4">
              {/* Status Badge */}
              {(() => {
                const statusStyle = getStatusStyle(selectedRequest.status);
                const StatusIcon = statusStyle.icon;
                return (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border mb-3
                    ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    <StatusIcon size={14} />
                    <span className="font-semibold text-sm">{statusStyle.label}</span>
                  </div>
                );
              })()}

              {/* Details Grid - Compact */}
              <div className="space-y-2">
                {/* Row 1: Transaction ID & Schedule */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-[#132d13] rounded-lg border border-[#1a3d1a]">
                    <Hash size={14} className="text-green-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-green-500/50 text-[10px]">ID</p>
                      <p className="text-white text-xs truncate">{selectedRequest.transacID?.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#1a2d3d] rounded-lg border border-[#2a4d5c]">
                    <Calendar size={14} className="text-cyan-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-cyan-500/50 text-[10px]">Schedule</p>
                      <p className="text-white text-xs truncate">{selectedRequest.scheduledDate || 'Not set'}</p>
                    </div>
                  </div>
                </div>

                {/* Row 2: Created & Stock */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-[#2d1a3d] rounded-lg border border-[#4a2a5c]">
                    <Clock size={14} className="text-purple-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-purple-500/50 text-[10px]">Created</p>
                      <p className="text-white text-xs truncate">
                        {selectedRequest.createdAt 
                          ? new Date(selectedRequest.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#3d2d0d] rounded-lg border border-[#5c4a1a]">
                    <ShoppingBag size={14} className="text-amber-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-amber-500/50 text-[10px]">Stock</p>
                      <p className="text-white text-xs">{selectedRequest.product?.stock} units</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-2 p-2 bg-[#3d1a1a] rounded-lg border border-[#5c2a2a]">
                  <MapPin size={14} className="text-rose-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-rose-500/50 text-[10px]">Address</p>
                    <p className="text-white text-xs truncate">{selectedRequest.user?.address || user?.address || 'N/A'}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center gap-2 p-2 bg-[#1a2d3d] rounded-lg border border-[#2a4d5c]">
                  <Phone size={14} className="text-cyan-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-cyan-500/50 text-[10px]">Contact</p>
                    <p className="text-white text-xs">{selectedRequest.user?.contact || user?.contact || 'N/A'}</p>
                  </div>
                </div>

                {/* Uploaded Images - Compact */}
                {selectedRequest.images && selectedRequest.images.length > 0 && (
                  <div className="p-2 bg-[#132d13] rounded-lg border border-[#1a3d1a]">
                    <p className="text-green-500/50 text-[10px] mb-2">Proof ({selectedRequest.images.length} images)</p>
                    <div className="grid grid-cols-4 gap-1">
                      {selectedRequest.images.slice(0, 4).map((img, idx) => (
                        <div 
                          key={idx}
                          className="aspect-square rounded bg-cover bg-center border border-[#1a3d1a]"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons - Compact */}
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={closeModal}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4
                    bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-lg text-green-400 font-medium text-sm
                    transition-all duration-200 border border-[#1a3d1a]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && requestToCancel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeCancelModal}
        >
          <div 
            className="bg-[#0d2818] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 pb-0">
              {/* Close Button */}
              <button
                onClick={closeCancelModal}
                className="absolute top-4 right-4 p-2 bg-[#132d13] rounded-full
                  hover:bg-[#1a3d1a] transition-colors border border-[#1a3d1a]"
              >
                <X size={18} className="text-green-400" />
              </button>

              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-500/10 rounded-full border border-red-500/30">
                  <X size={40} className="text-red-500" />
                </div>
              </div>

              <h2 className="font-noto text-white text-xl font-bold text-center">
                Cancel Request?
              </h2>
              <p className="text-green-400/70 text-sm text-center mt-2">
                Are you sure you want to cancel this request? This action cannot be undone.
              </p>
            </div>

            {/* Request Details */}
            <div className="p-6">
              <div className="flex items-center gap-4 p-4 bg-[#132d13] rounded-xl border border-[#1a3d1a] mb-6">
                {/* Product Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#1a3d1a]">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${requestToCancel.product?.img})` }}
                  ></div>
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-noto text-white font-semibold">
                    {requestToCancel.product?.product}
                  </h3>
                  <div className="flex items-center gap-2 text-green-400/70 mt-1">
                    <Recycle size={12} />
                    <span className="text-xs">{requestToCancel.product?.materialGoal} {requestToCancel.product?.material}</span>
                  </div>
                  <p className="text-green-500/50 text-xs mt-1">ID: {requestToCancel.transacID?.slice(0, 8)}...</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeCancelModal}
                  className="flex-1 py-3 px-4 bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-xl text-green-400 font-semibold transition-colors border border-[#1a3d1a]"
                >
                  Keep Request
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 
                    hover:from-red-700 hover:to-red-800
                    rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                    transition-all flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestPage;
