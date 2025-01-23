import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../redux/apartmentSlice";
import ApartmentForm from "../components/ApartmentForm";
import ApartmentCard from "../components/ApartmentCard";
import Filters from "../components/Filters";

const Home = () => {
  const dispatch = useDispatch();
  const { apartments, loading } = useSelector((state) => state.apartments);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false); // Новый стейт для отображения кнопки сброса

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  const handleFilter = (filters) => {
    const isAnyFilterApplied = filters.minPrice || filters.maxPrice || filters.rooms;
    setFiltersApplied(isAnyFilterApplied); // Устанавливаем, применены ли фильтры
    dispatch(fetchApartments(filters));
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
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
    </div>
  );
};

export default Home;
