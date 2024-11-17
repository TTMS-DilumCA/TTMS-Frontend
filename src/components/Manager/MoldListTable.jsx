import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Stack,
  Collapse,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { Modal, ModalDialog, ModalClose } from "@mui/joy"; // Import from @mui/joy
import NewMoldForm from "./NewMoldForm"; // Import the NewMoldForm component
import axios from "axios"; // Import axios for API requests

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const MoldListTable = ({ data, setData, order, setOrder }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set initial rows per page to 5
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMold, setEditMold] = useState(null);

  useEffect(() => {
    let filtered = data;

    if (statusFilter !== "all") {
      filtered = filtered.filter((row) => row.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [statusFilter, data]);

  const handleExpandClick = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      const updatedData = data.map((mold) =>
        mold.id === updatedMold.id ? updatedMold : mold
      );
      setData(updatedData);
      setFilteredData(updatedData);
      setEditModalOpen(false);
      setEditMold(null);
    } catch (error) {
      console.error("Error updating mold:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.delete(`http://localhost:8080/api/mold/shared/${id}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      // Remove the deleted mold from the state
      const updatedData = data.filter((mold) => mold.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error deleting mold:", error);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650, backgroundColor: "white" }} aria-label="mould table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell />
              <TableCell>Tool No</TableCell>
              <TableCell>Item No</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Shrinkage Factor</TableCell>
              <TableCell>Plate Size</TableCell>
              <TableCell>Plate Weight</TableCell>
              <TableCell>Investment No</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData
                .sort(getComparator(order, "moldNo"))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleExpandClick(index)}
                        >
                          {expandedRows[index] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{row.moldNo}</TableCell>
                      <TableCell>{row.itemNo}</TableCell>
                      <TableCell>{row.customer}</TableCell>
                      <TableCell>{row.shrinkageFactor}</TableCell>
                      <TableCell>{row.plateSize}</TableCell>
                      <TableCell>{row.plateWeight}</TableCell>
                      <TableCell>{row.investmentNo}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={row.status === "completed" ? "success" : "warning"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleEditClick(row)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteClick(row.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={10} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRows[index]} timeout="auto" unmountOnExit>
                          <Box margin={2}>
                            <Typography variant="body2" color="textSecondary">
                              {row.description}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
            ) : (
              // Empty state message
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                  <Stack alignItems="center" spacing={2}>
                    <Typography variant="body1" color="textSecondary">
                      No moulds found
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Try adjusting your search or add a new mould to the list.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleEditClose}>
        <ModalDialog>
          <ModalClose />
          {editMold && (
            <NewMoldForm
              onClose={handleEditClose}
              onAddMold={handleEditSubmit}
              initialData={editMold}
            />
          )}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default MoldListTable;