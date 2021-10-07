const mysql = require('mysql');
let { id, name, surname, address, idReg, imagePath, rol, createdAt, isDeleted } = require('../models/rrhh');

const rrhhRequestService = {
    getAllRrhhs: async () => {
        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        const queryResults = await new Promise((resolve, reject) => connection.query(
            {
                sql: 'SELECT * FROM `RRHH`',
                timeout: 40000, // 40s
            },
            (error, results) => {
                // eslint-disable-next-line no-unused-expressions
                error ? reject(error) : resolve(results);
                connection.end();
            },
        ));

        const allRrhhs = [];

        queryResults.forEach((result) => {
            const rrhh = {
                id: result.RRH_ID,
                name: result.RRH_NAME,
                surname: result.RRH_SURNAME,
                address: result.RRH_ADDRESS,
                idReg: result.RRH_IDREG,
                imagePath: result.RRH_PHOTO,
                rol: result.RRH_ROL,
                createdAt: result.RRH_CREATED_AT,
                isDeleted: result.RRH_IS_DEL,
            };
            allRrhhs.push(rrhh);
        });

        return { code: 'OK', message: 'Geting all rrhhs!', allRrhhs };
    },

    addRrhh: (rrhhOptions) => {
        name = rrhhOptions.name;
        surname = rrhhOptions.surname;
        address = rrhhOptions.address;
        idReg = rrhhOptions.idReg;
        imagePath = rrhhOptions.imagePath;
        rol = rrhhOptions.rol;
        createdAt = new Date();
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'INSERT  INTO `RRHH`(`RRH_NAME`,`RRH_SURNAME`,`RRH_ADDRESS`,`RRH_IDREG`,`RRH_PHOTO`,`RRH_ROL`,`RRH_CREATED_AT`,`RRH_IS_DEL`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [name, surname, address, idReg, imagePath, rol, createdAt, isDeleted],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { rrhhID: id, code: 'OK', message: 'Rrhh successfully created!' };
    },

    modifyRrhh: (rrhhUpdateOptions) => {
        id = rrhhUpdateOptions.id;
        name = rrhhUpdateOptions.name;
        surname = rrhhUpdateOptions.surname;
        address = rrhhUpdateOptions.address;
        idReg = rrhhUpdateOptions.idReg;
        imagePath = rrhhUpdateOptions.imagePath;
        rol = rrhhUpdateOptions.rol;
        isDeleted = false;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE RRHH SET RRH_NAME=?,RRH_SURNAME=?,RRH_ADDRESS=?,RRH_IDREG=?,RRH_PHOTO=?,RRH_ROL=?,RRH_IS_DEL=? WHERE RRH_ID=?',
                timeout: 40000, // 40s
                values: [name, surname, address, idReg, imagePath, rol, isDeleted, id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { rrhhID: id, code: 'OK', message: 'Rrhh successfully updated!' };
    },

    deleteRrhh: (rrhhOption) => {
        id = rrhhOption.id;
        isDeleted = true;

        const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
        connection.query(
            {
                sql: 'UPDATE RRHH SET RRH_IS_DEL = ? WHERE RRH_ID = ?',
                timeout: 40000, // 40s
                values: [isDeleted, id],
                // eslint-disable-next-line no-unused-vars
            }, (error, results) => {
                if (error) throw error;
            },
        );
        connection.end();
        return { rrhhID: id, code: 'OK', message: 'Rrhh successfully deleted!' };
    },

};

module.exports = rrhhRequestService;
