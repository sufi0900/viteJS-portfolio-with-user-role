import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { GitHub, OpenInNew } from "@mui/icons-material";

import Grid from "@mui/material/Grid";

function ProjectCard({ imageFile, title, link, toptext1 }) {
  return (
    <Grid
      item
      lg={4}
      sm={12}
      xl={4}
      md={6}
      xs={12}
      padding={2}
      className="flex"
    >
      <div className="projectCard">
        <Card
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-duration="400"
          sx={{
            transition: "all 0.5s",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={title}
            sx={{
              background: "#ff014f",
              borderRadius: "10px",
              color: "white",
              padding: "10px",
              textAlign: "center",
            }}
          />

          <CardMedia
            component="img"
            alt={title}
            height="150"
            className=" blo "
            image={imageFile}
            sx={{
              objectFit: "cover",
              flexGrow: 1,
            }}
          />

          <CardActions
            sx={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              href={link}
              target="_blank"
              rel="noopener"
              className="btn m-1"
            >
              <GitHub />
            </IconButton>
            <IconButton
              href={toptext1}
              target="_blank"
              rel="noopener"
              className="btn m-1"
            >
              <OpenInNew />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </Grid>
  );
}

export default ProjectCard;
