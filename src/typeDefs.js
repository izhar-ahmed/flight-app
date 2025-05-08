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
    }
`;

module.exports = typeDefs;
