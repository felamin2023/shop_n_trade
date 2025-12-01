"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const InventoryPage = () => {
  // State management
  const [formVisible, setFormVisible] = useState("save"); // 'save' or 'update'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState([]);
  const [inputData, setInputData] = useState({
    product: "",
    material: "",
    materialGoal: "",
    stock: "",
    img: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); // File selected by the user
  const [previewURL, setPreviewURL] = useState(null); // URL to show the selected image
  const [uploading, setUploading] = useState(false); // State to track the upload process
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeletedMessageVisible, setDeletedMessageVisible] = useState(false); // For record deleted message
  const [isUpdatedMessageVisible, setUpdatedMessageVisible] = useState(false); // For record updated message
  const [isAddedMessageVisible, setAddedMessageVisible] = useState(false);

  const showDeleteModal = (productID) => {
    setProductToDelete(productID);
    setIsModalVisible(true);
  };
  const hideDeleteModal = () => {
    setIsModalVisible(false);
    setProductToDelete(null);
  };

  // Fetch Product Data
  async function fetchProductData() {
    try {
      const res = await fetch("http://localhost:3000/api/product");
      const data = await res.json();
      setProductData(data.product);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch("http://localhost:3000/api/product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productID: productToDelete }),
      });

      if (res.ok) {
        hideDeleteModal();
        setDeletedMessageVisible(true);
        fetchProductData();
        setTimeout(() => {
          setDeletedMessageVisible(false);
        }, 3000);
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file)); // Create a preview URL for the image
  };

  // Handle file upload
  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true); // Start the uploading process

    const fileExt = selectedFile.name.split(".").pop(); // Extract file extension
    const fileName = `${Math.random()}.${fileExt}`; // Create a unique filename
    const filePath = `${fileName}`;

    // Upload the file to the Supabase bucket
    const { error } = await supabase.storage
      .from("ShopTrade-products") // Replace with your actual bucket name
      .upload(filePath, selectedFile);

    if (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      return;
    }

    // Reset the preview and file once upload is complete
    setSelectedFile(null);
    setPreviewURL(null);
    setUploading(false);

    alert("File uploaded successfully!");
  };

  // Handle row click for updating product
  const handleRowClick = (product) => {
    setFormVisible("update");
    setSelectedProduct(product);
    setInputData({
      product: product.product,
      material: product.material,
      materialGoal: product.materialGoal.toString(),
      stock: product.stock.toString(),
      img: product.img, // Populate img from the product for update
    });
    setPreviewURL(product.img); // Set preview to the product's image URL
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle product save
  async function saveProduct(e) {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setUploading(true);
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("ShopTrade-products")
        .upload(filePath, selectedFile);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        alert("Image upload failed.");
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("ShopTrade-products")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const res = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: inputData.product,
          material: inputData.material,
          materialGoal: parseInt(inputData.materialGoal),
          stock: parseInt(inputData.stock),
          img: imageUrl, // Include the image URL
        }),
      });

      const data = await res.json();
      console.log("API Response (Save):", data);

      if (res.ok) {
        setAddedMessageVisible(true);
        setTimeout(() => {
          setAddedMessageVisible(false);
        }, 3000);
        fetchProductData();
        setInputData({
          product: "",
          material: "",
          materialGoal: "",
          stock: "",
          img: "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
      } else {
        alert("Failed to save product.");
        console.error("API Error (Save):", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setUploading(false);
    }
  }

  // Handle product update
  async function updateProduct(e) {
    e.preventDefault();

    try {
      let imageUrl = inputData.img;

      if (selectedFile) {
        setUploading(true);
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("ShopTrade-products")
          .upload(filePath, selectedFile);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          alert("Image upload failed.");
          setUploading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("ShopTrade-products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      console.log("Updating product with ID:", selectedProduct.productID);
      console.log("Sending data:", {
        product: inputData.product,
        material: inputData.material,
        materialGoal: parseInt(inputData.materialGoal),
        stock: parseInt(inputData.stock),
        img: imageUrl,
      });

      const res = await fetch(
        `http://localhost:3000/api/product?productID=${selectedProduct.productID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: inputData.product,
            material: inputData.material,
            materialGoal: parseInt(inputData.materialGoal),
            stock: parseInt(inputData.stock),
            img: imageUrl,
          }),
        }
      );

      const data = await res.json();
      console.log("API Response (Update):", data);

      if (res.ok) {
        setUpdatedMessageVisible(true);
        setTimeout(() => {
          setUpdatedMessageVisible(false);
        }, 3000);
        fetchProductData();
        setFormVisible("save");
        setInputData({
          product: "",
          material: "",
          materialGoal: "",
          stock: "",
          img: "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
      } else {
        alert("Failed to update product.");
        console.error("API Error (Update):", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center gap-7">
      <div className="h-fit w-[60%]">
        <div className="flex justify-left items-center gap-5 w-[100%]">
          <h1 className="font-noto text-black text-[30px] font-medium">
            Inventory
          </h1>
          <div className="flex justify-between w-[55%] ">
            <div className="text-black flex justify-between items-center h-fit px-[10px] py-[5px] rounded-[30px] w-[65%] border-[1px] border-black">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-white placeholder-gray-500 border-none"
              />
              <Search color="black" />
            </div>
          </div>
        </div>
        <table className="w-[100%]">
          <thead>
            <tr className="bg-[#808080] text-white">
              <th className="text-center py-3">Product ID</th>
              <th className="text-center py-3">Product</th>
              <th className="text-center py-3">Material Item</th>
              <th className="text-center py-3">Material goal</th>
              <th className="text-center py-3">Stock</th>
              <th className="text-center py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((data, i) => (
              <tr
                key={i}
                className="border-b-[1px] border-black cursor-pointer"
                onClick={() => handleRowClick(data)}
              >
                <td className="text-center py-4 text-black">
                  {data.productID}
                </td>
                <td className="text-center py-4 text-black">{data.product}</td>
                <td className="text-center py-4 text-black">{data.material}</td>
                <td className="text-center py-4 text-black">
                  {data.materialGoal}
                </td>
                <td className="text-center py-4 text-black">{data.stock}</td>
                <td className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering row click
                      showDeleteModal(data.productID);
                    }}
                    className="bg-[#FF0000] text-white w-[80%] rounded-[5px]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show the update form when formVisible is 'update' */}
      {formVisible === "update" && (
        <form
          onSubmit={updateProduct}
          className="bg-[rgba(0,0,0,0.1)] rounded-2xl h-[62%] w-[25%] flex flex-col justify-around items-center"
        >
          <div className="flex w-full justify-around">
            <div className="bg-[#808080] rounded-xl h-[270px] w-[200px] flex flex-col items-center justify-center">
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="h-[170px] w-full object-cover rounded-xl"
                />
              ) : (
                <div className="h-[170px] w-full bg-red-700 rounded-xl flex justify-center items-center">
                  <p className="text-white mb-4">No picture selected</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border-[1px] border-black w-full"
              />
            </div>
            <div className="flex flex-col items-center justify-between w-fit">
              <h1 className="text-black font-medium text-[20px]">
                Update Product
              </h1>
              <button
                type="submit"
                className="bg-[#588027] py-[2px] px-7 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
          <div className="w-[90%] flex flex-col gap-3">
            <div className="flex w-full justify-between">
              <p className="text-black">Product:</p>
              <input
                name="product"
                value={inputData.product}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="text"
              />
            </div>
            <div className="flex w-full justify-between">
              <p className="text-black">Material:</p>
              <input
                name="material"
                value={inputData.material}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="text"
              />
            </div>
            <div className="flex w-full justify-between">
              <p className="text-black">Goal:</p>
              <input
                name="materialGoal"
                value={inputData.materialGoal}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="number"
              />
            </div>
            <div className="flex w-full justify-between">
              <p className="text-black">Stock:</p>
              <input
                name="stock"
                value={inputData.stock}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="number"
              />
            </div>
          </div>
        </form>
      )}

      {/* Show the save form when formVisible is 'save' */}
      {formVisible === "save" && (
        <form
          onSubmit={saveProduct}
          className="bg-[rgba(0,0,0,0.1)] rounded-2xl h-[62%] w-[25%] flex flex-col justify-around items-center"
        >
          <div className="flex w-full justify-around">
            <div className="bg-[#808080] rounded-xl h-[270px] w-[200px] flex flex-col items-center justify-center">
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="h-[170px] w-full object-cover rounded-xl"
                />
              ) : (
                <div className="h-[170px] w-full bg-red-700 rounded-xl flex justify-center items-center">
                  <p className="text-white mb-4">No picture selected</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border-[1px] border-black w-full"
              />
            </div>
            <div className="flex flex-col items-center justify-between w-fit">
              <h1 className="text-black font-medium text-[20px]">Add New</h1>
              <button
                type="submit"
                className="bg-[#588027] py-[2px] px-7 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-[90%] flex flex-col gap-3">
            <div className="flex w-full justify-between">
              <p className="text-black">Product:</p>
              <input
                name="product"
                value={inputData.product}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="text"
              />
            </div>
            <div className="flex w-full justify-between">
              <p className="text-black">Material:</p>
              <input
                name="material"
                value={inputData.material}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="text"
              />
            </div>
            <div className="flex w-full justify-between">
              <p className="text-black">Goal:</p>
              <input
                name="materialGoal"
                value={inputData.materialGoal}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="number"
              />
            </div>
            <div className="flex w-full justify-between">
              <p className="text-black">Stock:</p>
              <input
                name="stock"
                value={inputData.stock}
                onChange={handleChange}
                className="bg-[#808080] rounded-sm text-white p-[2px]"
                type="number"
              />
            </div>
          </div>
        </form>
      )}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center h-screen w-full backdrop-blur-sm justify-center z-50">
          <div className="bg-white p-5 rounded shadow-md">
            <h2 className="text-lg font-bold">Delete Confirmation</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={hideDeleteModal}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeletedMessageVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded shadow-md">
          Record Deleted!
        </div>
      )}

      {isUpdatedMessageVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-[#0078D4] text-white rounded shadow-md">
          Record updated!
        </div>
      )}

      {isAddedMessageVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-[#588027] text-white rounded shadow-md">
          Added new record!
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
