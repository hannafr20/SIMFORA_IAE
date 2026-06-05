import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { initDb } from './db';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';

const PORT = process.env.PORT || 4000;

async function startServer() {
  // 1. Initialize Database
  try {
    await initDb();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }

  // 2. Setup Express & HTTP Server
  const app = express();
  const httpServer = http.createServer(app);

  // 3. Setup Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // 4. Register Middleware
  app.use(cors());
  app.use(bodyParser.json());
  
  // Serve the GraphQL endpoint
  app.use('/graphql', expressMiddleware(server) as any);

  // Serve static files (HTML Client)
  app.use(express.static(path.join(__dirname, '../public')));

  // Direct access route for client.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // Start HTTP Server
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  console.log(`📊 GraphQL Playground available at http://localhost:${PORT}/graphql`);
}

startServer();
