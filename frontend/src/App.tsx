import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboardLayout from "./views/admin/AdminDashboardLayout";
import CustomerScreenLayout from "./views/admin/customers/CustomerLayout";
import AdminDashboardScreen from "./views/admin/AdminDashboardScreen";
import CustomerScreen from "./views/admin/customers/CustomerScreen";
import NewsFeedLayout from "./views/admin/news-feed/NewsFeedLayout";
import NewsFeedScreen from "./views/admin/news-feed/NewsFeedScreen";
import FeedbackLayout from "./views/admin/feedback/FeedbackLayout";
import FeedbackScreen from "./views/admin/feedback/FeedbackScreen";
import DeliveryLayout from "./views/admin/delivery/DeliveryLayout";
import DeliveryScreen from "./views/admin/delivery/DeliveryScreen";
import SuppliersLayout from "./views/admin/suppliers/SuppliersLayout";
import SuppliersScreen from "./views/admin/suppliers/SuppliersScreen";
import OrdersLayout from "./views/admin/orders/OrdersLayout";
import OrdersScreen from "./views/admin/orders/OrdersScreen";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "./views/AdminLogin";
import SignUp from "./views/SignUp";
import Register from "./views/user/userManagement/Register";
import Login from "./views/user/userManagement/Login";
import UserProfile from "./views/user/userManagement/UserProfile";
import HeaderPart from "./views/user/headerPart";
import { Home } from "./views/user/Home";
import { ItemDetails } from "./views/user/ItemDetails";
import { Items } from "./views/user/Items";
import Footer from "./views/user/footer";
import Checkout from "./views/user/Checkout";
import UserProfileUpdate from "./views/user/userManagement/UserProfileUpdate";
import News from "./views/user/News";
import Profile from "./views/user/userManagement/Profile";
import FeedbackForm from "./views/user/Feedbacks";

function App() {
  return (
    <Routes>
      <Route
        path="/admindashboard"
        element={
          <PrivateRoute>
            <AdminDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboardScreen />} />
        <Route path="customers" element={<CustomerScreenLayout />} >
          <Route index element={<CustomerScreen />} />
        </Route>
        <Route path="newsfeed" element={<NewsFeedLayout />} >
          <Route index element={<NewsFeedScreen />} />
        </Route>
        <Route path="feedback" element={<FeedbackLayout />} >
          <Route index element={<FeedbackScreen />} />
        </Route>
        <Route path="delivery" element={<DeliveryLayout />} >
          <Route index element={<DeliveryScreen />} />
        </Route>
        <Route path="suppliers" element={<SuppliersLayout />} >
          <Route index element={<SuppliersScreen />} />
        </Route>
        <Route path="orders" element={<OrdersLayout />} >
          <Route index element={<OrdersScreen />} />
        </Route>
      </Route>
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<><HeaderPart /><Home/><Items/><Footer/></>} />
      <Route path="/item/:id" element={<><HeaderPart /><ItemDetails /><Footer/></>} />
      <Route path="/checkout" element={<><HeaderPart /><Checkout /><Footer/></>} />
      <Route path="/news" element={<><HeaderPart /><News /><Footer/></>} />
      <Route path="/feedbacks" element={<><HeaderPart /><FeedbackForm /><Footer/></>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        // <PrivateRoute>
        <><HeaderPart /><UserProfile /><Footer/></>
        // </PrivateRoute>
      } />
      <Route path="/user-profile/update" element={
        // <PrivateRoute>
        <><HeaderPart /><UserProfileUpdate /><Footer/></>
        // </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to="/adminlogin" />} />
    </Routes>
  );
}

export default App;
