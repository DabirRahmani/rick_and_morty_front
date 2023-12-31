import RAndM from "../../assets/logo192.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import RoutesList from "../../routes";
import { useTheme } from "@mui/material";
import MainSearchModal from "../main-search";

const routes = Object.values(RoutesList);

const Search = styled("div")(({ theme }: any) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  flexWrap: "nowrap",
  display: "flex",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "28ch",
    },
  },
}));

const MainHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [searchModalStatus, setSearchModalStatus] = useState(false);

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (searchText.trim() !== "") setSearchModalStatus(true);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={anchorElNav !== null}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((route) => (
                <MenuItem
                  key={route}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(route);
                  }}
                >
                  <Typography
                    color={theme.palette.secondary.light}
                    textAlign="center"
                    fontWeight="700"
                    textTransform="uppercase"
                  >
                    {route}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img
            alt="rick and morty icon"
            style={{
              height: 64,
              width: 64,
              marginRight: 12,
              cursor: "pointer",
            }}
            src={RAndM}
            onClick={() => {
              navigate("");
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              navigate("");
            }}
            style={{ cursor: "pointer" }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: theme.palette.secondary.light,
              textDecoration: "none",
            }}
          >
            Rick and Morty
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.map((route) => (
              <Button
                key={route}
                onClick={() => {
                  navigate(route);
                }}
                sx={{
                  my: 2,
                  color: theme.palette.secondary.light,
                  display: "block",
                  fontWeight: "700",
                }}
              >
                {route}
              </Button>
            ))}
          </Box>

          <Search>
            <IconButton
              onClick={() => {
                if (searchText.trim() !== "") setSearchModalStatus(true);
              }}
              style={{ position: "absolute", zIndex: 10, left: 4 }}
            >
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleKeyDown}
              value={searchText}
              onChange={(e) => {
                if (e.target.value.length < 32) setSearchText(e.target.value);
              }}
            />
            <MainSearchModal
              open={searchModalStatus}
              close={() => {
                setSearchModalStatus(false);
              }}
              searchText={searchText}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
