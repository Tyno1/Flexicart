import React from "react";
import Button from "../../components/ui/Button";
import iphone from "../../assets/images/iphone.png";
import { FaMobileAlt, FaLock, FaStoreAlt, FaDollarSign, FaTags, FaShoppingCart, FaComment } from "react-icons/fa";

const Download: React.FC = () => {
  return (
    <div className="px-8 lg:px-48 bg-white min-h-[90vh] flex flex-col p-10 items-center w-full">
      <h1 className="text-5xl text-center font-medium leading-tight mb-10">
        Download Our App
      </h1>

      <div className="flex flex-col items-center w-full mb-16">
        <p className="text-xl text-black leading-relaxed mb-4 text-center max-w-[50rem]">
          Experience the best features and seamless performance with our app.
          Download it now and enjoy a world of convenience and efficiency.
        </p>
        <Button
          text="Download Android Version Now"
          variant="filled"
          className="bg-primary text-white px-8 py-4 rounded-lg"
          onClick={() => {
            window.location.href = "https://expo.dev/accounts/tyno205/projects/mobile-app/builds/ad28c5cb-0f94-41c8-aa46-7cb454c7f7f2";
          }}
        />
        <div className="h-[30rem] mt-14">
          <img
            src={iphone}
            alt="iPhone"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="features w-full mb-16 text-center">
        <h2 className="text-4xl font-medium mb-10">Key Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <FeatureItem
            icon={<FaMobileAlt size={32} className="text-primary" />}
            title="User-Friendly Setup"
            description="Easy account creation and customization for non-technical users."
          />

          <FeatureItem
            icon={<FaStoreAlt size={32} className="text-primary" />}
            title="Customizable Store Front"
            description="Flexible options to tailor the app to specific business needs."
          />

          <FeatureItem
            icon={<FaMobileAlt size={32} className="text-primary" />}
            title="Cross-Platform Compatibility"
            description="Efficient performance on both Android and iOS devices."
          />

          <FeatureItem
            icon={<FaLock size={32} className="text-primary" />}
            title="Integrated Security"
            description="Robust security measures to protect business and customer data."
          />

          <FeatureItem
            icon={<FaDollarSign size={32} className="text-primary" />}
            title="Cost-Effective Solution"
            description="Reduced development costs compared to custom-built options."
          />

          <FeatureItem
            icon={<FaTags size={32} className="text-primary" />}
            title="Product Management"
            description="Easy addition, editing, and removal of products in the store."
          />

          <FeatureItem
            icon={<FaShoppingCart size={32} className="text-primary" />}
            title="Order Processing"
            description="Streamlined system for managing customer orders."
          />

          <FeatureItem
            icon={<FaComment size={32} className="text-primary" />}
            title="Customer Interaction"
            description="Tools for communicating with customers and managing feedback."
          />
          
        </div>
      </div>
    </div>
  );
};

// Feature Item Component
const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-medium mb-2">{title}</h3>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default Download;
