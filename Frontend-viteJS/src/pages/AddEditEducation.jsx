import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
} from "@mui/material";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createEducation,
  updateEducation,
} from "../redux/features/educationSlice";
import Divider from "@mui/material/Divider";

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

const AddEditEducation = () => {
  // If editing an existing Education, you may set it to the Education's description.
  const [EducationData, setEducationData] = useState({
    ...initialState,
  });

  const { userEducations } = useSelector((state) => ({
    ...state.education,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, years, university } = EducationData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setEducationData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      EducationData.title &&
      EducationData.years &&
      EducationData.description
    ) {
      // Check if the user has already added Education information

      const updatedEducationData = {
        ...EducationData,
        name: user?.result?.name,
      };

      if (!id) {
        dispatch(createEducation({ updatedEducationData, navigate, toast }));
      } else {
        dispatch(
          updateEducation({ id, updatedEducationData, toast, navigate })
        );
      }
    }
  };

  useEffect(() => {
    if (id && userEducations) {
      const singleEducation = userEducations.find(
        (Education) => Education._id === id
      );

      if (singleEducation) {
        setEducationData(singleEducation);
      }
    }
  }, [id, userEducations]);
  const handleClear = () => {
    setEducationData({ ...initialState }); // Reset state
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Education" : "Add Education"}</h1>
          </div>
          <br />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  label="Title"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  fullWidth
                  required
                  displayEmpty
                  inputProps={{ className: "custom-input-color" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select an Option
                  </MenuItem>
                  <MenuItem value="education">
                    {" "}
                    <p>Education</p>
                  </MenuItem>
                  <MenuItem value="experience">
                    {" "}
                    <p>Experience</p>{" "}
                  </MenuItem>
                  <MenuItem value="certificate">
                    {" "}
                    <p>Certificate</p>
                  </MenuItem>
                </Select>
              </Grid>
              <br />
              <Grid item xs={12}>
                <TextField
                  label="Title of your Degree/certificate/Experience"
                  name="university"
                  value={university}
                  onChange={onInputChange}
                  fullWidth
                  required
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
                <TextField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  fullWidth
                  required
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
                <TextField
                  label="Years"
                  name="years"
                  value={years}
                  onChange={onInputChange}
                  fullWidth
                  required
                  type="string"
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

              <Divider />

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

export default AddEditEducation;
