import React, { useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import { AppDataContext } from "../../../context/AppDataContext";
import { AuthContext } from "../../../context/AuthContext";
import { FontContext } from "../../../context/FontContext";
import { StoreContext } from "../../../context/StoreContext";
import CreateAppUi from "../components/CreateAppUi";

export type fontType = {
  family: string;
  color: string;
};

export type bannerType = {
  image?: string;
  index: number;
};

export type formDataType = {
  title: string;
  splashScreenColor: string;
  primaryColor: string;
  secondaryColor: string;
  font: fontType;
  banners?: bannerType[];
  productEnabled: boolean;
  serviceEnabled: boolean;
  createdBy: string;
  currentOwner: string;
  _id?: string;
};

const ManageUiHome: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedMenu } = useOutletContext<any>();
  const {
    loading,
    appDatas,
    getAppData,
    createAppData,
    editAppData,
    deleteAppDataBannerImage,
    deleteAppData,
  } = useContext(AppDataContext);
  const { store } = useContext(StoreContext);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { fonts } = useContext(FontContext);
  const defaultFormData = {
    title: "",
    splashScreenColor: "#000",
    primaryColor: "#000",
    secondaryColor: "#000",
    font: {
      family: "",
      color: "#000",
    },
    banners: [],
    productEnabled: false,
    serviceEnabled: false,
    createdBy: user.user._id,
    currentOwner: user.user._id,
  };
  const [formData, setFormData] = useState<formDataType>(defaultFormData);
  // State to track form errors
  const [formErrors, setFormErrors] = useState<any>({});

  // Validation check
  const validateForm = () => {
    const errors: any = {};
    if (!formData.title) errors.title = "App Display Title is required";
    if (!formData.splashScreenColor)
      errors.splashScreenColor = "Splash Screen Color is required";
    if (!formData.primaryColor)
      errors.primaryColor = "Primary Color is required";
    if (!formData.secondaryColor)
      errors.secondaryColor = "Secondary Color is required";
    if (!formData.font?.color) errors.fontColor = "Font color is required";
    if (!formData.font?.family) errors.fontName = "Please select a Font";

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "color" || e.target.type === "text") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    } else if (e.target.type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.checked,
      }));
    }
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      font: {
        ...prevFormData.font,
        family: e.target.value,
      },
    }));
  };

  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      font: {
        ...prevFormData.font,
        color: e.target.value,
      },
    }));
  };
  const handleBannerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => {
          const newBanners = (prevFormData.banners || []).map((banner) =>
            banner.index === index
              ? { ...banner, image: reader.result as string }
              : banner
          );
          return { ...prevFormData, banners: newBanners };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addBanner = (e: any) => {
    e.preventDefault();
    const newBanner = { index: (formData.banners || []).length, image: "" };
    setFormData((prevFormData) => ({
      ...prevFormData,
      banners: [...(prevFormData.banners || []), newBanner],
    }));
  };

  const removeBanner = (index: number) => {
    setFormData((prevFormData) => {
      const newBanners = (prevFormData.banners || [])
        .filter((banner) => banner.index !== index)
        .map((banner, idx) => ({ ...banner, index: idx }));
      return { ...prevFormData, banners: newBanners };
    });
  };

  const handleBannerDelete = (id: string) => {
    deleteAppDataBannerImage(formData._id, id)
      .then(() => {
        toast("Banner deleted successfully", {
          hideProgressBar: true,
        });
        setIsOpen(false);
        getAppData();
      })
      .catch(() => {
        toast("Deletion error", {
          hideProgressBar: true,
        });
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (isEdit ? editAppData(formData) : createAppData(formData))
      .then((res) => {
        setIsOpen(false);
        toast("Customisation saved successfully", {
          hideProgressBar: true,
        });
        console.log(res);
        setFormData(defaultFormData);
      })
      .catch((error) => {
        toast("Something went wrong", {
          hideProgressBar: true,
        });
        console.error(error);
      });
  };

  // Handle submit with validation
  const onSubmitValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.log(errors);

      return;
    }

    setFormErrors({}); // Clear errors if validation passes
    handleSubmit(e); // Call the original submit function
  };

  const handleEdit = (data: any) => {
    setFormData(data);
    setIsOpen(true);
    setIsEdit(true);
  };
  const handleDelete = (appDataId: string) => {
    deleteAppData(appDataId)
      .then(() => {
        toast("AppData deleted successfully", {
          hideProgressBar: true,
        });
        getAppData();
      })
      .catch(() => {
        toast("Deletion error", {
          hideProgressBar: true,
        });
      });
  };

  if (loading) {
    <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      Loading...
    </div>;
  }

  if (Object.keys(formErrors).length >= 1) {
    toast("Kindly fill all fields", { hideProgressBar: true });
  }

  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      {store ? (
        <>
          <div className="container flex flex-col h-[100vh] w-full gap-10">
            <div className="top-section flex flex-col gap-4 lg:gap-10 bg-white p-10 rounded-2xl h-full">
              <h1 className="text-3xl font-medium">
                Explore Saved Customisations
              </h1>
              <Button
                text="Create Customisation"
                variant="outlined"
                onClick={() => setIsOpen(true)}
                className="border border-primary text-primary p-4 rounded-lg font-medium"
              />
              {appDatas && appDatas?.length > 0 && (
                <div className="flex items-center gap-4">
                  <p>To Select a Default Theme, Navigate to</p>{" "}
                  <Button
                    text=" Manage Store"
                    variant="filled"
                    onClick={() => navigate("/dashboard/manage-store")}
                    className="bg-primary text-white text-sm"
                  />
                </div>
              )}
              <div className="list-container flex gap-2 flex-wrap overflow-nowrap mt-10 lg:mt-0 w-full">
                {appDatas && appDatas?.length > 0 ? (
                  appDatas.map((appData: any) => (
                    <div
                      className="w-full lg:w-60 max-h-60 flex flex-col justify-between items-center gap-4"
                      key={appData._id}
                    >
                      <button
                        onClick={() => setSelectedCard(appData._id)}
                        className={`card relative w-full h-40 p-4 flex flex-col justify-end text-black rounded-lg items-start bg-white border border-myGray shadow-lg text-xs gap-2`}
                      >
                        {store && store.shopUI === appData._id && (
                          <div className="bg-primary text-white px-2 py-1 rounded-lg absolute top-3 right-3">
                            default
                          </div>
                        )}

                        <div className="flex gap-2">
                          <p className="font-normal">Title:</p>
                          <p className="font-bold text-start">
                            {appData.title}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <p className="font-normal">Primary Color:</p>
                          <div
                            style={{ backgroundColor: appData.primaryColor }}
                            className="w-4 h-4 rounded shadow-sm"
                          ></div>
                        </div>

                        <div className="flex gap-2">
                          <p className="font-normal">Font Family:</p>
                          <p
                            style={{ fontFamily: appData.font.family }}
                            className="font-bold text-start"
                          >
                            {appData.font.family}
                          </p>
                        </div>
                      </button>
                      {selectedCard === appData._id && (
                        <div className="flex w-full flex-row items-center justify-center gap-2">
                          <Button
                            text="Edit"
                            variant="filled"
                            onClick={() => handleEdit(appData)}
                            className=" border text-sm text-primary font-normal border-primary"
                          />
                          <Button
                            text="Delete"
                            variant="filled"
                            onClick={() => handleDelete(appData?._id)}
                            className="border text-sm text-danger font-normal border-danger"
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col gap-4 items-center justify-center mx-auto">
                    <p className="text-medium font-normal">
                      You have not Customised an App Display yet
                    </p>

                    <Button
                      text="Customise App Display"
                      variant="filled"
                      className="bg-primary text-white"
                      onClick={() => setIsOpen(true)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <CreateAppUi
            title={isEdit ? "Edit" : "Create"}
            formData={formData}
            fonts={fonts}
            selectedFont={selectedFont}
            addBanner={addBanner}
            isOpen={isOpen}
            onClose={() => {
              setFormData(defaultFormData);
              setIsEdit(false);
            }}
            setIsOpen={setIsOpen}
            removeBanner={removeBanner}
            handleBannerDelete={handleBannerDelete}
            handleChange={handleChange}
            handleFontChange={handleFontChange}
            handleFontColorChange={handleFontColorChange}
            handleBannerChange={handleBannerChange}
            onSubmitValidation={onSubmitValidation}
            formErrors={formErrors}
          />
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mx-auto">
          <p className="text-medium font-normal">
            Set up your store before creating an App Display
          </p>
          <Button
            text="Setup Store"
            variant="filled"
            className="bg-primary text-white"
            onClick={() => {
              navigate("/dashboard/manage-store/create-store");
              setSelectedMenu("Manage Store", "manage-store");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUiHome;
