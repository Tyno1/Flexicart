import React, { useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import { CategoryContext } from "../../../context/CategoryContext";
import { ProductContext } from "../../../context/ProductContext";
import { StoreContext } from "../../../context/StoreContext";
import CreateProduct from "./CreateProducts";
import { Table } from "./Table";

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
  _id?: string;
};

const ManageProducts: React.FC = () => {
  const { setSelectedMenu } = useOutletContext<any>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {
    deleteProduct,
    editProduct,
    createProduct,
    products,
    loading,
    error,
  } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { store } = useContext(StoreContext);

  const defaultFormData = {
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    imageUrls: [],
    shop: "",
  };
  const [formData, setFormData] = useState<ProductType>(defaultFormData);

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

      console.log(newPayload);

      (isEdit ? editProduct(newPayload) : createProduct(newPayload))
        .then(() => {
          setFormData(defaultFormData);
          setIsOpen(false);
          toast("Product saved successfully", {
            hideProgressBar: true,
          });
        })
        .catch(() => {
          console.log(error);
          toast("Product not saved", { hideProgressBar: true });
        });
    }
  };

  const handleEdit = (product: ProductType) => {
    setFormData(product);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId)
      .then((res) => {
        toast("Product deleted successfully", {
          hideProgressBar: true,
        });
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      Loading...
    </div>;
  }


  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
      {categories && categories.length > 0 ? (
        <div className="container w-full flex flex-col h-full gap-10">
          {products && products.length > 0 ? (
            <div className="flex flex-col h-full bg-white rounded-2xl items-end px-4 lg:px-0">
              <Button
                text="Add Product"
                variant="filled"
                onClick={() => setIsOpen(true)}
                className="bg-primary text-white py-4 mr-2 my-6 lg:my-2"
              />
              <div className="overflow-auto w-[95vw] lg:w-full">
                <Table handleEdit={handleEdit} handleDelete={handleDelete} />
              </div>
            </div>
          ) : loading ? (
            <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center mx-auto">
              <p className="text-medium font-normal">
                You Dont Have Any Products to Display
              </p>

              <Button
                text="Create a Product"
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
            Before creating products, you have to first create a category
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

export default ManageProducts;
