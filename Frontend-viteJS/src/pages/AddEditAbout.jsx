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
  createPortfolio,
  updatePortfolio,
} from "../redux/features/portfolioSlice";

import FileBase from "react-file-base64";
import "react-quill/dist/quill.snow.css";

const initialState = {
  aboutinfo: "",
  fullnameabout: "",
  age: "",
  dob: "",
  religion: "",
  intrest: "",
  experience: "",
  phoneabout: "",
  emailabout: "",
  country: "",
  resume: "",
};

const AddEditPortfolio = () => {
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setPortfolioData((prevData) => ({ ...prevData, emailabout: value }));
    validateEmail(value);
  };

  // Ensure that the initial state of the description is set correctly.
  // If editing an existing Portfolio, you may set it to the Portfolio's description.
  const [PortfolioData, setPortfolioData] = useState({
    ...initialState,
  });

  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    aboutinfo,
    resume,
    fullnameabout,
    age,
    dob,
    religion,
    intrest,
    experience,
    phoneabout,
    emailabout,
    country,
    language,
    hobby,
  } = PortfolioData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setPortfolioData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (PortfolioData.aboutinfo) {
      // Check if the user has already added portfolio information
      const userHasPortfolio = userPortfolios.some(
        (portfolio) => portfolio.name === user?.result?.name
      );

      if (userHasPortfolio && !id) {
        // User has already added portfolio information, and it's an attempt to add new info
        window.alert(
          "You have already added portfolio information. You cannot add new information."
        );
        return; // Exit the function
      }

      const updatedPortfolioData = {
        ...PortfolioData,
        name: user?.result?.name,
      };

      if (!id) {
        dispatch(createPortfolio({ updatedPortfolioData, navigate, toast }));
      } else {
        dispatch(
          updatePortfolio({ id, updatedPortfolioData, toast, navigate })
        );
      }
    }
  };

  useEffect(() => {
    if (id && userPortfolios) {
      const singlePortfolio = userPortfolios.find(
        (portfolio) => portfolio._id === id
      );

      if (singlePortfolio) {
        setPortfolioData(singlePortfolio);
      }
    }
  }, [id, userPortfolios]);
  const handleClear = () => {
    setPortfolioData({ ...initialState }); // Reset state
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Portfolio" : "Add Portfolio"}</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="fullnameabout"
                  value={fullnameabout}
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
                  label="Info"
                  name="aboutinfo"
                  value={aboutinfo}
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
                <TextField
                  label="Resume/Cv Google Drive Link"
                  name="resume"
                  value={resume}
                  onChange={onInputChange}
                  fullWidth
                  required
                  type="url"
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
                  label="Age"
                  name="age"
                  value={age}
                  onChange={onInputChange}
                  fullWidth
                  required
                  type="number"
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
                  label="Date of Birth"
                  name="dob"
                  value={dob}
                  type="date"
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
                  label="Religion"
                  name="religion"
                  value={religion}
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
                  label="intrest??"
                  name="intrest"
                  value={intrest}
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
                  label="Experience"
                  name="experience"
                  value={experience}
                  type="number"
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
                  label="Phone Number"
                  name="phoneabout"
                  type="number"
                  value={phoneabout}
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
                  label="Email Addess"
                  name="emailabout"
                  value={emailabout}
                  fullWidth
                  required
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? "Enter a valid email address" : ""}
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
                  label="Country"
                  name="country"
                  value={country}
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
                  label="Hobbies"
                  name="hobby"
                  value={hobby}
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
                  label="Language"
                  name="language"
                  value={language}
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
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPortfolioData({ ...PortfolioData, aboutimg: base64 })
                  }
                />

                {PortfolioData.aboutimg ? ( // Display image preview only if imageFile2 is present
                  <img
                    src={PortfolioData.aboutimg}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "gray" }}>
                    Upload your display picture
                  </p>
                )}
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

export default AddEditPortfolio;
