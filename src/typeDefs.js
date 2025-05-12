const { gql } = require("apollo-server");

const typeDefs = gql`
  type Flight {
    id: ID!
    FlightNum: String
    Origin: String
    Dest: String
    Carrier: String
    DestWeather: String
    OriginWeather: String
    timestamp: String
    AvgTicketPrice: Float
  }

  input LocationInput {
    lat: String!
    lon: String!
  }

  input FlightInput {
    FlightNum: String!
    DestCountry: String!
    OriginWeather: String
    OriginCityName: String!
    AvgTicketPrice: Float!
    DistanceMiles: Float
    FlightDelay: Boolean
    DestWeather: String
    Dest: String!
    FlightDelayType: String
    OriginCountry: String!
    dayOfWeek: Int
    DistanceKilometers: Float
    timestamp: String
    DestLocation: LocationInput
    DestAirportID: String
    Carrier: String!
    Cancelled: Boolean
    FlightTimeMin: Float
    Origin: String
    OriginLocation: LocationInput
    DestRegion: String
    OriginAirportID: String
    OriginRegion: String
    DestCityName: String
    FlightTimeHour: Float
    FlightDelayMin: Int
  }

  input FlightUpdateInput {
    FlightNum: String
    DestCountry: String
    OriginWeather: String
    OriginCityName: String
    AvgTicketPrice: Float
    DistanceMiles: Float
    FlightDelay: Boolean
    DestWeather: String
    Dest: String
    FlightDelayType: String
    OriginCountry: String
    dayOfWeek: Int
    DistanceKilometers: Float
    timestamp: String
    DestLocation: LocationInput
    DestAirportID: String
    Carrier: String
    Cancelled: Boolean
    FlightTimeMin: Float
    Origin: String
    OriginLocation: LocationInput
    DestRegion: String
    OriginAirportID: String
    OriginRegion: String
    DestCityName: String
    FlightTimeHour: Float
    FlightDelayMin: Int
  }

  type Query {
    getAllFlights: [Flight]
    getFlightByFlightNum(num: String!): Flight
    getFlightsDestIsIT: [Flight!]!
    getFlightByDest(dest: String): [Flight!]!
    getFlightByDestAndOrigin(dest: String!, origin: String!): [Flight!]!
    getFlightByAirline(aline: String!): [Flight]
    getFlightByDate(date: String!): [Flight]
    getFlightByPrice(price: Float!): [Flight]
    getCancelFlight(cancel: Boolean): [Flight]
    getFlightByOrDestDateRange(
      origin: String
      destination: String
      date1: String
      date2: String
    ): [Flight!]!
  }

  type Mutation {
    addFlight(id: String!, flight: FlightInput!): Boolean
    updateFlight(id: String!, flight: FlightUpdateInput!): Boolean
    deleteFlight(id: String!): Boolean
  }
`;

module.exports = typeDefs;
