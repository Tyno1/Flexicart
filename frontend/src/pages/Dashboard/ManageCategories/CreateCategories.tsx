import React from "react";
import { CategoryTypeEnum } from "../../../context/CategoryContext";
import Modal from "../components/CustomModal";
import { CategoryType } from "./ManageCategories";

type CreateCategoriesProp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  title: string;
  categories: any[];
  formData: CategoryType;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
  handleFileChange: (e: any) => void;
};

const CreateCategories: React.FC<CreateCategoriesProp> = ({
  title,
  isOpen,
  onClose,
  setIsOpen,
  formData,
  handleChange,
  handleSubmit,
  handleFileChange,
}) => {
  return (
    <Modal
      title={`${title} Category`}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(!isOpen);
        onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex flex-col gap-8 items-center"
      >
        <div className="Store-name flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Category Name:</label>

          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Media"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="Store-Type flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Category Description:</label>

          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Retail brand"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="Shop-location flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Category Type:</label>

          <select
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            {Object.values(CategoryTypeEnum).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {
          formData.image &&
          <div className="image-url flex flex-col gap-2 w-full">
            <img src={formData.image}
              height={50} width={50}
              alt="Banner Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        }
        <div className="image-url flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Category Image:</label>
          <input
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col gap-4 items-center w-full">
          <button className="bg-primary py-6 px-20 w-full lg:w-[50%] rounded-lg text-white font-normal">
            Save Information
          </button>
        </div>
      </form>{" "}
    </Modal>
  );
};

export default CreateCategories;
