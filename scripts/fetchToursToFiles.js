const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API_BASE_URL = "https://rest.gadventures.com";
const API_KEY = "test_697ca183dad0d1e24fe153431b8b4ba45a3b0a48";

const dataDir = path.join(__dirname, "src", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

/**
 * 1. Save all tours to tours.json
 */
async function saveAllTours() {
  try {
    const response = await axios.get(`${API_BASE_URL}/tour_dossiers/`, {
      headers: {
        "X-Application-Key": API_KEY,
        "Accept": "application/json",
      },
    });

    const tours = response.data?.results || [];
    const filePath = path.join(dataDir, "tours.json");

    fs.writeFileSync(filePath, JSON.stringify(tours, null, 2));
    console.log("✅ tours.json saved");
  } catch (err) {
    console.error("❌ Failed to save tours:", err.message);
  }
}

/**
 * 2. Save image URLs to tour_images.json and tour_images_log.txt
 */
async function saveTourImageMap() {
  try {
    const response = await axios.get(`${API_BASE_URL}/tour_dossiers/`, {
      headers: {
        "X-Application-Key": API_KEY,
        "Accept": "application/json",
      },
    });

    const tours = response.data?.results || [];
    const imageMap = {};
    const logLines = [];

    for (const tour of tours) {
      try {
        const detailRes = await axios.get(`${API_BASE_URL}/tour_dossiers/${tour.id}`, {
          headers: {
            "X-Application-Key": API_KEY,
            "Accept": "application/json",
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
        console.warn(`⚠️ Skipped tour ${tour.id}: ${err.message}`);
      }
    }

    fs.writeFileSync(path.join(dataDir, "tour_images.json"), JSON.stringify(imageMap, null, 2));
    fs.writeFileSync(path.join(dataDir, "tour_images_log.txt"), logLines.join("\n"));
    console.log("✅ tour_images.json and tour_images_log.txt saved");
  } catch (err) {
    console.error("❌ Failed to save tour images:", err.message);
  }
}

/**
 * 3. Save single tour details to tour_<id>.json
 */
async function saveTourById(tourId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/tour_dossiers/${tourId}`, {
      headers: {
        "X-Application-Key": API_KEY,
        "Accept": "application/json",
      },
    });

    const filePath = path.join(dataDir, `tour_${tourId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
    console.log(`✅ tour_${tourId}.json saved`);
  } catch (err) {
    console.error(`❌ Failed to save tour ${tourId}:`, err.message);
  }
}

// ✅ Execute all tasks
(async () => {
  await saveAllTours();           // Save all tours
  await saveTourImageMap();       // Save all image URLs
  await saveTourById("22997");    // Replace with a valid ID
})();

