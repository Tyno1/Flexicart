import React from "react";
import { useNavigate } from "react-router-dom";

const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login w-full min-h-[90vh] p-4 flex items-center justify-center">
      <div className="w-[40vw] bg-white h-[80vh] rounded-3xl p-10 border flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email Address</h2>
        <p className="mb-4">
          We have sent an email to your provided email address. Please click on
          the verification link in the email to verify your account.
        </p>
        <p className="mb-4">
          If you have not received the email, please check your spam folder.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-primary py-4 px-40 rounded-lg text-white font-normal"
          >
          Go to Email
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmation;
