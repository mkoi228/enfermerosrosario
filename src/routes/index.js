const { Router } = require('express');
const Login = require('./login');
const EquipmentController = require('../controllers/equipmentController');
const PlanController = require('../controllers/planController');
const EquipmentRequestController = require('../controllers/equipmentRequestController');
const AssociatePlanRequestController = require('../controllers/associatePlanRequestController');
const ContactRequestController = require('../controllers/contactRequestController');
const CovidRequestController = require('../controllers/covidRequestController');
const RrhhController = require('../controllers/rrhhController');
const authenticateToken = require('./login').authToken;

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Enfermeros Rosario',
    });
});

// ADMIN LOGIN
// router.post('/admin/createuser', Login.createUser);
router.post('/admin/login', Login.loginUser);

// EQUIPMENT
// Web
router.get('/getallequipments', EquipmentController.getAllEquipments);
// Backoffice
router.post('/addequipment', authenticateToken, EquipmentController.addEquipment);
router.put('/modifyequipment', authenticateToken, EquipmentController.modifyEquipment);
router.put('/deleteequipment', authenticateToken, EquipmentController.deleteEquipment);

// EQUIPMENT REQUESTS
// Web
router.post('/createequipmentrequest', EquipmentRequestController.createEquipmentRequest);
// Backoffice
router.get('/getallequipmentrequests', authenticateToken, EquipmentRequestController.getAllEquipmentRequests);
router.put('/modifyequipmentrequest', authenticateToken, EquipmentRequestController.modifyEquipmentRequest);
router.put('/deleteequipmentrequest', authenticateToken, EquipmentRequestController.deleteEquipmentRequest);

// PLAN
// Web
router.get('/getallplans', PlanController.getAllPlans);
// Backoffice
router.post('/addplan', authenticateToken, PlanController.addPlan);
router.put('/modifyplan', authenticateToken, PlanController.modifyPlan);
router.put('/deleteplan', authenticateToken, PlanController.deletePlan);

// PLAN REQUEST
// Web
router.post('/createplanrequest', AssociatePlanRequestController.createPlanRequest);
// Backoffice
router.get('/getallplanrequests', authenticateToken, AssociatePlanRequestController.getAllPlanRequests);
router.put('/modifyplanrequest', authenticateToken, AssociatePlanRequestController.modifyPlanRequest);
router.put('/deleteplanrequest', authenticateToken, AssociatePlanRequestController.deletePlanRequest);

// CONTACT REQUEST
// Web
router.post('/sendcontactrequest', ContactRequestController.sendContactRequest);
// Backoffice
router.get('/getallcontactrequests', authenticateToken, ContactRequestController.getAllContactRequests);
router.put('/modifycontactrequest', authenticateToken, ContactRequestController.modifyContactRequest);
router.put('/deletecontactrequest', authenticateToken, ContactRequestController.deleteContactRequest);

// COVID REQUEST
// Web
router.post('/requestcovidtest', CovidRequestController.requestCovidTest);
// Backoffice
router.get('/getallcovidrequests', authenticateToken, CovidRequestController.getAllCovidRequests);
router.put('/modifycovidrequest', authenticateToken, CovidRequestController.modifyCovidRequest);
router.put('/deletecovidequest', authenticateToken, CovidRequestController.deleteCovidRequest);

// RRHH
// Web
router.get('/getallrrhhs', RrhhController.getAllRrhhs);
// Backoffice
router.post('/addrrhh', authenticateToken, RrhhController.addRrhh);
router.put('/modifyrrhh', authenticateToken, RrhhController.modifyRrhh);
router.put('/deleterrhh', authenticateToken, RrhhController.deleteRrhh);

module.exports = router;
