import React, { useContext } from "react";
import { Table } from "./Table";
import { OrderContext } from "../../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const OrderList: React.FC = () => {
  const { loading, error, orders } = useContext(OrderContext);
  const navigate = useNavigate()
  const handleClick = (item: any) => {
    console.log(item._id);
    navigate(`/dashboard/order-list/${item._id}`)
    
  };

  if (loading) {
    <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      Loading...
    </div>;
  } else if (error) {
    <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      Something went wrong
    </div>;
  }

  return (
    <div className="pt-10 lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
      {orders && orders.length > 0 && (
        <div className="flex flex-col h-full bg-white rounded-2xl items-end overflow-auto w-[95vw] lg:w-full">
          <Table handleClick={handleClick} />
        </div>
      )}
    </div>
  );
};

export default OrderList;
