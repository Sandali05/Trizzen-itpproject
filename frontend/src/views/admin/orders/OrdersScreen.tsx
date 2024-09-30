import React, { useState, useMemo } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useOrder } from "../../../hooks/useOrder";
import { useDelivery } from "../../../hooks/useDelivery";
import { Order } from "../../../context/orderContext";
import { useItem } from "../../../hooks/useItem";

const OrdersScreen = () => {
  const { orders, addOrder, updateOrder, deleteOrder } = useOrder();
  const { deliveries, getDeliveryName } = useDelivery();
  const { items, getItem } = useItem();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState<Order>({
    _id: "",
    name: "",
    address: "",
    mobile: "",
    totalAmount: 0,
    user: "",
    items: [],
    status: "",
    assignedDriver: "",
  });

  // Error states 01
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
  
  });

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        order.address?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        order.mobile?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        order.totalAmount?.toString().includes(searchTerm?.toLowerCase())
      // getDeliveryName(order.assignedDriver)
      //   ?.toLowerCase()
      //   .includes(searchTerm?.toLowerCase())
    );
  }, [orders, searchTerm]);

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentOrder({
      _id: "",
      name: "",
      address: "",
      mobile: "",
      totalAmount: 0,
      user: "",
      items: [],
      status: "",
      assignedDriver: "",
    });
    setErrors({ name: "", mobile: "", address:"", });//02 
    setOpen(true);
  };

  const handleUpdateOpen = (order: Order) => {
    setIsUpdate(true);
    setCurrentOrder(order);({
    
  });
  setErrors({ name: "", mobile: "",address:""});//03
  setOpen(true);
};
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };
  const validateFields = () => {
    let valid = true;
    const newErrors = { name: "", mobile: "", vehicleId: "", address:"" };//04

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(currentOrder.name)) {
      newErrors.name = "Invalid Name: Name contains Only characters";
      valid = false;
    }
    //address
    if (!/^\d+\s*,\s*[A-Za-z\s]+,\s*[A-Za-z\s]+$/.test(currentOrder.address)) {
      newErrors.address = "add correct format of a adrress";
      valid = false;
    }

    // Validate mobile
    if (!/^0\d{9}$/.test(currentOrder.mobile)) {
      newErrors.mobile = "Invalid Mobile Number";
      valid = false;
    }

    //05

    setErrors(newErrors);
    return valid;
  };



  const handleSave = async () => {

    if (!validateFields()) {
      return; // If validation fails, stop the save process
    }


    if (isUpdate) {
      if (await updateOrder(currentOrder)) {
        alert("Order updated successfully");
        handleClose();
      } else {
        alert("Failed to update order");
      }
    } else {
      if (await addOrder(currentOrder)) {
        alert("Order added successfully");
        handleClose();
      } else {
        alert("Failed to add order");
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 5 }} className="no-print" >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
            backgroundColor: "inherit",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
         
          </Button>
          <TextField
            label="Search orders"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "300px" }}
          />
          <Button variant="contained" color="inherit" onClick={handlePrint}>
            Print Report
          </Button>
        </Paper>
        <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Final Status</TableCell>
                <TableCell>Assigned Driver</TableCell>
                <TableCell className="no-print">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.mobile}</TableCell>
                  <TableCell>
                    {order.items}
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{getDeliveryName(order.assignedDriver)}</TableCell>
                  <TableCell className="no-print">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(order)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red", marginLeft: 2 }}
                      onClick={async () => {
                        if (
                          confirm("Are you sure you want to delete this order?")
                        ) {
                          if (await deleteOrder(order._id)) {
                            alert("Order deleted successfully");
                          } else {
                            alert("Failed to delete order");
                          }
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Printable table */}
      <div className="print-only">
        <Typography variant="h4" gutterBottom>
          Order Report
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Item ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Final Status</TableCell>
              <TableCell>Assigned Driver</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.mobile}</TableCell>
                <TableCell>
                  {order.items.map((item) => getItem(item)?.name).join(", ")}
                </TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{getDeliveryName(order.assignedDriver)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{isUpdate ? "Update Order" : "Add Order"}</h2>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={currentOrder.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={currentOrder.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
              helperText={errors.address}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact No"
              name="mobile"
              value={currentOrder.mobile}
              onChange={handleChange}
              error={Boolean(errors.mobile)}//6
              helperText={errors.mobile}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Items</InputLabel>
              <Select
                value={currentOrder.items}
                label="Items"
                name="items"
                // multiple
                onChange={(e) =>
                  setCurrentOrder({
                    ...currentOrder,
                    items: [e.target.value as string],
                  })
                }
              >
                {items.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Total"
              name="totalAmount"
              type="number"
              value={currentOrder.totalAmount}
              onChange={handleChange}//7
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                value={currentOrder.status}
                label="Status"
                name="status"
                onChange={(e) =>
                  setCurrentOrder({ ...currentOrder, status: e.target.value })
                }
              >
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"in-progress"}>In Progress</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
              </Select>
            </FormControl>
            {isUpdate && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Assigned Driver
                </InputLabel>
                <Select
                  value={currentOrder.assignedDriver}
                  label="Assigned Driver"
                  name="assignedDriver"
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      assignedDriver: e.target.value,
                    })
                  }
                >
                  {deliveries.map((delivery) => (
                    <MenuItem key={delivery._id} value={delivery._id}>
                      {delivery.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
            Save
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default OrdersScreen;
