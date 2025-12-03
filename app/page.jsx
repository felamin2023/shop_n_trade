"use client";

import { useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Leaf, Recycle, Droplets, X, Package, CheckCircle2, MapPin, Calendar, Clock } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const stations = [
    {
      id: 1,
      name: "EcoCenter Main Hub",
      location: "123 Green Street, Downtown",
      hours: "8:00 AM - 6:00 PM",
    },
    {
      id: 2,
      name: "RecyclePoint Mall",
      location: "SM City Cebu, Ground Floor",
      hours: "10:00 AM - 9:00 PM",
    },
    {
      id: 3,
      name: "GreenDrop Station",
      location: "IT Park, Lahug",
      hours: "9:00 AM - 7:00 PM",
    },
    {
      id: 4,
      name: "EcoHub Express",
      location: "Ayala Center Cebu",
      hours: "10:00 AM - 8:00 PM",
    },
  ];

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
  };

  const handleFinalConfirm = () => {
    // Here you would typically make an API call to submit the request
    console.log("Request submitted for:", selectedProduct?.name);
    console.log("Station:", selectedStation?.name);
    console.log("Date:", selectedDate);
    console.log("Time:", selectedTime);
    closeConfirmModal();
    closeRequestModal();
    // You could also show a success toast/notification here
  };

  const testimonials = [
    {
      name: "Nike T Shirt",
      src: "/images/productPage/NikeTShirt.jpg",
    },
    {
      name: "Rolex Daytona",
      src: "/images/productPage/rolexdaytona.jpg",
    },
    {
      name: "Jordan Nike Air",
      src: "/images/productPage/jordansneakers.jpg",
    },
    {
      name: "Addidas Cap",
      src: "/images/productPage/addidascap.jpg",
    },
    {
      name: "ROG laptop",
      src: "/images/productPage/roglaptop.jpg",
    },
    {
      name: "Nike bag",
      src: "/images/productPage/nikebag.jpg",
    },
    {
      name: "Rash guard",
      src: "/images/productPage/rashguards.jpg",
    },
    {
      name: "Iphone 14 Pro",
      src: "/images/productPage/iphone14pro.jpg",
    },
  ];

  const products = [
    {
      name: "Nike T Shirt",
      exchange: "500 water bottles",
      image: "/images/productPage/NikeTShirt.jpg",
      stock: 10,
    },
    {
      name: "Rolex Daytona",
      exchange: "10,000 water bottles",
      image: "/images/productPage/rolexdaytona.jpg",
      stock: 1,
    },
    {
      name: "Jordan Nike Air",
      exchange: "5000 water bottles",
      image: "/images/productPage/jordansneakers.jpg",
      stock: 1,
    },
    {
      name: "Addidas Cap",
      exchange: "200 water bottles",
      image: "/images/productPage/addidascap.jpg",
      stock: 3,
    },
    {
      name: "ROG laptop",
      exchange: "10,000 water bottles",
      image: "/images/productPage/roglaptop.jpg",
      stock: 1,
    },
    {
      name: "Nike bag",
      exchange: "200 water bottles",
      image: "/images/productPage/nikebag.jpg",
      stock: 10,
    },
    {
      name: "Rash guard",
      exchange: "300 water bottles",
      image: "/images/productPage/rashguards.jpg",
      stock: 5,
    },
    {
      name: "Iphone 14 Pro",
      exchange: "10,000 water bottles",
      image: "/images/productPage/iphone14pro.jpg",
      stock: 1,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-16">
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
            Turn your recyclables into rewards! Trade plastic bottles for amazing products 
            and help save our planet, one bottle at a time. 🌍
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Droplets className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">50,000+ bottles recycled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-center items-start gap-8">
        {/* Products Section */}
        <div className="flex flex-col items-center w-full lg:w-[60%]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-[#0d3d0d] rounded-full"></div>
            <h2 className="font-noto text-white text-2xl md:text-3xl font-semibold">
              🎁 Available Rewards
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-[#0d3d0d] to-green-500 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {products.map((product, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between items-center p-4 
                  bg-white rounded-2xl shadow-md hover:shadow-xl 
                  border border-gray-100 hover:border-green-400
                  transition-all duration-300 hover:-translate-y-1"
              >
                {/* Stock Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                  text-white text-xs font-bold px-2 py-1 rounded-full shadow-md border border-[#2a7c2a]">
                  {product.stock} left
                </div>
                
                {/* Product Image */}
                <div
                  className="w-full h-28 bg-cover bg-center rounded-xl mb-3 
                    group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                ></div>

                {/* Product Info */}
                <div className="text-center w-full">
                  <h3 className="font-noto text-gray-800 font-semibold text-sm mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-3">
                    <Recycle className="w-3 h-3" />
                    <p className="text-xs font-medium">{product.exchange}</p>
                  </div>
                  
                  <button 
                    onClick={() => openRequestModal(product)}
                    className="w-full py-2 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                    hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                    rounded-xl text-white text-sm font-semibold
                    transform transition-all duration-200 hover:scale-105
                    shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <Leaf className="w-4 h-4" />
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Featured Section */}
        <div className="flex flex-col items-center w-full lg:w-[35%] sticky top-4">
          <div className="bg-white rounded-3xl shadow-lg p-6 w-full border border-gray-100">
            <div className="flex items-center gap-2 justify-center mb-4">
              <span className="text-2xl">✨</span>
              <h3 className="font-noto text-gray-800 text-xl font-semibold">
                Featured Items
              </h3>
            </div>
            <div className="w-full min-h-[400px]">
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
            
            {/* Eco Tips Card */}
            <div className="mt-6 bg-green-50 rounded-2xl p-4 border border-green-100">
              <h4 className="font-noto text-green-700 font-semibold text-sm mb-2 flex items-center gap-2">
                <span>🌱</span> Eco Tip of the Day
              </h4>
              <p className="text-green-600/80 text-xs leading-relaxed">
                Did you know? Recycling one plastic bottle saves enough energy to power 
                a light bulb for 3 hours! Keep collecting and make a difference! 💚
              </p>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4 w-full">
            <div className="bg-white rounded-2xl p-4 text-center shadow-md border border-gray-100">
              <div className="text-2xl mb-1">🌊</div>
              <p className="text-gray-800 font-bold text-lg">1,234</p>
              <p className="text-green-600/80 text-xs">Bottles Saved Today</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md border border-gray-100">
              <div className="text-2xl mb-1">🌳</div>
              <p className="text-gray-800 font-bold text-lg">89</p>
              <p className="text-green-600/80 text-xs">Active Traders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {isModalOpen && selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                style={{ backgroundImage: `url(${selectedProduct.image})` }}
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
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2 text-green-400 mt-1">
                  <Recycle size={16} />
                  <span className="text-sm font-medium">{selectedProduct.exchange}</span>
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
                  <p className="text-white font-bold">{selectedProduct.stock} items</p>
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
                    <span>Bring them to our collection center for verification</span>
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
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && selectedProduct && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
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
                Choose a collection station and select your preferred date & time
              </p>
            </div>

            {/* Modal Body */}
            <div className="px-6 pb-6">
              {/* Product Summary */}
              <div className="flex items-center gap-3 p-3 bg-[#132d13] rounded-xl border border-[#1a3d1a] mb-5">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#1a3d1a]">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedProduct.image})` }}
                  ></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-noto text-white font-semibold text-sm">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-1 text-green-400/70 mt-0.5">
                    <Recycle size={12} />
                    <span className="text-xs">{selectedProduct.exchange}</span>
                  </div>
                </div>
              </div>

              {/* Station Selection */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
                  <MapPin size={16} className="text-green-400" />
                  Select Collection Station
                </label>
                <div className="space-y-2">
                  {stations.map((station) => (
                    <div
                      key={station.id}
                      onClick={() => setSelectedStation(station)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-200
                        ${selectedStation?.id === station.id 
                          ? "bg-[#1a3d1a] border-green-500" 
                          : "bg-[#0a1f0a] border-[#1a3d1a] hover:border-green-500/50"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-white font-semibold text-sm">{station.name}</h4>
                          <p className="text-green-400/70 text-xs mt-1">{station.location}</p>
                          <p className="text-green-500/50 text-xs mt-0.5">🕐 {station.hours}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${selectedStation?.id === station.id 
                            ? "border-green-500 bg-green-500" 
                            : "border-green-500/50"
                          }`}>
                          {selectedStation?.id === station.id && (
                            <CheckCircle2 size={12} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    min={new Date().toISOString().split('T')[0]}
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
                  📦 Please bring your bottles to the selected station at your scheduled time for verification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeConfirmModal}
                  className="flex-1 py-3 px-4 bg-[#132d13] hover:bg-[#1a3d1a]
                    rounded-xl text-green-400 font-semibold transition-colors border border-[#1a3d1a]"
                >
                  Go Back
                </button>
                <button
                  onClick={handleFinalConfirm}
                  disabled={!selectedStation || !selectedDate || !selectedTime}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold shadow-md
                    transition-all flex items-center justify-center gap-2
                    ${selectedStation && selectedDate && selectedTime
                      ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] hover:from-[#1a4d1a] hover:to-[#0d2d0d] text-white hover:shadow-lg"
                      : "bg-[#1a3d1a]/50 text-green-500/50 cursor-not-allowed"
                    }`}
                >
                  <CheckCircle2 size={18} />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
