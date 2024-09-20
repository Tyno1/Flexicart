import React from "react";
import { FaSpinner } from "react-icons/fa";
import Button from "../../../components/ui/Button";
import Modal from "../components/CustomModal";

type EditProfileProp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  title: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    imageUrl?: File;
    [key: string]: any;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

const EditProfile: React.FC<EditProfileProp> = ({
  title,
  isOpen,
  onClose,
  setIsOpen,
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  loading,
}) => {
  console.log(formData);

  return (
    <Modal
      title={`${title}`}
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
        <div className="username flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Username:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="firstName flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">First Name:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="lastName flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Last Name:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="email flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Email:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="phone flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Phone:</label>
          <input
            required
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            placeholder="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="profile-picture flex flex-col gap-2 w-full">
          <label className="text-sm font-normal">Profile Picture:</label>
          <input
            className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-end w-full gap-4 items-center">
          <Button
            type="submit"
            text={!loading ? "Save Changes" : "Saving Changes"}
            variant="filled"
            className="bg-primary text-white"
          />
          {loading ? <FaSpinner /> : null}
        </div>
      </form>
    </Modal>
  );
};

export default EditProfile;
