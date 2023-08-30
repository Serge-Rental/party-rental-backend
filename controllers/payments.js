const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return items[0].amount * 100;
  };

//get client secret
// exports.getClientSecret = async(req, res, next) => {
//   res.json({client_secret: intent.client_secret});

// }

//create payment
exports.createPayment = async(req, res, next) => {
    let { items } = req.body
    
    console.log("items", req.body)
	try {
		  // Create a PaymentIntent with the order amount and currency
          const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "USD",
            automatic_payment_methods: {
              enabled: true,
            },
          });
		console.log("Payment", paymentIntent)
        res.send({
            clientSecret: paymentIntent.client_secret,
          });
		// res.json({
		// 	message: "Payment successful",
		// 	success: true
		// })
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
  };