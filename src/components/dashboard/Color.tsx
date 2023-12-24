// ProductForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ChromePicker, ColorResult } from "react-color";

interface Variation {
  color: string;
  size: string[];
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    title: string;
    stock: number;
    images: string;
    variations: Variation[];
  }>({
    name: "",
    title: "",
    stock: 0,
    images: "",
    variations: [{ color: "#fe345e", size: [""] }],
  });

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

  const handleSizeChange = (
    index: number,
    sizeIndex: number,
    value: string
  ) => {
    const updatedVariations = [...formData.variations];
    updatedVariations[index].size[sizeIndex] = value;
    setFormData((prevData) => ({ ...prevData, variations: updatedVariations }));
  };

  const handleAddVariation = () => {
    setFormData((prevData) => ({
      ...prevData,
      variations: [...prevData.variations, { color: "", size: [""] }],
    }));
  };

  const handleRemoveVariation = (index: number) => {
    const updatedVariations = [...formData.variations];
    updatedVariations.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, variations: updatedVariations }));
  };
  //   const handleImageChange = (images: string[]) => {
  //     setFormData((prevData) => ({ ...prevData, images }));
  //   };

  //   const handleImageChange = (images: string[]) => {
  //     setFormData((prevData) => ({ ...prevData, images }));
  //   };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Handle form submission logic here
      console.log("Form data submitted:", formData);
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

          <label className="block mt-4 mb-2 font-semibold">Sizes</label>
          {variation.size.map((size, sizeIndex) => (
            <input
              key={sizeIndex}
              type="text"
              value={size}
              onChange={(e) =>
                handleSizeChange(index, sizeIndex, e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddVariation()}
            className="text-blue-500 underline cursor-pointer"
          >
            Add Size
          </button>
          {formData.variations.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveVariation(index)}
              className="text-red-500 underline cursor-pointer ml-2"
            >
              Remove Variation
            </button>
          )}
        </div>
      ))}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Images</label>
      </div>
      {/* <ImageUpload /> */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
