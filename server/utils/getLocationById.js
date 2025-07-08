import axios from "axios";

export const getLocation = async (ip) => {
  try {
    const res = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 5000, 
    });

    const { country_name, city } = res.data;

    return {
      country: country_name || "Unknown",
      city: city || "Unknown",
    };
  } catch (err) {
    console.error(`❌ Error fetching location for IP ${ip}:`, err.message);

    // Fallback to Unknown
    return {
      country: "Unknown",
      city: "Unknown",
    };
  }
};
