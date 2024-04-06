import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
import { typeDefs } from "./graphql/schema.ts";
import { resolvers } from "./graphql/resolvers.ts";

const app = express();
const router = express.Router();


// Create and use the GraphQL handler.
app.all('/graphql',
    createHandler({ schema: typeDefs, rootValue: resolvers })
);


//add the router
app.use('/', router);
app.listen(process.env.port || 4000);
console.log('Running at Port 4000');