import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
import { typeDefs } from "./graphql/schema.ts";
import { resolvers } from "./graphql/resolvers.ts";
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express();
const router = express.Router();


const memoryStore = new session.MemoryStore();
app.use(
    session({
        secret: 'SVNhn8olG2CiCukFC6s5XZBz5kO1tIJj',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    })
);
const keycloak = new Keycloak({
    store: memoryStore
});
app.use(
    keycloak.middleware({
        logout: '/logout',
        admin: '/'
    })
);


// Create and use the GraphQL handler.
app.all('/graphql', keycloak.protect(),
    createHandler({ schema: typeDefs, rootValue: resolvers })
);


//add the router
app.use('/', router);
app.listen(process.env.port || 4000);
console.log('Running at Port 4000');