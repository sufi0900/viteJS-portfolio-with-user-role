import { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import Spin from "../Spin";

const DashboardBlog = () => {
  const Item = {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [dispatch, userId]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };
  const handleScroll = () => {
    if (
      !loading &&
      currentPage < numberOfPages &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
    ) {
      dispatch(getToursByUser(userId, currentPage + 1));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId, currentPage, numberOfPages]);

  if (loading && currentPage === 1) {
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
      {userTours.map((item) => (
        <Grid item xs={12} lg={8} key={item._id}>
          <Card style={Item}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <img
                  src={item.imageFile2}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CardContent>
                  <Typography variant="h6" component="div" align="left">
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                    align="left"
                  >
                    {excerpt(item.description)}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Delete
                      onClick={() => handleDelete(item._id)}
                      style={{ color: "#dd4b39", cursor: "pointer" }}
                    />
                    <Link to={`/editTour/${item._id}`}>
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
      {loading && currentPage < numberOfPages && (
        <Spin /> // Add a loading spinner while loading more skills
      )}
    </Grid>
  );
};

export default DashboardBlog;
