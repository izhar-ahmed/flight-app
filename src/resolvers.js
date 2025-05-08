const { searchFlights, getFlightByFlightNum, getFlightsDestIsIT, fetchFlightByDest, fetchFlightByDestAndOrigin, fetchFlightByAirline, fetchFlightByDate, fetchFlightByPrice, fetchCancelFlight } = require('./opensearch');

const resolvers = {
    Query: {
        getAllFlights: async () => {
            const query = {
                size: 100,
                query: { match_all: {} }
            };

            return await searchFlights(query);
        },
        getFlightByFlightNum: async (_,{num}) => {
            const query = {
                query: {
                    term: {
                        FlightNum: {
                            value: num
                        }
                    }
                }
            };
            const results = await getFlightByFlightNum(query);
            return results[0] || null;
            
        },
        getFlightsDestIsIT: async () => {
            const query = {
                query: {
                    term: {
                        DestCountry: {
                            value: "IT"
                        }
                    }
                }
            }
            return await getFlightsDestIsIT(query);
        },
        getFlightByDest: async (_, {dest}) => {
            const query = {
                query: {
                    term: {
                        DestCountry: {
                            value: dest
                        }
                        
                    }
                }
            }
            console.log(await fetchFlightByDest(query))
            return await fetchFlightByDest(query);
        },
        getFlightByDestAndOrigin: async (_,{dest, origin}) => {
            const query = {
                query: {
                  bool: {
                    must: [
                      {
                        term: {
                          OriginCityName: {
                            value: dest
                          }
                        }
                      },
                      {
                        term: {
                          DestCityName: {
                            value: origin
                          }
                        }
                      }
                    ]
                  }
                }
              };
              return await fetchFlightByDestAndOrigin(query);
              
              
        },

        getFlightByAirline: async (_,{aline}) => {
            const query = {
                query: {
                    term: {
                      Carrier: {
                        value: aline
                      }
                    }
                  }
            }
            return await fetchFlightByAirline(query)
        },
        getFlightByDate: async (_, {date})=> {
            const query = {
                query: {
                    range: {
                      timestamp: {
                        gte: date
                      }
                    }
                  }
            }
            return await fetchFlightByDate(query)
        },
        getFlightByPrice: async (_, {price})=> {
            const query = {
                query: {
                    range: {
                      AvgTicketPrice: {
                        lte: price
                      }
                    }
            }
        }
        return await fetchFlightByPrice(query)
    },
    getCancelFlight: async (_, {cancel}) => {
        const query = {
            query: {
                term: {
                    Cancelled: {
                        value: cancel
                    }
                }
            }
        }
        return await fetchCancelFlight(query);
    }
    }
};

module.exports = resolvers;