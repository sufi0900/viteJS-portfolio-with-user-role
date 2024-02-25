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
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  updatePortfolio,
} from "../redux/features/portfolioSlice";
import Divider from "@mui/material/Divider";

import "react-quill/dist/quill.snow.css";

const initialState = {
  technology: "",
};

const AddEdittechnology = () => {
  // Ensure that the initial state of the description is set correctly.
  // If editing an existing Portfolio, you may set it to the Portfolio's description.
  const [PortfolioData, setPortfolioData] = useState({
    ...initialState,
    description: "",
  });

  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { technology } = PortfolioData;
  const { id } = useParams();

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPortfolioData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (PortfolioData.technology) {
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
            <h1>{id ? "Update Technology" : "Add Technology"}</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Technology"
                  name="technology"
                  value={technology}
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

export default AddEdittechnology;
