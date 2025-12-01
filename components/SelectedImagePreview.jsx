import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const SelectedImagePreview = () => {
  const [selectedFile, setSelectedFile] = useState(null); // File selected by the user
  const [previewURL, setPreviewURL] = useState(null); // URL to show the selected image
  const [uploading, setUploading] = useState(false); // State to track the upload process

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

  return (
    <div className="flex flex-col items-center justify-start h-[100%] w-full border border-gray-300 rounded-md">
      {/* Show the preview of the selected image */}
      {previewURL ? (
        <img
          src={previewURL}
          alt="Preview"
          className="h-[170px] w-full object-cover rounded-xl"
        />
      ) : (
        <div className=" h-[170px] w-full bg-red-700 rounded-xl flex justify-center items-center ">
          <p className="text-white mb-4">No picture selected</p>
        </div>
      )}

      {/* File input field */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className=" border-[1px] border-black w-full  "
      />
    </div>
  );
};

export default SelectedImagePreview;
