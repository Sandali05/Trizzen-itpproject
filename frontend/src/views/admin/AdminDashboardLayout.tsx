// import React from 'react';
import { Outlet } from "react-router-dom";
import AdminNavBar, { NavItem } from "../../components/admin/NavBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { DeliveryDiningOutlined, Feedback, LocalShipping, Newspaper, ShoppingCart } from "@mui/icons-material";

const AdminDashboardLayout = () => {
  const navItems: NavItem[] = [
    { title: "Customers", path: "/admindashboard/customers", icon: <PeopleIcon /> },
    { title: "Feedbacks", path: "/admindashboard/feedback", icon: <Feedback /> },
    { title: "News Feed", path: "/admindashboard/newsfeed", icon: <Newspaper /> },
    { title: "Suppliers", path: "/admindashboard/suppliers", icon: <LocalShipping /> },
    { title: "Orders", path: "/admindashboard/orders", icon: <ShoppingCart /> },
    { title: "Delivery", path: "/admindashboard/delivery", icon: <DeliveryDiningOutlined /> },
  ];

  return (
    <>
      <AdminNavBar
        rootPath={{
          title: "Admin Dashboard",
          path: "/admindashboard",
          icon: <DashboardIcon />,
        }}
        navItems={navItems}
      />
      <Outlet />
    </>
  );
};

export default AdminDashboardLayout;
