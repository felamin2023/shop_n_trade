"use client";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Filtered data
  const [transactionFilterTab, setTransactionFilterTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/transaction");
  //     setTransactions(response.data.transactions);
  //   } catch (error) {
  //     console.error("Error fetching transactions:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const [allDataTransaction, setAllDataTransaction] = useState([]);

  const fetchAllDataTransaction = async () => {
    try {
      // Fetch data
      const res = await axios.get("http://localhost:3000/api/transaction");

      // Ensure proper data access
      const data = res.data; // No `await` here
      console.log(data.transactions); // Check the response structure

      // Update transactions state
      setTransactions(data.transactions); // Save all transactions
      setFilteredTransactions(data.transactions); // Use `data.transactions` if that's correct
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (transactionFilterTab === "All") {
      setFilteredTransactions(transactions); // Show all transactions
    } else {
      // Filter transactions based on the selected status
      const filteredData = transactions.filter(
        (transaction) => transaction.status === transactionFilterTab
      );
      setFilteredTransactions(filteredData);
    }
  }, [transactionFilterTab, transactions]); // Re-run when filter or data changes

  // Fetch data on component load
  useEffect(() => {
    fetchAllDataTransaction();
  }, []);

  // const transactionData = [
  //   {
  //     transacId: 1,
  //     fullname: "Jovanie Felamin",
  //     product: "Nike T Shirt",
  //     tradeitem: "500 water bottles",
  //     status: "Not yet delivered",
  //   },
  //   {
  //     transacId: 2,
  //     fullname: "Joshua Briones",
  //     product: "Rolex Daytona",
  //     tradeitem: "10, 000 water bottles",
  //     status: "Delivered",
  //   },
  //   {
  //     transacId: 3,
  //     fullname: "Ivan brigoli",
  //     product: "Jordan Nike Air",
  //     tradeitem: "5000 water bottles",
  //     status: "Not yet delivered",
  //   },
  //   {
  //     transacId: 4,
  //     fullname: "Albert Guazo",
  //     product: "Addidas Cap",
  //     tradeitem: "200 water bottles",
  //     status: "Not yet delivered",
  //   },
  //   {
  //     transacId: 5,
  //     fullname: "Jiesmera Omboy",
  //     product: "ROG laptop",
  //     tradeitem: "10,000 water bottles",
  //     status: "Delivered",
  //   },
  // ];

  // const filteredTransactionData = transactionData.filter((data) => {
  //   if (transactionFilterTab == "All") {
  //     return true;
  //   }
  //   if (transactionFilterTab == "Pending") {
  //     return data.status !== "Delivered";
  //   }
  //   if (transactionFilterTab == "Accepted") {
  //     return data.status === "Delivered";
  //   }
  // });

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen pt-24 gap-5 ">
      <div className="flex justify-between items-center  w-[80%]">
        <h1 className="font-noto text-black text-[30px] font-medium">
          Transaction
        </h1>
        <div className="flex justify-between w-[55%] ">
          <div className=" text-black flex justify-between items-center h-fit px-[10px] py-[5px] rounded-[30px] w-[65%] border-[1px] border-black">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder-gray-500"
            />
            <Search color="black" />
          </div>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-white bg-black w-[28%] "
              >
                {transactionFilterTab}
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem
                onClick={() => setTransactionFilterTab("All")}
                value="all"
              >
                All
              </MenuItem>

              <MenuItem
                onClick={() => setTransactionFilterTab("Pending")}
                value="pending"
              >
                Pending
              </MenuItem>
              <MenuItem
                onClick={() => setTransactionFilterTab("Accepted")}
                value="accepted"
              >
                Accepted
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </div>
      <table className=" w-[80%]">
        <thead>
          <tr className="bg-[#808080] text-white">
            <th className="text-center py-3">Transac ID</th>
            <th className="text-center py-3">Full name</th>
            <th className="text-center py-3">Product</th>
            <th className="text-center py-3">Material</th>
            <th className="text-center py-3">Status</th>
            <th className="text-center py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr
              key={transaction.transacID}
              className="border-b border-gray-500"
            >
              <td className="text-center py-3">{transaction.transacID}</td>
              <td className="text-center py-3">{transaction.user.fullname}</td>
              <td className="text-center py-3">
                {transaction.product.product}
              </td>
              <td className="text-center py-3">
                {transaction.product.material}
              </td>
              <td className="text-center py-3">{transaction.status}</td>
              <td className="text-center py-3 px-2">
                <button className="text-blue-500 hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionPage;
