import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "../redux/features/authSlice";
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

const ChangePassword = () => {
  const [formValue, setFormValue] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.currentPassword && formValue.newPassword) {
      dispatch(changePassword({ formValue, navigate, toast }));
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
            <h1>Change Password</h1>
          </div>
          <br />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={formValue.currentPassword}
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
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={formValue.newPassword}
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
                      <span>Changing Password</span>
                    </>
                  ) : (
                    "Change Password"
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

export default ChangePassword;
