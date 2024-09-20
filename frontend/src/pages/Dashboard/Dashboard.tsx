import moment from "moment";
import React from "react";
import { useOutletContext } from "react-router-dom";
import DashboardCard from "./components/DashboardCard";
// import Chart from "react-apexcharts";


interface OutletContext {
  user: any;
  storeUsers: any[];
  orders: any[];
}
const Dashboard: React.FC = () => {
  const { user, storeUsers, orders } = useOutletContext<OutletContext>();

  const date = moment().format("MMMM Do YYYY");

  const totalSales = orders.reduce((sum, order) => {
    return sum + order.total;
  }, 0);
  const averageOrderValue =
    orders.length > 0 ? (totalSales / orders.length).toFixed(2) : "0.00";

    // const chartOptions: ApexCharts.ApexOptions = {
    //   chart: {
    //     id: "sales-chart",
    //   },
    //   xaxis: {
    //     categories: orders.map((order) =>
    //       moment(order.orderDate).format("MMM Do")
    //     ), // Order dates formatted as months and days
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   title: {
    //     text: "Sales Over Time",
    //     align: "left", // Align property should be one of: 'left', 'center', 'right'
    //   },
    // };
  
    // const chartSeries = [
    //   {
    //     name: "Sales",
    //     data: orders.map((order) => order.total), // Total sales for each order
    //   },
    // ];
  

  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-start">
      <div className="flex flex-col items-right justify-end w-full">
        <h1 className="text-black text-xl lg:text-3xl font-medium">
          Welcome Back, {user?.user.fullName}
        </h1>
        <p className="text-gray-500 text-lg font-medium">{date}</p>
      </div>
      <div className="flex w-full gap-4 flex-wrap justify-center">
        <DashboardCard
          title="Registered Users"
          value={storeUsers.length.toString()}
          percentage="20%"
          detail={<span className="text-green-600">vs last month</span>}
        />
        <DashboardCard
          title="Sales"
          value={"£" + totalSales.toString()}
          percentage="19% "
          detail={<span className="text-green-600">vs last month</span>}
        />
        <DashboardCard
          title="Average Order Value"
          value={"£" + averageOrderValue}
          percentage="23% "
          detail={<span className="text-green-600">vs last month</span>}
        />
      </div>
      {/* <div className="w-full mt-8">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar" // You can change this to "bar", "area", etc.
          width={"80vw"}
          height={320}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
