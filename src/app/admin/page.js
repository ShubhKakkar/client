"use client";
import React, { useState } from "react";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleProductNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleProductImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  };

  const handleCategoryListChange = (e) => {
    const inputCategories = e.target.value.split(/[, ]+/);

    const filteredCategories = inputCategories
      .filter((category) => category.trim() !== "")
      .map((category) => category.toLowerCase());

    setCategoryList(filteredCategories);
  };

  const handleProductStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      );

      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const cloudinaryData = await cloudinaryResponse.json();

      const productDetails = {
        name,
        price,
        image: cloudinaryData?.secure_url,
        categoryList,
        stock,
      };

      console.log(productDetails);

      const apiResponse = await fetch(`${serverUrl}/store/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });

      const apiData = await apiResponse.json();
      console.log(apiData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setName("");
      setPrice("");
      setImage("");
      setCategoryList([]);
      setStock("");
    }
  };

  return (
    <div className="min-h-screen bg-light p-8 font-serif flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-medium text-orangeRed">
          Create new Product
        </h1>
        <form className="my-4 flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Product name"
              className="outline-none text-orangeRed bg-transparent focus:border-0  focus:border-orangeRed focus:ring-1 border-b border-orangeRed p-2 focus:ring-orangeRed transition-all duration-300 w-full mt-4 text-xl"
              onChange={handleProductNameChange}
              value={name}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="Product Price"
              className="outline-none text-orangeRed bg-transparent focus:border-0  focus:border-orangeRed focus:ring-1 border-b border-orangeRed p-2 focus:ring-orangeRed transition-all duration-300 w-full mt-4 text-xl"
              onChange={handleProductPriceChange}
              value={price}
            />
          </div>
          <div className="relative">
            <input
              type="file"
              onChange={handleProductImageChange}
              className="outline-none text-orangeRed bg-transparent w-full mt-4 text-xl"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Category List"
              className="outline-none text-orangeRed bg-transparent focus:border-0  focus:border-orangeRed focus:ring-1 border-b border-orangeRed p-2 focus:ring-orangeRed transition-all duration-300 w-full mt-4 text-xl"
              onChange={handleCategoryListChange}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="Product Stock"
              className="outline-none text-orangeRed bg-transparent  focus:border-orangeRed focus:ring-1 border-b border-orangeRed p-2 focus:ring-orangeRed transition-all duration-300 w-full mt-4 text-xl"
              onChange={handleProductStockChange}
              value={stock}
            />
          </div>
          <button
            type="submit"
            className={`bg-orangeRed text-white py-2 px-4 mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="bg-imageBackground">
        {previewImage && (
          <div className="mt-4">
            <img
              src={previewImage}
              alt="Selected"
              className="h-[500px] w-[500px] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
