import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

interface IProps {
  window?: () => Window;
}
const NavBar = (props: IProps) => {
  const [, setMobileOpen] = React.useState(false);
  const [, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
  const drawerWidth = 254;
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const LogOut = () => {
    navigate("/");
    localStorage.removeItem("admin");
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Выйти" onClick={LogOut} />
          </ListItemButton>
        </ListItem>
        {admin ? (
          <ListItemButton>
            <ListItemText
              primary="Админ панель"
              onClick={() => navigate("/admin")}
            />
          </ListItemButton>
        ) : (
          ""
        )}
      </List>
      <Divider />
    </div>
  );
  return (
    <div>
      <Drawer
        container={container}
        variant="temporary"
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default NavBar;
