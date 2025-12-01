"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("Post");
  const navlinks = [
    { name: "Post", href: "" },
    { name: "Plans", href: "" },
  ];

  const postData = [
    {
      name: "Bug ot Elementary school",
      location: "Lower bug ot",
      donated: 1500,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      name: "CTU argao campus",
      location: "Argao",
      donated: 300,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      name: "Pool Bankal elementary school",
      location: "Pool Bankal Lapu Lapu City",
      donated: 400,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      name: "Sibonga national high school",
      location: "Sibonga",
      donated: 100,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      name: "Greenhills elementary school",
      location: "Greenhills",
      donated: 900,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
    {
      name: "Sangat National High School",
      location: "Sangat",
      donated: 500,
      imgs: [
        "/images/projectPage/post1.png",
        "/images/projectPage/post2.jpg",
        "/images/projectPage/post3.jpg",
      ],
    },
  ];

  const projectData = [
    {
      schoolname: "Bug ot Elementary School",
      location: "Lower Bug ot",
      chairsneeded: 500,
    },
    {
      schoolname: "Pool Bankal Elementary School",
      location: "Pool Bankal Lapu Lapu City",
      chairsneeded: 1000,
    },
    {
      schoolname: "CTU Argao Campus",
      location: "Argao kintanar",
      chairsneeded: 1500,
    },
    {
      schoolname: "Greenhills Elementary School",
      location: "Greenhills",
      chairsneeded: 200,
    },
  ];

  return (
    <div className="h-screen w-[65%] flex items-start justify-center">
      <nav className="rotate-90 origin-left w-[25%] absolute left-[16.5px] translate-y-28">
        <ul className="flex justify-center items-center">
          {navlinks.map((link, i) => (
            <li
              key={i}
              onClick={() => setActiveTab(link.name)}
              className={`text-white w-full text-center cursor-pointer ${
                link.name === "Post"
                  ? "rounded-tl-[50px] bg-black"
                  : "rounded-tr-[50px] bg-black"
              } bg-black py-[5px] ${
                activeTab === link.name
                  ? "bg-black"
                  : link.name === "Post"
                  ? " bg-gradient-to-r from-white to-black "
                  : " bg-gradient-to-r from-black to-white "
              }`}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-1 flex-col h-screen gap-7 justify-start items-center pt-[20px]">
        <div className="flex justify-between items-center  w-[85%]">
          <h1 className="font-noto text-black text-[30px] font-medium">
            Charity School Projects
          </h1>
          <div className="text-black flex justify-between items-center h-fit px-[10px] py-[5px] rounded-[30px] w-[40%] border-[1px] border-black">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder-gray-500"
            />
            <Search color="black" />
          </div>
        </div>
        {activeTab === "Post" ? (
          <ul className="grid grid-cols-3 gap-3 items-start place-items-center">
            {postData.map((data, i) => (
              <li
                key={i}
                className="flex flex-col justify-between w-[90%] h-[100%] p-2 border-[1px] border-black rounded-[5px]"
              >
                <div className="flex flex-col justify-between gap-[3px] h-[45%]">
                  <p className="font-noto text-black">{data.name}</p>
                  <p className="text-black">{data.location}</p>
                  <p className="text-black">Donated: {data.donated}</p>
                </div>
                <ul className="border-[1px] overflow-hidden border-gray-500 rounded-[5px] w-full grid grid-cols-3 gap-2">
                  {/* Big picture in the first column */}
                  <li className="col-span-2">
                    <img
                      src={data.imgs[0]} // First (big) image
                      alt="Main image"
                      className="w-full h-full object-cover"
                    />
                  </li>
                  <div className="flex flex-col gap-1">
                    <li className="h-[50%]">
                      <img
                        src={data.imgs[1]} // Second image (first small image)
                        alt="Secondary image 1"
                        className="w-full h-full object-cover"
                      />
                    </li>
                    <li className="h-[50%]">
                      <img
                        src={data.imgs[2]} // Third image (second small image)
                        alt="Secondary image 2"
                        className="w-full h-full object-cover"
                      />
                    </li>
                  </div>
                  {/* Two smaller pictures in the second column */}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <ul className=" flex flex-col justify-between w-[80%] h-[70%]">
            {projectData.map((data, i) => (
              <li
                key={i}
                className=" text-black bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-[rgba(255,255,255,0.5)] p-2 rounded-[10px]"
              >
                <h1 className="font-bold font-noto">{data.schoolname}</h1>
                <p>Location: {data.location}</p>
                <p>Chair's needed: {data.chairsneeded}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
