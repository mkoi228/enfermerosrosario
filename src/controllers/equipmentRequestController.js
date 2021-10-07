const EquipmentRequestService = require('../services/equipmentRequestService');

const equipmentRequestController = {
    getAllEquipmentRequests: async (req, res) => {
        try {
            const { allEquipmentRequests } = await EquipmentRequestService.getAllEquipmentRequests();
            res.status(200).send(allEquipmentRequests);
        } catch (error) {
            res.status(500).json(`getAllEquipmentRequests: Error getting all equipment requests: ${error}`);
        }
    },

    createEquipmentRequest: async (req, res, next) => {
        const equipmentRequestOptions = req.body;

        try {
            const { equipmentRequestID, code, message } = await EquipmentRequestService.createEquipmentRequest(equipmentRequestOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${equipmentRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`createEquipmentRequest: Failed to save equipment request data. ${error}`);
            next(error);
        }
    },

    modifyEquipmentRequest: async (req, res, next) => {
        const equipmentRequestUpdateOptions = req.body;

        try {
            const { equipmentRequestID, code, message } = await EquipmentRequestService.modifyEquipmentRequest(equipmentRequestUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${equipmentRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`modifyEquipmentRequest: Failed to modify equipment request data. ${error}`);
            next(error);
        }
    },

    deleteEquipmentRequest: async (req, res, next) => {
        const equipmentRequestOptionID = req.body;

        try {
            const { equipmentRequestID, code, message } = await EquipmentRequestService.deleteEquipmentRequest(equipmentRequestOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${equipmentRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deleteEquipmentRequest: Failed to delete equipment request. ${error}`);
            next(error);
        }
    },
};

module.exports = equipmentRequestController;
