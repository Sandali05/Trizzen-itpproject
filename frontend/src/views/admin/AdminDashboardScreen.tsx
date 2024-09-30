import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import {
  People as CustomersIcon,
  LocalShipping as DeliveriesIcon,
  Feedback as FeedbackIcon,
  ShoppingCart as OrdersIcon,
  RssFeed as NewsFeedIcon,
  Business as SuppliersIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomer";
import { useDelivery } from "../../hooks/useDelivery";
import { useOrder } from "../../hooks/useOrder";
import { useFeedback } from "../../hooks/useFeedback";
import { useNewsFeed } from "../../hooks/useNewsFeed";
import { useSupplier } from "../../hooks/useSupplier";

const DashboardCard = ({
  title,
  count,
  icon,
  onClick,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <Paper
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      height: 140,
      justifyContent: "space-between",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h4">
      {count}
    </Typography>
  </Paper>
);

const AdminDashboardScreen = () => {
  const navigate = useNavigate();
  const { customers } = useCustomer();
  const { deliveries } = useDelivery();
  const { orders } = useOrder();
  const { feedbacks } = useFeedback();
  const { newsFeeds } = useNewsFeed();
  const { suppliers } = useSupplier();

  const dashboardItems = [
    {
      title: "Customers",
      count: customers.length,
      icon: <CustomersIcon />,
      path: "/admindashboard/customers",
    },
    {
      title: "Drivers",
      count: deliveries.length,
      icon: <DeliveriesIcon />,
      path: "/admindashboard/delivery",
    },
    {
      title: "Orders",
      count: orders.length,
      icon: <OrdersIcon />,
      path: "/admindashboard/orders",
    },
    {
      title: "Feedbacks",
      count: feedbacks.length,
      icon: <FeedbackIcon />,
      path: "/admindashboard/feedback",
    },
    {
      title: "News Feeds",
      count: newsFeeds.length,
      icon: <NewsFeedIcon />,
      path: "/admindashboard/newsfeed",
    },
    {
      title: "Suppliers",
      count: suppliers.length,
      icon: <SuppliersIcon />,
      path: "/admindashboard/suppliers",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1" >
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <DashboardCard
              title={item.title}
              count={item.count}
              icon={item.icon}
              onClick={() => navigate(item.path)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboardScreen;
