const axios = require("axios");

const OPENSEARCH_URL = 'http://localhost:9200/opensearch_dashboards_sample_data_flights/_search';

// Generic
async function fetchFromOpenSearch(query) {
    try {
        const response = await axios.post(OPENSEARCH_URL, query, {
            headers: { 'Content-Type': 'application/json' }
        });

        return response.data.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source
        }));
    } catch (error) {
        console.error('OpenSearch error:', error.message);
        return [];
    }
}


const searchFlights = fetchFromOpenSearch;
const getFlightByFlightNum = fetchFromOpenSearch;
const getFlightsDestIsIT = fetchFromOpenSearch;
const fetchFlightByDest = fetchFromOpenSearch;
const fetchFlightByDestAndOrigin = fetchFromOpenSearch;
const fetchFlightByAirline = fetchFromOpenSearch;
const fetchFlightByDate = fetchFromOpenSearch;
const fetchFlightByPrice = fetchFromOpenSearch;
const fetchCancelFlight = fetchFromOpenSearch;

module.exports = {
    searchFlights,
    getFlightByFlightNum,
    getFlightsDestIsIT,
    fetchFlightByDest,
    fetchFlightByDestAndOrigin,
    fetchFlightByAirline,
    fetchFlightByDate,
    fetchFlightByPrice,
    fetchCancelFlight
};
