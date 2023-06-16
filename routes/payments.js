const controller = require('../controllers/payments');
const router = require('express').Router();


router.post('/', controller.createPayment); // /payment

module.exports = router;