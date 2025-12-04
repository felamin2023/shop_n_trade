"use client";

import { useState, useEffect } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import {
  Leaf,
  Recycle,
  Droplets,
  X,
  Package,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Upload,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Pagination logic - filter out products with 0 stock
  const availableProducts = products.filter((product) => product.stock > 0);
  const totalPages = Math.ceil(availableProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = availableProducts.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        if (data.status === 200 && data.product) {
          setProducts(data.product);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const openRequestModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedStation(null);
    setSelectedDate("");
    setSelectedTime("");
    setUploadedFiles([]);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = files.slice(0, 5 - uploadedFiles.length).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleFinalConfirm = async () => {
    if (!user || !selectedProduct) return;

    setIsSubmitting(true);

    try {
      // Upload images to Supabase storage
      const imageUrls = [];
      const BUCKET_NAME = "transaction"; // lowercase bucket name

      for (const fileObj of uploadedFiles) {
        const file = fileObj.file;
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.userID}_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;

        // Upload file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        // Get the public URL for the uploaded file
        const {
          data: { publicUrl },
        } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

        console.log("Image uploaded successfully:", publicUrl);
        imageUrls.push(publicUrl);
      }

      // Ensure we have at least one image uploaded
      if (imageUrls.length === 0) {
        throw new Error("No images were uploaded successfully");
      }

      // Create transaction in database with image URLs
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productID: selectedProduct.productID,
          userID: user.userID,
          images: imageUrls, // Array of image URLs from Supabase
          scheduledDate: selectedDate,
          scheduledTime: selectedTime,
        }),
      });

      const data = await response.json();

      if (data.status === 201) {
        console.log("Transaction created successfully:", data.transaction);
        closeConfirmModal();
        closeRequestModal();
        setIsSuccessModalOpen(true);
      } else {
        console.error("Failed to create transaction:", data.message);
        alert("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert products to testimonials format for AnimatedTestimonials component
  const testimonials = products.map((product) => ({
    name: product.product,
    src: product.img,
  }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-24">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-8 px-4 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-green-300" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              Shop & Trade
            </h1>
            <Recycle className="w-8 h-8 text-green-300" />
          </div>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Turn your recyclables into rewards! Trade plastic bottles for
            amazing products and help save our planet, one bottle at a time. 🌍
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 bg-[#f5f5f0] backdrop-blur-sm rounded-full px-4 py-2">
              <Droplets className="w-5 h-5 text-[#0d3d0d]" />
              <span className="text-[#0d3d0d] text-sm font-medium">
                50,000+ bottles recycled
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-center items-stretch gap-8">
        {/* Products Section */}
        <div className="flex flex-col items-center w-full lg:w-[60%]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-[#0d3d0d] rounded-full"></div>
            <h2 className="font-noto text-white text-2xl md:text-3xl font-semibold">
              🎁 Available Rewards
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-[#0d3d0d] to-green-500 rounded-full"></div>
          </div>

          {/* Fixed height container for consistent pagination position (8 cards = 2 rows of 4) */}
          <div className="min-h-[520px] w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {isLoadingProducts ? (
                <div className="col-span-full flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
                </div>
              ) : availableProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-green-400">
                  No products available at the moment.
                </div>
              ) : (
                paginatedProducts.map((product) => (
                  <div
                    key={product.productID}
                    className="group relative flex flex-col justify-between items-center p-4 
                  bg-white rounded-2xl shadow-md hover:shadow-xl 
                  border border-gray-100 hover:border-green-400
                  transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Stock Badge */}
                    <div
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                  text-white text-xs font-bold px-2 py-1 rounded-full shadow-md border border-[#2a7c2a]"
                    >
                      {product.stock} left
                    </div>

                    {/* Product Image */}
                    <div
                      className="w-full h-28 bg-cover bg-center rounded-xl mb-3 
                    group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${product.img})`,
                      }}
                    ></div>

                    {/* Product Info */}
                    <div className="text-center w-full">
                      <h3 className="font-noto text-gray-800 font-semibold text-sm mb-1 truncate">
                        {product.product}
                      </h3>
                      <div className="flex items-center justify-center gap-1 text-green-600 mb-3">
                        <Recycle className="w-3 h-3" />
                        <p className="text-xs font-medium">
                          {product.materialGoal.toLocaleString()}{" "}
                          {product.material}
                        </p>
                      </div>

                      <button
                        onClick={() => openRequestModal(product)}
                        className="w-full py-2 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                    hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                    rounded-xl text-white text-sm font-semibold
                    transform transition-all duration-200 hover:scale-105
                    shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <Leaf className="w-4 h-4" />
                        Request
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination Controls - Always visible when there are available products */}
          {!isLoadingProducts && availableProducts.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-6 w-full">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1 || totalPages <= 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm
                  transition-all duration-300 border
                  ${
                    currentPage === 1 || totalPages <= 1
                      ? "bg-white/50 border-gray-200 text-gray-300 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-600"
                  }`}
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl border border-gray-200">
                <span className="text-gray-700 font-medium text-sm">
                  {currentPage} / {totalPages || 1}
                </span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages <= 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm
                  transition-all duration-300 border
                  ${
                    currentPage === totalPages || totalPages <= 1
                      ? "bg-white/50 border-gray-200 text-gray-300 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-600"
                  }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Featured Section */}
        <div className="flex flex-col items-center w-full lg:w-[35%] relative z-10">
          <div className="bg-white rounded-3xl shadow-lg p-6 w-full border border-gray-100 flex flex-col">
            <div className="flex items-center gap-2 justify-center mb-4">
              <span className="text-2xl">✨</span>
              <h3 className="font-noto text-gray-800 text-xl font-semibold">
                Featured Items
              </h3>
            </div>
            <div className="w-full h-[380px]">
              {isLoadingProducts || testimonials.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                </div>
              ) : (
                <AnimatedTestimonials
                  testimonials={testimonials}
                  autoplay={true}
                />
              )}
            </div>

            {/* Eco Tips Card */}
            <div className="mt-4 bg-green-50 rounded-2xl p-4 border border-green-100">
              <h4 className="font-noto text-green-700 font-semibold text-sm mb-2 flex items-center gap-2">
                <span>🌱</span> Eco Tip of the Day
              </h4>
              <p className="text-green-600/80 text-xs leading-relaxed">
                Did you know? Recycling one plastic bottle saves enough energy
                to power a light bulb for 3 hours! Keep collecting and make a
                difference! 💚
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeRequestModal}
        >
          <div
            className="bg-[#0d2818] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedProduct.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818] to-transparent"></div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeRequestModal}
                className="absolute top-4 right-4 p-2 bg-[#0d2818]/50 backdrop-blur-sm rounded-full
                  hover:bg-[#0d2818]/80 transition-colors border border-[#1a3d1a]"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Product Name Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="font-noto text-white text-2xl font-bold">
                  {selectedProduct.product}
                </h2>
                <div className="flex items-center gap-2 text-green-400 mt-1">
                  <Recycle size={16} />
                  <span className="text-sm font-medium">
                    {selectedProduct.materialGoal.toLocaleString()}{" "}
                    {selectedProduct.material}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Stock Info */}
              <div className="flex items-center gap-3 p-3 bg-[#132d13] rounded-xl border border-[#1a3d1a] mb-4">
                <div className="p-2 bg-[#1a3d1a] rounded-lg">
                  <Package size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-green-500/50 text-xs">Available Stock</p>
                  <p className="text-white font-bold">
                    {selectedProduct.stock} items
                  </p>
                </div>
              </div>

              {/* Request Info */}
              <div className="bg-[#0a1f0a] rounded-xl p-4 mb-6 border border-[#1a3d1a]">
                <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  How to claim this reward
                </h4>
                <ul className="text-white text-xs space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">1.</span>
                    <span>Collect the required number of water bottles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">2.</span>
                    <span>
                      Bring them to our collection center for verification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">3.</span>
                    <span>Once verified, your request will be processed</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeRequestModal}
                  className="flex-1 py-3 px-4 bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-xl text-green-400 font-semibold transition-colors border border-[#1a3d1a]"
                >
                  Cancel
                </button>
                <button
                  onClick={openConfirmModal}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                    hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                    rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                    transition-all flex items-center justify-center gap-2"
                >
                  <Leaf size={18} />
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeConfirmModal}
        >
          <div
            className="bg-[#0d2818] rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 pb-4">
              {/* Close Button */}
              <button
                onClick={closeConfirmModal}
                className="absolute top-4 right-4 p-2 bg-[#132d13] rounded-full
                  hover:bg-[#1a3d1a] transition-colors border border-[#1a3d1a]"
              >
                <X size={18} className="text-green-400" />
              </button>

              <h2 className="font-noto text-white text-xl font-bold">
                Schedule Your Drop-off
              </h2>
              <p className="text-green-400/70 text-sm mt-1">
                Choose a collection station and select your preferred date &
                time
              </p>
            </div>

            {/* Modal Body */}
            <div className="px-6 pb-6">
              {/* Product Summary */}
              <div className="flex items-center gap-3 p-3 bg-[#132d13] rounded-xl border border-[#1a3d1a] mb-5">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#1a3d1a]">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedProduct.img})` }}
                  ></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-noto text-white font-semibold text-sm">
                    {selectedProduct.product}
                  </h3>
                  <div className="flex items-center gap-1 text-green-400/70 mt-0.5">
                    <Recycle size={12} />
                    <span className="text-xs">
                      {selectedProduct.materialGoal.toLocaleString()}{" "}
                      {selectedProduct.material}
                    </span>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
                  <Upload size={16} className="text-green-400" />
                  Upload Proof of Bottles ({uploadedFiles.length}/5)
                </label>

                {/* Upload Button - Only show when no files uploaded */}
                {uploadedFiles.length === 0 && (
                  <div
                    className="relative p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                      bg-[#0a1f0a] border-[#1a3d1a] hover:border-green-500/50"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#1a3d1a] flex items-center justify-center">
                        <Upload size={20} className="text-green-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">
                          Click to upload images
                        </p>
                        <p className="text-green-400/70 text-xs mt-1">
                          PNG, JPG up to 10MB (max 5 images)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Previews - Facebook Style Grid */}
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedFiles.slice(0, 3).map((fileObj, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#1a3d1a] group"
                      >
                        <img
                          src={fileObj.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full 
                            opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}

                    {/* Show remaining images or + button */}
                    {uploadedFiles.length > 3 ? (
                      <div className="col-span-3 grid grid-cols-3 gap-2 mt-0">
                        {uploadedFiles.slice(3, 5).map((fileObj, index) => (
                          <div
                            key={index + 3}
                            className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#1a3d1a] group"
                          >
                            <img
                              src={fileObj.preview}
                              alt={`Preview ${index + 4}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => removeFile(index + 3)}
                              className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full 
                                opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X size={14} className="text-white" />
                            </button>
                          </div>
                        ))}

                        {/* Add More Button */}
                        {uploadedFiles.length < 5 && (
                          <div
                            className="relative aspect-square rounded-xl border-2 border-dashed border-[#1a3d1a] 
                            hover:border-green-500/50 bg-[#0a1f0a] cursor-pointer transition-all
                            flex items-center justify-center"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleFileUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-1">
                              <Plus size={24} className="text-green-400" />
                              <span className="text-green-400/70 text-xs">
                                Add
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      uploadedFiles.length < 5 &&
                      uploadedFiles.length > 0 && (
                        /* Add More Button when less than 3 images */
                        <div
                          className="relative aspect-square rounded-xl border-2 border-dashed border-[#1a3d1a] 
                        hover:border-green-500/50 bg-[#0a1f0a] cursor-pointer transition-all
                        flex items-center justify-center"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center gap-1">
                            <Plus size={24} className="text-green-400" />
                            <span className="text-green-400/70 text-xs">
                              Add
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* When to Visit Section */}
              <div className="mb-3">
                <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-green-400" />
                  When would you like to visit?
                </h4>
                <p className="text-green-400/70 text-xs mt-1">
                  Select your preferred date and time to drop off your bottles
                </p>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Date Picker */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                    <Calendar size={16} className="text-green-400" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 bg-[#0a1f0a] border border-[#1a3d1a] rounded-xl
                      text-white text-sm focus:outline-none focus:border-green-500
                      [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                {/* Time Picker */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                    <Clock size={16} className="text-green-400" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 bg-[#0a1f0a] border border-[#1a3d1a] rounded-xl
                      text-white text-sm focus:outline-none focus:border-green-500
                      [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="bg-[#132d13] rounded-xl p-3 mb-6 border border-[#1a3d1a]">
                <p className="text-white text-xs text-center">
                  Please upload a clear photo of your collected bottles for
                  verification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeConfirmModal}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-xl text-green-400 font-semibold transition-colors border border-[#1a3d1a]
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Go Back
                </button>
                <button
                  onClick={handleFinalConfirm}
                  disabled={
                    uploadedFiles.length === 0 ||
                    !selectedDate ||
                    !selectedTime ||
                    isSubmitting
                  }
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold shadow-md
                    transition-all flex items-center justify-center gap-2
                    ${
                      uploadedFiles.length > 0 &&
                      selectedDate &&
                      selectedTime &&
                      !isSubmitting
                        ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] hover:from-[#1a4d1a] hover:to-[#0d2d0d] text-white hover:shadow-lg"
                        : "bg-[#1a3d1a]/50 text-green-500/50 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Confirm Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="bg-[#0d2818] rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-[#1a3d1a] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle2 size={40} className="text-white" />
              </div>

              {/* Success Message */}
              <h2 className="font-noto text-white text-2xl font-bold mb-3">
                Request Submitted!
              </h2>
              <p className="text-green-400/80 text-sm mb-6 leading-relaxed">
                Your request has been submitted successfully. You will be
                notified once it's reviewed by our team.
              </p>

              {/* Info Box */}
              <div className="bg-[#132d13] rounded-xl p-4 mb-6 border border-[#1a3d1a] text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1a3d1a] rounded-lg flex-shrink-0">
                    <Calendar size={16} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-400/60 text-xs">What's next?</p>
                    <p className="text-green-300 text-sm">
                      Please bring your items to the collection center on your
                      scheduled date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                  hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                  rounded-xl text-white font-semibold shadow-md hover:shadow-lg
                  transition-all flex items-center justify-center gap-2"
              >
                <Leaf size={18} />
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
