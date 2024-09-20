import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentConfirmationPage = () => {
  const [param] = useSearchParams();
  const status = param.get("status");

  useEffect(() => {
    // Perform any necessary actions based on payment status
  }, [status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        {status === "success" ? (
          <div>
            <h1 className="text-2xl font-semibold text-green-600">Payment Successful</h1>
            <p className="mt-4 text-gray-700">Thank you for your purchase!</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-red-600">Payment Failed</h1>
            <p className="mt-4 text-gray-700">Something went wrong. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
