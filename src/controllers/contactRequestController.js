const ContactRequestService = require('../services/contactRequestService');

const contactRequestController = {
    getAllContactRequests: async (req, res) => {
        try {
            const { allContactRequests } = await ContactRequestService.getAllContactRequests();
            res.status(200).send(allContactRequests);
        } catch (error) {
            res.status(500).json(`getAllContactRequests: Error getting all contact requests: ${error}`);
        }
    },

    sendContactRequest: async (req, res, next) => {
        const contactRequestOptions = req.body;

        try {
            const { contactRequestID, code, message } = await ContactRequestService.sendContactRequest(contactRequestOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${contactRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`sendContactRequest: Failed to save requested consultation data. ${error}`);
            next(error);
        }
    },

    modifyContactRequest: async (req, res, next) => {
        const contactRequestUpdateOptions = req.body;

        try {
            const { contactRequestID, code, message } = await ContactRequestService.modifyContactRequest(contactRequestUpdateOptions);
            console.log(`Code: ${code}. Message: ${message} with id ${contactRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`modifyContactRequest: Failed to modify contact request data. ${error}`);
            next(error);
        }
    },

    deleteContactRequest: async (req, res, next) => {
        const contactRequestOptionID = req.body;

        try {
            const { contactRequestID, code, message } = await ContactRequestService.deleteContactRequest(contactRequestOptionID);
            console.log(`Code: ${code}. Message: ${message} with id ${contactRequestID}`);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json(`deleteContactRequest: Failed to delete contact request. ${error}`);
            next(error);
        }
    },
};

module.exports = contactRequestController;
