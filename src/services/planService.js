const mysql = require('mysql');
let { id, name, price, description, photoPath, createdAt, isDeleted } = require('../models/plan');

const planRequestService = {
    getAllPlans: async () => {
        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `PLAN`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const allPlans = [];

        queryResults.forEach((result) => {
            const plan = {
                id: result.PLN_ID,
                name: result.PLN_NAME,
                description: result.PLN_PRICE,
                price: result.PLN_DESC,
                photoPath: result.PLN_PHOTO,
                createdAt: result.PLN_CREATED_AT,
                isDeleted: result.PLN_IS_DEL,
            };
            allPlans.push(plan);
        });

        return { code: 'OK', message: 'Geting all plans!', allPlans };
    },

    addPlan: (planOptions) => {
        name = planOptions.name;
        price = planOptions.price;
        description = planOptions.description;
        photoPath = planOptions.photoPath;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `PLAN`(`PLN_NAME`,`PLN_PRICE`,`PLN_DESC`,`PLN_PHOTO`,`PLN_CREATED_AT`,`PLN_IS_DEL`) VALUES (?, ?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [name, price, description, photoPath, createdAt, isDeleted],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { planID: id, code: 'OK', message: 'Plan successfully created!' };
    },

    modifyPlan: (planUpdateOptions) => {
        id = planUpdateOptions.id;
        name = planUpdateOptions.name;
        price = planUpdateOptions.price;
        description = planUpdateOptions.description;
        photoPath = planUpdateOptions.photoPath;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE PLAN SET PLN_NAME=?,PLN_PRICE=?,PLN_DESC=?,PLN_PHOTO=?,PLN_IS_DEL=? WHERE PLN_ID=?',
                timeout: 40000, // 40s
                values: [name, price, description, photoPath, isDeleted, id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { planID: id, code: 'OK', message: 'Plan successfully updated!' };
    },

    deletePlan: (planOption) => {
        id = planOption.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE PLAN SET PLN_IS_DEL = ? WHERE PLN_ID = ?',
                timeout: 40000, // 40s
                values: [isDeleted, id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { planID: id, code: 'OK', message: 'Plan successfully deleted!' };
    },

};

module.exports = planRequestService;
