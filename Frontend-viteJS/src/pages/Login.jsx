/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../redux/features/authSlice";
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
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleNavigate = () => {
    navigate("/");
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
      <Card
        align="center"
        className="item admincards"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" className="custom-input-color">
          Sign In
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              value={email}
              name="email"
              onChange={onInputChange}
              required
              className="logintextfield"
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
              fullWidth
              error={!!error}
              helperText={error ? "Please provide your email" : ""}
            />
            <br></br>

            <br></br>
            <TextField
              label="Password"
              type="password"
              value={password}
              name="password"
              onChange={onInputChange}
              required
              fullWidth
              InputProps={{
                className: "custom-input-color", // Apply your custom class here
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              InputLabelProps={{
                className: "custom-input-color",
              }}
              error={!!error}
              helperText={error ? "Please provide your password" : ""}
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
              Login
            </Button>
          </form>
          <ToastContainer />
        </CardContent>
        <CardContent>
          <Link to="/register">
            <p>Don't have an account? Sign Up</p>
          </Link>
          <br />
          <p onClick={handleNavigate}>Go Back</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
