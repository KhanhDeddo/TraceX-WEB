import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "120vh",
        width: "100%",

        // backgroundImage: 'url(https://img.freepik.com/premium-photo/abstract-geometric-background-with-connecting-points-lines-abstract-blue-digital-background-network-concept-big-data-complex-with-compounds-3d-rendering_634443-1358.jpg)',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // borderRadius: 2,
      }}
    >
      <Box>
        <Header />
      </Box>
      <Box sx={{ flexGrow: 1, px: 5, py: 2, bgcolor: "#f9f9f9" }}>
        <Outlet />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
