const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const path = require('path')
const db = require('./config/connection');
const routes = require('./routes')
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MERN-challenge";


const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());





mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});