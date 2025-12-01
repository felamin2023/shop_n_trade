import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Ensure this path is correct

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("ShopTrade-products") // Replace with your actual bucket name
        .list("", { limit: 100 }); // Optional: Adjust limits as needed

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }

      // Generate public URLs
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
    <div>
      {images.length > 0 ? (
        images.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`Image ${index}`}
              className="h-[100px] w-[100px]"
            />
          </div>
        ))
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
};

export default DisplayImages;
