import { Logout, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export interface NavItem {
  title: string;
  icon?: React.ReactNode;
  path: string;
}

interface AdminNavBarProps {
  title?: string;
  navItems: NavItem[];
  rootPath: NavItem;
}

const AdminNavBar = ({ navItems, rootPath }: AdminNavBarProps) => {
  const { logout } = useAdminAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static" className="no-print">
        <Toolbar>
          <Link
            to={rootPath.path}
            style={{ textDecoration: "none", color: "blue" }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {rootPath.title || "Admin Dashboard"}
            </Typography>
          </Link>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "none",
                lg: "none",
                marginLeft: "auto",
              },
            }}
          >
            {navItems.map((item, index) => (
              <Button
                component={Link}
                to={item.path}
                key={index}
                color="inherit"
                startIcon={item.icon}
                sx={{ ml: 2 }}
              >
                {item.title}
              </Button>
            ))}
            <Button
              onClick={logout}
              color="inherit"
              startIcon={<Logout />}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "flex",
                lg: "flex",
                marginLeft: "auto",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuOutlined />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {navItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={handleClose}
                  component={Link}
                  to={item.path}
                >
                  {item.icon && (
                    <Box component="span" sx={{ mr: 1 }}>
                      {item.icon}
                    </Box>
                  )}
                  {item.title}
                </MenuItem>
              ))}
              <MenuItem onClick={logout} component={Link} to="">
                <Box component="span" sx={{ mr: 1 }}>
                  {<Logout />}
                </Box>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminNavBar;
