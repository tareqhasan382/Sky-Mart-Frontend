// ProductForm.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ChromePicker, ColorResult } from "react-color";

import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "./ImageUpload";
import { useAddProductMutation } from "../../redux/api/productApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/local-storage";
import Size from "./Size";
interface Variation {
  color: string;
  size: string[];
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
    setIsLoading(true);
  }, [loading, userLoggedIn, navigate]);

  if (!loading) {
    <div>
      <h1>Loading..........</h1>
    </div>;
  }
  //=========================================
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [formData, setFormData] = useState<{
    name: string;
    title: string;
    stock: number;
    price: number;
    userId: string;
    image: string[];
    variations: Variation[];
  }>({
    name: "",
    title: "",
    stock: 0,
    price: 0,
    userId: "6585d731059c95c9677c0ce8",
    image: [""],
    variations: [{ color: "#fe345e", size: [] }],
  });
  // console.log("data:", formData.variations);
  // ========Image Upload=============
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageUrl,
    }));
  }, [imageUrl]);
  // ========Image Upload=============
  const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleColorChange = (index: number, color: ColorResult) => {
    const updatedVariations = [...formData.variations];
    updatedVariations[index].color = color.hex;
    setFormData((prevData) => ({ ...prevData, variations: updatedVariations }));
  };
  const handleSizeChange = (sizes: string[], index: number) => {
    setFormData((prevData) => {
      const newVariations = [...prevData.variations];
      newVariations[index].size = sizes;
      return { ...prevData, variations: newVariations };
    });
  };
  const handleAddVariation = () => {
    setFormData((prevData) => ({
      ...prevData,
      variations: [...prevData.variations, { color: "", size: [] }],
    }));
  };

  const handleRemoveVariation = (index: number) => {
    const updatedVariations = [...formData.variations];
    updatedVariations.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, variations: updatedVariations }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      addProduct(formData);
      toast.success("Product added .");
      //console.log("Form data submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded my-3"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {formData.variations.map((variation, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
          <label className="block mb-2 font-semibold">Color</label>
          <div className="relative">
            <input
              type="text"
              value={variation.color}
              onClick={() => {
                setColorPickerVisible(!colorPickerVisible);
                setSelectedColorIndex(index);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
            <p
              style={{
                width: "300px",
                height: "15px",
                backgroundColor: variation.color,
                display: "inline-block",
              }}
              className=" outline outline-1 outline-red-600 rounded-md "
            ></p>
            {colorPickerVisible && selectedColorIndex === index && (
              <div className="absolute z-10">
                <ChromePicker
                  color={variation.color}
                  onChange={(color) => handleColorChange(index, color)}
                />
              </div>
            )}
          </div>
          <div>
            <label className="mb-2 flex">
              Sizes:
              <Size
                selectedSizes={variation.size}
                onSizeChange={(sizes) => handleSizeChange(sizes, index)}
                setFormData={setFormData}
              />
            </label>
          </div>
          {/* <Size setFormData={setFormData} /> //====================SIze */}
          <button
            type="button"
            onClick={() => handleAddVariation()}
            className="text-white cursor-pointer px-2 py-1 bg-blue-500 rounded "
          >
            Add Variation
          </button>
          {formData.variations.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveVariation(index)}
              className=" ml-2 text-white cursor-pointer px-2 py-1 bg-red-500 rounded"
            >
              Remove Variation
            </button>
          )}
        </div>
      ))}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Images</label>
      </div>
      {/*================== <ImageUpload /> Image========================== */}
      <ImageUpload setImageUrls={setImageUrl} />
      {/*================== <ImageUpload /> Image========================== */}
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          isLoading && " opacity-60 "
        } `}
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
