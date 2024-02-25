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
import { createProject, updateProject } from "../redux/features/projectSlice";
import Divider from "@mui/material/Divider";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialState = {
  title: "",
  link: "",
  toptext1: "",
};

const AddEditProject = () => {
  // Ensure that the initial state of the description is set correctly.
  // If editing an existing project, you may set it to the project's description.
  const [ProjectData, setProjectData] = useState({
    ...initialState,
    description: "",
  });

  const { userProjects } = useSelector((state) => ({
    ...state.project,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, link, toptext1 } = ProjectData;
  const { id } = useParams();

  // In the useEffect hook where we initialize state with existing project values
  // Use useCallback to prevent re-creation of the function on each render
  // const handleEditorChange = useCallback((value) => {
  //   // Check if the value parameter is getting the updated content from the editor.
  //   console.log("Editor content:", value);

  //   // Ensure that the state is updated properly with the new content.
  //   setProjectData((prevData) => ({ ...prevData, description: value }));
  // }, []);

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ProjectData.title && ProjectData.link && ProjectData.toptext1) {
      // Convert HTML string to plain text before saving
      // Do not convert HTML string to plain text before saving

      const updatedProjectData = {
        ...ProjectData,

        name: user?.result?.name,
      };

      if (!id) {
        dispatch(createProject({ updatedProjectData, navigate, toast }));
      } else {
        dispatch(updateProject({ id, updatedProjectData, toast, navigate }));
      }
    }
  };

  useEffect(() => {
    if (id && userProjects) {
      const singleProject = userProjects.find((project) => project._id === id);

      if (singleProject) {
        setProjectData(singleProject);
      }
    }
  }, [id, userProjects]);

  // const toolbarOptions = [
  //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //   ["bold", "italic", "underline", "strike"],
  //   [{ color: [] }, { background: [] }],
  //   [{ align: [] }],
  //   [{ list: "ordered" }, { list: "bullet" }],
  //   ["link", "image"],
  //   ["clean"],
  //   ["video"],
  // ];
  const handleClear = () => {
    setProjectData({ ...initialState }); // Reset state
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Project" : "Add Project"}</h1>
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
                  label="Github Link"
                  name="link"
                  value={link}
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
                  label="Production Link"
                  name="toptext1"
                  value={toptext1}
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

              {/* <Grid item xs={12}>
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
              </Grid> */}
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Divider />

                  <Divider />
                  <Grid item xs={4}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setProjectData({ ...ProjectData, imageFile: base64 })
                      }
                    />
                    {ProjectData.imageFile ? ( // Display image preview only if imageFile2 is present
                      <img
                        src={ProjectData.imageFile}
                        alt="Preview"
                        style={{ marginTop: "10px", maxWidth: "100%" }}
                      />
                    ) : (
                      <p style={{ marginTop: "10px", color: "gray" }}>
                        Upload your project picture
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

export default AddEditProject;
