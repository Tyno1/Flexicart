import React, { useContext, useState } from "react";
import Button from "../../../components/ui/Button";
import { ProductContext } from "../../../context/ProductContext";
import { Table } from "./Table";
import { ServiceContext } from "../../../context/ServicesContext";

export type ImageUploadType = {
  image?: string;
  index: number;
};

export type ProductType = {
  name: string;
  description: string;
  price: number;
  category: string | { _id: string };
  stock: number;
  imageUrls?: ImageUploadType[];
  shop: string;
};

const ManageInventory: React.FC = () => {
  const { products, loading, error } = useContext(ProductContext);
  const {
    services,
    loading: serviceLoading,
    error: serviceError,
  } = useContext(ServiceContext);

  // const defaultFormData = {
  //   name: "",
  //   description: "",
  //   price: 0,
  //   category: "",
  //   stock: 0,
  //   imageUrls: [],
  //   shop: "",
  // };
  // const [formData, setFormData] = useState<ProductType>(defaultFormData);
  const [selectedType, setSelectedType] = useState<string>("");

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  const handleEdit = () => {};

  if (loading) {
    return (
      <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-10 lg:pt-0 lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
      <div className="container w-full flex flex-col h-full gap-10">
        <div className="flex w-full flex-col bg-white rounded-2xl items-center lg:mt-10">
          <div className="toggle w-full flex justify-center">
            <Button
              text="Products"
              variant="filled"
              onClick={() => setSelectedType("Products")}
              className={`py-4 mr-2 my-2 ${
                selectedType === "Products"
                  ? "bg-primary text-white"
                  : "bg-white  border-2 border-primary text-primary"
              }`}
            />
            <Button
              text="Services"
              variant="filled"
              onClick={() => setSelectedType("Services")}
              className={`py-4 mr-2 my-2 ${
                selectedType === "Services"
                  ? "bg-primary text-white"
                  : "bg-white  border-2 border-primary text-primary"
              }`}
            />
          </div>
          <div className="overflow-auto w-[95vw] lg:w-full">
            <Table
              services={services}
              products={products}
              selectedType={selectedType}
              loading={loading}
              error={error}
              serviceLoading={serviceLoading}
              serviceError={serviceError}
              handleEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInventory;
