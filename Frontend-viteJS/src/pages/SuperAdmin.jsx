import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { CssBaseline } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { fetchAllUsers, updateUserRole } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Box, Typography } from "@mui/material";
const SuperAdminPage = () => {
  const Item = {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    margin: "10px",
  };
  const { users, loading, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId, newRole) => {
    // Store the selected user and role in state
    setSelectedUser({ userId, newRole });
  };

  const handleConfirmRoleChange = async () => {
    if (selectedUser) {
      try {
        await dispatch(
          updateUserRole({
            userId: selectedUser.userId,
            role: selectedUser.newRole,
          })
        );
        toast.success("User role updated successfully!");
        // Clear the selected user after successful update
        setSelectedUser(null);
        // Fetch the updated user data after the role change
        dispatch(fetchAllUsers());
      } catch (error) {
        console.error("Error updating user role:", error);
        toast.error("Error updating user role. Please try again.");
      }
    }
  };

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params) => (
        <Select
          labelId="user-role-select-label"
          id="user-role-select"
          value={
            selectedUser && selectedUser.userId === params.id
              ? selectedUser.newRole
              : params.value
          }
          label="Role"
          onChange={(e) => handleRoleChange(params.id, e.target.value)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="superadmin">SuperAdmin</MenuItem>
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmRoleChange}
            disabled={!selectedUser || selectedUser.userId !== params.id}
          >
            Update Role
          </Button>
        );
      },
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" className="bgColorAdminNavbar">
        <Toolbar className="flex">
          <div className="flex">
            <div>
              <Typography variant="h4">
                {" "}
                <AdminPanelSettingsIcon
                  style={{ color: "", fontSize: "57px" }}
                />{" "}
                SuperAdmin Dashboard{" "}
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Grid
        style={Item}
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <br />
          <Typography variant="h5" color="blue" align="center">
            SuperAdmin Dashboard: {user?.result?.name}
          </Typography>
          <Typography variant="h6" align="center">
            Welcome to the SuperAdmin Dashboard! 🚀 As a SuperAdmin, you have
            powerful tools to oversee the entire system. Your dashboard provides
            centralized control.🌐💼
          </Typography>
          <hr style={{ maxWidth: "570px" }} />
        </Grid>
        <Grid item xs={12}>
          {users ? (
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              checkboxSelection
              disableSelectionOnClick
            />
          ) : (
            <p>No users found.</p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminPage;
