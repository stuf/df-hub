const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');

const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: gql`
    # base types
    type EntityLink {
      link_type: String
      entity_id: Int
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
    type HistoricalEra {
      name: String
      start_year: Int
    }

    type HistoricalEvent {
      id: Int
      year: Int
      seconds72: Int
      type: String
      hfid: Int
      state: String
      site_id: Int
      subregion_id: Int
      feature_layer_id: Int
      coords: Int
    }

    # type HistoricalEvent {}

    type HistoricalFigure {
      id: Int
      name: String
      race: String
      caste: String
      appeared: Int
      birth_year: Int
      birth_seconds72: Int
      death_year: Int
      death_seconds72: Int
      associated_type: Int
      entity_link: [EntityLink]
      sphere: [String]
    }

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

    type MusicalForm {
      id: Int
      description: [String]
    }

    #

    # type Entity {}

    # Collection responses
    type AllSites {
      items: [Site]
      count: Int
    }

    type AllArtifacts {
      items: [Artifact]
      count: Int
    }

    type AllHistoricalEras {
      items: [HistoricalEra]
      count: Int
    }

    type AllHistoricalFigures {
      items: [HistoricalFigure]
      count: Int
    }

    type AllHistoricalEvents {
      items: [HistoricalEvent]
      count: Int
    }

    type AllMusicalForms {
      items: [MusicalForm]
      count: Int
    }

    # root query
    type Query {
      site(id: Int): Site
      artifact(id: Int): Artifact

      allSites(page: Int = 1, pageSize: Int = 100): AllSites

      allArtifacts(page: Int = 1, pageSize: Int = 100): AllArtifacts

      allHistoricalEras(page: Int = 1, pageSize: Int = 100): AllHistoricalEras

      allHistoricalFigures(
        page: Int = 1
        pageSize: Int = 100
      ): AllHistoricalFigures

      allHistoricalEvents(
        page: Int = 1
        pageSize: Int = 100
        hfid: Int
      ): AllHistoricalEvents

      allMusicalForms(page: Int = 1, pageSize: Int = 100): AllMusicalForms
    }
  `,
});

module.exports = new ApolloServer({
  schema,
  trace: true,
  engine: { apiKey: process.env.ENGINE_API_KEY },
});
