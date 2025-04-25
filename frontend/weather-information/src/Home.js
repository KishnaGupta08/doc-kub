import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Step 1: Get lat/lon from city name
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      const location = geoRes.data.results[0]; // Get the first matching result

      if (!location) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude } = location;

      // Step 2: Get weather from lat/lon
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      setWeather({
        ...weatherRes.data.current_weather,
        location: location.name,
        country: location.country,
      });
      console.log(weather,"weather");
    } catch (err) {
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    // Clear the authentication token from local storage
    await localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "3rem" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Weather Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          label="Enter City Name"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchWeather}
          sx={{ height: "100%" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Get Weather"}
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {weather && (
        <Card variant="outlined" sx={{ mt: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {weather.location}, {weather.country}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              🌡️ {weather.temperature}°C
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              💨 Wind: {weather.windspeed} km/h
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Last updated: {new Date(weather.time).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}
            <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          color="secondary"
          onClick={()=>handleLogout()}
          sx={{ padding: "10px 20px" }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
