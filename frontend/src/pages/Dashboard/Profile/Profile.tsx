import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import Button from "../../../components/ui/Button";
import EditProfile from "./EditProfile";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const { userData, updateUserData, loading} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [image, setImage] = useState<string | ArrayBuffer | null>("");


  const [formData, setFormData] = useState<any>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trimStart() });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => {
          return { ...prevFormData, logo: reader.result };
        });
        // setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUserData(formData)
      .then(() => {
        toast.success("Profile updated successfully!", {
          hideProgressBar: true,
        });
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Error updating profile!", { hideProgressBar: true });
      });
  };

  useEffect(() => {
    setFormData({
      username: userData?.username || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      imageUrl: userData?.imageUrl || "",
    });
  }, [userData]);
  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
      <div className="flex w-full justify-between px-4 py-10">
        <h1 className="text-black text-4xl font-medium">Profile</h1>
        <Button
          onClick={() => setIsOpen(true)}
          text="Edit Profile"
          variant="filled"
          className="bg-primary text-white"
        />
      </div>

      <div className="container flex flex-col h-full w-full bg-white rounded-2xl shadow-lg p-10">
        {userData && (
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Profile Image Section */}
            <div className="image w-32 h-32">
              <img
                className="bg-primary object-cover object-fit w-full h-full rounded-full"
                src="https://via.placeholder.com/150" // Placeholder for user image
                alt="User Profile"
              />
            </div>

            {/* Profile Details Section */}
            <div className="profile-details flex flex-col items-start w-full gap-4">
              <div className="username flex flex-col ">
                <p className="font-medium text-sm">Username:</p>
                <p className="font-normal text-lg">{userData.username}</p>
              </div>
              <div className="fullName flex flex-col">
                <p className="font-medium text-sm">Full Name:</p>
                <p className="font-normal text-lg">{`${userData.firstName} ${userData.lastName}`}</p>
              </div>
              <div className="email flex flex-col">
                <p className="font-medium text-sm">Email:</p>
                <p className="font-normal text-lg">{userData.email}</p>
              </div>
              <div className="phone flex flex-col">
                <p className="font-medium text-sm">Phone:</p>
                <p className="font-normal text-lg">{userData.phone}</p>
              </div>
              <div className="verification flex flex-col">
                <p className="font-medium text-sm">Account Status:</p>
                <p className="font-normal text-lg">
                  {userData.isVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <EditProfile
        title={"Edit Profile"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
