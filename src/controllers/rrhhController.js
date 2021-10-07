const RrhhService = require('../services/rrhhService');

const rrhhController = {
    getAllRrhhs: async (req, res) => {
        try {
            const { allRrhhs } = await RrhhService.getAllRrhhs();
            res.status(200).send(allRrhhs);
        } catch (error) {
            res.status(500).json(`getAllRrhhs: Error getting all rrhhs: ${error}`);
        }
    },

    addRrhh: async (req, res, next) => {
        const rrhhOptions = req.body;

        try {
            const { rrhhID, code, message } = await RrhhService.addRrhh(rrhhOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${rrhhID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`addRrhh: Failed to save rrhh data. ${error}`);
            next(error);
        }
    },

    modifyRrhh: async (req, res, next) => {
        const rrhhUpdateOptions = req.body;

        try {
            const { rrhhID, code, message } = await RrhhService.modifyRrhh(rrhhUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${rrhhID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`modifyRrhh: Failed to modify rrhh data. ${error}`);
            next(error);
        }
    },

    deleteRrhh: async (req, res, next) => {
        const rrhhOptionID = req.body;

        try {
            const { rrhhID, code, message } = await RrhhService.deleteRrhh(rrhhOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${rrhhID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deleteRrhh: Failed to delete rrhh. ${error}`);
            next(error);
        }
    },
};

module.exports = rrhhController;
