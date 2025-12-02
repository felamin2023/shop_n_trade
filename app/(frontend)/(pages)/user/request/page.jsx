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
  MessageSquare
} from "lucide-react";
import { useState } from "react";

const requestListPending = [
  {
    id: "REQ-001",
    product: "Nike T Shirt",
    tradeItem: "500 water bottles",
    status: "Pending",
    date: "Dec 1, 2025",
    image: "/images/productPage/NikeTShirt.jpg",
  },
  {
    id: "REQ-002",
    product: "Rolex Daytona",
    tradeItem: "10,000 water bottles",
    status: "Pending",
    date: "Nov 28, 2025",
    image: "/images/productPage/rolexdaytona.jpg",
  },
  {
    id: "REQ-003",
    product: "Jordan Nike Air",
    tradeItem: "5,000 water bottles",
    status: "Pending",
    date: "Nov 25, 2025",
    image: "/images/productPage/jordansneakers.jpg",
  },
  {
    id: "REQ-004",
    product: "Addidas Cap",
    tradeItem: "200 water bottles",
    status: "Pending",
    date: "Nov 20, 2025",
    image: "/images/productPage/addidascap.jpg",
  },
];

const requestListAccepted = [
  {
    id: "REQ-005",
    product: "Nike T Shirt",
    tradeItem: "500 water bottles",
    status: "Not yet delivered",
    date: "Nov 15, 2025",
    image: "/images/productPage/NikeTShirt.jpg",
    approvedDate: "Nov 16, 2025",
    estimatedDelivery: "Dec 5, 2025",
    trackingNumber: "TRK-2025-0892",
    deliveryAddress: "123 Green Street, Eco City",
    contactNumber: "+63 912 345 6789",
    notes: "Please handle with care. Leave at the door if not home.",
  },
  {
    id: "REQ-006",
    product: "Rolex Daytona",
    tradeItem: "10,000 water bottles",
    status: "Delivered",
    date: "Nov 10, 2025",
    image: "/images/productPage/rolexdaytona.jpg",
    approvedDate: "Nov 11, 2025",
    deliveredDate: "Nov 20, 2025",
    trackingNumber: "TRK-2025-0756",
    deliveryAddress: "456 Recycle Avenue, Green Town",
    contactNumber: "+63 917 654 3210",
    notes: "Signature required upon delivery.",
  },
  {
    id: "REQ-007",
    product: "Jordan Nike Air",
    tradeItem: "5,000 water bottles",
    status: "Delivered",
    date: "Nov 5, 2025",
    image: "/images/productPage/jordansneakers.jpg",
    approvedDate: "Nov 6, 2025",
    deliveredDate: "Nov 15, 2025",
    trackingNumber: "TRK-2025-0621",
    deliveryAddress: "789 Sustainable Blvd, Earth City",
    contactNumber: "+63 918 111 2222",
    notes: "Size US 10. Gift wrapped.",
  },
  {
    id: "REQ-008",
    product: "Addidas Cap",
    tradeItem: "200 water bottles",
    status: "Delivered",
    date: "Oct 30, 2025",
    image: "/images/productPage/addidascap.jpg",
    approvedDate: "Oct 31, 2025",
    deliveredDate: "Nov 5, 2025",
    trackingNumber: "TRK-2025-0498",
    deliveryAddress: "321 Eco Lane, Nature Village",
    contactNumber: "+63 919 333 4444",
    notes: "Black color variant.",
  },
];

