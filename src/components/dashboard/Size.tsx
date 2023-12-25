/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ParaProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

interface SizeProps extends ParaProps {
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

const Size: React.FC<SizeProps> = ({ selectedSizes, onSizeChange }) => {
  const sizes = ["sm", "md", "xl", "2xl", "3xl", "4xl"];

  const handleSizeButtonClick = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    onSizeChange(updatedSizes);
  };

  return (
    <div>
      {sizes.map((size) => (
        <button
          key={size}
          className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer px-3 m-1
                ${
                  selectedSizes.includes(size) ? "bg-gray-500 text-white" : ""
                }`}
          onClick={() => handleSizeButtonClick(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default Size;
