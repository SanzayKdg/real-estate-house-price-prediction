import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PricePredictionForm from "../components/PricePredictionForm";
import { useEffect, useState } from "react";
import { getLocations } from "../utils/features";
const Home = () => {
  const [locations, setLocations] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocations();

      if (data.success) {
        setLocations(data.locations);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url('/bg.jpg')",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <PricePredictionForm locations={locations} />
      </Grid>
    </Grid>
  );
};

export default Home;
