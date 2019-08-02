
const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const FeatureFlag = require("./mongoose/flagSchema2");
const mongoose = require("mongoose");

const flag = new FeatureFlag();

// Connect mongoose
const runMongo = async () => {
  mongoose.connect("mongodb+srv://jeffrey:mojojeffrey22@feature-flag-mwldy.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log("Connected to mongoDB Atlas!");
  }, err => { console.log("Can't connect to mongoDB Atlas") });
}

const typeDefs = gql`
 type flag {
    feature: String!
    description: String
    enabled: Boolean!
    payload: String
 }

 type Query {
   getFlags: [flag]
   getFlag(feature: String!): flag
 }

 type Mutation {
   addFlag(feature: String!): flag
   addFlag(feature: String!, description: String!, enabled: Boolean!)
   editDescription(feature: String!, description: String!)
   removeFlag(feature: String!): flag
   toggleFlag(feature: String!): flag
 }
`

const resolvers = {
  Query: {
    getFlags(_p, _a, _c) {
      return flag.getAll();
    },
    getFlag(_p, {
      feature
    }, _c) {
      return flag.getFlag(feature);
    }
  },
  Mutation: {
    addFlag(_p, {
      feature
    }, _c) {
      return flag.addFlag(feature).then(test => test);
    },
    removeFlag(_p, {
      feature
    }, _c) {

      return flag.addFlag(feature);
    },
    toggleFlag(_p, {
      feature
    }, _c) {
      return flag.toggleFlag(feature);
    }
  }

}

runMongo().catch(error => console.error(error));

const app = new express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async _ => {
    return {};
  },
});


const gPath = "/api-gateway/";

server.applyMiddleware({
  app: app,
  path: gPath
});

app.listen({
  port: 4000
}, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)