const RequestPage = () => {
  const [recordFilter, setRecordFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentList = recordFilter === "pending" ? requestListPending : requestListAccepted;
  
  const filteredList = currentList.filter(
    (item) =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tradeItem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: CircleDashed,
        };
      case "Not yet delivered":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: Truck,
        };
      case "Delivered":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: PackageCheck,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: Package,
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

  const pendingCount = requestListPending.length;
  const acceptedCount = requestListAccepted.length;
  const deliveredCount = requestListAccepted.filter(r => r.status === "Delivered").length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-8">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-8 px-4 mb-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBag className="w-8 h-8 text-emerald-200" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              My Requests
            </h1>
            <Package className="w-8 h-8 text-emerald-200" />
          </div>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Track your trade requests and delivery status. Exchange recyclables for amazing rewards! 🎁
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{pendingCount} Pending</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">{acceptedCount} Accepted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
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
          <div className="flex bg-white rounded-2xl p-1.5 shadow-md border border-emerald-100">
            <button
              onClick={() => setRecordFilter("pending")}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300
                ${
                  recordFilter === "pending"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "text-emerald-700 hover:bg-emerald-50"
                }
              `}
            >
              <Clock size={18} />
              Pending
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${recordFilter === "pending" ? "bg-white/30" : "bg-amber-100 text-amber-700"}`}>
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
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                    : "text-emerald-700 hover:bg-emerald-50"
                }
              `}
            >
              <CheckCircle2 size={18} />
              Accepted
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${recordFilter === "accepted" ? "bg-white/30" : "bg-emerald-100 text-emerald-700"}`}>
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
              className="w-full sm:w-72 bg-white text-emerald-800 placeholder-emerald-400 
                px-5 py-2.5 pl-11 rounded-full border border-emerald-200 
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
                shadow-md transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
          <h2 className="font-noto text-emerald-800 text-xl font-semibold flex items-center gap-2">
            {recordFilter === "pending" ? (
              <>
                <Clock size={20} className="text-amber-500" />
                Pending Requests
              </>
            ) : (
              <>
                <CheckCircle2 size={20} className="text-emerald-500" />
                Accepted Requests
              </>
            )}
          </h2>
          <div className="h-1 w-8 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {filteredList.map((request, i) => {
            const statusStyle = getStatusStyle(request.status);
            const StatusIcon = statusStyle.icon;
            
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                  border border-emerald-100 hover:border-emerald-300
                  transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-emerald-100">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundImage: `url(${request.image})` }}
                  ></div>
                </div>

                {/* Request Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-noto text-emerald-900 font-semibold text-lg">
                    {request.product}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-600 mt-1">
                    <Recycle size={14} />
                    <span className="text-sm">{request.tradeItem}</span>
                  </div>
                  <p className="text-emerald-400 text-xs mt-1">Requested on {request.date}</p>
                </div>

                {/* Status Badge */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border
                  ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                  <StatusIcon size={16} />
                  <span className="text-sm font-medium">{request.status}</span>
                </div>

                {/* Action Button (only for accepted) */}
                {recordFilter === "accepted" && (
                  <button 
                    onClick={() => openModal(request)}
                    className="flex items-center gap-2 px-5 py-2.5 
                      bg-gradient-to-r from-emerald-500 to-teal-500 
                      hover:from-emerald-600 hover:to-teal-600
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
                  <button className="flex items-center gap-2 px-5 py-2.5 
                    bg-white border-2 border-red-200 
                    hover:bg-red-500 hover:border-red-500 hover:text-white
                    rounded-xl text-red-500 text-sm font-semibold
                    transform transition-all duration-200 hover:scale-105
                    shadow-md hover:shadow-lg">
                    Cancel
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredList.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md border border-emerald-100">
            <Package size={48} className="mx-auto text-emerald-300 mb-3" />
            <p className="text-emerald-600 font-medium">No requests found</p>
            <p className="text-emerald-400 text-sm mt-1">
              {searchQuery ? `No results for "${searchQuery}"` : "You haven't made any requests yet"}
            </p>
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
                How Trading Works 🔄
              </h4>
              <p className="text-emerald-100 text-sm leading-relaxed">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto
              transform transition-all duration-300 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div 
                className="h-40 bg-cover bg-center rounded-t-3xl"
                style={{ backgroundImage: `url(${selectedRequest.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full
                  hover:bg-white/40 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Product Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="font-noto text-white text-2xl font-bold">
                  {selectedRequest.product}
                </h2>
                <div className="flex items-center gap-2 text-white/80 mt-1">
                  <Recycle size={14} />
                  <span className="text-sm">{selectedRequest.tradeItem}</span>
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
                    <span className="font-semibold">{selectedRequest.status}</span>
                  </div>
                );
              })()}

              {/* Details Grid */}
              <div className="space-y-4">
                {/* Request ID */}
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Hash size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-emerald-500 text-xs font-medium">Request ID</p>
                    <p className="text-emerald-800 font-semibold">{selectedRequest.id}</p>
                  </div>
                </div>

                {/* Tracking Number */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-blue-500 text-xs font-medium">Tracking Number</p>
                    <p className="text-blue-800 font-semibold">{selectedRequest.trackingNumber}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Calendar size={18} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-amber-500 text-xs font-medium">Requested</p>
                      <p className="text-amber-800 font-semibold text-sm">{selectedRequest.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <CheckCircle2 size={18} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-teal-500 text-xs font-medium">Approved</p>
                      <p className="text-teal-800 font-semibold text-sm">{selectedRequest.approvedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Date or Estimated */}
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Truck size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-purple-500 text-xs font-medium">
                      {selectedRequest.status === "Delivered" ? "Delivered On" : "Estimated Delivery"}
                    </p>
                    <p className="text-purple-800 font-semibold">
                      {selectedRequest.deliveredDate || selectedRequest.estimatedDelivery}
                    </p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <MapPin size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <p className="text-rose-500 text-xs font-medium">Delivery Address</p>
                    <p className="text-rose-800 font-semibold">{selectedRequest.deliveryAddress}</p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Phone size={18} className="text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-cyan-500 text-xs font-medium">Contact Number</p>
                    <p className="text-cyan-800 font-semibold">{selectedRequest.contactNumber}</p>
                  </div>
                </div>

                {/* Notes */}
                {selectedRequest.notes && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <MessageSquare size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium">Notes</p>
                      <p className="text-gray-800">{selectedRequest.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {selectedRequest.status !== "Delivered" && (
                  <button className="flex-1 flex items-center justify-center gap-2 py-3
                    bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600
                    rounded-xl text-white font-semibold
                    transform transition-all duration-200 hover:scale-[1.02]
                    shadow-md hover:shadow-lg">
                    <Truck size={18} />
                    Track Delivery
                  </button>
                )}
                <button 
                  onClick={closeModal}
                  className={`${selectedRequest.status !== "Delivered" ? "" : "flex-1"} 
                    flex items-center justify-center gap-2 py-3 px-6
                    bg-gray-100 hover:bg-gray-200
                    rounded-xl text-gray-700 font-semibold
                    transform transition-all duration-200`}
                >
                  Close
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
