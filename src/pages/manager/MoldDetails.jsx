import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Input, Button, Modal, ModalDialog, ModalClose } from "@mui/joy";
import axios from "axios";
import MoldListTable from "../../components/Manager/MoldListTable";
import NewMoldForm from "../../components/Manager/NewMoldForm"; // Import the NewMoldForm component

const MoldDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mouldData, setMouldData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false); // State to manage modal open/close

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.get("http://localhost:8080/api/mold/shared", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        setMouldData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter data based on search term
    const filtered = mouldData.filter((row) =>
      row.itemNo.toLowerCase().includes(value.toLowerCase()) ||
      row.moldNo.toLowerCase().includes(value.toLowerCase()) ||
      row.customer.toLowerCase().includes(value.toLowerCase()) ||
      row.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddMold = (newMold) => {
    setMouldData((prevData) => [newMold, ...prevData]);
    setFilteredData((prevData) => [newMold, ...prevData]);
  };

  return (
    <Container maxWidth="xl">
      {/* Search bar */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4} mt={2}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          startDecorator={<Search />}
          sx={{ borderRadius: 19, width: "100%", maxWidth: "600px", bgcolor: "#f1f3f4", height: 40, marginTop: 12 }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Button
          variant="solid"
          color="primary"
          sx={{
            borderRadius: 3,
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
              backgroundColor: '#1976d2', // Darker shade of blue for hover effect
              transform: 'scale(1.05)',
            },
          }}
          onClick={handleOpen}
        >
          Add New Mould
        </Button>
      </Box>

      {/* Modal Dialog */}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <NewMoldForm onClose={handleClose} onAddMold={handleAddMold} /> {/* Pass handleAddMold to NewMoldForm */}
        </ModalDialog>
      </Modal>

      {/* Table */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Moulds
      </Typography>
      <MoldListTable
        data={filteredData}
        order={order}
        setOrder={setOrder}
        selected={selected}
        setSelected={setSelected}
      />
    </Container>
  );
};

export default MoldDetails;