import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import { AppDataContext } from "../../../context/AppDataContext";
import { toast } from "react-toastify";

type appDataType = {
  _id: string;
  title: string;
  splashScreenColor: string;
  primaryColor: string;
  secondaryColor: string;
  font: { family: string; color: string };
  banners?: { image?: string }[];
  productEnabled: boolean;
  serviceEnabled: boolean;
  createdBy: string;
  currentOwner: string;
};

const ManageStoreHome: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedMenu } = useOutletContext<any>();
  const { appDatas, loading: appDataLoading } = useContext(AppDataContext);
  const { store, loading, error, updateStoreWithShop } =
    useContext(StoreContext);
  const [selectedAppData, setSelectedAppData] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAppData(e.target.value);
  };

  const handleChangeDefault = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Selected App Data ID:", selectedAppData);
    updateStoreWithShop({ shopUI: selectedAppData })
      .then((res: any) => toast(res?.data.message, { hideProgressBar: true }))
      .catch((error) => toast(`Error: ${error}`, { hideProgressBar: true }));
  };


  useEffect(() => {
    if (appDatas && appDatas.length === 1) {
      setSelectedAppData(appDatas[0]?._id);
    }
  }, [appDatas]);
  
  if (loading) {
    return (
      <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error && error.response.data.error !== "Shop not found") {
    toast(`Error: ${error?.message}`);
  }

  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      <div className="container flex flex-col h-full">
        {store ? (
          <div className="flex flex-col gap-10">
            <div className="details-and-ui flex flex-col gap-14 bg-white rounded-2xl gap-10 p-10">
              <div className="store-details flex flex-col items-start gap-10">
                <div className="flex flex-wrap gap-4 justify-between items-start w-full">
                  <h1 className="text-3xl font-medium">Store Details</h1>

                  <Button
                    text="Manage Store Details"
                    variant="outlined"
                    className="border-primary text-primary font-normal"
                    onClick={() => navigate("update-store")}
                  />
                </div>
                <div className="flex gap-10 items-center flex-col lg:flex-row mt-10 lg:mt-0">
                  <div
                    style={{ borderRadius: "100px" }}
                    className="flex gap-4 items-center w-40 h-40 border "
                  >
                    <img
                      style={{ borderRadius: "100px" }}
                      className="w-full h-full object-contain object-center rounded-full"
                      src={store?.shopDetails.logo}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium">Name:</p>
                      <p className="name text-medium font-medium">
                        {store.shopDetails.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium">Store Type:</p>
                      <p className="name text-medium font-medium">
                        {store.shopDetails.storeType}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium">Store Address:</p>
                      <p className="name text-medium font-medium">
                        {store.shopDetails.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-sm font-medium">Store Description:</p>
                  <p className="description text-medium text-wrap">
                    {store.shopDetails.storeDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="custom-settings flex flex-col gap-14 bg-white rounded-2xl gap-4 p-10">
              <div className="flex flex-wrap gap-4 justify-between items-start w-full">
                <h1 className="text-3xl font-medium">
                  Customisable App Display
                </h1>

                <Button
                  text="Manage App Display"
                  variant="outlined"
                  className="border-primary text-primary font-normal"
                  onClick={() => {
                    navigate("/dashboard/manage-app-display");
                    setSelectedMenu("Manage App Display", "manage-app-display");
                  }}
                />
              </div>

              <form className="flex flex-col items-start gap-6 mt-10 lg:mt-0">
                <label className="font-medium" htmlFor="app-data">
                  Choose Default App Display:
                </label>
                <select
                  onChange={handleChange}
                  className="w-full p-4 border border-[1px] border-black rounded-lg text-normal font-normal"
                  name="app-data"
                  id="app-data"
                >
                  {appDataLoading && <div> loading...</div>}
                  {appDatas && appDatas.length > 0 ? (
                    appDatas.map((appData: appDataType) => (
                      <option
                        key={appData._id}
                        value={appData._id}
                        selected={appData?._id === store?.shopUI}
                      >
                        {appData?.title}
                      </option>
                    ))
                  ) : (
                    <option>No App Data to display yet</option>
                  )}
                </select>
                <Button
                  text="Change Default"
                  variant="filled"
                  className="bg-primary text-white"
                  onClick={handleChangeDefault}
                />
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-medium font-normal">
              You have not created your Store yet
            </p>
            <Button
              text="Create Store"
              variant="filled"
              className="bg-primary text-white"
              onClick={() => navigate("create-store")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStoreHome;
