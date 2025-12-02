"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Leaf, Recycle, Droplets } from "lucide-react";

export default function Home() {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-16">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-8 px-4 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-emerald-200" />
            <h1 className="font-noto text-white text-3xl md:text-4xl font-bold">
              Shop & Trade
            </h1>
            <Recycle className="w-8 h-8 text-emerald-200" />
          </div>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Turn your recyclables into rewards! Trade plastic bottles for amazing products 
            and help save our planet, one bottle at a time. 🌍
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
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
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            <h2 className="font-noto text-emerald-800 text-2xl md:text-3xl font-semibold">
              🎁 Available Rewards
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {products.map((product, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between items-center p-4 
                  bg-white rounded-2xl shadow-md hover:shadow-xl 
                  border border-emerald-100 hover:border-emerald-300
                  transition-all duration-300 hover:-translate-y-1"
              >
                {/* Stock Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 
                  text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
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
                  <h3 className="font-noto text-emerald-900 font-semibold text-sm mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-teal-600 mb-3">
                    <Recycle className="w-3 h-3" />
                    <p className="text-xs font-medium">{product.exchange}</p>
                  </div>
                  
                  <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 
                    hover:from-emerald-600 hover:to-teal-600
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
          <div className="bg-white rounded-3xl shadow-lg p-6 w-full border border-emerald-100">
            <div className="flex items-center gap-2 justify-center mb-4">
              <span className="text-2xl">✨</span>
              <h3 className="font-noto text-emerald-800 text-xl font-semibold">
                Featured Items
              </h3>
            </div>
            <div className="w-full min-h-[400px]">
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
            
            {/* Eco Tips Card */}
            <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-noto text-emerald-700 font-semibold text-sm mb-2 flex items-center gap-2">
                <span>🌱</span> Eco Tip of the Day
              </h4>
              <p className="text-emerald-600 text-xs leading-relaxed">
                Did you know? Recycling one plastic bottle saves enough energy to power 
                a light bulb for 3 hours! Keep collecting and make a difference! 💚
              </p>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4 w-full">
            <div className="bg-white rounded-2xl p-4 text-center shadow-md border border-emerald-100">
              <div className="text-2xl mb-1">🌊</div>
              <p className="text-emerald-800 font-bold text-lg">1,234</p>
              <p className="text-emerald-600 text-xs">Bottles Saved Today</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md border border-emerald-100">
              <div className="text-2xl mb-1">🌳</div>
              <p className="text-emerald-800 font-bold text-lg">89</p>
              <p className="text-emerald-600 text-xs">Active Traders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
