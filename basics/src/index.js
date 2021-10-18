import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "1",
    name: "Illia",
    email: "example@foo.com",
    age: 29,
  },
  {
    id: "2",
    name: "Andrew",
    email: "andrew@foo.com",
    age: 29,
  },
  {
    id: "3",
    name: "Bob",
    email: "bod@foo.com",
  },
];

const posts = [
  {
    id: "1",
    title: "Post 1 title",
    body: "Post 1 body",
    published: true,
  },
  {
    id: "2",
    title: "Post 2 title",
    body: "Post 2 body",
    published: false,
  },
  {
    id: "3",
    title: "Post 3 title",
    body: "Post 3 body",
    published: true,
  },
];

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
    me: User!
    users(nameQuery: String): [User!]!
    post: Post!
    posts(titleQuery: String): [Post!]!
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
    users(parent, args, ctx, info) {
      if (args.nameQuery) {
        return users.filter((user) =>
          user.name
            .toLocaleLowerCase()
            .includes(args.nameQuery.toLocaleLowerCase())
        );
      } else {
        return users;
      }
    },
    post() {
      return {
        id: "abc1234",
        title: "Post title",
        body: "Post body",
        published: true,
      };
    },
    posts(parent, args, ctx, info) {
      if (args.titleQuery) {
        return posts.filter(
          (post) =>
            post.title
              .toLocaleLowerCase()
              .includes(args.titleQuery.toLocaleLowerCase()) ||
            post.body
              .toLocaleLowerCase()
              .includes(args.titleQuery.toLocaleLowerCase())
        );
      }
      return posts;
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
