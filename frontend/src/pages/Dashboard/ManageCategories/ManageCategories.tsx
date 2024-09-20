import React, { useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/ui/Button";

import { toast } from "react-toastify";
import IconButton from "../../../components/ui/IconButton";
import {
  CategoryContext,
  CategoryTypeEnum,
} from "../../../context/CategoryContext";
import { StoreContext } from "../../../context/StoreContext";
import CreateCategories from "./CreateCategories";

export type CategoryType = {
  image?: string;
  name: string;
  description: string;
  shopId: string;
  type: CategoryTypeEnum;
  _id?: string;
};

const ManageCategories: React.FC = () => {
  const { store } = useContext(StoreContext);
  const { editCategory, createCategory, deleteCategory, categories, loading } =
    useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const defaultFormData = {
    name: "",
    description: "",
    shopId: "",
    type: CategoryTypeEnum.Product,
  };
  const [formData, setFormData] = useState<CategoryType>(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (store) {
      const newFormData: CategoryType = {
        ...formData,
        shopId: store._id,
      };

      isEdit
        ? editCategory(newFormData)
        : createCategory(newFormData)
            .then(() => {
              toast("Category saved successfully", {
                hideProgressBar: true,
              });
              setFormData(defaultFormData);
            })
            .catch((error) =>
              toast(error?.response.data.error, { hideProgressBar: true })
            );
    }
  };

  const handleEdit = (category: CategoryType) => {
    setFormData(category);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId)
      .then((res) => {
        toast("Category deleted successfully", {
          hideProgressBar: true,
        });
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return (
      <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
        Loading...
      </div>
    );
  }

  // Filter categories into separate lists based on type
  const services = categories.filter(
    (category) => category.type === CategoryTypeEnum.Service
  );
  const products = categories.filter(
    (category) => category.type === CategoryTypeEnum.Product
  );

  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-start">
      {categories.length > 0 ? (
        <div className="w-full h-[100vh] flex flex-col xl:flex-row gap-8 xl:gap-2 justify-between">
          <div className="w-[100%] xl:min-w-[50%] xl:max-w-[520px] bg-white p-4 lg:p-10 rounded-2xl flex flex-col gap-2 ">
            <h3 className="font-medium text-lg mb-4">Products Categories</h3>
            {products.length > 0 ? (
              products.map((category) => (
                <div
                  key={category._id}
                  className="flex lg:gap-4 items-center w-full justify-between"
                >
                  <div className="flex-1 max-w-[70%] p-4 border border-[1px] rounded-lg truncate">
                    <p className="text-sm font-normal">{category.name}</p>
                  </div>
                  <div className="flex gap-2 w-32 justify-end">
                    <IconButton
                      icon={<TbEdit size={20} />}
                      variant="outlined"
                      className="border-primary text-primary"
                      onClick={() => handleEdit(category)}
                    />
                    <IconButton
                      icon={<MdDeleteOutline size={20} />}
                      variant="outlined"
                      className="border-danger text-danger"
                      onClick={() => handleDelete(category._id!)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
            <Button
              text="Add New Category"
              variant="filled"
              className="bg-primary text-white mt-4 py-4"
              onClick={() => {
                setIsOpen(true);
                setFormData(defaultFormData);
              }}
            />
          </div>
          <div className="w-[100%] xl:min-w-[50%] xl:max-w-[520px] bg-white p-4 lg:p-10 rounded-2xl flex flex-col gap-2 ">
            <h3 className="font-medium text-lg mb-4">Services Categories</h3>
            {services.length > 0 ? (
              services.map((category) => (
                <div
                  key={category._id}
                  className="flex lg:gap-4 items-center w-full justify-between"
                >
                  <div className="flex-1 max-w-[70%] p-4 border border-[1px] rounded-lg truncate">
                    <p className="text-sm font-normal">{category.name}</p>
                  </div>
                  <div className="flex gap-2 w-32 justify-end">
                    <IconButton
                      icon={<TbEdit size={20} />}
                      variant="outlined"
                      className="border-primary text-primary"
                      onClick={() => handleEdit(category)}
                    />
                    <IconButton
                      icon={<MdDeleteOutline size={20} />}
                      variant="outlined"
                      className="border-danger text-danger"
                      onClick={() => handleDelete(category._id!)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No services found</p>
            )}
            <Button
              text="Add New Service"
              variant="filled"
              className="bg-primary text-white mt-4 py-4"
              onClick={() => {
                setIsOpen(true);
                setFormData(defaultFormData);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mx-auto">
          <p className="text-medium font-normal">
            You Don't Have Any Categories to Display
          </p>

          <Button
            text="Create a Category"
            variant="filled"
            className="bg-primary text-white py-4"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
      <CreateCategories
        title={isEdit ? "Edit" : "Create"}
        isOpen={isOpen}
        onClose={() => {
          setIsEdit(false);
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        categories={categories}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default ManageCategories;
