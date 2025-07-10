const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

require("dotenv").config(); // optional if using .env for your API key

app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/api/companies", async (req, res) => {
  const query = req.query.q;

  const response = await fetch(
    `https://api.company-information.service.gov.uk/search/companies?q=${query}`,
    {
      headers: {
        Authorization: "Basic " + Buffer.from(API_KEY).toString("base64"),
      },
    }
  );

  const data = await response.json();
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
