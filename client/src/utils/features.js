import axios from "axios";

const BASE_URL = "http://localhost:5000";

const getLocations = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/get-locations`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err) {
    return err;
  }
};

export { getLocations, BASE_URL };
