import React, { useContext, useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

type showPasswordType = boolean;

type PayloadType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<PayloadType>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<showPasswordType>(false);
  const { register, isLoading } = useContext(AuthContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payload) {
      register(payload)
        .then((res) => {
          console.log(res);
          toast("Login Successful", { hideProgressBar: true });
        })
        .catch((err) => {
          console.log(err);
          toast(err?.response.data.error, { hideProgressBar: true });
        });
    }
  };

  const togglePassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

  return (
    <div className="register w-full min-h-[90vh] p-4 flex items-center justify-center">
      <div className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-white min-h-[80vh] rounded-3xl py-10 sm:p-10 p-2 border flex flex-col items-center justify-center">
        <div className="head flex flex-col items-center gap-2">
          <h3 className="text-2xl md:text-4xl font-bold">Create an Account</h3>
          <h5 className="font-normal text-sm">
            Please create an account to continue
          </h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="content py-10 w-full flex flex-col gap-8 items-center"
        >
          <div className="username flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Username:</label>
            <input
              className="w-full p-4 border rounded-lg font-normal text-sm bg-[#F1F4F9] border-[#D8D8D8] focus:outline-none"
              placeholder="John333"
              type="text"
              name="username"
              value={payload.username}
              onChange={handleChange}
            />
          </div>

          <div className="first-name flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">First Name:</label>
            <input
              className="w-full p-4 border rounded-lg font-normal text-sm bg-[#F1F4F9] border-[#D8D8D8] focus:outline-none"
              placeholder="John"
              type="text"
              name="firstName"
              value={payload.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="last-name flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Last Name:</label>
            <input
              className="w-full p-4 border rounded-lg font-normal text-sm bg-[#F1F4F9] border-[#D8D8D8] focus:outline-none"
              placeholder="Doe"
              type="text"
              name="lastName"
              value={payload.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="email flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Email address:</label>
            <input
              className="w-full p-4 border rounded-lg font-normal text-sm bg-[#F1F4F9] border-[#D8D8D8] focus:outline-none"
              placeholder="Johndoe@mail.com"
              type="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
            />
          </div>

          <div className="phone-number flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Phone Number:</label>
            <input
              className="w-full p-4 border rounded-lg font-normal text-sm bg-[#F1F4F9] border-[#D8D8D8] focus:outline-none"
              placeholder="092******"
              type="tel"
              name="phone"
              value={payload.phone}
              onChange={handleChange}
            />
          </div>

          <div className="password flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <label className="text-sm font-normal">Password:</label>
              <button className="text-sm font-normal text-dark-gray">
                Forgot Password?
              </button>
            </div>
            <div className="w-full border rounded-lg font-normal  border-[#D8D8D8] flex relative">
              <input
                className="w-full p-4 h-full bg-[#F1F4F9] focus:outline-none"
                placeholder="*******"
                name="password"
                value={payload.password}
                onChange={handleChange}
                type={!showPassword ? "password" : "text"}
              />
              <button
                className="w-10 flex items-center justify-center bg-transparent absolute right-8 h-full"
                onClick={togglePassword}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center w-full">
            <button className="bg-primary w-[80%] py-4 md:px-20 rounded-lg text-white font-normal flex justify-center">
              Create An Account
              {isLoading && (
                <span className="spinner ml-2">
                  <ClipLoader
                    color={"#023E8A"}
                    loading={isLoading}
                    cssOverride={override}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </span>
              )}
            </button>
            <div className="flex gap-4 flex-wrap items-center justify-center">
              <p className="font-normal">Already have an account?</p>{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-bold underline text-primary"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
