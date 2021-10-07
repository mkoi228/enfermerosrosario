const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
let { _id, plan, name, email, message, phone, createdAt, isDeleted } = require('../models/plan');

const planRequestService = {
    getAllPlanRequests: async () => {
        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `ASSOCIATE_PLAN_REQUESTS`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const getAllPlanRequests = [];

        queryResults.forEach((result) => {
            const planRequest = {
                _id: result.ASP_ID,
                plan: result.ASP_PLAN,
                name: result.ASP_NAME,
                email: result.ASP_EMAIL,
                message: result.ASP_MESSAGE,
                phone: result.ASP_PHONE,
                createdAt: result.ASP_CREATED_AT,
                isDeleted: result.ASP_IS_DEL,
            };
            getAllPlanRequests.push(planRequest);
        });

        return { code: 'OK', message: 'Geting all plan requests!', getAllPlanRequests };
    },

    createPlanRequest: (planRequestOptions) => {
        _id = uuidv4();
        plan = planRequestOptions.plan;
        name = planRequestOptions.name;
        email = planRequestOptions.email;
        message = planRequestOptions.message;
        phone = planRequestOptions.phone;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `ASSOCIATE_PLAN_REQUESTS`(`ASP_ID`,`ASP_PLAN`,`ASP_NAME`,`ASP_EMAIL`,`ASP_MESSAGE`,`ASP_PHONE`,`ASP_CREATED_AT`,`ASP_IS_DEL`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [_id, plan, name, email, message, phone, createdAt, isDeleted],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { planRequestID: _id, code: 'OK', message: 'Plan request successfully created!' };
    },

    modifyPlanRequest: (planRequestUpdateOptions) => {
        _id = planRequestUpdateOptions.id;
        plan = planRequestUpdateOptions.plan;
        name = planRequestUpdateOptions.name;
        email = planRequestUpdateOptions.email;
        message = planRequestUpdateOptions.message;
        phone = planRequestUpdateOptions.phone;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE ASSOCIATE_PLAN_REQUESTS SET ASP_PLAN=?,ASP_NAME=?,ASP_EMAIL=?,ASP_MESSAGE=?,ASP_PHONE=?,ASP_IS_DEL=? WHERE ASP_ID=?',
                timeout: 40000, // 40s
                values: [plan, name, email, message, phone, isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { planRequestID: _id, code: 'OK', message: 'Plan request successfully updated!' };
    },

    deletePlanRequest: (planRequestOption) => {
        _id = planRequestOption.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE ASSOCIATE_PLAN_REQUESTS SET ASP_IS_DEL = ? WHERE ASP_ID = ?',
                timeout: 40000, // 40s
                values: [isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { planRequestID: _id, code: 'OK', message: 'Plan request successfully deleted!' };
    },

};

module.exports = planRequestService;
