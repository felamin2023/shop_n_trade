"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

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
      exchange: "10, 000 water bottles",
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
    <div className=" flex justify-center items-center gap-[50px] h-screen w-full">
      <div className="flex flex-col items-center justify-start h-fit w-[45%] ">
        <h1 className="font-noto text-black text-[30px] font-medium">
          Available Products
        </h1>
        <div className="grid grid-cols-4 gap-[10px] w-[100%] ">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center py-[5px] border-[1px] border-black text-black"
            >
              <h3 className="font-noto text-black">{product.name}</h3>
              <div
                className="w-[100px] h-[100px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${product.image})`,
                }}
              ></div>

              <p className="text-[14px]">{product.exchange}</p>
              <div className="flex flex-col items-center w-full">
                <p className="text-[14px]">stock: {product.stock}</p>
                <button className="py-[2px] w-[80%] bg-[#588027] rounded-[5px] text-white text-[13px]">
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[30px] h-[93.5%] w-[30%] ">
        <p className="font-noto text-black text-[30px] font-medium">Pictures</p>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
}
