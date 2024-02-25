import { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSkill, getSkillsByUser } from "../redux/features/skillSlice";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import Spin from "../Spin";

const DashboardProject = () => {
  const Item = {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userSkills, loading } = useSelector((state) => ({
    ...state.skill,
  }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getSkillsByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Project?")) {
      dispatch(deleteSkill({ id, toast }));
    }
  };

  if (loading) {
    return <Spin />;
  }
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Dashboard: {user?.result?.name}
        </Typography>
        <hr style={{ maxWidth: "570px" }} />
      </Grid>

      {userSkills.map((item) => (
        <Grid item xs={12} lg={8} key={item._id} sx={{ marginRight: "55px" }}>
          <Card style={Item}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <CardContent style={{ marginBottom: "1rem" }}>
                  <Typography variant="h6" component="div" align="left">
                    {item.title}
                  </Typography>
                  <Typography variant="h6" component="div" align="left">
                    {item.percentage}%
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "-40px",
                    }}
                  >
                    <Delete
                      onClick={() => handleDelete(item._id)}
                      style={{ color: "#dd4b39", cursor: "pointer" }}
                    />
                    <Link to={`/editSkill/${item._id}`}>
                      <Edit
                        style={{
                          color: "#55acee",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  </div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardProject;
