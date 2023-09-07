import express from "express";

const router = express.Router();

const endpointSecret = "whsec_e665041c4c4d75b5a6d662dd3c30ff61e658d63899ffa846fcd0ca3efcdd9776";

router.post('/paymentMade', express.raw({type: 'application/json'}), async (request, response) => {
    const stripe = require('stripe')
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    switch (event.type) {
        case 'customer.subscription.created':
            const customerSubscriptionCreated = event.data.object;
            console.log(customerSubscriptionCreated);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
});

export default router;