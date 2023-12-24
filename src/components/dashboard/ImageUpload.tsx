import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
};
const ImageUpload: React.FC<Props> = ({ setImageUrls }) => {
  const [images, setImages] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Handle file upload to Cloudinary
      acceptedFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ecommerce");

        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dsybkyula/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            //  updateInfo(data.info.secure_url);

            const imageUrl = data.secure_url;
            setImages((prevImages) => [...prevImages, imageUrl]);
            setImageUrls((preImageUrls) => [...preImageUrls, imageUrl]);

            toast.success("Image uploaded successfully!");
          } else {
            toast.error("Error uploading image.");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      });
    },
    [setImageUrls]
  );
  const handleDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.info("Image deleted!");
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="dropzone border-dashed border-2 p-4 rounded-md cursor-pointer "
      >
        <input {...getInputProps()} className=" cursor-pointer " />
        <p className=" cursor-pointer ">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <div className="mt-4">
        <h2>Uploaded Images:</h2>
        <div className="flex flex-wrap">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt={`uploaded-${index}`}
                className=" w-[100px] h-[100px] object-cover rounded object-top mr-2 mb-2"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 items-center justify-center right-2 bg-red-500 text-white w-[25px] h-[25px] rounded-full cursor-pointer"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
