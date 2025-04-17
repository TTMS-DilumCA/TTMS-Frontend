import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Modal,
} from "@mui/material";
import { ModalDialog, ModalClose } from "@mui/joy";
import axios from "axios";
import Swal from "sweetalert2";
import NewMoldForm from "../../components/Manager/NewMoldForm";
import MoldListTable from "../../components/Manager/MoldListTable";

const MoldDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mouldData, setMouldData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMold, setEditMold] = useState(null);

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

  const handleEditClick = (mold) => {
    setEditMold(mold);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditMold(null);
  };

  const handleEditSubmit = async (updatedMold) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.put(`http://localhost:8080/api/mold/shared/${updatedMold.id}`, updatedMold, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      // Update the mold in the data
      const updatedData = mouldData.map((mold) =>
        mold.id === updatedMold.id ? updatedMold : mold
      );
      setMouldData(updatedData);
      setFilteredData(updatedData);
      setEditModalOpen(false);
      setEditMold(null);
    } catch (error) {
      console.error("Error updating mold:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this mold!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          await axios.delete(`http://localhost:8080/api/mold/shared/${id}`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          // Remove the deleted mold from the state
          const updatedData = mouldData.filter((mold) => mold.id !== id);
          setMouldData(updatedData);
          setFilteredData(updatedData);
          Swal.fire("Deleted!", "Mold has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting mold:", error);
          Swal.fire("Error", "Failed to delete the mold. Please try again.", "error");
        }
      }
    });
  };

  return (
    <Container maxWidth={false}
      sx={{
        width: '90%',
        maxWidth: 'none',
        margin: '0 auto',
      }}>
      <MoldListTable
        data={filteredData}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        isLoading={filteredData.length === 0}
        onAddClick={handleOpen}
      />

      {/* Modal Dialog */}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <NewMoldForm onClose={handleClose} onAddMold={handleAddMold} />
        </ModalDialog>
      </Modal>

      {editMold && (
        <Modal open={editModalOpen} onClose={handleEditClose}>
          <ModalDialog>
            <ModalClose />
            <NewMoldForm
              onClose={handleEditClose}
              onAddMold={handleEditSubmit}
              initialData={editMold}
            />
          </ModalDialog>
        </Modal>
      )}
    </Container>
  );
};

export default MoldDetails;