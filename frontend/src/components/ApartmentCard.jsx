
import React from "react";
import { useDispatch } from "react-redux";
import { deleteApartment } from "../redux/apartmentSlice";
import { Box, Typography, Button, Card, CardContent, CardActions } from "@mui/material";

const ApartmentCard = ({ apartment, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 700, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {apartment.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" marginTop={1}>
          {apartment.description}
        </Typography>
        <Typography variant="subtitle1" marginTop={2}>
          Ціна: ${apartment.price}
        </Typography>
        <Typography variant="subtitle1">Кімнат: {apartment.rooms}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(apartment)}>
          Редагувати
        </Button>
        <Button size="small" color="error" onClick={() => dispatch(deleteApartment(apartment._id))}>
          Видалити
        </Button>
      </CardActions>
    </Card>
  );
};

export default ApartmentCard;