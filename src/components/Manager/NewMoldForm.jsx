import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Option, Textarea, Typography, Grid } from "@mui/joy";
import axios from "axios";

const NewMoldForm = ({ onClose, onAddMold, initialData }) => {
  const [formData, setFormData] = useState({
    itemNo: "",
    moldNo: "",
    documentNo: "",
    customer: "",
    shrinkageFactor: "",
    plateSize: "",
    plateWeight: "",
    investmentNo: "",
    description: "",
    status: "completed",
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
      const response = await axios.post("http://localhost:8080/api/mold/shared", formData, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      onAddMold(response.data); // Add the new mold to the list
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding new mold:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography component="h2" variant="h5" mb={2}>
        {initialData ? "Edit Mold" : "Add New Mold"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Item No</FormLabel>
            <Input name="itemNo" value={formData.itemNo} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Mold No</FormLabel>
            <Input name="moldNo" value={formData.moldNo} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Document No</FormLabel>
            <Input name="documentNo" value={formData.documentNo} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Customer</FormLabel>
            <Input name="customer" value={formData.customer} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Shrinkage Factor</FormLabel>
            <Input name="shrinkageFactor" value={formData.shrinkageFactor} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Plate Size</FormLabel>
            <Input name="plateSize" value={formData.plateSize} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Plate Weight</FormLabel>
            <Input name="plateWeight" value={formData.plateWeight} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel>Investment No</FormLabel>
            <Input name="investmentNo" value={formData.investmentNo} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} required />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={formData.status} onChange={handleSelectChange("status")} required>
              <Option value="completed">Completed</Option>
              <Option value="ongoing">Ongoing</Option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="solid" color="primary" sx={{ mt: 2 }}>
        {initialData ? "Update Mold" : "Add Mold"}
      </Button>
    </Box>
  );
};

export default NewMoldForm;