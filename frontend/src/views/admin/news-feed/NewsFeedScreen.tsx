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
  Typography,
} from "@mui/material";
import { useNewsFeed } from "../../../hooks/useNewsFeed";
import { NewsFeed } from "../../../context/newsFeedContext";

const NewsFeedScreen = () => {
  const { newsFeeds, addNewsFeed, updateNewsFeed, deleteNewsFeed } =
    useNewsFeed();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentNewsFeed, setCurrentNewsFeed] = useState({
    _id: "",
    itemId: "",
    discount: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    discount: "",
    description: "",
    
  });

  // Filter news feeds based on search term
  const filteredNewsFeeds = useMemo(() => {
    return newsFeeds.filter(
      (newsFeed) =>
        newsFeed.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        newsFeed.discount.toString().includes(searchTerm) ||
        newsFeed.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [newsFeeds, searchTerm]);

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentNewsFeed({
      _id: "",
      itemId: "",
      // photo: "",
      discount: "",
      description: "",
    });
    setErrors({ discount:"", description: "" });
    setOpen(true);
  };

  const handleUpdateOpen = (newsFeed: NewsFeed) => {
    setIsUpdate(true);
    setCurrentNewsFeed(newsFeed);({

    });
    setErrors({ discount: "", description: ""});
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentNewsFeed({ ...currentNewsFeed, [name]: value });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { discount: "", description: ""};

    
    if (!/^[A-Za-z\s]*$/.test(currentNewsFeed.description)) {
      newErrors.description = "Invalid Description, Enter only letters!";
      valid = false;
    }

    // Validate mobile
    if (!/^(0[1-9]|[1-9]\d)$/.test(currentNewsFeed.discount)) {
      newErrors.discount = "Discount should be less than 100";
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
      if (await updateNewsFeed(currentNewsFeed)) {
        alert("News Feed updated successfully");
        handleClose();
      } else {
        alert("Failed to update news feed");
      }
    } else {
      if (await addNewsFeed(currentNewsFeed)) {
        alert("News Feed added successfully");
        handleClose();
      } else {
        alert("Failed to add news feed");
      }
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
            Add News Feed
          </Button>
          <TextField
            label="Search news feeds"
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
                <TableCell>Item</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell className="no-print">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNewsFeeds.map((newsFeed) => (
                <TableRow key={newsFeed._id}>
                  <TableCell>{newsFeed.itemId}</TableCell>
                  <TableCell>{newsFeed.discount}</TableCell>
                  <TableCell>{newsFeed.description}</TableCell>
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
                      onClick={() => handleUpdateOpen(newsFeed)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this news feed?"
                          )
                        ) {
                          deleteNewsFeed(newsFeed._id);
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
          News Feed Report
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNewsFeeds.map((newsFeed) => (
              <TableRow key={newsFeed._id}>
                <TableCell>{newsFeed.itemId}</TableCell>
                <TableCell>{newsFeed.discount}</TableCell>
                <TableCell>{newsFeed.description}</TableCell>
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
          <h2>{isUpdate ? "Update News Feed" : "Add News Feed"}</h2>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Item ID"
              name="itemId"
              value={currentNewsFeed.itemId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {/* <TextField
            label="Photo URL"
            name="photo"
            value={currentNewsFeed.photo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          /> */}
            <TextField
              label="Discount"
              name="discount"
              value={currentNewsFeed.discount}
              onChange={handleChange}error={Boolean(errors.discount)}
              helperText={errors.discount}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={currentNewsFeed.description}
              onChange={handleChange}error={Boolean(errors.description)}
              helperText={errors.description}
              multiline
              rows={5}
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

export default NewsFeedScreen;
