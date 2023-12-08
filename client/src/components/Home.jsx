import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import ItemList from "./ItemList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleAddItem = () => {
    navigate("/additem");
  };

  useEffect(() => {
    const fetchUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUser = localStorage.getItem("authenticatedUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }

      setLoading(false);
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box component="header" sx={{ py: 3, px: 3 }}>
        {user && user.userType === "ADMIN" ? (
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleAddItem}
          >
            Add New Product
          </Button>
        ) : null}
      </Box>
      <ItemList />
    </Container>
  );
};

export default Home;
