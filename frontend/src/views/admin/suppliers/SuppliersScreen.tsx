import { useState, useMemo } from "react";
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
  Typography,
} from "@mui/material";
import { useSupplier } from "../../../hooks/useSupplier";
import { Supplier } from "../../../context/supplierContext";

const SupplierScreen = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } =
    useSupplier();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSupplier, setCurrentSupplier] = useState({
    _id: "",
    name: "",
    address: "",
    mobile: "",
    itemId: "",
    email: "",
    company: "",
  });

  // Error states
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  });


  // Filter suppliers based on search term
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentSupplier({
      _id: "",
      name: "",
      address: "",
      mobile: "",
      itemId: "",
      email: "",
      company: "",
    });
    setErrors({ name: "", mobile: "", email: "" , address:""});
    setOpen(true);
  };


  const handleUpdateOpen = (supplier: Supplier) => {
    setIsUpdate(true);
    setCurrentSupplier(supplier);({
    });
    setErrors({ name: "", mobile: "", email: "" ,address:""});
    setOpen(true);
  };


  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSupplier({ ...currentSupplier, [name]: value });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { name: "", mobile: "", email: "", address:"" };

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(currentSupplier.name)) {
      newErrors.name = "Name must contain only alphabetic letters and put space beetween words";
      valid = false;
    }
    //address
    if (!/^\d+\s*,\s*[A-Za-z\s]+,\s*[A-Za-z\s]+$/.test(currentSupplier.address)) {
      newErrors.address = "add correct format of a adrress";
      valid = false;
    }

    // Validate mobile
    if (!/^0\d{9}$/.test(currentSupplier.mobile)) {
      newErrors.mobile = "Mobile must contain 10 digits and start with '0'.";
      valid = false;
    }

    if (!/^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(currentSupplier.email)) {
      newErrors.email = "E-mail should start with a letter and contain '@'";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {

    if (!validateFields()) {
      return; // If validation fails, stop the save process
    }

    if (isUpdate) {
      await updateSupplier(currentSupplier).then((success) => {
        if (success) {
          alert("Supplier updated successfully");
          handleClose();
        } else {
          alert("Failed to update supplier");
        }
      });
    } else {
      await addSupplier(currentSupplier).then((success) => {
        if (success) {
          alert("Supplier added successfully");
          handleClose();
        } else {
          alert("Failed to add supplier");
        }
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 5 }} className="no-print">
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
            Add Supplier
          </Button>
          <TextField
            label="Search suppliers"
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
                <TableCell>Mobile</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell className="no-print">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.mobile}</TableCell>
                  <TableCell>{supplier.itemId}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.company}</TableCell>
                  <TableCell
                    className="no-print"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(supplier)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this supplier?"
                          )
                        ) {
                          deleteSupplier(supplier._id);
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
        <Typography variant="h5" gutterBottom>
          Supplier Report
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Item ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.mobile}</TableCell>
                <TableCell>{supplier.itemId}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.company}</TableCell>
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
          <h2>{isUpdate ? "Update Supplier" : "Add Supplier"}</h2>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={currentSupplier.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
            helperText={errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={currentSupplier.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
            helperText={errors.address}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={currentSupplier.mobile}
              onChange={handleChange}
              error={Boolean(errors.mobile)}
            helperText={errors.mobile}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Item ID"
              name="itemId"
              value={currentSupplier.itemId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={currentSupplier.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
            helperText={errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company"
              name="company"
              value={currentSupplier.company}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              SAVE
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SupplierScreen;
