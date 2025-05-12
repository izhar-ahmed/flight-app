const { default: axios } = require("axios");
const {
  indexFlight,
  updateFlightInOpensearch,
  deleteFlightInOpensearch,
  fetchFromOpenSearch,
} = require("./opensearch");

const resolvers = {
  Query: {
    getAllFlights: async () => {
      const query = {
        size: 100,
        query: { match_all: {} },
      };

      return await fetchFromOpenSearch(query);
    },
    getFlightByFlightNum: async (_, { num }) => {
      const query = {
        query: {
          term: {
            FlightNum: {
              value: num,
            },
          },
        },
      };
      const results = await fetchFromOpenSearch(query);
      return results[0] || null;
    },
    getFlightsDestIsIT: async () => {
      const query = {
        query: {
          term: {
            DestCountry: {
              value: "IT",
            },
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },
    getFlightByDest: async (_, { dest }) => {
      const query = {
        query: {
          term: {
            DestCountry: {
              value: dest,
            },
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },
    getFlightByDestAndOrigin: async (_, { dest, origin }) => {
      const query = {
        query: {
          bool: {
            must: [
              {
                term: {
                  OriginCityName: {
                    value: origin,
                  },
                },
              },
              {
                term: {
                  DestCityName: {
                    value: dest,
                  },
                },
              },
            ],
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },

    getFlightByAirline: async (_, { aline }) => {
      const query = {
        query: {
          term: {
            Carrier: {
              value: aline,
            },
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },
    getFlightByDate: async (_, { date }) => {
      const query = {
        query: {
          range: {
            timestamp: {
              gte: date,
            },
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },
    getFlightByPrice: async (_, { price }) => {
      const query = {
        query: {
          range: {
            AvgTicketPrice: {
              lte: price,
            },
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },
    getCancelFlight: async (_, { cancel }) => {
      const query = {
        query: {
          term: {
            Cancelled: {
              value: cancel,
            },
          },
        },
      };
      return await fetchFromOpenSearch(query);
    },
    getFlightByOrDestDateRange: async (
      _,
      { origin, destination, date1, date2 }
    ) => {
      const query = {
        query: {
          bool: {
            must: [
              {
                term: {
                  OriginCountry: {
                    value: origin,
                  },
                },
              },
              {
                term: {
                  DestCountry: {
                    value: destination,
                  },
                },
              },
              {
                range: {
                  timestamp: {
                    gte: date1,
                    lte: date2,
                  },
                },
              },
            ],
          },
        },
      };

      return await fetchFromOpenSearch(query);
    },
  },

  Mutation: {
    addFlight: async (_, { id, flight }) => {
      try {
        await indexFlight(id, flight);
        return true;
      } catch (error) {
        console.error("Error adding flight:", error);
        return false;
      }
    },
    updateFlight: async (_, { id, flight }) => {
      try {
        await updateFlightInOpensearch(id, flight);
        return true;
      } catch (error) {
        console.error("Error updating flight:", error);
        return false;
      }
    },
    deleteFlight: async (_, { id }) => {
      try {
        await deleteFlightInOpensearch(id);
        return true;
      } catch (error) {
        console.error("Error updating flight:", error);
        return false;
      }
    },
  },
};

module.exports = resolvers;
