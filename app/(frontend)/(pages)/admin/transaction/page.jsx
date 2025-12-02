"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Receipt,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Package,
  User,
  Recycle,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Check,
  XCircle,
} from "lucide-react";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionFilter, setTransactionFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // Mock data for demo
  const mockTransactions = [
    {
      transacID: "TRX001ABC",
      user: { fullname: "Jovanie Felamin", email: "jovanie@gmail.com", contact: "09123456789" },
      product: { product: "Nike T-Shirt", material: "Water Bottles", materialGoal: 500, img: "/images/productPage/product1.jpg" },
      status: "Pending",
      date: "Dec 1, 2024",
      bottlesTraded: 500,
    },
    {
      transacID: "TRX002DEF",
      user: { fullname: "Joshua Briones", email: "joshua@gmail.com", contact: "09234567890" },
      product: { product: "Rolex Daytona", material: "Water Bottles", materialGoal: 10000, img: "/images/productPage/product2.jpg" },
      status: "Accepted",
      date: "Nov 28, 2024",
      bottlesTraded: 10000,
    },
    {
      transacID: "TRX003GHI",
      user: { fullname: "Ivan Brigoli", email: "ivan@gmail.com", contact: "09345678901" },
      product: { product: "Jordan Nike Air", material: "Water Bottles", materialGoal: 5000, img: "/images/productPage/product3.jpg" },
      status: "Pending",
      date: "Nov 30, 2024",
      bottlesTraded: 5000,
    },
    {
      transacID: "TRX004JKL",
      user: { fullname: "Albert Guazo", email: "albert@gmail.com", contact: "09456789012" },
      product: { product: "Adidas Cap", material: "Water Bottles", materialGoal: 200, img: "/images/productPage/product4.jpg" },
      status: "Accepted",
      date: "Nov 25, 2024",
      bottlesTraded: 200,
    },
    {
      transacID: "TRX005MNO",
      user: { fullname: "Kimberly Ytac", email: "kim@gmail.com", contact: "09567890123" },
      product: { product: "Eco Water Bottle", material: "Plastic Caps", materialGoal: 100, img: "/images/productPage/product5.jpg" },
      status: "Rejected",
      date: "Nov 20, 2024",
      bottlesTraded: 100,
    },
  ];

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/transaction");
      setTransactions(res.data.transactions || mockTransactions);
      setFilteredTransactions(res.data.transactions || mockTransactions);
    } catch (error) {
      console.log("Error fetching transactions:", error);
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;

    // Filter by status
    if (transactionFilter !== "All") {
      filtered = filtered.filter((t) => t.status === transactionFilter);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.product?.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.transacID?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [transactionFilter, searchQuery, transactions]);

  // Stats
  const totalTransactions = transactions.length;
  const pendingCount = transactions.filter((t) => t.status === "Pending").length;
  const acceptedCount = transactions.filter((t) => t.status === "Accepted").length;
  const totalBottles = transactions.reduce((acc, t) => acc + (t.bottlesTraded || 0), 0);

  // Handle status update
  const handleStatusUpdate = (transacID, newStatus) => {
    setTransactions(
      transactions.map((t) =>
        t.transacID === transacID ? { ...t, status: newStatus } : t
      )
    );
    showNotification("success", `Transaction ${newStatus.toLowerCase()}!`);
    setIsViewModalOpen(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-8">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-6 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-noto text-white text-2xl md:text-3xl font-bold">
                  Transaction Management
                </h1>
                <p className="text-green-200/70 text-sm">
                  Review and manage eco-trades 💼
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
                <p className="text-white/80 text-sm">Total Transactions</p>
                <p className="text-white text-3xl font-bold">{totalTransactions}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Receipt className="w-8 h-8 text-white" />
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
                <p className="text-white/80 text-sm">Accepted</p>
                <p className="text-white text-3xl font-bold">{acceptedCount}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0d3d0d] to-[#0d2d0d] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Bottles Traded</p>
                <p className="text-white text-3xl font-bold">{totalBottles.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Recycle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
            <ShoppingBag size={22} className="text-green-400" />
            Trade Transactions
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-[#0d2818] text-white placeholder-green-400/40 
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
                {transactionFilter}
                <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
              {isFilterOpen && (
                <div className="absolute top-full mt-2 right-0 w-36 bg-[#0d2818] rounded-xl 
                  border border-[#1a3d1a] shadow-xl z-20 overflow-hidden">
                  {["All", "Pending", "Accepted", "Rejected"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setTransactionFilter(filter);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#132d13] transition-colors
                        ${transactionFilter === filter ? "bg-green-600 text-white" : "text-green-300/80"}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#132d13]/80">
                  <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Transaction</th>
                  <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">User</th>
                  <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Product</th>
                  <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Bottles</th>
                  <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Date</th>
                  <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Status</th>
                  <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, i) => (
                  <tr key={i} className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#1a5c1a]/30 rounded-lg">
                          <Receipt size={18} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">#{transaction.transacID?.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] 
                          flex items-center justify-center text-white font-semibold text-sm">
                          {transaction.user?.fullname?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.user?.fullname}</p>
                          <p className="text-green-400/50 text-xs">{transaction.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0a1f0a] overflow-hidden">
                          {transaction.product?.img ? (
                            <img src={transaction.product.img} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={16} className="text-green-500/50" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.product?.product}</p>
                          <p className="text-green-400/50 text-xs">{transaction.product?.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Recycle size={14} className="text-green-400" />
                        <span className="text-white font-semibold">{transaction.bottlesTraded?.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-green-300/80 text-sm">{transaction.date}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(transaction.status)}`}>
                        {transaction.status === "Accepted" && <CheckCircle2 size={12} className="inline mr-1" />}
                        {transaction.status === "Pending" && <Clock size={12} className="inline mr-1" />}
                        {transaction.status === "Rejected" && <XCircle size={12} className="inline mr-1" />}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setIsViewModalOpen(true);
                          }}
                          className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        {transaction.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(transaction.transacID, "Accepted")}
                              className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(transaction.transacID, "Rejected")}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <Receipt size={48} className="mx-auto text-[#1a3d1a] mb-3" />
                <p className="text-green-400/50">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Transaction Modal */}
      {isViewModalOpen && selectedTransaction && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div 
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-lg border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1a3d1a]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a5c1a]/30 rounded-xl">
                    <Receipt size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">Transaction Details</h3>
                    <p className="text-green-400/50 text-sm">#{selectedTransaction.transacID}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-[#132d13] rounded-lg transition-colors"
                >
                  <X size={20} className="text-green-400/70" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle(selectedTransaction.status)}`}>
                  {selectedTransaction.status === "Accepted" && <CheckCircle2 size={14} className="inline mr-1" />}
                  {selectedTransaction.status === "Pending" && <Clock size={14} className="inline mr-1" />}
                  {selectedTransaction.status === "Rejected" && <XCircle size={14} className="inline mr-1" />}
                  {selectedTransaction.status}
                </span>
              </div>

              {/* User Info */}
              <div className="bg-[#132d13]/50 rounded-xl p-4">
                <h4 className="text-green-400/60 text-sm mb-3 flex items-center gap-2">
                  <User size={16} />
                  Customer Information
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] 
                    flex items-center justify-center text-white font-semibold">
                    {selectedTransaction.user?.fullname?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{selectedTransaction.user?.fullname}</p>
                    <p className="text-green-400/50 text-sm">{selectedTransaction.user?.email}</p>
                    <p className="text-green-400/50 text-sm">{selectedTransaction.user?.contact}</p>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-[#132d13]/50 rounded-xl p-4">
                <h4 className="text-green-400/60 text-sm mb-3 flex items-center gap-2">
                  <Package size={16} />
                  Product Details
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#0a1f0a] overflow-hidden">
                    {selectedTransaction.product?.img && (
                      <img src={selectedTransaction.product.img} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{selectedTransaction.product?.product}</p>
                    <p className="text-green-400/50 text-sm">Material: {selectedTransaction.product?.material}</p>
                  </div>
                </div>
              </div>

              {/* Trade Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a5c1a]/10 rounded-xl p-4 border border-[#1a3d1a]">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <Recycle size={16} />
                    <span className="text-sm">Bottles Traded</span>
                  </div>
                  <p className="text-white text-2xl font-bold">{selectedTransaction.bottlesTraded?.toLocaleString()}</p>
                </div>
                <div className="bg-[#1a4d1a]/10 rounded-xl p-4 border border-[#1a3d1a]">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <Clock size={16} />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="text-white text-lg font-semibold">{selectedTransaction.date}</p>
                </div>
              </div>

              {/* Actions */}
              {selectedTransaction.status === "Pending" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedTransaction.transacID, "Accepted")}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl 
                      font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check size={18} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedTransaction.transacID, "Rejected")}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl 
                      font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg
          flex items-center gap-2 animate-bounce
          ${notification.type === "success" ? "bg-emerald-500" : "bg-red-500"} text-white`}>
          {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
