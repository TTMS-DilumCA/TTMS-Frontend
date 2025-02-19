import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Option, Typography, Grid } from "@mui/joy";
import axios from "axios";

const NewUserForm = ({ onClose, onAddUser, initialData }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "MANAGER",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name) => (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("http://localhost:8080/api/users", formData, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      onAddUser(response.data); // Add the new user to the list
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography component="h2" variant="h5" mb={2}>
        {initialData ? "Edit User" : "Add New User"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input name="firstname" value={formData.firstname} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input name="lastname" value={formData.lastname} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} required />
          </FormControl>
        </Grid>
        {!initialData && (
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select name="role" value={formData.role} onChange={handleSelectChange("role")} required>
              <Option value="MANAGER">Manager</Option>
              <Option value="OPERATOR">Operator</Option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="solid" color="primary" sx={{ mt: 2 }}>
        {initialData ? "Update User" : "Add User"}
      </Button>
    </Box>
  );
};

export default NewUserForm;