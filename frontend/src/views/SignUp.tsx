import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomer";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobilenumber: "",
    address: "",
    firstname: "",
    lastname: "",
    role: "customer",
  });

  const { addCustomer, getCustomers } = useCustomer();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const currentCustomers = getCustomers();
      const newCustomerId = currentCustomers.length + 1;
      
      addCustomer({
        _id: newCustomerId,
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobilenumber: formData.mobilenumber,
        address: formData.address,
        role: "customer",
        password: formData.password,
      });
      navigate("/adminlogin");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // height="100vh"
        paddingBlock={5}
        paddingInline={3}
        marginBlock={5}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            name="firstname"
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <TextField
            name="lastname"
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="mobilenumber"
            label="Contact Number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.mobilenumber}
            onChange={handleChange}
            required
          />
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal" 
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account? <Link href="/adminlogin">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;