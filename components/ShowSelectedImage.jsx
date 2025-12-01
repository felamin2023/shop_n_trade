import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const ShowSelectedImage = () => {
  const [selectedFile, setSelectedFile] = useState(null); // To manage the uploaded image selected by the user
  const [previewURL, setPreviewURL] = useState(null); // To preview the selected image
  const [images, setImages] = useState([]); // To track all uploaded images
  const [uploading, setUploading] = useState(false);

  // Handle file selection and preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  // Upload the selected image and move it to the left side after upload
  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error } = await supabase.storage
      .from("ShopTrade-products") // Replace with your actual bucket name
      .upload(filePath, selectedFile);

    if (error) {
      console.error("Uploading Error:", error);
      setUploading(false);
      return;
    }

    // Generate the public URL of the uploaded image and append it to the images list
    const { data: publicUrlData } = supabase.storage
      .from("ShopTrade-products")
      .getPublicUrl(filePath);

    setImages((prev) => [...prev, publicUrlData.publicUrl]);

    // Reset selected image and preview
    setSelectedFile(null);
    setPreviewURL(null);
    setUploading(false);
  };

  // Fetch all uploaded images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("ShopTrade-products")
        .list("", { limit: 100 });

      if (error) {
        console.error("Fetching Error:", error);
        return;
      }

      // Generate public URLs for all retrieved images
      const publicUrls = data.map(
        (file) =>
          supabase.storage.from("ShopTrade-products").getPublicUrl(file.name)
            .data.publicUrl
      );

      setImages(publicUrls);
    };

    fetchImages();
  }, []);

  return (
    <div className="flex justify-between items-start w-full h-full">
      {/* Left side: Display all uploaded images */}
      <div className="flex flex-wrap gap-4 w-[60%]">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="border border-gray-200 shadow-md p-2">
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="h-[100px] w-[100px] object-cover"
              />
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>

      {/* Right side: Preview selected image */}
      <div className="flex flex-col items-center w-[35%] border border-gray-300 p-4 rounded-md shadow-md">
        <h2 className="font-semibold mb-2">Selected Image</h2>
        {previewURL ? (
          <img
            src={previewURL}
            alt="Selected"
            className="h-[200px] w-[200px] object-cover mb-4"
          />
        ) : (
          <p>No image selected</p>
        )}
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={uploadFile}
          disabled={uploading || !selectedFile}
          className={`px-4 py-2 font-bold text-white rounded-md ${
            !selectedFile
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ShowSelectedImage;
