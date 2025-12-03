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
  Truck,
  Ban,
} from "lucide-react";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionFilter, setTransactionFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState({
    transacID: null,
    status: null,
  });
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(
      () => setNotification({ show: false, type: "", message: "" }),
      3000
    );
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/transaction");
      const data = await res.json();
      if (data.status === 200 && data.transactions) {
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions);
      } else {
        setTransactions([]);
        setFilteredTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
      setFilteredTransactions([]);
    } finally {
      setLoading(false);
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
      filtered = filtered.filter(
        (t) => t.status === transactionFilter.toUpperCase()
      );
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.product?.product
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          t.transacID?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [transactionFilter, searchQuery, transactions]);

  // Stats
  const totalTransactions = transactions.length;
  const pendingCount = transactions.filter(
    (t) => t.status === "PENDING"
  ).length;
  const acceptedCount = transactions.filter(
    (t) => t.status === "ACCEPTED"
  ).length;
  const totalBottles = transactions
    .filter((t) => t.status === "DELIVERED")
    .reduce((acc, t) => acc + (t.product?.materialGoal || 0), 0);

  // Open confirmation modal
  const openConfirmModal = (transacID, status) => {
    setConfirmAction({ transacID, status });
    setIsConfirmModalOpen(true);
  };

  // Handle confirmed status update
  const handleConfirmedStatusUpdate = async () => {
    if (!confirmAction.transacID || !confirmAction.status) return;

    await handleStatusUpdate(confirmAction.transacID, confirmAction.status);
    setIsConfirmModalOpen(false);
    setConfirmAction({ transacID: null, status: null });
  };

  // Handle status update
  const handleStatusUpdate = async (transacID, newStatus) => {
    try {
      setUpdating(true);
      const res = await fetch("/api/transaction", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transacID, status: newStatus }),
      });

      const data = await res.json();

      if (data.status === 200) {
        setTransactions(
          transactions.map((t) =>
            t.transacID === transacID ? { ...t, status: newStatus } : t
          )
        );
        showNotification("success", `Transaction ${newStatus.toLowerCase()}!`);
      } else {
        showNotification("error", "Failed to update transaction");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      showNotification("error", "Failed to update transaction");
    } finally {
      setUpdating(false);
    }
    setIsViewModalOpen(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "REJECTED":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "DELIVERED":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "CANCELED":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
                <p className="text-white text-3xl font-bold">
                  {totalTransactions}
                </p>
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
                <p className="text-white text-3xl font-bold">
                  {totalBottles.toLocaleString()}
                </p>
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
                  {[
                    "All",
                    "Pending",
                    "Accepted",
                    "Rejected",
                    "Delivered",
                    "Canceled",
                  ].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setTransactionFilter(filter);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#132d13] transition-colors
                        ${
                          transactionFilter === filter
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

        {/* Transactions Table */}
        <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#132d13]/80">
                  <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">
                    Product
                  </th>
                  <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">
                    Proof
                  </th>
                  <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">
                    Material Goal
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
                    <td colSpan="6" className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-green-400/60">
                          Loading transactions...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <Receipt
                        size={48}
                        className="mx-auto text-[#1a3d1a] mb-3"
                      />
                      <p className="text-green-400/50">No transactions found</p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction, i) => (
                    <tr
                      key={i}
                      className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] 
                          flex items-center justify-center text-white font-semibold text-sm"
                          >
                            {transaction.user?.fullname?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {transaction.user?.fullname}
                            </p>
                            <p className="text-green-400/50 text-xs">
                              {transaction.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#0a1f0a] overflow-hidden">
                            {transaction.product?.img ? (
                              <img
                                src={transaction.product.img}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package
                                  size={16}
                                  className="text-green-500/50"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {transaction.product?.product}
                            </p>
                            <p className="text-green-400/50 text-xs">
                              {transaction.product?.material}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center">
                          {transaction.images &&
                          transaction.images.length > 0 ? (
                            <div className="relative">
                              <div
                                className="w-12 h-12 rounded-lg bg-[#0a1f0a] overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
                                onClick={() => {
                                  setSelectedTransaction(transaction);
                                  setIsViewModalOpen(true);
                                }}
                              >
                                <img
                                  src={transaction.images[0]}
                                  alt="Proof"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {transaction.images.length > 1 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                  +{transaction.images.length - 1}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-green-400/40 text-xs">
                              No proof
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Recycle size={14} className="text-green-400" />
                          <span className="text-white font-semibold">
                            {transaction.product?.materialGoal?.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                            transaction.status
                          )}`}
                        >
                          {transaction.status === "ACCEPTED" && (
                            <CheckCircle2 size={12} className="inline mr-1" />
                          )}
                          {transaction.status === "PENDING" && (
                            <Clock size={12} className="inline mr-1" />
                          )}
                          {transaction.status === "REJECTED" && (
                            <XCircle size={12} className="inline mr-1" />
                          )}
                          {transaction.status === "DELIVERED" && (
                            <Truck size={12} className="inline mr-1" />
                          )}
                          {transaction.status === "CANCELED" && (
                            <Ban size={12} className="inline mr-1" />
                          )}
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
                          {transaction.status === "PENDING" && (
                            <>
                              <button
                                onClick={() =>
                                  openConfirmModal(
                                    transaction.transacID,
                                    "ACCEPTED"
                                  )
                                }
                                className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                title="Accept"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  openConfirmModal(
                                    transaction.transacID,
                                    "REJECTED"
                                  )
                                }
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                          {transaction.status === "ACCEPTED" && (
                            <>
                              <button
                                onClick={() =>
                                  openConfirmModal(
                                    transaction.transacID,
                                    "DELIVERED"
                                  )
                                }
                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                                title="Mark as Delivered"
                              >
                                <Truck size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  openConfirmModal(
                                    transaction.transacID,
                                    "CANCELED"
                                  )
                                }
                                className="p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
                                title="Cancel"
                              >
                                <Ban size={16} />
                              </button>
                            </>
                          )}
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

      {/* View Transaction Modal */}
      {isViewModalOpen && selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-28 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-lg border border-[#1a3d1a] max-h-[80vh] overflow-y-auto"
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
                    <h3 className="text-white text-lg font-semibold">
                      Transaction Details
                    </h3>
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
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle(
                    selectedTransaction.status
                  )}`}
                >
                  {selectedTransaction.status === "ACCEPTED" && (
                    <CheckCircle2 size={14} className="inline mr-1" />
                  )}
                  {selectedTransaction.status === "PENDING" && (
                    <Clock size={14} className="inline mr-1" />
                  )}
                  {selectedTransaction.status === "REJECTED" && (
                    <XCircle size={14} className="inline mr-1" />
                  )}
                  {selectedTransaction.status === "DELIVERED" && (
                    <Truck size={14} className="inline mr-1" />
                  )}
                  {selectedTransaction.status === "CANCELED" && (
                    <Ban size={14} className="inline mr-1" />
                  )}
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
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] 
                    flex items-center justify-center text-white font-semibold"
                  >
                    {selectedTransaction.user?.fullname?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {selectedTransaction.user?.fullname}
                    </p>
                    <p className="text-green-400/50 text-sm">
                      {selectedTransaction.user?.email}
                    </p>
                    <p className="text-green-400/50 text-sm">
                      {selectedTransaction.user?.contact}
                    </p>
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
                      <img
                        src={selectedTransaction.product.img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {selectedTransaction.product?.product}
                    </p>
                    <p className="text-green-400/50 text-sm">
                      Material: {selectedTransaction.product?.material}
                    </p>
                  </div>
                </div>
              </div>

              {/* Proof Images */}
              <div className="bg-[#132d13]/50 rounded-xl p-4">
                <h4 className="text-green-400/60 text-sm mb-3 flex items-center gap-2">
                  <Eye size={16} />
                  Proof of Collection ({selectedTransaction.images?.length ||
                    0}{" "}
                  images)
                </h4>
                {selectedTransaction.images &&
                selectedTransaction.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedTransaction.images.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-[#0a1f0a] overflow-hidden"
                      >
                        <img
                          src={imgUrl}
                          alt={`Proof ${index + 1}`}
                          className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(imgUrl, "_blank")}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-xl bg-[#0a1f0a] flex items-center justify-center">
                    <div className="text-center">
                      <AlertCircle
                        size={32}
                        className="mx-auto text-yellow-500/50 mb-2"
                      />
                      <p className="text-yellow-400/60 text-sm">
                        No proof images uploaded
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Trade Info */}
              <div className="bg-[#1a5c1a]/10 rounded-xl p-4 border border-[#1a3d1a]">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                  <Recycle size={16} />
                  <span className="text-sm">Material Goal</span>
                </div>
                <p className="text-white text-2xl font-bold">
                  {selectedTransaction.product?.materialGoal?.toLocaleString()}{" "}
                  bottles
                </p>
              </div>

              {/* Actions */}
              {selectedTransaction.status === "PENDING" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openConfirmModal(
                        selectedTransaction.transacID,
                        "ACCEPTED"
                      );
                    }}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl 
                      font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check size={18} />
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openConfirmModal(
                        selectedTransaction.transacID,
                        "REJECTED"
                      );
                    }}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl 
                      font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}
              {selectedTransaction.status === "ACCEPTED" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openConfirmModal(
                        selectedTransaction.transacID,
                        "DELIVERED"
                      );
                    }}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                      font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Truck size={18} />
                    Delivered
                  </button>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openConfirmModal(
                        selectedTransaction.transacID,
                        "CANCELED"
                      );
                    }}
                    className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl 
                      font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Ban size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-sm border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  confirmAction.status === "ACCEPTED"
                    ? "bg-green-500/20"
                    : confirmAction.status === "DELIVERED"
                    ? "bg-blue-500/20"
                    : confirmAction.status === "CANCELED"
                    ? "bg-gray-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {confirmAction.status === "ACCEPTED" && (
                  <CheckCircle2 size={32} className="text-green-400" />
                )}
                {confirmAction.status === "REJECTED" && (
                  <XCircle size={32} className="text-red-400" />
                )}
                {confirmAction.status === "DELIVERED" && (
                  <Truck size={32} className="text-blue-400" />
                )}
                {confirmAction.status === "CANCELED" && (
                  <Ban size={32} className="text-gray-400" />
                )}
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">
                {confirmAction.status === "ACCEPTED" && "Accept Transaction?"}
                {confirmAction.status === "REJECTED" && "Reject Transaction?"}
                {confirmAction.status === "DELIVERED" && "Mark as Delivered?"}
                {confirmAction.status === "CANCELED" && "Cancel Transaction?"}
              </h3>
              <p className="text-green-400/60 mb-6">
                {confirmAction.status === "ACCEPTED" &&
                  "Are you sure you want to accept this transaction? The user will be notified."}
                {confirmAction.status === "REJECTED" &&
                  "Are you sure you want to reject this transaction? This action cannot be undone."}
                {confirmAction.status === "DELIVERED" &&
                  "Mark this transaction as delivered? The bottles will be added to the total count."}
                {confirmAction.status === "CANCELED" &&
                  "Are you sure you want to cancel this transaction? This action cannot be undone."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsConfirmModalOpen(false);
                    setConfirmAction({ transacID: null, status: null });
                  }}
                  disabled={updating}
                  className="flex-1 py-2.5 bg-[#132d13] hover:bg-[#1a3d1a] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmedStatusUpdate}
                  disabled={updating}
                  className={`flex-1 py-2.5 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${
                    confirmAction.status === "ACCEPTED"
                      ? "bg-green-600 hover:bg-green-700"
                      : confirmAction.status === "DELIVERED"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : confirmAction.status === "CANCELED"
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {updating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      {confirmAction.status === "ACCEPTED" && "Accept"}
                      {confirmAction.status === "REJECTED" && "Reject"}
                      {confirmAction.status === "DELIVERED" && "Confirm"}
                      {confirmAction.status === "CANCELED" && "Cancel"}
                    </>
                  )}
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

export default TransactionPage;
