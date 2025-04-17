import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { ManageAccountsOutlined, LanOutlined } from "@mui/icons-material";
import { Card, CardContent, CardOverflow, AspectRatio } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";

const HomeMO_01 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          paddingTop: "4px",
          backgroundImage: "url(/bg3.png)", // Replace with the path to your pattern image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // This makes the background image stay still
        }}
      >
        {/* Main Content Area */}
        <Box
          sx={{ flex: 1, overflowY: "auto", padding: 1, textAlign: "center" }}
        >
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            Welcome to
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: "#1976d2", fontWeight: "bold", marginBottom: 18 }}
          >
            Tool Time Management System
          </Typography>

          {/* Card Grid */}
          <Container sx={{ maxWidth: "300px" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 6 }}
              columns={{ xs: 6, sm: 12, md: 20 }}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Card Definitions */}
              {[
                {
                  title: "Machine Processes",
                  description:
                    "Log the status on machine processes",
                  icon: <LanOutlined />,
                },
                {
                  title: "Profile",
                  description: "Edit profile details",
                  icon: <ManageAccountsOutlined />,
                },
              ].map((item, index) => (
                <Grid item xs={3} sm={4} md={6} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      textAlign: "center",
                      boxShadow: 2,
                      padding: 1,
                      minHeight: 50,
                      borderRadius: 20,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                      },
                    }}
                    onClick={item.onClick}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="4/3">
                        {React.cloneElement(item.icon, {
                          sx: { fontSize: 10, color: "#1976d2" }, // Adjust fontSize and color here
                        })}
                      </AspectRatio>
                    </CardOverflow>

                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: "1.55rem" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-line", fontSize: "1rem" }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default HomeMO_01;