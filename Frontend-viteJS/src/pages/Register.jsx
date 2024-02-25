import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }))
        .then(() => {
          // Redirect to the login page after successful registration
          navigate("/login");
        })
        .catch((error) => {
          // Handle registration error if needed
          console.error("Registration error:", error);
        });
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const Item = {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        marginTop: "120px",
      }}
    >
      <Card align="center" style={Item}>
        <Avatar sx={{ m: 1, backgroundColor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="First Name"
              type="text"
              value={firstName}
              name="firstName"
              onChange={onInputChange}
              required
              fullWidth
              error={!!error}
              helperText={error ? "Please provide first name" : ""}
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              name="lastName"
              onChange={onInputChange}
              required
              fullWidth
              error={!!error}
              helperText={error ? "Please provide last name" : ""}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              name="email"
              onChange={onInputChange}
              required
              fullWidth
              error={!!error}
              helperText={error ? "Please provide email" : ""}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              name="password"
              onChange={onInputChange}
              required
              fullWidth
              error={!!error}
              helperText={error ? "Please provide password" : ""}
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={onInputChange}
              required
              fullWidth
              error={!!error}
              helperText={error ? "Please provide confirm password" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={20} color="inherit" sx={{ mr: 2 }} />
              )}
              Register
            </Button>
          </form>
        </CardContent>
        <CardContent>
          <Link to="/login">
            <Typography>Already have an account? Sign In</Typography>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
