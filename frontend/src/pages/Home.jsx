import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../redux/apartmentSlice";
import ApartmentForm from "../components/ApartmentForm";
import ApartmentCard from "../components/ApartmentCard";
import Filters from "../components/Filters";
import { Box } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { apartments, loading } = useSelector((state) => state.apartments);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  const handleFilter = (filters) => {
    const isAnyFilterApplied = filters.minPrice || filters.maxPrice || filters.rooms;
    setFiltersApplied(isAnyFilterApplied);
    dispatch(fetchApartments(filters));
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100%",
      }}
    >
      <Filters onFilter={handleFilter} filtersApplied={filtersApplied} />
      <button onClick={() => setShowForm(true)}>Додати квартиру</button>
      {showForm && (
        <ApartmentForm
          apartment={selectedApartment}
          onClose={() => {
            setShowForm(false);
            setSelectedApartment(null);
          }}
        />
      )}
      <div className="apartment-list">
        {apartments.map((apartment) => (
          <ApartmentCard
            key={apartment._id}
            apartment={apartment}
            onEdit={(apt) => {
              setSelectedApartment(apt);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </Box>
  );
};

export default Home;
