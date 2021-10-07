const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
let { _id, name, email, message, state, createdAt, isDeleted } = require('../models/contactRequest');

const contactRequestService = {
    getAllContactRequests: async () => {
        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `CONTACT_REQUESTS`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const allContactRequests = [];

        queryResults.forEach((result) => {
            const contactRequest = {
                _id: result.CON_ID,
                name: result.CON_NAME,
                email: result.CON_EMAIL,
                message: result.CON_MESSAGE,
                state: result.CON_STATE,
                createdAt: result.CON_CREATED_AT,
                isDeleted: result.CON_IS_DEL,
            };
            allContactRequests.push(contactRequest);
        });

        return { code: 'OK', message: 'Geting all contact requests!', allContactRequests };
    },

    sendContactRequest: (contactRequestOptions) => {
        const uuid = uuidv4();
        name = contactRequestOptions.name;
        email = contactRequestOptions.email;
        message = contactRequestOptions.message;
        state = contactRequestOptions.state;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `CONTACT_REQUESTS`(`CON_ID`,`CON_NAME`,`CON_EMAIL`,`CON_MESSAGE`,`CON_STATE`,`CON_CREATED_AT`, `CON_IS_DEL`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [uuid, name, email, message, state, createdAt, isDeleted],
            // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { contactRequestID: uuid, code: 'OK', message: 'Contact request successfully created!' };
    },

    modifyContactRequest: (planRequestUpdateOptions) => {
        _id = planRequestUpdateOptions.id;
        name = planRequestUpdateOptions.name;
        email = planRequestUpdateOptions.email;
        message = planRequestUpdateOptions.message;
        state = planRequestUpdateOptions.state;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE CONTACT_REQUESTS SET CON_NAME=?,CON_EMAIL=?,CON_MESSAGE=?,CON_STATE=?,CON_IS_DEL=? WHERE CON_ID=?',
                timeout: 40000, // 40s
                values: [name, email, message, state, isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { contactRequestID: _id, code: 'OK', message: 'Contact request successfully updated!' };
    },

    deleteContactRequest: (contactRequestOption) => {
        _id = contactRequestOption.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE CONTACT_REQUESTS SET CON_IS_DEL = ? WHERE CON_ID = ?',
                timeout: 40000, // 40s
                values: [isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { contactRequestID: _id, code: 'OK', message: 'Contact request successfully deleted!' };
    },

};

module.exports = contactRequestService;
