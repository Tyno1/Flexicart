import React from "react";
import { FaSpinner } from "react-icons/fa";
import Button from "../../../components/ui/Button";
import Modal from "../components/CustomModal";
import { CategoryType } from "../ManageCategories/ManageCategories";
import { ServiceType } from "./ManageServices";

type CreateServiceProp = {
  isEdit: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  title: string;
  formData: ServiceType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryType[];
  loading: boolean;
};

const CreateProduct: React.FC<CreateServiceProp> = ({
  title,
  isEdit,
  isOpen,
  onClose,
  setIsOpen,
  formData,
  handleChange,
  handleSubmit,
  handleFileChange,
  categories,
  loading,
}) => {
  return (
    <Modal
      title={`${title} Service`}
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
        <div className="name flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Service Name:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Service Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="description flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Service Description:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Service Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="price flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">
            Service Price:
          </label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Service Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="category flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Service Category:</label>
          <select
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            name="category"
            value={
              typeof formData.category === "object"
                ? formData.category?._id
                : formData.category
            }
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories
              .filter((each) => each.type === "Service")
              .map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="stock flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">
            Service Duration (hour):
          </label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Product Stock"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        {formData?.imageUrls && formData?.imageUrls?.length > 0 && (
          <div className="image-url flex flex-col gap-2 w-full">
            {formData.imageUrls?.map((imageUrl) => (
              <img
                src={imageUrl.image}
                alt="Banner Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
        <div className="image-url flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Service Images:</label>
          <input
            multiple
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-end w-full gap-4 items-center">
          <Button
            type="submit"
            text={
              isEdit
                ? !loading
                  ? "Save Changes"
                  : "Saving Changes"
                : !loading
                ? "Create Service"
                : "Creating Service"
            }
            variant="filled"
            className="bg-primary text-white"
          />
          {loading ? <FaSpinner /> : null}
        </div>
      </form>
    </Modal>
  );
};

export default CreateProduct;
