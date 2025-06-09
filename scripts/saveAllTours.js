const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API_BASE_URL = "https://rest.gadventures.com";
const API_KEY = "test_697ca183dad0d1e24fe153431b8b4ba45a3b0a48";

// Save to ../src/data/
const dataDir = path.join(__dirname, "..", "src", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

/**
 * Fetch and save full details for all tours to tour_details.json
 */
async function saveAllTourDetailsToOneFile() {
  try {
    // Step 1: Get all tours (basic info with IDs)
    const res = await axios.get(`${API_BASE_URL}/tour_dossiers/`, {
      headers: {
        "X-Application-Key": API_KEY,
        Accept: "application/json",
      },
    });

    const tours = res.data?.results || [];
    const detailedTours = [];

    // Step 2: Fetch full details per tour
    for (const tour of tours) {
      try {
        const detailRes = await axios.get(`${API_BASE_URL}/tour_dossiers/${tour.id}`, {
          headers: {
            "X-Application-Key": API_KEY,
            Accept: "application/json",
          },
        });

        detailedTours.push(detailRes.data);
        console.log(`✅ Fetched tour ${tour.id}`);
      } catch (err) {
        console.warn(`⚠️ Skipped tour ${tour.id}: ${err.message}`);
      }
    }

    // Step 3: Save to one file
    fs.writeFileSync(
      path.join(dataDir, "tour_details.json"),
      JSON.stringify(detailedTours, null, 2)
    );

    console.log("🎉 Saved all tour details to tour_details.json");
  } catch (error) {
    console.error("❌ Error fetching full tour details:", error.message);
  }
}

// Optional: run immediately if this file is executed directly
if (require.main === module) {
  saveAllTourDetailsToOneFile();
}

module.exports = { saveAllTourDetailsToOneFile };
