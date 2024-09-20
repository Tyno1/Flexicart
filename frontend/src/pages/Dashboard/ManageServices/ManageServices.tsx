import React, { useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import { CategoryContext } from "../../../context/CategoryContext";
import { ServiceContext } from "../../../context/ServicesContext";
import { StoreContext } from "../../../context/StoreContext";
import CreateProduct from "./CreateServices";
import { Table } from "./Table";

export type ImageUploadType = {
  image?: string;
  index: number;
};

export type ServiceType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string | { _id: string };
  imageUrls?: ImageUploadType[];
  shop: string;
};

const ManageServices: React.FC = () => {
  const { setSelectedMenu } = useOutletContext<any>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { deleteService, editService, createService, services, loading } =
    useContext(ServiceContext);
  const { categories, loading: categoriesLoading } =
    useContext(CategoryContext);
  const { store } = useContext(StoreContext);

  const defaultFormData = {
    name: "",
    description: "",
    price: 0,
    category: "",
    duration: 0,
    imageUrls: [],
    shop: "",
  };
  const [formData, setFormData] = useState<ServiceType>(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files);

      setFormData((prevFormData) => {
        const newImageUrls = (prevFormData.imageUrls || []).slice();

        // Ensure newImageUrls has the same length as filesArray
        while (newImageUrls.length < filesArray.length) {
          newImageUrls.push({ index: newImageUrls.length, image: "" });
        }

        filesArray.forEach((file, index) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prevFormData) => {
              const updatedImageUrls = prevFormData.imageUrls?.map(
                (imageUrl, idx) =>
                  idx === index
                    ? { ...imageUrl, image: reader.result as string }
                    : imageUrl
              );

              return { ...prevFormData, imageUrls: updatedImageUrls };
            });
          };
          reader.readAsDataURL(file);
        });

        return { ...prevFormData, imageUrls: newImageUrls };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (store) {
      const newPayload = {
        ...formData,
        shop: store._id,
        category:
          typeof formData.category == "object"
            ? formData.category?._id
            : formData.category,
      };

      (isEdit ? editService(newPayload) : createService(newPayload))
        .then(() => {
          setFormData(defaultFormData);
          setIsOpen(false);
          toast("Service saved successfully", {
            hideProgressBar: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast("Service not saved", { hideProgressBar: true });
        });
    }
  };

  const handleEdit = (service: ServiceType) => {
    setFormData(service);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    deleteService(serviceId)
      .then((res) => {
        toast("Service deleted successfully", {
          hideProgressBar: true,
        });
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  if (loading && categoriesLoading) {
    <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      Loading...
    </div>;
  }

  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
      {categories && categories.length > 0 ? (
        <div className="container w-full flex flex-col h-full gap-10">
          {services && services.length > 0 ? (
            <div className="flex flex-col h-full bg-white rounded-2xl items-end px-4 lg:px-0">
              <Button
                text="Add Service"
                variant="filled"
                onClick={() => setIsOpen(true)}
                className="bg-primary text-white py-4 mr-2 my-6 lg:my-2"
              />
              <div className="overflow-auto w-[95vw] lg:w-full">
                <Table handleEdit={handleEdit} handleDelete={handleDelete} />
              </div>{" "}
            </div>
          ) : loading ? (
            <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center mx-auto">
              <p className="text-medium font-normal">
                You Dont Have Any Services to Display
              </p>

              <Button
                text="Create a Service"
                variant="filled"
                className="bg-primary text-white"
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mx-auto">
          <p className="text-medium font-normal">
            Before creating Services, you have to first create a category
          </p>

          <Button
            text="Create a Category"
            variant="filled"
            className="bg-primary text-white"
            onClick={() => {
              navigate("/dashboard/manage-categories");
              setSelectedMenu("Manage Categories", "manage-categories");
            }}
          />
        </div>
      )}
      <CreateProduct
        title={isEdit ? "Edit" : "Create"}
        isOpen={isOpen}
        isEdit={isEdit}
        onClose={() => {
          setIsEdit(false);
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default ManageServices;
