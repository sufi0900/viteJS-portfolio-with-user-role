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
  createTestimonial,
  updateTestimonial,
} from "../redux/features/testimonialSlice";
import Divider from "@mui/material/Divider";
import FileBase from "react-file-base64";
import "react-quill/dist/quill.snow.css";

const initialState = {
  title: "",
  description: "",
};

const AddEditTestimonial = () => {
  // Ensure that the initial state of the description is set correctly.
  // If editing an existing Testimonial, you may set it to the Testimonial's description.
  const [TestimonialData, setTestimonialData] = useState({
    ...initialState,
  });

  const { userTestimonials } = useSelector((state) => ({
    ...state.testimonial,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description } = TestimonialData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setTestimonialData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (TestimonialData.title && TestimonialData.description) {
      // // Check if the user has already added Testimonial information
      // const userHasTestimonial = userTestimonials.some(
      //   (testimonial) => testimonial.name === user?.result?.name
      // );

      // if (userHasTestimonial && !id) {
      //   // User has already added Testimonial information, and it's an attempt to add new info
      //   window.alert(
      //     "You have already added Testimonial information. You cannot add new information."
      //   );
      //   return; // Exit the function
      // }

      const updatedTestimonialData = {
        ...TestimonialData,
        name: user?.result?.name,
      };

      if (!id) {
        dispatch(
          createTestimonial({ updatedTestimonialData, navigate, toast })
        );
      } else {
        dispatch(
          updateTestimonial({ id, updatedTestimonialData, toast, navigate })
        );
      }
    }
  };

  useEffect(() => {
    if (id && userTestimonials) {
      const singleTestimonial = userTestimonials.find(
        (Testimonial) => Testimonial._id === id
      );

      if (singleTestimonial) {
        setTestimonialData(singleTestimonial);
      }
    }
  }, [id, userTestimonials]);
  const handleClear = () => {
    setTestimonialData({ ...initialState }); // Reset state
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Testimonial" : "Add Testimonial"}</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name oF the Client"
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
                  label="Client details"
                  placeholder="Enter testimonial details"
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
                <Grid container spacing={1}>
                  <Divider />

                  <Grid item xs={4}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setTestimonialData({
                          ...TestimonialData,
                          imageFile: base64,
                        })
                      }
                    />
                    {TestimonialData.imageFile ? ( // Display image preview only if imageFile is present
                      <img
                        src={TestimonialData.imageFile}
                        alt="Preview"
                        style={{ marginTop: "10px", maxWidth: "100%" }}
                      />
                    ) : (
                      <p style={{ marginTop: "10px", color: "gray" }}>
                        Upload headshot of the client
                      </p>
                    )}
                  </Grid>
                </Grid>
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

export default AddEditTestimonial;
