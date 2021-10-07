const PlanService = require('../services/planService');

const planController = {
    getAllPlans: async (req, res) => {
        try {
            const { allPlans } = await PlanService.getAllPlans();
            res.status(200).send(allPlans);
        } catch (error) {
            res.status(500).json(`getAllPlans: Error getting all plans: ${error}`);
        }
    },

    addPlan: async (req, res, next) => {
        const planOptions = req.body;

        try {
            const { planID, code, message } = await PlanService.addPlan(planOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${planID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`addPlan: Failed to save plan data. ${error}`);
            next(error);
        }
    },

    modifyPlan: async (req, res, next) => {
        const planUpdateOptions = req.body;

        try {
            const { planID, code, message } = await PlanService.modifyPlan(planUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${planID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`modifyPlan: Failed to modify plan data. ${error}`);
            next(error);
        }
    },

    deletePlan: async (req, res, next) => {
        const planOptionID = req.body;

        try {
            const { planID, code, message } = await PlanService.deletePlan(planOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${planID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deletePlan: Failed to delete plan. ${error}`);
            next(error);
        }
    },
};

module.exports = planController;
