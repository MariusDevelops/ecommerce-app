import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../auth/AuthContext";

const ItemCard = ({ item, onDelete }) => {
  const { user } = useAuth();

  const handleDeleteClick = () => {
    onDelete(item.itemId);
  };

  const handleAddToCart = () => {};

  return (
    <Card sx={{ mx: 2 }} style={{ position: "relative", marginBottom: "32px" }}>
      <CardMedia
        component="img"
        alt={item.itemName}
        src={item.itemImage}
        sx={{ aspectRatio: "auto", width: 1 }}
      />
      <CardContent style={{ height: "125px" }}>
        <Typography variant="h5" component="div">
          {item.itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {item.size}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {item.price}
        </Typography>
      </CardContent>
      {user && user.userType === "ADMIN" ? (
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="contained" color="secondary">
            UPDATE
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ marginLeft: "8px" }}
            onClick={handleDeleteClick}
          >
            DELETE
          </Button>
        </CardActions>
      ) : null}
      <CardActions>
        <Button variant="contained" fullWidth>
          DETAILS
        </Button>
      </CardActions>
      {user && (user.userType === "ADMIN" || user.userType === "USER") ? (
        <CardActions>
          <Button
            variant="contained"
            color="success"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default ItemCard;
