const fs = require("fs");
const axios = require("axios");

const API_BASE_URL = "https://rest.gadventures.com";
const API_KEY = "test_697ca183dad0d1e24fe153431b8b4ba45a3b0a48"; // Replace with your actual key

const IMAGE_JSON_PATH = "./src/data/tourImageMap.json";
const IMAGE_LOG_PATH = "./src/data/tourImageLog.txt";

async function fetchAndSaveTourImages() {
  try {
    // 1. Fetch all tours
    const response = await axios.get(`${API_BASE_URL}/tour_dossiers/`, {
      headers: {
        "X-Application-Key": API_KEY,
        Accept: "application/json",
      },
    });

    const tours = response.data?.results || [];
    const imageMap = {};
    const logLines = [];

    // 2. Fetch individual tour images
    const detailPromises = tours.map(async (tour) => {
      try {
        const detailRes = await axios.get(`${API_BASE_URL}/tour_dossiers/${tour.id}`, {
          headers: {
            "X-Application-Key": API_KEY,
            Accept: "application/json",
          },
        });

        const images = detailRes.data.images || [];
        const imageObj =
          images.find((img) => img.type === "BANNER_DESKTOP") ||
          images.find((img) => img.type === "BANNER") ||
          images[0];

        const imageUrl = imageObj
          ? imageObj.image_href
          : `https://source.unsplash.com/400x300/?${encodeURIComponent(tour.name)}`;

        imageMap[tour.id] = imageUrl;
        logLines.push(`Tour ID: ${tour.id} → ${imageUrl}`);
      } catch (err) {
        console.warn(`⚠️ Failed for tour ID ${tour.id}: ${err.message}`);
      }
    });

    await Promise.all(detailPromises);

    // 3. Save image map to JSON
    fs.writeFileSync(IMAGE_JSON_PATH, JSON.stringify(imageMap, null, 2));
    console.log("✅ Tour image map saved to tourImageMap.json");

    // 4. Save log file
    fs.writeFileSync(IMAGE_LOG_PATH, logLines.join("\n"));
    console.log("✅ Tour image log saved to tourImageLog.txt");

  } catch (error) {
    console.error("❌ Error fetching or saving tour image data:", error.message);
  }
}

fetchAndSaveTourImages();
