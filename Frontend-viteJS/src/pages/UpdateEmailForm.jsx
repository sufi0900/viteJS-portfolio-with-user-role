import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { changeEmail } from "../redux/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChangeEmail = () => {
  const [formValue, setFormValue] = useState({ oldEmail: "", newEmail: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for changes in the error state
    console.log("Error in Redux state:", error); // Log the error to the console
    if (error) {
      toast.error(error); // Show error toast if there is an error
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.oldEmail && formValue.newEmail) {
      dispatch(changeEmail({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>Change Email</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Old Email"
                  type="email"
                  name="oldEmail"
                  value={formValue.oldEmail}
                  onChange={onInputChange}
                  fullWidth
                  required
                  InputProps={{
                    className: "custom-input-color", // Apply your custom class here
                  }}
                  InputLabelProps={{
                    className: "custom-input-color",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Email"
                  type="email"
                  name="newEmail"
                  value={formValue.newEmail}
                  onChange={onInputChange}
                  fullWidth
                  required
                  InputProps={{
                    className: "custom-input-color", // Apply your custom class here
                  }}
                  InputLabelProps={{
                    className: "custom-input-color",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        style={{ marginRight: 8 }}
                      />
                      <span>Changing Email</span>
                    </>
                  ) : (
                    "Change Email"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChangeEmail;
