const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
let { _id, name, email, phone, address, message, state, createdAt, isDeleted } = require('../models/covidRequest');

const covidService = {
    getAllCovidRequests: async () => {
        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `COVID_REQUESTS`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const allCovidRequests = [];

        queryResults.forEach((result) => {
            const covidRequest = {
                _id: result.COV_ID,
                name: result.COV_NAME,
                email: result.COV_EMAIL,
                phone: result.COV_PHONE,
                address: result.COV_ADDRESS,
                message: result.COV_MESSAGE,
                state: result.COV_STATE,
                createdAt: result.COV_CREATED_AT,
                isDeleted: result.COV_IS_DEL,
            };
            allCovidRequests.push(covidRequest);
        });

        return { code: 'OK', message: 'Geting all covid requests!', allCovidRequests };
    },

    requestCovidTest: (covidRequestOptions) => {
        const uuid = uuidv4();
        name = covidRequestOptions.name;
        email = covidRequestOptions.email;
        phone = covidRequestOptions.phone;
        address = covidRequestOptions.address;
        message = covidRequestOptions.message;
        state = covidRequestOptions.state;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `COVID_REQUESTS`(`COV_ID`,`COV_NAME`,`COV_EMAIL`,`COV_PHONE`,`COV_ADDRESS`,`COV_MESSAGE`, `COV_STATE`, `COV_CREATED_AT`, `COV_IS_DEL`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [uuid, name, email, phone, address, message, state, createdAt, isDeleted],
            // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { covidRequestID: _id, code: 'OK', message: 'Covid request successfully created!' };
    },

    modifyCovidRequest: (covidRequestUpdateOptions) => {
        _id = covidRequestUpdateOptions.id;
        name = covidRequestUpdateOptions.name;
        email = covidRequestUpdateOptions.email;
        phone = covidRequestUpdateOptions.phone;
        address = covidRequestUpdateOptions.address;
        message = covidRequestUpdateOptions.message;
        state = covidRequestUpdateOptions.state;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE COVID_REQUESTS SET COV_NAME=?,COV_EMAIL=?,COV_PHONE=?,COV_ADdRESS=?,COV_MESSAGE=?,COV_STATE=?,COV_IS_DEL=? WHERE COV_ID=?',
                timeout: 40000, // 40s
                values: [name, email, phone, address, message, state, isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { covidRequestID: _id, code: 'OK', message: 'Covid request successfully updated!' };
    },

    deleteCovidRequest: (covidRequestOption) => {
        _id = covidRequestOption.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE COVID_REQUESTS SET COV_IS_DEL = ? WHERE COV_ID = ?',
                timeout: 40000, // 40s
                values: [isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { covidRequestID: _id, code: 'OK', message: 'Covid request successfully deleted!' };
    },
};

module.exports = covidService;
