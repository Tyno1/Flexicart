import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../../context/OrderContext";
import Button from "../../../components/ui/Button";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { getOrderById, order, loading, error } = useContext(OrderContext);

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
        Something went wrong
      </div>
    );
  }

  return (
    order && (
      <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
        <div className="container bg-white pt-10 lg:pt-0  p-4 lg:p10 rounded-2xl w-full max-w-4xl">
          {/* Order Overview */}
          <div className="flex flex-wrap gap-4 justify-between items-start mb-10">
            <h1 className="text-3xl font-medium">Order Details</h1>
            <Button
              text="Back to Orders"
              variant="outlined"
              className="border-primary text-primary font-normal"
              onClick={() => history.back()}
            />
          </div>

          {/* Order Information */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Order ID:</div>
              <div className="text-sm">{order._id}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Status:</div>
              <div className="text-sm">{order.status}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Subtotal:</div>
              <div className="text-sm">${order.subtotal}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Total:</div>
              <div className="text-sm">${order.total}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Order Date:</div>
              <div className="text-sm">
                {new Date(order.orderDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-10">
            <h2 className="text-xl font-medium">Items:</h2>
            <ul className="flex flex-col gap-4 mt-4">
              {order.items.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between gap-8 items-center border-b py-4"
                >
                  <div>
                    <p className="text-sm font-medium">Item ID: {item._id}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-right">
                    Price: ${item.price.unit_amount}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderDetails;
