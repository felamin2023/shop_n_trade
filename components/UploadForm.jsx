import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true);

    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error } = await supabase.storage
      .from("ShopTrade-products") // Ensure you've created the bucket in Supabase storage
      .upload(filePath, selectedFile);

    if (error) {
      console.error(error);
      setUploading(false);
      alert("Error uploading file!");
    } else {
      alert("File uploaded successfully!");
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadForm;
