import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import RootLayout from "./layouts/RootLayout";
import About from "./pages/About/About";
import EmailConfirmation from "./pages/Auth/EmailConfirmation";
import EmailVerified from "./pages/Auth/EmailVerified";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact/contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageUiHome from "./pages/Dashboard/ManageAppData.tsx/ManageUiHome";
import ManageCategories from "./pages/Dashboard/ManageCategories/ManageCategories";
import ManageInventory from "./pages/Dashboard/ManageInventory/ManageInventory";
import ManageProducts from "./pages/Dashboard/ManageProducts/ManageProducts";
import ManageServices from "./pages/Dashboard/ManageServices/ManageServices";
import CreateStore from "./pages/Dashboard/ManageStore/CreateStore";
import ManageStoreHome from "./pages/Dashboard/ManageStore/ManageStoreHome";
import UpdateStore from "./pages/Dashboard/ManageStore/UpdateStore";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import OrderList from "./pages/Dashboard/OrderList/OrderList";
import Profile from "./pages/Dashboard/Profile/Profile";
import Download from "./pages/Download/Download";
import Home from "./pages/Home/Home";
import OurServices from "./pages/OurServices/OurServices";
import PageNotFound from "./pages/PageNotFound";
import PaymentConfirmationPage from "./pages/Payment/Payment";
import OrderDetails from "./pages/Dashboard/OrderList/OrderDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="*" element={<PageNotFound />} />
        <Route index element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="email-confirmation" element={<EmailConfirmation />} />
        <Route path="email-verified" element={<EmailVerified />} />

        <Route path="our-services" element={<OurServices />} />
        <Route path="contact" element={<Contact />} />
        <Route path="download" element={<Download />} />
        <Route path="about-us" element={<About />} />
      </Route>
      <Route path="dashboard" element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="manage-categories" element={<ManageCategories />} />

          <Route path="manage-store">
            <Route index element={<ManageStoreHome />} />
            <Route path="create-store" element={<CreateStore />} />
            <Route path="update-store" element={<UpdateStore />} />
          </Route>

          <Route path="manage-app-display">
            <Route index element={<ManageUiHome />} />
          </Route>
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="order-list">
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderDetails />} />
          </Route>

          <Route path="manage-inventory" element={<ManageInventory />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="payment" element={<PaymentConfirmationPage />} />
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
