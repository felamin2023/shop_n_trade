"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Package,
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Recycle,
  Target,
  Boxes,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
} from "lucide-react";

const InventoryPage = () => {
  // State management
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputData, setInputData] = useState({
    product: "",
    material: "",
    materialGoal: "",
    stock: "",
    img: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // Mock data for demo
  const mockProducts = [
    {
      productID: "PDT001ABC",
      product: "Nike T-Shirt",
      material: "Water Bottles",
      materialGoal: 500,
      stock: 10,
      img: "/images/productPage/product1.jpg",
    },
    {
      productID: "PDT002DEF",
      product: "Rolex Daytona",
      material: "Water Bottles",
      materialGoal: 10000,
      stock: 1,
      img: "/images/productPage/product2.jpg",
    },
    {
      productID: "PDT003GHI",
      product: "Jordan Nike Air",
      material: "Water Bottles",
      materialGoal: 5000,
      stock: 1,
      img: "/images/productPage/product3.jpg",
    },
    {
      productID: "PDT004JKL",
      product: "Adidas Cap",
      material: "Water Bottles",
      materialGoal: 200,
      stock: 3,
      img: "/images/productPage/product4.jpg",
    },
    {
      productID: "PDT005MNO",
      product: "Eco Water Bottle",
      material: "Plastic Caps",
      materialGoal: 100,
      stock: 25,
      img: "/images/productPage/product5.jpg",
    },
  ];

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
  };

  // Initialize with mock data (no backend needed for UI demo)
  useEffect(() => {
    setProductData(mockProducts);
  }, []);

  // Filter products
  const filteredProducts = productData.filter(
    (product) =>
      product.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // Handle row click for editing
  const handleRowClick = (product) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setInputData({
      product: product.product,
      material: product.material,
      materialGoal: product.materialGoal.toString(),
      stock: product.stock.toString(),
      img: product.img,
    });
    setPreviewURL(product.img);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormMode("add");
    setSelectedProduct(null);
    setInputData({
      product: "",
      material: "",
      materialGoal: "",
      stock: "",
      img: "",
    });
    setSelectedFile(null);
    setPreviewURL(null);
  };

  // Handle product save
  async function saveProduct(e) {
    e.preventDefault();
    
    if (!inputData.product || !inputData.material || !inputData.materialGoal || !inputData.stock) {
      showNotification("error", "Please fill in all fields");
      return;
    }

    try {
      setUploading(true);
      let imageUrl = previewURL || "/images/productPage/default.jpg";

      // Mock success for demo (no backend needed)
      showNotification("success", "Product added successfully!");
      const newProduct = {
        productID: `PDT${Date.now()}`,
        product: inputData.product,
        material: inputData.material,
        materialGoal: parseInt(inputData.materialGoal),
        stock: parseInt(inputData.stock),
        img: imageUrl,
      };
      setProductData([...productData, newProduct]);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", "Failed to add product");
    } finally {
      setUploading(false);
    }
  }

  // Handle product update
  async function updateProduct(e) {
    e.preventDefault();

    try {
      setUploading(true);
      let imageUrl = previewURL || inputData.img;

      // Mock success for demo (no backend needed)
      showNotification("success", "Product updated successfully!");
      setProductData(
        productData.map((p) =>
          p.productID === selectedProduct.productID
            ? {
                ...p,
                product: inputData.product,
                material: inputData.material,
                materialGoal: parseInt(inputData.materialGoal),
                stock: parseInt(inputData.stock),
                img: imageUrl,
              }
            : p
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", "Failed to update product");
    } finally {
      setUploading(false);
    }
  }

  // Handle delete
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    // Mock success for demo (no backend needed)
    showNotification("success", "Product deleted successfully!");
    setProductData(productData.filter((p) => p.productID !== productToDelete));
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Stats
  const totalProducts = productData.length;
  const totalStock = productData.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = productData.filter((p) => p.stock <= 3).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207] pb-8">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] py-6 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-noto text-white text-2xl md:text-3xl font-bold">
                  Inventory Management
                </h1>
                <p className="text-green-200/70 text-sm">
                  Manage your eco-trade products 📦
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Products</p>
                <p className="text-white text-3xl font-bold">{totalProducts}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Boxes className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a4d1a] to-[#0d2d0d] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Stock</p>
                <p className="text-white text-3xl font-bold">{totalStock}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a5c1a] to-[#1a4d1a] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Low Stock Alert</p>
                <p className="text-white text-3xl font-bold">{lowStockCount}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Table */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-noto text-white text-xl font-semibold flex items-center gap-2">
                <Package size={22} className="text-green-400" />
                Product List
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-[#0d2818] text-white placeholder-green-400/40 
                    px-5 py-2.5 pl-11 rounded-xl border border-[#1a3d1a] 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/50" />
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#132d13]/80">
                      <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Product</th>
                      <th className="text-left py-4 px-6 text-green-300/70 font-semibold text-sm">Material</th>
                      <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Goal</th>
                      <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Stock</th>
                      <th className="text-center py-4 px-6 text-green-300/70 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, i) => (
                      <tr
                        key={i}
                        onClick={() => handleRowClick(product)}
                        className="border-t border-[#1a3d1a] hover:bg-[#132d13]/50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#0a1f0a] overflow-hidden">
                              {product.img ? (
                                <img src={product.img} alt={product.product} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package size={20} className="text-green-600" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">{product.product}</p>
                              <p className="text-green-400/50 text-xs">ID: {product.productID?.slice(0, 8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-green-300/80">
                            <Recycle size={14} className="text-green-500/60" />
                            {product.material}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-white font-semibold">{product.materialGoal?.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${product.stock > 5 ? "bg-green-600/20 text-green-400" : 
                              product.stock > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(product);
                              }}
                              className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setProductToDelete(product.productID);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-[#1a3d1a] mb-3" />
                    <p className="text-green-400/50">No products found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d2818]/80 backdrop-blur-sm rounded-2xl border border-[#1a3d1a] p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  {formMode === "add" ? (
                    <>
                      <Plus size={20} className="text-green-400" />
                      Add New Product
                    </>
                  ) : (
                    <>
                      <Edit size={20} className="text-green-400" />
                      Edit Product
                    </>
                  )}
                </h3>
                {formMode === "edit" && (
                  <button
                    onClick={resetForm}
                    className="p-2 bg-[#132d13] rounded-lg hover:bg-[#1a3d1a] transition-colors"
                  >
                    <RotateCcw size={16} className="text-green-400/70" />
                  </button>
                )}
              </div>

              <form onSubmit={formMode === "add" ? saveProduct : updateProduct} className="space-y-4">
                {/* Image Upload */}
                <div className="relative">
                  <div className="h-40 bg-[#0a1f0a] rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-[#1a3d1a]">
                    {previewURL ? (
                      <img src={previewURL} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={32} className="mx-auto text-green-600 mb-2" />
                        <p className="text-green-400/50 text-sm">No image selected</p>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-3 right-3 p-2 bg-green-600 hover:bg-green-700 
                    rounded-lg cursor-pointer transition-colors">
                    <Upload size={16} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-green-400/60 text-sm mb-2">Product Name</label>
                  <input
                    type="text"
                    name="product"
                    value={inputData.product}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                      px-4 py-3 rounded-xl border border-[#1a3d1a] 
                      focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Material */}
                <div>
                  <label className="block text-green-400/60 text-sm mb-2">Material Type</label>
                  <input
                    type="text"
                    name="material"
                    value={inputData.material}
                    onChange={handleChange}
                    placeholder="e.g., Water Bottles"
                    className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                      px-4 py-3 rounded-xl border border-[#1a3d1a] 
                      focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Material Goal & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-400/60 text-sm mb-2">Material Goal</label>
                    <input
                      type="number"
                      name="materialGoal"
                      value={inputData.materialGoal}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                        px-4 py-3 rounded-xl border border-[#1a3d1a] 
                        focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-green-400/60 text-sm mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={inputData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full bg-[#0d2818] text-white placeholder-green-400/40 
                        px-4 py-3 rounded-xl border border-[#1a3d1a] 
                        focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploading}
                  className={`w-full py-3 rounded-xl text-white font-semibold 
                    flex items-center justify-center gap-2 transition-all
                    ${formMode === "add" 
                      ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] hover:from-[#1a4d1a] hover:to-[#0d2d0d]" 
                      : "bg-gradient-to-r from-[#1a4d1a] to-[#0d3d0d] hover:from-[#1a5c1a] hover:to-[#0d2d0d]"
                    }
                    ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : formMode === "add" ? (
                    <>
                      <Plus size={18} />
                      Add Product
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Update Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div 
            className="bg-[#0d2818] rounded-2xl shadow-2xl w-full max-w-sm border border-[#1a3d1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Delete Product</h3>
              <p className="text-green-400/60 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#132d13] hover:bg-[#1a3d1a] text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg
          flex items-center gap-2 animate-bounce
          ${notification.type === "success" ? "bg-emerald-500" : "bg-red-500"} text-white`}>
          {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
