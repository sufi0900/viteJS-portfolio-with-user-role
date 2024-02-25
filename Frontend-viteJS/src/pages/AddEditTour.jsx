import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Container,
} from "@mui/material";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

const initialState = {
  title: "",
  description: "",
  date: "",
};

const AddEditBlog = () => {
  const [tourData, setTourData] = useState({
    ...initialState,
    date: "", // Add a new property for the date
  });
  const { error, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, date } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [userTours, id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleEditorChange = useCallback((value) => {
    setTourData((prevData) => ({ ...prevData, description: value }));
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && date) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
  };

  const handleClear = () => {
    setTourData(initialState);
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
    ["video"],
  ];

  const Video = Quill.import("formats/video");
  Video.className = "ql-video";
  Video.tagName = "iframe";
  Quill.register(Video, true);

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Blog" : "Add Blog"}</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
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
                  label="Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={onInputChange} // Use onDateChange for date input
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
                <ReactQuill
                  label="Description"
                  name="description"
                  value={description}
                  onChange={handleEditorChange} // Update this line
                  modules={{ toolbar: toolbarOptions }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "color",
                    "background",
                    "align",
                    "list",
                    "bullet",
                    "link",
                    "image",
                  ]}
                  theme="snow"
                  fullWidth
                  required
                  multiline
                  rows={4}
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
                  className="custom-quill-content custom-quill-icons"
                />
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={12}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setTourData({ ...tourData, imageFile2: base64 })
                    }
                  />
                  {tourData.imageFile2 ? ( // Display image preview only if imageFile2 is present
                    <img
                      src={tourData.imageFile2}
                      alt="Preview"
                      style={{ marginTop: "10px", maxWidth: "100%" }}
                    />
                  ) : (
                    <p style={{ marginTop: "10px", color: "gray" }}>
                      Upload your blog img
                    </p>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                {id ? "Update" : "Submit"}
              </Button>
            </Grid>
            <br />
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
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddEditBlog;
