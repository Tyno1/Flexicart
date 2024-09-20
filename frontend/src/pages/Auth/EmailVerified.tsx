import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmailVerified: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/auth/verify-registration?token=${token}`
        )
        .then((response) => {
          setIsLoading(false);
          if (response.status == 201) {
            setIsVerified(true);
          } else {
            console.log("Oops! Something went wrong");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsVerified(false);
          console.log(error);
        });
    }
  }, [token]);
  return (
    <div className="login w-full min-h-[90vh] p-4 flex items-center justify-center">
      <div className="w-[40vw] bg-white h-[80vh] rounded-3xl p-10 border flex flex-col items-center justify-center">
        {isLoading ? (
          <div className=""> loading</div>
        ) : isVerified ? (
          <h2 className="text-2xl font-bold mb-4">
            Your Email has Successfully been verified
          </h2>
        ) : (
          <h2 className="text-2xl font-bold mb-4">
            Your Email has Failed to be verified
          </h2>
        )}
        <button
          onClick={() => navigate("/login")}
          className="bg-primary py-4 px-40 rounded-lg text-white font-normal"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
