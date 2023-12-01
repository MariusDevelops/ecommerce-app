import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

const ItemCard = ({ item }) => {
  return (
    <Card style={{ position: "relative" }}>
      <CardMedia
        component="img"
        alt={item.itemName}
        src={item.imageUrl}
        sx={{ aspectRatio: "auto", width: 1 }}
      />
      <CardActions
        style={{ position: "absolute", top: 0, right: 0, padding: "8px" }}
      >
        <Button variant="contained" color="secondary">
          UPDATE
        </Button>
        <Button variant="contained" color="error" style={{ marginLeft: "8px" }}>
          DELETE
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {item.size}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth>
          DETAILS
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
