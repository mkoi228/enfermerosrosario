const mysql = require('mysql');
let { id, name, description, photoPath, createdAt, isDeleted } = require('../models/equipment');

const equipmentRequestService = {
    getAllEquipments: async () => {
        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `EQUIPMENT`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const allEquipments = [];

        queryResults.forEach((result) => {
            const equipment = {
                id: result.EQU_ID,
                name: result.EQU_NAME,
                description: result.EQU_DESC,
                photoPath: result.EQU_PHOTO,
                createdAt: result.EQU_CREATED_AT,
                isDeleted: result.EQU_IS_DEL,
            };
            allEquipments.push(equipment);
        });

        return { code: 'OK', message: 'Geting all equipments!', allEquipments };
    },

    addEquipment: (equipmentOptions) => {
        name = equipmentOptions.name;
        description = equipmentOptions.description;
        photoPath = equipmentOptions.photoPath;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `EQUIPMENT`(`EQU_NAME`,`EQU_DESC`,`EQU_PHOTO`,`EQU_CREATED_AT`,`EQU_IS_DEL`) VALUES (?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [name, description, photoPath, createdAt, isDeleted],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { equipmentID: id, code: 'OK', message: 'Equipment successfully created!' };
    },

    modifyEquipment: (equipmentUpdateOptions) => {
        id = equipmentUpdateOptions.id;
        name = equipmentUpdateOptions.name;
        description = equipmentUpdateOptions.description;
        photoPath = equipmentUpdateOptions.photoPath;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE EQUIPMENT SET EQU_NAME=?,EQU_DESC=?,EQU_PHOTO=?,EQU_IS_DEL=? WHERE EQU_ID=?',
                timeout: 40000, // 40s
                values: [name, description, photoPath, isDeleted, id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { equipmentID: id, code: 'OK', message: 'Equipment successfully updated!' };
    },

    deleteEquipment: (equipmentUpdateOptions) => {
        id = equipmentUpdateOptions.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE EQUIPMENT SET EQU_IS_DEL = ? WHERE EQU_ID = ?',
                timeout: 40000, // 40s
                values: [isDeleted, id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { equipmentID: id, code: 'OK', message: 'Equipment successfully deleted!' };
    },

};

module.exports = equipmentRequestService;
