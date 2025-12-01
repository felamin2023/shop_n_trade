"use client";
import { Search } from "lucide-react";
import { useState } from "react";

const requestListPending = [
  {
    product: "Nike T Shirt",
    tradeItem: "500 water bottles",
    status: "Pending",
  },
  {
    product: "Rolex Daytona",
    tradeItem: "10, 000 water bottles",
    status: "Pending",
  },
  {
    product: "Jordan Nike Air",
    tradeItem: "5000 water bottles",
    status: "Pending",
  },
  {
    product: "Addidas Cap",
    tradeItem: "200 water bottles",
    status: "Pending",
  },
];
const requestListAccepted = [
  {
    product: "Nike T Shirt",
    tradeItem: "500 water bottles",
    status: "Not yet delivered",
  },
  {
    product: "Rolex Daytona",
    tradeItem: "10, 000 water bottles",
    status: "Delivered",
  },
  {
    product: "Jordan Nike Air",
    tradeItem: "5000 water bottles",
    status: "Delivered",
  },
  {
    product: "Addidas Cap",
    tradeItem: "200 water bottles",
    status: "Delivered",
  },
];
const RequestPage = () => {
  const [recordFilter, setRecordFilter] = useState("pending");
  return (
    <div className="h-screen w-full gap-4 flex flex-col justify-start items-center border-[1px] pt-20 border-black">
      <h1 className="font-noto text-[40px] text-black">Request</h1>
      <div className=" flex justify-between items-center w-[50%]">
        <div className="flex justify-between w-[55%] items-center">
          {recordFilter === "pending" ? (
            <h1 className="text-black">Pending</h1>
          ) : (
            <h1 className="text-black">Accepted</h1>
          )}
          <div className="flex items-center border-[1px] px-2 border-black rounded-[20px]">
            <input
              type="text"
              placeholder="Search"
              className="text-gray-500 bg-transparent py-[2px]"
            />
            <Search color="black" />
          </div>
        </div>
        <div className="flex justify-between items-center w-[35%]">
          <button
            onClick={() => setRecordFilter("pending")}
            className="bg-black text-white w-[40%] py-1 rounded-[6px]"
          >
            Pending
          </button>
          <button
            onClick={() => setRecordFilter("accepted")}
            className="bg-black text-white w-[40%] py-1 rounded-[6px]"
          >
            Accepted
          </button>
        </div>
      </div>
      {recordFilter === "pending" ? (
        <table className="w-[50%] text-black">
          <thead>
            <tr className="bg-[#808080] text-white">
              <th className="text-center py-3">Product</th>
              <th className="text-center py-3">Trade Item</th>
              <th className=" text-center py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {requestListPending.map((request, i) => (
              <tr key={i}>
                <td className="text-center py-3 border-b-[1px] border-black">
                  {request.product}
                </td>
                <td className="text-center py-3 border-b-[1px] border-black">
                  {request.tradeItem}
                </td>
                <td className="text-center py-3 border-b-[1px] border-black">
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-[50%] text-black">
          <thead>
            <tr className="bg-[#808080] text-white">
              <th className="text-center py-3">Product</th>
              <th className="text-center py-3">Trade Item</th>
              <th className=" text-center py-3">Status</th>
              <th className=" text-center py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestListAccepted.map((request, i) => (
              <tr key={i}>
                <td className="text-center py-3 border-b-[1px] border-black">
                  {request.product}
                </td>
                <td className="text-center py-3 border-b-[1px] border-black">
                  {request.tradeItem}
                </td>
                <td className="text-center  border-b-[1px] border-black">
                  {request.status}
                </td>
                <td className="py-3 flex justify-center items-center border-b-[1px] border-black">
                  <button className="bg-[#588027] text-white py-[1px] px-4 rounded-[5px]">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div></div>
    </div>
  );
};

export default RequestPage;
