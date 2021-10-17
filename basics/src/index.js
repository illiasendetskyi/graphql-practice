import { GraphQLServer } from "graphql-yoga";

// type definitions (schema)

const typeDefs = `
  type Query {
    id: ID!,
    title: String!,
    price: Float!,
    releaseYear: Int,
    rating: Float,
    inStock: Boolean!,
  }
`;

// resolvers
const resolvers = {
  Query: {
    id() {
      return "123abc";
    },
    title() {
      return "Title";
    },
    price() {
      return 8.25;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 1.67;
    },
    inStock() {
      return true;
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
