import Button from "../../../components/ui/Button";
import { fontType, formDataType } from "../ManageAppData.tsx/ManageUiHome";
import Modal from "./CustomModal";

interface CreateAppUiProps {
  title?: string;
  formData: formDataType;
  fonts: fontType[];
  selectedFont: any;
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  setIsOpen: (value: boolean) => void;
  addBanner: (e: any) => void;
  removeBanner: (e: any) => void;
  handleBannerDelete: (value: string) => void;
  handleChange: (e: any) => void;
  handleFontChange: (e: any) => void;
  handleFontColorChange: (e: any) => void;
  handleBannerChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onSubmitValidation: (e: any) => void;
  formErrors: any;
}

const CreateAppUi: React.FC<CreateAppUiProps> = ({
  title,
  isSubmitting,
  isOpen,
  onClose,
  setIsOpen,
  handleChange,
  formData,
  fonts,
  selectedFont,
  handleFontChange,
  handleFontColorChange,
  handleBannerChange,
  handleBannerDelete,
  removeBanner,
  addBanner,
  onSubmitValidation,
  formErrors,
}) => {
  return (
    <Modal
      title={`${title} App Customisation`}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(!isOpen);
        onClose();
      }}
    >
      <div className="my-6 flex flex-col gap-10 bg-white rounded-2xl w-[100%] lg:w-full">
        <div className="Upload-customisation flex gap-4 flex-wrap overflow-nowrap">
          <form className="w-full h-full flex flex-col gap-8">
            <div className="custom-title flex flex-col gap-2 w-full">
              <label className="text-sm font-normal">App Display Title:</label>
              <input
                required
                className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
                placeholder="Unnamed Theme"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {formErrors.title && (
                <span className="text-red-500 text-sm">{formErrors.title}</span>
              )}
            </div>

            <div className="splash-screen-color flex flex-col gap-2 w-full">
              <label className="text-sm font-normal">
                Splash Screen Color:
              </label>
              <div className="w-full flex flex-wrap justify-between items-center gap-2 lg:gap-6">
                <div className="flex-1 w-full p-4 border rounded-lg flex font-normal bg-[#F1F4F9] border-[#D8D8D8]">
                  <p className="font-normal">
                    {!formData.splashScreenColor
                      ? "Choose a Color from the Color Palette"
                      : `SelectedColor: ${formData.splashScreenColor}`}
                  </p>
                </div>
                <input
                  name="splashScreenColor"
                  type="color"
                  className="w-[100px] md:w-[300px] h-14 cursor-pointer bg-transparent"
                  style={{ color: formData.splashScreenColor }}
                  value={formData.splashScreenColor}
                  onChange={handleChange}
                />
              </div>
              {formErrors.splashScreenColor && (
                <span className="text-red-500 text-sm">
                  {formErrors.splashScreenColor}
                </span>
              )}
            </div>

            <div className="primary-color flex flex-col gap-2 w-full">
              <label className="text-sm font-normal">Primary Color:</label>
              <div className="w-full flex flex-wrap justify-between items-center gap-2 lg:gap-6">
                <div className="flex-1 p-4 border rounded-lg flex font-normal bg-[#F1F4F9] border-[#D8D8D8]">
                  <p className="font-normal">
                    {!formData.primaryColor
                      ? "Choose a Color from the Color Palette"
                      : `Selected Color: ${formData.primaryColor}`}
                  </p>
                </div>
                <input
                  name="primaryColor"
                  type="color"
                  className="w-[100px] md:w-[300px] h-14 cursor-pointer bg-transparent"
                  style={{ color: formData.primaryColor }}
                  value={formData.primaryColor}
                  onChange={handleChange}
                />
              </div>
              {formErrors.primaryColor && (
                <span className="text-red-500 text-sm">
                  {formErrors.primaryColor}
                </span>
              )}
            </div>

            <div className="secondary-color flex flex-col gap-2 w-full">
              <label className="text-sm font-normal">Secondary Color:</label>
              <div className="w-full flex flex-wrap justify-between items-center gap-2 lg:gap-6">
                <div className="flex-1 p-4 border rounded-lg flex font-normal bg-[#F1F4F9] border-[#D8D8D8]">
                  <p className="font-normal">
                    {!formData.secondaryColor
                      ? "Choose a Color from the Color Palette"
                      : `Selected Color: ${formData.secondaryColor}`}
                  </p>
                </div>
                <input
                  name="secondaryColor"
                  type="color"
                  className="w-[100px] md:w-[300px] h-14 cursor-pointer bg-transparent"
                  style={{ color: formData.secondaryColor }}
                  value={formData.secondaryColor}
                  onChange={handleChange}
                />
              </div>
              {formErrors.secondaryColor && (
                <span className="text-red-500 text-sm">
                  {formErrors.secondaryColor}
                </span>
              )}
            </div>

            <div className="Font flex flex-col gap-2 w-full">
              <label className="text-sm font-normal">Font:</label>
              <div className="family-and-color flex flex-wrap gap-2">
                <select
                  required
                  style={{ fontFamily: selectedFont, fontWeight: "normal" }}
                  onChange={handleFontChange}
                  id="font"
                  name="font"
                >
                  {fonts &&
                    fonts.length > 0 &&
                    fonts.map((font: any) => (
                      <option key={font._id} value={font.name}>
                        {font.name}
                      </option>
                    ))}
                </select>
                {formErrors.fontName && (
                    <span className="text-red-500 text-sm">
                      {formErrors.fontName}
                    </span>
                  )}
                <div className="font-color flex flex-col gap-2 w-full">
                  <div className="w-full flex flex-wrap justify-between items-center gap-2 lg:gap-6">
                    <div className="flex-1 p-4 border rounded-lg flex font-normal bg-[#F1F4F9] border-[#D8D8D8]">
                      <p className="font-normal">
                        {!formData.font.color
                          ? "Choose a Color from the Color Palette"
                          : `Selected Color: ${formData.font.color}`}
                      </p>
                    </div>

                    <input
                      name="font.color"
                      type="color"
                      className="w-[100px] md:w-[300px] h-14 cursor-pointer bg-transparent"
                      style={{ color: formData.font.color }}
                      value={formData.font.color}
                      onChange={handleFontColorChange}
                    />
                  </div>

                  
                  {formErrors.fontColor && (
                    <span className="text-red-500 text-sm">
                      {formErrors.fontColor}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="products-services flex flex-col gap-8 lg:gap-2 lg:gap-6">
              <div className="flex gap-2 flex-col">
                <label className="text-sm font-normal">Products:</label>
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    className=" p-4 w-6 h-6 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
                    checked={formData.productEnabled}
                    onChange={handleChange}
                    name="productEnabled"
                  />
                  <p>{formData.productEnabled ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <label className="text-sm font-normal">Services:</label>
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    className=" p-4 w-6 h-6 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
                    checked={formData.serviceEnabled}
                    onChange={handleChange}
                    name="serviceEnabled"
                  />
                  <p>{formData.serviceEnabled ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
            </div>
            <div className="banners flex flex-col gap-2 w-full">
              <label className="text-sm font-normal">Banners:</label>
              {formData.banners?.map((banner: any) => (
                <div
                  key={banner?._id}
                  className="banner-item flex items-center gap-4"
                >
                  {!banner.image && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerChange(e, banner.index)}
                      className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
                    />
                  )}
                  {banner.image && (
                    <img
                      src={banner.image}
                      alt="Banner Preview"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <Button
                    text="Remove"
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      banner.image.startsWith("http")
                        ? handleBannerDelete(banner._id)
                        : removeBanner(banner.index);
                    }}
                    className="border text-sm text-danger font-normal border-danger"
                  />
                </div>
              ))}
              <Button
                text="Add Banner"
                variant="outlined"
                onClick={addBanner}
                className="border text-sm text-primary py-6 lg:py-2 font-normal border-primary"
              />
            </div>

            <Button
              text={title === "Edit" ? "Save Edit" : "Create New Display"}
              variant="filled"
              onClick={onSubmitValidation}
              isSubmitting={isSubmitting}
              className="border bg-primary text-white p-4 py-6 lg:py-2 rounded-lg font-medium"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAppUi;
