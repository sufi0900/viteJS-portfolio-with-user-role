import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Container,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSkill, updateSkill } from "../redux/features/skillSlice";

const initialState = { title: "", percentage: "" };

const AddEditSkill = () => {
  // Ensure that the initial state of the description is set correctly.
  // If editing an existing Skill, you may set it to the Skill's description.
  const [SkillData, setSkillData] = useState({
    ...initialState,
  });

  const { userSkills } = useSelector((state) => ({
    ...state.skill,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, percentage } = SkillData;

  const { id } = useParams();

  // In the useEffect hook where we initialize state with existing Skill values
  // Use useCallback to prevent re-creation of the function on each render

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSkillData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (SkillData.title && SkillData.percentage) {
      // Convert HTML string to plain text before saving
      // Do not convert HTML string to plain text before saving

      const updatedSkillData = {
        ...SkillData,

        name: user?.result?.name,
      };

      if (!id) {
        dispatch(createSkill({ updatedSkillData, navigate, toast }));
      } else {
        dispatch(updateSkill({ id, updatedSkillData, toast, navigate }));
      }
    }
  };

  useEffect(() => {
    if (id && userSkills) {
      const singleSkill = userSkills.find((Skill) => Skill._id === id);

      if (singleSkill) {
        setSkillData(singleSkill);
      }
    }
  }, [id, userSkills]);
  const handleClear = () => {
    setSkillData({ ...initialState }); // Reset state
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      <Card className="item admincards">
        <CardContent>
          <div className="About3">
            <h1>{id ? "Update Skill" : "Add Skill"}</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Skill title"
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
                  label="Skill %age in number between (1-100)"
                  name="percentage"
                  value={percentage}
                  onChange={onInputChange}
                  fullWidth
                  inputProps={{ min: 1, max: 100 }} // Add this line here
                  type="number"
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
                <Grid container spacing={1}>
                  <Divider />

                  <Grid item xs={4}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setSkillData({ ...SkillData, imageFile: base64 })
                      }
                    />
                    {SkillData.imageFile ? ( // Display image preview only if imageFile2 is present
                      <img
                        src={SkillData.imageFile}
                        alt="Preview"
                        style={{ marginTop: "10px", maxWidth: "100%" }}
                      />
                    ) : (
                      <p style={{ marginTop: "10px", color: "gray" }}>
                        Upload png img of skill
                      </p>
                    )}
                  </Grid>
                </Grid>
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

export default AddEditSkill;
