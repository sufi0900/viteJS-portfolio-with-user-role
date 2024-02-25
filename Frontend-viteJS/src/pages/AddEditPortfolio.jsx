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
import Divider from "@mui/material/Divider";
import FileBase from "react-file-base64";
import "react-quill/dist/quill.snow.css";

const initialState = {
  homeinfo: "",
  fullname: "",
  jobtitle: "",
  github: "",
  facebook: "",
  twitter: "",
  aboutinfo: "",
  email: "",
  phone: "",
  address: "",
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
    setPortfolioData((prevData) => ({ ...prevData, email: value }));
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
    homeinfo,
    fullname,
    jobtitle,
    github,
    facebook,
    twitter,

    email,
    phone,
    address,
  } = PortfolioData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setPortfolioData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      PortfolioData.fullname &&
      PortfolioData.github &&
      PortfolioData.jobtitle &&
      PortfolioData.facebook &&
      PortfolioData.twitter &&
      PortfolioData.homeinfo &&
      PortfolioData.email &&
      PortfolioData.phone &&
      PortfolioData.address
    ) {
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
                  name="fullname"
                  value={fullname}
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
                  label="Email Address"
                  name="email"
                  value={email}
                  fullWidth
                  required
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? "Enter a valid email address" : ""}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={phone}
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
                  label="Address"
                  name="address"
                  value={address}
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
                  label="Job title"
                  name="jobtitle"
                  value={jobtitle}
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
                  label="HomePage Info"
                  name="homeinfo"
                  value={homeinfo}
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
                  label="Github Link"
                  name="github"
                  value={github}
                  type="url"
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
                  label="Facebook Link"
                  name="facebook"
                  type="url"
                  value={facebook}
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
                  label="Twitter Link"
                  name="twitter"
                  value={twitter}
                  onChange={onInputChange}
                  fullWidth
                  type="url"
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

              <Divider />
              <Grid item xs={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPortfolioData({ ...PortfolioData, imageFile2: base64 })
                  }
                />

                {PortfolioData.imageFile2 ? ( // Display image preview only if imageFile2 is present
                  <img
                    src={PortfolioData.imageFile2}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "gray" }}>
                    Upload your favicon picture
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPortfolioData({ ...PortfolioData, imageFile3: base64 })
                  }
                />

                {PortfolioData.imageFile3 ? ( // Display image preview only if imageFile2 is present
                  <img
                    src={PortfolioData.imageFile3}
                    alt="Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "gray" }}>
                    Upload your logo
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
