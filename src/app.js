/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mysql = require('mysql');

require('dotenv').config();

const middlewares = require('./middlewares/errorMiddleware');

const app = express();

dbConnection();

// Test

app.use(morgan('common'));
app.use(helmet());
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
// }));
app.use(cors());
app.use(express.json());

const routes = require('./routes/index');

app.use('/', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

// MYSQL CONNECTION
function dbConnection() {
    const database = process.env.CLEARDB_DATABASE_URL || 'mysql://root:282828@localhost/erdb';
    const connection = mysql.createConnection(database);

    connection.connect((err) => {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(dbConnection, 2000);
        }

        // eslint-disable-next-line no-unused-expressions
        process.env.CLEARDB_DATABASE_URL ? console.log(`Successfully connected to Heroku DB as id ${connection.threadId}`) : console.log(`Successfully connected to Local DB as id ${connection.threadId}`);
    });

    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            dbConnection();
        } else {
            throw err;
        }
    });
}
