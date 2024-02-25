import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Container,
} from "@mui/material";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createServices,
  updateServices,
} from "../redux/features/servicesSlice";

import "react-quill/dist/quill.snow.css";

const initialState = {
  title: "",
  description: "",
  university: "",
  name: "",
  info: "",
  resume: "",
  years: "",
};

const AddEditServices = () => {
  // Ensure that the initial state of the description is set correctly.
  // If editing an existing Services, you may set it to the Services's description.
  const [ServicesData, setServicesData] = useState({
    ...initialState,
  });

  const { userServicess } = useSelector((state) => ({
    ...state.services,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description } = ServicesData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setServicesData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (ServicesData.title && ServicesData.description) {
      const updatedServicesData = {
        ...ServicesData,
        name: user?.result?.name,
      };

      if (!id) {
        dispatch(createServices({ updatedServicesData, navigate, toast }));
      } else {
        dispatch(updateServices({ id, updatedServicesData, toast, navigate }));
      }
    }
  };

  useEffect(() => {
    if (id && userServicess) {
      const singleServices = userServicess.find(
        (services) => services._id === id
      );

      if (singleServices) {
        setServicesData(singleServices);
      }
    }
  }, [id, userServicess]);
  const handleClear = () => {
    setServicesData({ ...initialState }); // Reset state
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Services" : "Add Services"}</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="title"
                  name="title"
                  value={title}
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
                  label="Description"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  fullWidth
                  required
                  inputProps={{
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                  }}
                  InputProps={{
                    className: "custom-input-color",
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
                  multiline
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  {id ? "Update" : "Submit"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddEditServices;
