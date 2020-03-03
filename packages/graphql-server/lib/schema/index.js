const { gql, makeExecutableSchema } = require('apollo-server');

const typeDefs = gql`
  enum SiteType {
    CAMP
    CASTLE
    CAVE
    DARK_FORTRESS
    DARK_PITS
    FOREST_RETREAT
    FORTRESS
    HAMLET
    HILLOCKS
    LABYRINTH
    LAIR
    SHRINE
    TOWN
    VAULT
  }

  # locations, regions, places
  type Site {
    id: Int
    type: String
    name: String
    coords: String
    rectangle: String
  }

  # history
  # type HistoricalEra {}

  # type HistoricalEvent {}

  # type HistoricalFigure {}

  # items
  type Item {
    name_string: String
  }

  type Artifact {
    id: Int
    name: String
    item: Item
    site_id: Int
  }

  # Written forms, dances, poetic forms, etc
  # type DanceForm {}

  # type PoeticForm {}

  # type WrittenContent {}

  # type MusicalForm {}

  #

  # type Entity {}

  # root query
  type Query {
    allSites: [Site]

    allArtifacts: [Artifact]
  }
`;

const resolvers = {
  SiteType: require('./site-type'),
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = {
  schema,
  resolvers,
  typeDefs,
};
