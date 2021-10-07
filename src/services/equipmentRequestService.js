const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
let { _id, name, email, message, phone, equipments, startDate, endDate, createdAt, isDeleted } = require('../models/equipmentRequest');

const equipmentRequestService = {
    getAllEquipmentRequests: async () => {
        const database = process.env.CLEARDB_DATABASE_URL;
        const connection = mysql.createConnection(database);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `EQUIPMENT_REQUESTS`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const allEquipmentRequests = [];

        queryResults.forEach((result) => {
            const equipmentRequest = {
                _id: result.REQ_ID,
                name: result.REQ_NAME,
                email: result.REQ_EMAIL,
                message: result.REQ_MESSAGE,
                phone: result.REQ_PHONE,
                equipments: result.REQ_EQUIPMENTS,
                startDate: result.REQ_START_DATE,
                endDate: result.REQ_END_DATE,
                createdAt: result.REQ_CREATED_AT,
                isDeleted: result.REQ_IS_DEL,
            };
            allEquipmentRequests.push(equipmentRequest);
        });

        return { code: 'OK', message: 'Geting all equipment requests!', allEquipmentRequests };
    },

    // TODO: add requestDate
    createEquipmentRequest: (equipmentRequestOptions) => {
        _id = uuidv4();
        name = equipmentRequestOptions.name;
        email = equipmentRequestOptions.email;
        message = equipmentRequestOptions.message;
        phone = equipmentRequestOptions.phone;
        equipments = equipmentRequestOptions.equipments.toString();
        startDate = equipmentRequestOptions.startDate;
        endDate = equipmentRequestOptions.endDate;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `EQUIPMENT_REQUESTS`(`REQ_ID`,`REQ_NAME`,`REQ_EMAIL`,`REQ_MESSAGE`,`REQ_PHONE`,`REQ_EQUIPMENTS`,`REQ_START_DATE`,`REQ_END_DATE`,`REQ_CREATED_AT`,`REQ_IS_DEL`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [_id, name, email, message, phone, equipments, startDate, endDate, createdAt, isDeleted],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { equipmentRequestID: _id, code: 'OK', message: 'Equipment request successfully created!' };
    },

    modifyEquipmentRequest: (equipmentRequestUpdateOptions) => {
        _id = equipmentRequestUpdateOptions.id;
        name = equipmentRequestUpdateOptions.name;
        email = equipmentRequestUpdateOptions.email;
        message = equipmentRequestUpdateOptions.message;
        phone = equipmentRequestUpdateOptions.phone;
        equipments = equipmentRequestUpdateOptions.equipments;
        startDate = equipmentRequestUpdateOptions.startDate;
        endDate = equipmentRequestUpdateOptions.endDate;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE EQUIPMENT_REQUESTS SET REQ_NAME=?,REQ_EMAIL=?,REQ_MESSAGE=?,REQ_PHONE=?,REQ_EQUIPMENTS=?,REQ_START_DATE=?,REQ_END_DATE=?,REQ_IS_DEL=? WHERE REQ_ID=?',
                timeout: 40000, // 40s
                values: [name, email, message, phone, equipments, startDate, endDate, isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { equipmentRequestID: _id, code: 'OK', message: 'Equipment request successfully updated!' };
    },

    deleteEquipmentRequest: (equipmentRequestOptionID) => {
        _id = equipmentRequestOptionID.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE EQUIPMENT_REQUESTS SET REQ_IS_DEL = ? WHERE REQ_ID=?',
                timeout: 40000, // 40s
                values: [isDeleted, _id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { equipmentRequestID: _id, code: 'OK', message: 'Equipment request successfully deleted!' };
    },

};

module.exports = equipmentRequestService;
