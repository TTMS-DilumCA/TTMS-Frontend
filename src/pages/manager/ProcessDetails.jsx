import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Input } from "@mui/joy";
import { Search } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";

const ProcessDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [processData, setProcessData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.get("http://localhost:8080/api/process/shared", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        setProcessData(response.data);
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
    const filtered = processData.filter((row) =>
      row.process.toLowerCase().includes(value.toLowerCase()) ||
      row.side.toLowerCase().includes(value.toLowerCase()) ||
      row.operator.toLowerCase().includes(value.toLowerCase()) ||
      row.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Define the table columns
  const columns = [
    {
      accessorKey: "process",
      header: "Process",
    },
    {
      accessorKey: "side",
      header: "Side",
    },
    {
      accessorKey: "operator",
      header: "Operator",
    },
    {
      accessorKey: "cuttingToolAmount",
      header: "Cutting Tool Amount",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "mcounter",
      header: "Machine Counter",
    },
  ];

  return (
    <Container maxWidth={false}
      sx={{
        width: '90%',
        maxWidth: 'none',
        margin: '0 auto',
      }}>
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

      {/* Table */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Processes
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableRowVirtualization
        muiTableBodyProps={{
          sx: {
            height: "400px",
            overflowY: "auto",
            fontSize: "1rem", // Increased font size
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: "8px", // Increased padding
            fontSize: "1rem", // Increased font size
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: "8px", // Increased padding
            fontSize: "1rem", // Increased font size
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            minWidth: "150px", // Increased row width
          },
        }}
        state={{
          isLoading: filteredData.length === 0, // Show loading state if no data
        }}
      />
    </Container>
  );
};

export default ProcessDetails;