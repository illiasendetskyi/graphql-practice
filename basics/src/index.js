import { GraphQLServer } from "graphql-yoga";

// type definitions (schema)

const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// resolvers
const resolvers = {
  Query: {
    hello() {
      return "My first query";
    },
    name() {
      return "Illia Sendetskyi";
    },
    location() {
      return "Ukraine";
    },
    bio() {
      return "My bio";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(({ port }) => {
  console.log(`The server is up on port ${port}`);
});
