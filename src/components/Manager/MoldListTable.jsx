import React, { useMemo } from "react";
import {
  Box,
  Chip,
  IconButton,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import { Input } from "@mui/joy";
import { Search } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MoldListTable = ({
  data,
  onEditClick,
  onDeleteClick,
  searchTerm,
  onSearchChange,
  isLoading,
  onAddClick,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  // Define the table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "moldNo",
        header: "Mold No",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "itemNo",
        header: "Item No",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "customer",
        header: "Customer",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "shrinkageFactor",
        header: "Shrinkage Factor",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "plateSize",
        header: "Plate Size",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "plateWeight",
        header: "Plate Weight",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "investmentNo",
        header: "Investment No",
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: isMobile ? 60 : 100,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            color={cell.getValue() === "completed" ? "success" : "warning"}
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
              onClick={() => onEditClick(row.original)}
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
              onClick={() => onDeleteClick(row.original.id)}
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
    [isMobile, onEditClick, onDeleteClick]
  );

  return (
    <Box>
      {/* Search bar */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={2}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={onSearchChange}
          startDecorator={<Search />}
          sx={{ borderRadius: 19, width: "100%", maxWidth: "600px", bgcolor: "#f1f3f4", height: 40, marginTop: 12 }}
        />
      </Box>

      {/* Add New Mould Button */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Button
          variant="solid"
          color="primary"
          sx={{
            backgroundColor: "#1976d2", // Initial color
            color: "#fff", // Text color
            borderRadius: 3,
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#1565c0", // Darker shade of blue for hover effect
              transform: "scale(1.05)",
            },
          }}
          onClick={onAddClick}
        >
          +Add New Mould
        </Button>
      </Box>

      {/* Table */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Moulds
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={data}
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
          isLoading: isLoading, // Show loading state if no data
        }}
      />
    </Box>
  );
};

export default MoldListTable;