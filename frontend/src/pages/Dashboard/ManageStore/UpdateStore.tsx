import React, { useContext, useRef, useState, CSSProperties } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

type PayloadType = {
  name?: string;
  logo?: string | ArrayBuffer | null;
  storeType?: string;
  storeDescription?: string;
  address?: string;
  owner?: any;
};

type OutletContext = {
  user: any;
};
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const UpdateStore: React.FC = () => {
  const { user } = useOutletContext<OutletContext>();
  const { updateStoreById, loading, store } = useContext(StoreContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [payload, setPayload] = useState<PayloadType>({
    name: store?.shopDetails.name,
    storeType: store?.shopDetails.storeType,
    storeDescription: store?.shopDetails.storeDescription,
    address: store?.shopDetails.address,
    owner: user.user,
    logo: store?.shopDetails.logo,
  });
  // const [image, setImage] = useState<string | ArrayBuffer | null>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPayload({ ...payload, [e.target.name]: e.target.value.trimStart() });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPayload((prevFormData: PayloadType) => {
          return { ...prevFormData, logo: reader.result };
        });
        // setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payload) {
      updateStoreById(payload)
        .then((res) => {
          navigate("/dashboard/manage-store");
          console.log(res);
        })
        .catch(() =>
          toast("Something went wrong...", { hideProgressBar: true })
        );
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  if (loading) {
    toast("updating...", { hideProgressBar: true });
  }
 
  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray">
      <div className="container w-[100vw] lg:w-full h-full bg-white rounded-2xl">
        <form
          onSubmit={handleUpdate}
          className="h-full w-full flex flex-col gap-8 items-center lg:p-14 px-4"
        >
          <div className="mt-10 lg:mt-0 logo-upload flex flex-wrap gap-10 w-full pb-14 items-center justify-center lg:justify-start border-b">
            <div
              style={{ borderRadius: "100px" }}
              className="w-[150px] h-[150px] border-0 bg-[#F1F4F9] flex"
            >
              <img
                style={{ borderRadius: "100px" }}
                className="w-full h-full object-contain object-center"
                src={payload?.logo ? (payload.logo as string) : ""}
                alt=""
              />
            </div>

            <div className="text-sm flex flex-col items-center gap-4">
              <input
                ref={fileInputRef}
                name="logo"
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <Button
                text="Upload Image"
                variant="filled"
                className="bg-primary text-white"
                onClick={handleButtonClick}
              />

              <p className="leading-tight italic">
                Image must be a transparent png format
              </p>
            </div>
          </div>

          <div className="StorepName flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Store Name:</label>

            <input
              required
              className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
              placeholder="Doe Enterprise"
              type="text"
              name="name"
              value={payload.name}
              onChange={handleChange}
            />
          </div>

          <div className="Store-Type flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Store Type:</label>

            <input
              required
              className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
              placeholder="Clothing Retail"
              type="text"
              name="storeType"
              value={payload.storeType}
              onChange={handleChange}
            />
          </div>

          <div className="Shop-Description flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Store Description:</label>

            <textarea
              required
              className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
              placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptatum blanditiis optio"
              name="storeDescription"
              value={payload.storeDescription}
              onChange={handleChange}
            />
          </div>

          <div className="Shop-location flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Location:</label>

            <input
              required
              className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
              placeholder="London, United Kingdom"
              type="text"
              name="address"
              value={payload.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4 items-center w-full mb-8">
            <button className="bg-primary py-6 w-full px:20 lg:px-40 rounded-lg text-white font-normal">
              {loading ? (
                <div className="flex gap-4">
                  <ClipLoader
                    color={"#023E8A"}
                    loading={loading}
                    cssOverride={override}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <p>Updating</p>
                </div>
              ) : (
                <p> Save Information</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStore;
