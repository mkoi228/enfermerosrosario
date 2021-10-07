const EquipmentService = require('../services/equipmentService');

const equipmentController = {
    getAllEquipments: async (req, res) => {
        try {
            const { allEquipments } = await EquipmentService.getAllEquipments();
            res.status(200).send(allEquipments);
        } catch (error) {
            res.status(500).json(`getAllEquipments: Error getting all equipments: ${error}`);
        }
    },

    addEquipment: async (req, res, next) => {
        const equipmentOptions = req.body;

        try {
            const { equipmentID, code, message } = await EquipmentService.addEquipment(equipmentOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${equipmentID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`addEquipment: Failed to save equipment data. ${error}`);
            next(error);
        }
    },

    modifyEquipment: async (req, res, next) => {
        const equipmentUpdateOptions = req.body;

        try {
            const { equipmentID, code, message } = await EquipmentService.modifyEquipment(equipmentUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${equipmentID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`modifyEquipment: Failed to modify equipment data. ${error}`);
            next(error);
        }
    },

    deleteEquipment: async (req, res, next) => {
        const equipmentOptionID = req.body;

        try {
            const { equipmentID, code, message } = await EquipmentService.deleteEquipment(equipmentOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${equipmentID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deleteEquipment: Failed to delete equipment. ${error}`);
            next(error);
        }
    },
};

module.exports = equipmentController;
