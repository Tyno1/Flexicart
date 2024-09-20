import React, { useContext, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

type PayloadType = {
  email: string;
  password: string;
};
type showPasswordType = boolean;

const Login: React.FC = () => {
  const { login, isLoading } = useContext(AuthContext);
  const [payload, setPayload] = useState<PayloadType>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<showPasswordType>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payload) {
      login(payload)
        .then(() => {
          toast("Login Successful", { hideProgressBar: true });
        })
        .catch((error) => {
          toast(error?.response.data.error, { hideProgressBar: true });
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

  const navigate = useNavigate();

  if (isLoading) {
    toast("Loading...", { hideProgressBar: true });
  }

  return (
    <div className="login w-full min-h-[90vh] p-4 flex items-center justify-center">
      <div className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-white h-[80vh] rounded-3xl py-10 sm:p-10 p-2 border flex flex-col items-center justify-center">
        <div className="head flex flex-col items-center gap-2">
          <h3 className="text-2xl sm:text-4xl font-bold">Login to Account</h3>
          <h5 className="font-normal text-sm text-center">
            Please enter your email and password to continue
          </h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="content py-10 w-full flex flex-col gap-10 items-center"
        >
          <div className="email flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Email address:</label>
            <input
              required
              className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8] focus:outline-none"
              placeholder="Johndoe@mail.com"
              type="email"
              name="email"
              value={payload.email}
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
                required
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
            <button className="bg-primary py-4 md:px-20 w-[80%] rounded-lg text-white font-normal flex justify-center">
              Sign In
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
              <p className="font-normal">Don’t have an account?</p>{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-bold underline text-primary"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
