const fs = require("fs");
const axios = require("axios");
const xml2js = require("xml2js");

const UNESCO_XML_URL = "https://whc.unesco.org/en/list/xml/";
const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all";

async function fetchAndSaveIndividually() {
  try {
    // 1. Fetch and save UNESCO XML
    const unescoXmlRes = await axios.get(UNESCO_XML_URL);
    const unescoXmlData = unescoXmlRes.data;

    fs.writeFileSync("./src/data/unesco_sites.xml", unescoXmlData);
    console.log("✅ UNESCO XML saved as unesco_sites.xml");

    // 2. Convert and save UNESCO XML as JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const unescoJson = await parser.parseStringPromise(unescoXmlData);

    fs.writeFileSync(
      "./src/data/unesco_sites.json",
      JSON.stringify(unescoJson, null, 2)
    );
    console.log("✅ UNESCO JSON saved as unesco_sites.json");

    // 3. Fetch and save REST Countries JSON
    const countriesRes = await axios.get(REST_COUNTRIES_URL);
    fs.writeFileSync(
      "./src/data/rest_countries.json",
      JSON.stringify(countriesRes.data, null, 2)
    );
    console.log("✅ REST Countries JSON saved as rest_countries.json");

  } catch (error) {
    console.error("❌ Error fetching or saving data:", error.message);
  }
}

fetchAndSaveIndividually();
