const CovidRequestService = require('../services/covidRequestService');

const covidRequestController = {
    getAllCovidRequests: async (req, res) => {
        try {
            const { allCovidRequests } = await CovidRequestService.getAllCovidRequests();
            res.status(200).send(allCovidRequests);
        } catch (error) {
            res.status(500).json(`getAllCovidRequests: Error getting all covid requests: ${error}`);
        }
    },

    requestCovidTest: async (req, res, next) => {
        const covidRequestOptions = req.body;

        try {
            const { covidRequestID, code, message } = await CovidRequestService.requestCovidTest(covidRequestOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${covidRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`requestCovidTest: Failed to save requested covid test. ${error}`);
            next(error);
        }
    },

    modifyCovidRequest: async (req, res, next) => {
        const covidRequestUpdateOptions = req.body;

        try {
            const { covidRequestID, code, message } = await CovidRequestService.modifyCovidRequest(covidRequestUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${covidRequestID}`);
            res.status(200).json(code, message);
        } catch (error) {
            res.status(500).json(`modifyCovidRequest: Failed to modify covid request data. ${error}`);
            next(error);
        }
    },

    deleteCovidRequest: async (req, res, next) => {
        const covidRequestOptionID = req.body;

        try {
            const { covidRequestID, code, message } = await CovidRequestService.deleteCovidRequest(covidRequestOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${covidRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deleteCovidRequest: Failed to delete covid request. ${error}`);
            next(error);
        }
    },
};

module.exports = covidRequestController;
