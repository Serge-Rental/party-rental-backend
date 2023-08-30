const controller = require('../controllers/payments');
const router = require('express').Router();


router.post('/', controller.createPayment); // /payment
// router.get('/secret', controller.getClientSecret) // /payment/secret

module.exports = router;