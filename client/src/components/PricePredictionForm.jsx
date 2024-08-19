import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/features";
const PricePredictionForm = ({ locations }) => {
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [predictedPrice, setPredictedPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("location", location);
      formData.append("area", area);
      formData.append("floor", floor);
      formData.append("room", room);

      const { data } = await axios.post(`${BASE_URL}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setPredictedPrice(data.estimated_price);
      }
    } catch (err) {
      if (err) {
        alert(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Box
      sx={{
        my: 16,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Predict Price
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="area"
          label="Area (sq. ft.)"
          name="area"
          autoFocus
          sx={{
            margin: "1rem 0",
          }}
          onChange={(e) => setArea(e.target.value)}
          value={area}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="room"
          label="No. of Rooms"
          name="room"
          autoFocus
          sx={{
            margin: "1rem 0",
          }}
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />

        <FormControl sx={{ mt: "1rem" }} fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">Floor</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setFloor(e.target.value)}
            value={floor}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ mt: "1rem" }} fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Locations
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            label="Select Locations"
            onChange={(e) => setLocation(e.target.value)}
            sx={{ textTransform: "capitalize" }}
            name="location"
          >
            {locations &&
              locations.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  sx={{ textTransform: "capitalize" }}
                >
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Predict Price
        </Button>
      </Box>

      <TextField
        margin="normal"
        required
        fullWidth
        id="price"
        label="Predicted Price"
        name="price"
        autoFocus
        sx={{
          margin: "1rem 0",
          color: "black !important",
        }}
        aria-readonly
        value={predictedPrice}
      />
    </Box>
  );
};

PricePredictionForm.propTypes = {
  locations: PropTypes.array,
};

export default PricePredictionForm;
