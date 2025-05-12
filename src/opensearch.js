const axios = require("axios");

// For search
// Method: POST
// _search Add this after index in url
const FLIGHTSEARCH_URL =
  "http://localhost:9200/opensearch_dashboards_sample_data_flights/_search";

// For insert
// Method: PUT
// _doc Add this after index in url
const CUSTOM_FLIGHT_ADD_URL = "http://localhost:9200/flights_custom/_doc";

// For update
// Method: POST
// _update Add this after index in url
const CUSTOM_FLIGHT_UPDATE_URL = "http://localhost:9200/flights_custom/_update";

// Generic
async function fetchFromOpenSearch(query) {
  try {
    const response = await axios.post(FLIGHTSEARCH_URL, query, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(
      response.data.hits.hits.map((hit) => ({
        id: hit._id,
        ...hit._source,
      }))
    );
    return response.data.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));
  } catch (error) {
    console.error("OpenSearch error:", error.message);
    return [];
  }
}

// Index a new documents

async function indexFlight(id, flight) {
  try {
    const response = await axios.put(`${CUSTOM_FLIGHT_ADD_URL}/${id}`, flight, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error indexing flight:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Update an existing document
async function updateFlightInOpensearch(id, updatedFields) {
  try {
    const response = await axios.post(
      `${CUSTOM_FLIGHT_UPDATE_URL}/${id}`,
      {
        doc: updatedFields,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating flight:",
      error.response?.data || error.message
    );
    return false;
  }
}

// Delete an existing document
async function deleteFlightInOpensearch(id) {
  try {
    const response = await axios.delete(`${CUSTOM_FLIGHT_ADD_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting flight:",
      error.response?.data || error.message
    );
    return false;
  }
}

module.exports = {
  indexFlight,
  updateFlightInOpensearch,
  deleteFlightInOpensearch,
  fetchFromOpenSearch,
};
