"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SocketContext } from "@/contexts/SocketContext";
import { FaPlus, FaMinus } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [socket] = useContext(SocketContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 8;

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/store/get-all-products?limit=${itemsPerPage}&page=${pageNumber}`
      );
      const data = res.data;
      setProducts(data.allProducts);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.log(`Some error occurred ${err.message}`);
    }
  };

  const handleNewProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setTotalCount(totalCount + 1);
    
    const newTotalPages = Math.ceil((totalCount + 1) / itemsPerPage);
    if (newTotalPages !== totalPages) {
      setPageNumber(newTotalPages);
    }
  };

  const handleUpdatedProduct = (updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProductIndex = prevProducts.findIndex(
        (product) => product._id === updatedProduct._id
      );

      if (updatedProductIndex !== -1) {
        const newProducts = [...prevProducts];
        newProducts[updatedProductIndex] = updatedProduct;
        return newProducts;
      }

      return prevProducts;
    });
  };

  useEffect(() => {
    try {
      fetchAllProducts();
    } catch (err) {
      console.log(`Some error occurred ${err.message}`);
    }
  }, [pageNumber]);

  useEffect(() => {
    socket?.on("newProduct", handleNewProduct);
    socket?.on("updatedProduct", handleUpdatedProduct);
    return () => {
      socket?.off("newProduct", handleNewProduct);
      socket?.off("updatedProduct", handleUpdatedProduct);
    };
  }, [socket]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const canGoNext = pageNumber < totalPages;
  const canGoPrev = pageNumber > 1;

  return (
    <div className="min-h-screen bg-light">
      <h2 className="text-orangeRed text-7xl font-serif font-medium indent-4 grid place-items-center py-16">
        New Arrivals
      </h2>
      <div className="grid grid-cols-4 gap-4 gap-y-8 p-8 cursor-pointer pt-0">
        {products?.map((product) => {
          return (
            <div key={product?._id} className="bg-light relative">
              <img
                src={product?.image}
                className="h-[400px] w-full object-cover bg-imageBackground"
              />
              <div className="absolute top-2 right-2">
                <h4 className="text-orangeRed text-xs font-medium bg-light px-2 py-1 rounded-full">
                  {product?.stock} left
                </h4>
              </div>
              <h3 className="text-orangeRed text-xl font-medium my-2">
                {product?.name}
              </h3>
              <h4 className="text-orangeRed text-xl my-2 font-medium -mt-2">
                ${product?.price}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {product?.categoryList &&
                  product?.categoryList?.map((category, index) => {
                    return (
                      <button
                        key={index}
                        className="text-orangeRed text-lg font-light my-2 border border-orangeRed rounded-full px-2 py-1"
                      >
                        {category}
                      </button>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      {pageNumber === 1 && totalPages === 1 ? (
        ""
      ) : (
        <div className="w-max flex items-center gap-4 text-orangeRed text-3xl ml-auto mx-8">
          <FaMinus
            className={`bg-imageBackground p-1 rounded-full border border-orangeRed ${
              canGoPrev ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (canGoPrev) {
                setPageNumber(pageNumber - 1);
              }
            }}
          >
            -
          </FaMinus>
          {pageNumber}/{totalPages}
          <FaPlus
            className={`bg-imageBackground p-1 rounded-full border border-orangeRed ${
              canGoNext ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (canGoNext) {
                setPageNumber(pageNumber + 1);
              }
            }}
          >
            +
          </FaPlus>
        </div>
      )}
    </div>
  );
};

export default ProductList;
