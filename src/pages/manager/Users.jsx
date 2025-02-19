import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Input, Modal, ModalDialog, ModalClose } from "@mui/joy";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import NewUserForm from "../../components/Manager/NewUserForm"; // Import the NewUserForm component

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        setUserData(response.data);
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
    const filtered = userData.filter((row) =>
      row.firstname.toLowerCase().includes(value.toLowerCase()) ||
      row.lastname.toLowerCase().includes(value.toLowerCase()) ||
      row.email.toLowerCase().includes(value.toLowerCase()) ||
      row.role.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddUser = (newUser) => {
    setUserData((prevData) => [newUser, ...prevData]);
    setFilteredData((prevData) => [newUser, ...prevData]);
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditUser(null);
  };

  const handleEditSubmit = async (updatedUser) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.put(`http://localhost:8080/api/users/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      // Update the user in the data
      const updatedData = userData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUserData(updatedData);
      setFilteredData(updatedData);
      setEditModalOpen(false);
      setEditUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          await axios.delete(`http://localhost:8080/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          // Remove the deleted user from the state
          const updatedData = userData.filter((user) => user.id !== id);
          setUserData(updatedData);
          setFilteredData(updatedData);
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "Failed to delete the user. Please try again.", "error");
        }
      }
    });
  };

  // Define the table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstname",
        header: "First Name",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: isMobile ? 60 : 100,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            color={cell.getValue() === "MANAGER" ? "success" : "warning"}
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: isMobile ? 50 : 50,
        Cell: ({ row }) => (
          <Box display="flex" flexDirection="column" gap="4px">
            <IconButton
              size="small"
              onClick={() => handleEditClick(row.original)}
              sx={{
                color: "#ff3d00",
                "&:hover": {
                  color: "#d32f2f",
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(row.original.id)}
              sx={{
                color: "#f44336",
                "&:hover": {
                  color: "#d32f2f",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [isMobile]
  );

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
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#1976d2", // Darker shade of blue for hover effect
              transform: "scale(1.05)",
            },
          }}
          onClick={handleOpen}
        >
          Add New User
        </Button>
      </Box>

      {/* Modal Dialog */}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <NewUserForm onClose={handleClose} onAddUser={handleAddUser} /> {/* Pass handleAddUser to NewUserForm */}
        </ModalDialog>
      </Modal>

      {/* Table */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Users
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableRowVirtualization
        muiTableBodyProps={{
          sx: {
            height: "400px",
            overflowY: "auto",
            fontSize: "0.75rem",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: "2px",
            fontSize: "0.75rem",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: "3px",
            fontSize: "0.75rem",
          },
        }}
        state={{
          isLoading: filteredData.length === 0, // Show loading state if no data
        }}
      />

      {editUser && (
        <Modal open={editModalOpen} onClose={handleEditClose}>
          <ModalDialog>
            <ModalClose />
            <NewUserForm
              onClose={handleEditClose}
              onAddUser={handleEditSubmit}
              initialData={editUser}
            />
          </ModalDialog>
        </Modal>
      )}
    </Container>
  );
};

export default Users;