import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Typography,
  Grid,
} from "@mui/joy";
import axios from "axios";

const NewUserForm = ({ onClose, onAddUser, initialData }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    email: "",
    password: "",
    role: "MANAGER",
    epfNo: "",
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
      const token = localStorage.getItem("token");
  
      // Extract only the required fields
      const { firstname, lastname, fullname, email, role, epfNo } = formData;
      const payload = { firstname, lastname, fullname, email, role, epfNo };
  
      if (initialData) {
        // Update user API call
        const response = await axios.put(
          `http://localhost:8080/api/manager/update-user/${initialData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onAddUser(response.data); // Update the user in the list
      } else {
        // Add user API call
        const response = await axios.post(
          "http://localhost:8080/api/manager/add-user",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onAddUser(response.data); // Add the new user to the list
      }
  
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting user form:", error);
      if (error.response && error.response.status === 403) {
        alert("You do not have permission to perform this action.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography component="h2" variant="h5" mb={2}>
        {initialData ? "Edit User" : "Add New User"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        {!initialData && (
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleSelectChange("role")}
              required
            >
              <Option value="MANAGER">Manager</Option>
              <Option value="MACHINE_OPERATOR_01">Machine Operator 01</Option>
              <Option value="MACHINE_OPERATOR_02">Tool Crafter</Option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl>
  <FormLabel>EPF Number</FormLabel>
  <Input name="epfNo" value={formData.epfNo} onChange={handleChange} required />
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
