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
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const RequestPage = () => {
  const { user } = useAuth();
  const [recordFilter, setRecordFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

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
  const pendingTransactions = transactions.filter(t => t.status === "PENDING");
  const acceptedTransactions = transactions.filter(t => 
    t.status === "ACCEPTED" || t.status === "DELIVERED" || t.status === "REJECTED"
  );

  const currentList = recordFilter === "pending" ? pendingTransactions : acceptedTransactions;
  
  const filteredList = currentList.filter(
    (item) =>
      item.product.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [recordFilter, searchQuery]);

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

  const pendingCount = pendingTransactions.length;
  const acceptedCount = acceptedTransactions.length;
  const deliveredCount = transactions.filter(t => t.status === "DELIVERED").length;

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
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex bg-[#0d2818] rounded-2xl p-1.5 shadow-md border border-[#1a3d1a]">
            <button
              onClick={() => setRecordFilter("pending")}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300
                ${
                  recordFilter === "pending"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "text-green-400/70 hover:bg-[#132d13]"
                }
              `}
            >
              <Clock size={18} />
              Pending
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${recordFilter === "pending" ? "bg-white/30" : "bg-[#3d2d0d] text-amber-400"}`}>
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setRecordFilter("accepted")}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300
                ${
                  recordFilter === "accepted"
                    ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white shadow-md"
                    : "text-green-400/70 hover:bg-[#132d13]"
                }
              `}
            >
              <CheckCircle2 size={18} />
              Accepted
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${recordFilter === "accepted" ? "bg-white/30" : "bg-[#132d13] text-green-400"}`}>
                {acceptedCount}
              </span>
            </button>
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
            {recordFilter === "pending" ? (
              <>
                <Clock size={20} className="text-amber-400" />
                Pending Requests
              </>
            ) : (
              <>
                <CheckCircle2 size={20} className="text-green-400" />
                Accepted Requests
              </>
            )}
          </h2>
          <div className="h-1 w-8 bg-gradient-to-r from-[#0d3d0d] to-green-500 rounded-full"></div>
        </div>

        {/* Request Cards - Fixed height container for consistent pagination position */}
        <div className="min-h-[880px]">
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
              </div>
            ) : paginatedList.map((request, i) => {
            const statusStyle = getStatusStyle(request.status);
            const StatusIcon = statusStyle.icon;
            
            return (
              <div
                key={request.transacID}
                className="group bg-[#092b09] rounded-2xl shadow-md hover:shadow-xl 
                  border border-[#1a3d1a] hover:border-green-500/50
                  transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#1a3d1a]">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundImage: `url(${request.product.img})` }}
                  ></div>
                </div>

                {/* Request Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-noto text-white font-semibold text-lg">
                    {request.product.product}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-green-400/70 mt-1">
                    <Recycle size={14} />
                    <span className="text-sm">{request.product.materialGoal} {request.product.material}</span>
                  </div>
                  <p className="text-green-500/50 text-xs mt-1">Request ID: {request.transacID.slice(0, 8)}...</p>
                </div>

                {/* Status Badge */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border
                  ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                  <StatusIcon size={16} />
                  <span className="text-sm font-medium">{statusStyle.label}</span>
                </div>

                {/* Action Button (only for accepted) */}
                {recordFilter === "accepted" && (
                  <button 
                    onClick={() => openModal(request)}
                    className="flex items-center gap-2 px-5 py-2.5 
                      bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                      hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                      rounded-xl text-white text-sm font-semibold
                      transform transition-all duration-200 hover:scale-105
                      shadow-md hover:shadow-lg"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                )}

                {/* Cancel Button (only for pending) */}
                {recordFilter === "pending" && (
                  <button 
                    onClick={() => openCancelModal(request)}
                    className="flex items-center gap-2 px-5 py-2.5 
                    bg-[#0d2818] border-2 border-red-500/50 
                    hover:bg-red-500 hover:border-red-500 hover:text-white
                    rounded-xl text-red-400 text-sm font-semibold
                    transform transition-all duration-200 hover:scale-105
                    shadow-md hover:shadow-lg">
                    Cancel
                  </button>
                )}
              </div>
            );
          })}
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

        {/* Empty State */}
        {!isLoading && filteredList.length === 0 && (
          <div className="text-center py-12 bg-[#0d2818] rounded-2xl shadow-md border border-[#1a3d1a]">
            <Package size={48} className="mx-auto text-green-500/30 mb-3" />
            <p className="text-green-400 font-medium">No requests found</p>
            <p className="text-green-500/50 text-sm mt-1">
              {searchQuery ? `No results for "${searchQuery}"` : "You haven't made any requests yet"}
            </p>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-[#0d2818] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto
              transform transition-all duration-300 animate-in fade-in zoom-in-95 border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div 
                className="h-40 bg-cover bg-center rounded-t-3xl"
                style={{ backgroundImage: `url(${selectedRequest.product.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818] to-transparent rounded-t-3xl"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-[#0d2818]/50 backdrop-blur-sm rounded-full
                  hover:bg-[#0d2818]/80 transition-colors border border-[#1a3d1a]"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Product Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="font-noto text-white text-2xl font-bold">
                  {selectedRequest.product.product}
                </h2>
                <div className="flex items-center gap-2 text-green-300/80 mt-1">
                  <Recycle size={14} />
                  <span className="text-sm">{selectedRequest.product.materialGoal} {selectedRequest.product.material}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Status Badge */}
              {(() => {
                const statusStyle = getStatusStyle(selectedRequest.status);
                const StatusIcon = statusStyle.icon;
                return (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6
                    ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    <StatusIcon size={18} />
                    <span className="font-semibold">{statusStyle.label}</span>
                  </div>
                );
              })()}

              {/* Details Grid */}
              <div className="space-y-4">
                {/* Request ID */}
                <div className="flex items-center gap-3 p-3 bg-[#132d13] rounded-xl border border-[#1a3d1a]">
                  <div className="p-2 bg-[#1a3d1a] rounded-lg">
                    <Hash size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-500/50 text-xs font-medium">Transaction ID</p>
                    <p className="text-white font-semibold text-sm">{selectedRequest.transacID}</p>
                  </div>
                </div>

                {/* Product ID */}
                <div className="flex items-center gap-3 p-3 bg-[#1a2d3d] rounded-xl border border-[#2a4d5c]">
                  <div className="p-2 bg-[#2a4d5c] rounded-lg">
                    <Package size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-cyan-500/50 text-xs font-medium">Product ID</p>
                    <p className="text-white font-semibold text-sm">{selectedRequest.productID}</p>
                  </div>
                </div>

                {/* Stock Info */}
                <div className="flex items-center gap-3 p-3 bg-[#3d2d0d] rounded-xl border border-[#5c4a1a]">
                  <div className="p-2 bg-[#5c4a1a] rounded-lg">
                    <ShoppingBag size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-500/50 text-xs font-medium">Stock Available</p>
                    <p className="text-white font-semibold text-sm">{selectedRequest.product.stock} units</p>
                  </div>
                </div>

                {/* User Address */}
                <div className="flex items-start gap-3 p-3 bg-[#3d1a1a] rounded-xl border border-[#5c2a2a]">
                  <div className="p-2 bg-[#5c2a2a] rounded-lg">
                    <MapPin size={18} className="text-rose-400" />
                  </div>
                  <div>
                    <p className="text-rose-500/50 text-xs font-medium">Delivery Address</p>
                    <p className="text-white font-semibold">{selectedRequest.user.address}</p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-center gap-3 p-3 bg-[#1a2d3d] rounded-xl border border-[#2a4d5c]">
                  <div className="p-2 bg-[#2a4d5c] rounded-lg">
                    <Phone size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-cyan-500/50 text-xs font-medium">Contact Number</p>
                    <p className="text-white font-semibold">{selectedRequest.user.contact}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {selectedRequest.status !== "DELIVERED" && (
                  <button className="flex-1 flex items-center justify-center gap-2 py-3
                    bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                    hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                    rounded-xl text-white font-semibold
                    transform transition-all duration-200 hover:scale-[1.02]
                    shadow-md hover:shadow-lg">
                    <Truck size={18} />
                    Track Delivery
                  </button>
                )}
                <button 
                  onClick={closeModal}
                  className={`${selectedRequest.status !== "DELIVERED" ? "" : "flex-1"} 
                    flex items-center justify-center gap-2 py-3 px-6
                    bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-xl text-green-400 font-semibold
                    transform transition-all duration-200 border border-[#1a3d1a]`}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                    style={{ backgroundImage: `url(${requestToCancel.product.img})` }}
                  ></div>
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-noto text-white font-semibold">
                    {requestToCancel.product.product}
                  </h3>
                  <div className="flex items-center gap-2 text-green-400/70 mt-1">
                    <Recycle size={12} />
                    <span className="text-xs">{requestToCancel.product.materialGoal} {requestToCancel.product.material}</span>
                  </div>
                  <p className="text-green-500/50 text-xs mt-1">ID: {requestToCancel.transacID.slice(0, 8)}...</p>
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
