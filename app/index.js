const { createHandler } = require('graphql-http/lib/use/express');
const express = require('express');
const { typeDefs } = require("./graphql/schema.ts")

const app = express();
const router = express.Router();

var root = {
    hello() {
        return "Hello world"
    }
}

// Create and use the GraphQL handler.
app.all('/graphql',
    createHandler({ schema: typeDefs, rootValue: root }));


//add the router
app.use('/', router);
app.listen(process.env.port || 4000);
console.log('Running at Port 4000');