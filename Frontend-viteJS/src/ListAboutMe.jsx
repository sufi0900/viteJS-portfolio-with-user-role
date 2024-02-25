import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MosqueIcon from "@mui/icons-material/Mosque";
import TodayIcon from "@mui/icons-material/Today";
import FlagIcon from "@mui/icons-material/Flag";
import CodeIcon from "@mui/icons-material/Code";
import InfoIcon from "@mui/icons-material/Info";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AbcIcon from "@mui/icons-material/Abc";
import { Cake, LanguageOutlined, Mail } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";

export default function ListAboutMe({
  fullname,
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
}) {
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
              className="custom-input-color"
            />
          }
          label={<h1>Show Basic info</h1>}
          className="custom-input-color"
        />
      </FormGroup>
      <Grid container spacing={2} sx={{ display: "flex", overflow: "auto" }}>
        <Grid item xs={6} md={6} sm={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignContent: "space-between",
              gap: "60px",
            }}
          >
            <Grid item lg={12} sm={12}>
              <List>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <AbcIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"fullname"}
                    secondary={secondary ? fullname : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <TodayIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Age"}
                    secondary={secondary ? age : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <Cake className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Date of Birth"}
                    secondary={secondary ? dob : null}
                  />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item lg={12} sm={12}>
              <List>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <MosqueIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Religion"}
                    secondary={secondary ? religion : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <CodeIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Interest"}
                    secondary={secondary ? intrest : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <InfoIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Experience"}
                    secondary={secondary ? experience : null}
                  />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item lg={12} sm={12}>
              <List sx={{ overflow: "auto" }}>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <LocalPhoneIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Phone Number"}
                    secondary={secondary ? phoneabout : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <Mail className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Email"}
                    secondary={secondary ? emailabout : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <FlagIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Country"}
                    secondary={secondary ? country : null}
                  />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item lg={12} sm={12}>
              <List sx={{ overflow: "auto" }}>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <SportsEsportsIcon className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Hobby"}
                    secondary={secondary ? hobby : null}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="ListItemText">
                    <LanguageOutlined className="ListItemIcon" />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText"
                    primary={"Language"}
                    secondary={secondary ? language : null}
                  />
                </ListItemButton>
              </List>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
