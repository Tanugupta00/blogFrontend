import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => {
  return (
    
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent">
        <List>
          <ListItem button component={Link} to="/addpost">
            <ListItemText primary="Add Post" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: 20 }}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
