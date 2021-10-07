const AssociatePlanRequestService = require('../services/associatePlanRequestService');

const associatePlanRequestController = {
    getAllPlanRequests: async (req, res) => {
        try {
            const { getAllPlanRequests } = await AssociatePlanRequestService.getAllPlanRequests();
            res.status(200).send(getAllPlanRequests);
        } catch (error) {
            res.status(500).json(`getAllPlanRequests: Error getting all plan requests: ${error}`);
        }
    },

    createPlanRequest: async (req, res, next) => {
        const planRequestOptions = req.body;

        try {
            const { planRequestID, code, message } = await AssociatePlanRequestService.createPlanRequest(planRequestOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${planRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`createPlanRequest: Failed to save associate plan request data. ${error}`);
            next(error);
        }
    },

    modifyPlanRequest: async (req, res, next) => {
        const planRequestUpdateOptions = req.body;

        try {
            const { planRequestID, code, message } = await AssociatePlanRequestService.modifyPlanRequest(planRequestUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${planRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`modifyPlanRequest: Failed to modify associate plan request data. ${error}`);
            next(error);
        }
    },

    deletePlanRequest: async (req, res, next) => {
        const planRequestOptionID = req.body;

        try {
            const { planRequestID, code, message } = await AssociatePlanRequestService.deletePlanRequest(planRequestOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${planRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deletePlanRequest: Failed to delete associate plan request. ${error}`);
            next(error);
        }
    },
};

module.exports = associatePlanRequestController;
