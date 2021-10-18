import { GraphQLServer } from "graphql-yoga";

// type definitions (schema)

const typeDefs = `
  type User {
    id: ID!,
    name: String!,
    email: String!,
    age: Int,
  }

  type Post {
    id: ID!,
    title: String!,
    body: String!,
    published:  Boolean!,
  }

  type Query {
    greeting(name: String): String!
    add(numbers: [Float!]!): Float!
    me: User!
    post: Post!
    grades: [Int!]!
  }
`;

// resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "abc1234",
        name: "Illia",
        email: "example@foo.com",
        age: 29,
      };
    },
    post() {
      return {
        id: "abc1234",
        title: "Post title",
        body: "Post body",
        published: true,
      };
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}!`;
      } else {
        return "Hello";
      }
    },
    add(parent, args, ctx, info) {
      return args.numbers.reduce((acc, val) => {
        acc += val;
        return acc;
      }, 0);
    },
    grades(parent, args, ctx, info) {
      return [2];
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
