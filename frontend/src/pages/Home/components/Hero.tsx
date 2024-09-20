import React from "react";
import hero1 from "../../../assets/images/becca-tapert-QofjUnxy9LY-unsplash.jpg";
import hero2 from "../../../assets/images/rasheed-kemy-oqY09oVTa3k-unsplash.jpg";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-10 lg:px-32 xl:px-48 bg-black min-h-[90vh] flex flex-col md:flex-row p-10 items-center w-[full] gap-10 md:gap-0">
      <div className="left-section w-full md:w-[40%] flex flex-col gap-4">
        <h1 className="text-white text-normal text-4xl md:text-7xl text-center md:text-left">
          Change The Way You Do{" "}
          <span className="font-black text-[#DAEAFF]">Business</span>
        </h1>
        <p className="text-white text-sm font-light text-center md:text-left">
          The all-in-one solution designed to revolutionise your e-commerce
          experience. Whether you're a business owner looking to manage your
          online store effortlessly or a shopper seeking a seamless, intuitive
          mobile shopping experience.
        </p>
        <div className="flex gap-4 w-full justify-center md:justify-start">
          <Button
            text="Business"
            variant="filled"
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-10 py-4"
          />
          <Button
            text="Shopper"
            variant="filled"
            onClick={() => navigate("/download")}
            className="bg-primary text-white px-10 py-4"
          />
        </div>
      </div>
      <div className="right-section md:ml-auto w-[100%] sm:w-[25rem] h-[25rem]">
        <div className="flex flex-col flex-wrap h-full w-full">
          <div className="bg-primary w-1/2 h-1/2">
            <img className="object-cover w-full h-full" src={hero2} alt="" />
          </div>
          <div
            style={{ borderRadius: "0 12.5rem 0 0" }}
            className="bg-white w-1/2 h-1/2"
          ></div>
          <div
            style={{ borderRadius: "12.5rem 0 0 12.5rem" }}
            className="bg-white w-1/2 h-1/2"
          ></div>
          <div className="bg-white w-1/2 h-1/2">
            <img className="object-cover w-full h-full" src={hero1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
