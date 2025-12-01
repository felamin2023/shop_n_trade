"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

const AdminHomepage = () => {
  const [productData, setProductData] = useState([]);
  async function fetchProductData() {
    try {
      const res = await fetch("http://localhost:3000/api/product");
      const data = await res.json();
      setProductData(data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const [allDataProject, setAllDataProject] = useState([]);
  async function fetchAllDataProject() {
    try {
      const res = await fetch("http://localhost:3000/api/project");
      const data = await res.json();
      setAllDataProject(data.project);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllDataProject();
  }, []);

  const [allUser, setAllUser] = useState([]);
  const [dashboardFilter, setDashboardFilter] = useState("user");
  const [tableWidth, setTableWidth] = useState("w-[100%]");

  const allUserData = [
    {
      userId: 1,
      userName: "jovanieF",
      fullName: "Jovanie Felamin Ceballos",
      email: "felaminjovanie@gmail.com",
      address: "Pool Bankal Lapu-Lapu City",
    },
    {
      userId: 2,
      userName: "joshuaB",
      fullName: "Joshua Briones",
      email: "joshuabriones@gmail.com",
      address: "Greenhills",
    },
    {
      userId: 3,
      userName: "ivanB",
      fullName: "Ivan Brigoli",
      email: "ivanbrigoli@gmail.com",
      address: "greenhills",
    },
    {
      userId: 4,
      userName: "albertG",
      fullName: "Albert Guazo",
      email: "albertguazo@gmail.com",
      address: "Nangkaan",
    },
  ];

  const allProjectData = [
    {
      projectId: 1,
      school: "Bug-ot Elementary School",
      location: "Bug-ot lower",
      chairsneeded: 200,
      status: "Pending",
    },
    {
      projectId: 2,
      school: "Bankal Elementary School",
      location: "Pool Bankal Lapu-Lapu City",
      chairsneeded: 1500,
      status: "Done",
    },
    {
      projectId: 3,
      school: "Greenhills Elementary School",
      location: "Greenhills",
      chairsneeded: 300,
      status: "Pending",
    },
    {
      projectId: 4,
      school: "Argao National High School",
      location: "Argao",
      chairsneeded: 700,
      status: "Done",
    },
  ];

  const allProductData = [
    {
      productId: 1,
      product: "Nike T Shirt",
      tradeItem: "500 water bottles",
      stock: 10,
    },
    {
      productId: 2,
      product: "Rolex Daytona",
      tradeItem: "10, 000 water bottles",
      stock: 1,
    },
    {
      productId: 3,
      product: "Jordan Nike Air",
      tradeItem: "5000 water bottles",
      stock: 1,
    },
    {
      productId: 4,
      product: "Addidas Cap",
      tradeItem: "200 water bottles",
      stock: 3,
    },
  ];

  async function fetchAllUsers() {
    try {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      setAllUser(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const scrollableDiv = document.querySelector(".overflow-y-auto");

    if (scrollableDiv) {
      const hasScrollbar =
        scrollableDiv.scrollHeight > scrollableDiv.clientHeight;
      if (hasScrollbar) {
        setTableWidth("w-[90%]");
      } else {
        setTableWidth("w-[91.1%]");
      }
    }
  }, [allUser]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(allUser);
  const allUsersCount = allUser.length;
  const allProjectCount = allProjectData.length;
  const allProductCount = allProductData.length;

  const pendingProjectCount = allProjectData.filter(
    (project) => project.status === "Pending"
  ).length;
  const doneProjectCount = allProjectData.filter(
    (project) => project.status === "Done"
  ).length;

  const [recordFilter, setRecordFilter] = useState("All");

  const filteredData = allProjectData.filter((data) => {
    if (recordFilter === "All") return true;
    return data.status === recordFilter;
  });

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start pt-6 gap-3">
      <h1 className="text-black font-noto font-bold text-[35px]">DASHBOARD</h1>
      <div className="w-1/2 h-[13%] flex justify-between">
        <button
          onClick={() => setDashboardFilter("user")}
          className="w-[30%] h-full border-[1px] border-black rounded-[10px] text-black font-bold"
        >
          User: {allUsersCount}
        </button>
        <button
          onClick={() => setDashboardFilter("project")}
          className="w-[30%] h-full border-[1px] border-black rounded-[10px] text-black font-bold"
        >
          Project: {allProjectCount}
        </button>
        <button
          onClick={() => setDashboardFilter("product")}
          className="w-[30%] h-full border-[1px] border-black rounded-[10px] text-black font-bold"
        >
          Product: {allProductCount}
        </button>
      </div>
      <div className="flex justify-between items-center  w-1/2">
        <h1 className="font-noto text-black text-[30px] font-medium">
          {dashboardFilter === "user"
            ? "Users"
            : dashboardFilter === "project"
            ? "Projects"
            : "Products"}
        </h1>
        <div className=" text-black flex justify-between items-center h-fit px-[10px] py-[5px] rounded-[30px] w-[60%] border-[1px] border-black">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white placeholder-gray-500"
          />
          <Search color="black" />
        </div>
        {dashboardFilter === "project" && (
          <MenuRoot>
            <MenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-white bg-black w-[15%] "
              >
                {recordFilter === "All"
                  ? "All"
                  : recordFilter === "Pending"
                  ? "Pending"
                  : "Done"}
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => setRecordFilter("All")} value="new-win">
                All
              </MenuItem>

              <MenuItem
                onClick={() => setRecordFilter("Pending")}
                value="new-txt"
              >
                Pending
              </MenuItem>
              <MenuItem
                onClick={() => setRecordFilter("Done")}
                value="new-file"
              >
                Done
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        )}
      </div>
      <div className="w-[100%] flex flex-col justify-center items-center">
        {dashboardFilter === "project" && (
          <div className="flex justify-left gap-4 items-center w-[80%] text-black">
            <h1>All: {allProjectCount}</h1>
            <h1>Pending: {pendingProjectCount}</h1>
            <h1>Done: {doneProjectCount}</h1>
          </div>
        )}

        {dashboardFilter === "user" ? (
          <>
            <table className={tableWidth}>
              <thead>
                <tr className="bg-[#808080] text-white">
                  <th className="text-center py-3 border-[1px] w-[9.9%] border-white">
                    User ID
                  </th>
                  <th className="text-center py-3 border-[1px] w-[15.9%] border-white">
                    Full Name
                  </th>
                  <th className="text-center py-3 border-[1px] w-[11.12%] border-white">
                    Contact
                  </th>
                  <th className="text-center py-3 border-[1px] w-[27%] border-white">
                    Email
                  </th>
                  <th className="text-center py-3 border-[1px] w-[27.4%] border-white">
                    Address
                  </th>
                  <th className="text-center py-3 px-2 border-[1px] w-[8.67%] border-white">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
            <div className="h-[260px] overflow-y-auto w-[91.1%] ">
              <table className="table-auto w-[100%] ">
                <tbody>
                  {allUser.map((data, i) => (
                    <tr key={i} className="border-b-[1px]  border-black">
                      <td className="text-center py-4 text-black  w-[9.9%]  ">
                        {data.userID.slice(0, 8)}
                      </td>
                      <td className="text-center py-4 text-black  w-[15.9%] ">
                        {data.fullname}
                      </td>
                      <td className="text-center py-4 text-black  w-[11.12%] ">
                        {data.contact}
                      </td>
                      <td className="text-center py-4 text-black w-[27%] ">
                        {data.email}
                      </td>
                      <td className="text-center py-4 text-black w-[27.4%] ">
                        {data.address}
                      </td>
                      <td className="text-center py-4 px-2 text-black  w-[8.67%] ">
                        <button className="bg-[#FF0000] text-white w-[100%] rounded-[5px]">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : dashboardFilter === "project" ? (
          <table className=" w-[80%]">
            <thead>
              <tr className="bg-[#808080] text-white ">
                <th className="text-center py-3">Project ID</th>
                <th className="text-center py-3">School</th>
                <th className="text-center py-3">Location</th>
                <th className="text-center py-3">Chair's needed</th>
                <th className="text-center py-3">Status</th>
                <th className="text-center py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allDataProject.length > 0 ? (
                allDataProject.map((data, i) => (
                  <tr key={i} className="border-b-[1px] border-black">
                    <td className="text-center py-4 text-black">
                      {data.projectID.slice(0, 8)}
                    </td>
                    <td className="text-center py-4 text-black">
                      {data.school}
                    </td>
                    <td className="text-center py-4 text-black">
                      {data.location}
                    </td>
                    <td className="text-center py-4 text-black">
                      {data.itemgoal}
                    </td>
                    <td className="text-center py-4 text-black">
                      {data.status}
                    </td>
                    <td
                      className={`py-[5px] text-center ${
                        data.status === "Pending"
                          ? "flex flex-col justify-center items-center gap-[5px]"
                          : "py-4"
                      } `}
                    >
                      {data.status === "Pending" && (
                        <button className="bg-[#0000FF] text-white w-[80%] rounded-[5px]">
                          Update
                        </button>
                      )}
                      <button className="bg-[#FF0000] text-white w-[80%] rounded-[5px]">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-black">
                    No projects available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className=" w-[60%]">
            <thead>
              <tr className="bg-[#808080] text-white ">
                <th className="text-center py-3">Product ID</th>
                <th className="text-center py-3">Product</th>
                <th className="text-center py-3">Material Item</th>
                <th className="text-center py-3">Material goal</th>
                <th className="text-center py-3">Stock</th>
                <th className="text-center py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((data, i) => (
                <tr key={i} className="border-b-[1px] border-black">
                  <td className="text-center py-4 text-black">
                    {data.productID.slice(0, 8)}
                  </td>
                  <td className="text-center py-4 text-black">
                    {data.product}
                  </td>
                  <td className="text-center py-4 text-black">
                    {data.material}
                  </td>
                  <td className="text-center py-4 text-black">
                    {data.materialGoal}
                  </td>
                  <td className="text-center py-4 text-black">{data.stock}</td>
                  <td className="py-[5px] text-center flex flex-col justify-center items-center gap-[5px]">
                    <button className="bg-[#0000FF] text-white w-[70%] rounded-[5px]">
                      Update
                    </button>
                    <button className="bg-[#FF0000] text-white w-[70%] rounded-[5px]">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminHomepage;
